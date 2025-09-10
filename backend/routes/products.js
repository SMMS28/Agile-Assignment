import express from 'express'
import { body, query, validationResult } from 'express-validator'
import database from '../config/database.js'
import { authenticateToken, optionalAuth } from '../middleware/auth.js'

const router = express.Router()

// Get all products with optional filtering
router.get('/', [
  query('category').optional().isInt().withMessage('Category must be a number'),
  query('search').optional().isString().withMessage('Search must be a string'),
  query('location').optional().isString().withMessage('Location must be a string'),
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive number'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100')
], optionalAuth, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { category, search, location, page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    let sql = `
      SELECT p.*, c.name as category_name, u.name as seller_name,
             ${req.user ? `(SELECT COUNT(*) FROM wishlists w WHERE w.user_id = ? AND w.product_id = p.id) as is_wishlisted` : '0 as is_wishlisted'}
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.is_active = 1
    `
    
    const params = req.user ? [req.user.id] : []

    if (category) {
      sql += ' AND p.category_id = ?'
      params.push(category)
    }

    if (search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }

    if (location) {
      sql += ' AND (p.location LIKE ? OR u.location LIKE ?)'
      params.push(`%${location}%`, `%${location}%`)
    }

    sql += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?'
    params.push(limit, offset)

    const products = await database.all(sql, params)

    // Get total count for pagination
    let countSql = 'SELECT COUNT(*) as total FROM products p LEFT JOIN users u ON p.seller_id = u.id WHERE p.is_active = 1'
    const countParams = []

    if (category) {
      countSql += ' AND p.category_id = ?'
      countParams.push(category)
    }

    if (search) {
      countSql += ' AND (p.name LIKE ? OR p.description LIKE ?)'
      countParams.push(`%${search}%`, `%${search}%`)
    }

    if (location) {
      countSql += ' AND (p.location LIKE ? OR u.location LIKE ?)'
      countParams.push(`%${location}%`, `%${location}%`)
    }

    const { total } = await database.get(countSql, countParams)

    res.json({
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        imageUrl: product.image_url,
        imageText: product.image_text,
        category: product.category_name,
        categoryId: product.category_id,
        seller: product.seller_name,
        location: product.location,
        isWishlisted: Boolean(product.is_wishlisted),
        createdAt: product.created_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Products fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single product by ID
router.get('/:id', [
  query('id').isInt().withMessage('Product ID must be a number')
], optionalAuth, async (req, res) => {
  try {
    const { id } = req.params

    const product = await database.get(`
      SELECT p.*, c.name as category_name, u.name as seller_name,
             ${req.user ? `(SELECT COUNT(*) FROM wishlists w WHERE w.user_id = ? AND w.product_id = p.id) as is_wishlisted` : '0 as is_wishlisted'}
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.id = ? AND p.is_active = 1
    `, req.user ? [req.user.id, id] : [id])

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    res.json({
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        imageUrl: product.image_url,
        imageText: product.image_text,
        category: product.category_name,
        categoryId: product.category_id,
        seller: product.seller_name,
        isWishlisted: Boolean(product.is_wishlisted),
        createdAt: product.created_at
      }
    })
  } catch (error) {
    console.error('Product fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Create new product (requires authentication)
router.post('/', authenticateToken, [
  body('name').trim().isLength({ min: 1 }).withMessage('Product name is required'),
  body('description').optional().isString(),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('imageUrl').optional().isString(),
  body('imageText').optional().isString(),
  body('categoryId').isInt().withMessage('Category ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, description, price, imageUrl, imageText, categoryId } = req.body

    // Verify category exists
    const category = await database.get('SELECT id FROM categories WHERE id = ?', [categoryId])
    if (!category) {
      return res.status(400).json({ error: 'Invalid category ID' })
    }

    const result = await database.run(
      'INSERT INTO products (name, description, price, image_url, image_text, category_id, seller_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, price, imageUrl, imageText, categoryId, req.user.id]
    )

    const newProduct = await database.get(`
      SELECT p.*, c.name as category_name, u.name as seller_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE p.id = ?
    `, [result.id])

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        id: newProduct.id,
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        imageUrl: newProduct.image_url,
        imageText: newProduct.image_text,
        category: newProduct.category_name,
        categoryId: newProduct.category_id,
        seller: newProduct.seller_name,
        isWishlisted: false,
        createdAt: newProduct.created_at
      }
    })
  } catch (error) {
    console.error('Product creation error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user's listings
router.get('/user/listings', authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query
    const offset = (page - 1) * limit

    const products = await database.all(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.seller_id = ?
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [req.user.id, limit, offset])

    // Get total count
    const { total } = await database.get(
      'SELECT COUNT(*) as total FROM products WHERE seller_id = ?',
      [req.user.id]
    )

    res.json({
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        description: product.description,
        price: parseFloat(product.price),
        imageUrl: product.image_url,
        imageText: product.image_text,
        category: product.category_name,
        categoryId: product.category_id,
        location: product.location,
        isActive: Boolean(product.is_active),
        createdAt: product.created_at,
        updatedAt: product.updated_at
      })),
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('User listings fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update product (only by owner)
router.put('/:id', [
  body('name').optional().trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('description').optional().trim(),
  body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('categoryId').optional().isInt().withMessage('Category ID must be a number'),
  body('location').optional().trim(),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const productId = parseInt(req.params.id)
    
    // Check if product exists and belongs to user
    const existingProduct = await database.get(
      'SELECT seller_id FROM products WHERE id = ?',
      [productId]
    )

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (existingProduct.seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this product' })
    }

    const { name, description, price, categoryId, location, isActive } = req.body
    const updates = {}
    const params = []

    if (name !== undefined) {
      updates.name = '?'
      params.push(name)
    }
    if (description !== undefined) {
      updates.description = '?'
      params.push(description)
    }
    if (price !== undefined) {
      updates.price = '?'
      params.push(price)
    }
    if (categoryId !== undefined) {
      updates.category_id = '?'
      params.push(categoryId)
    }
    if (location !== undefined) {
      updates.location = '?'
      params.push(location)
    }
    if (isActive !== undefined) {
      updates.is_active = '?'
      params.push(isActive ? 1 : 0)
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    updates.updated_at = 'CURRENT_TIMESTAMP'
    const setClause = Object.keys(updates).map(key => 
      key === 'updated_at' ? `${key} = ${updates[key]}` : `${key} = ?`
    ).join(', ')
    
    params.push(productId)

    await database.run(
      `UPDATE products SET ${setClause} WHERE id = ?`,
      params
    )

    // Fetch updated product
    const updatedProduct = await database.get(`
      SELECT p.*, c.name as category_name
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `, [productId])

    res.json({
      message: 'Product updated successfully',
      product: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: parseFloat(updatedProduct.price),
        imageUrl: updatedProduct.image_url,
        imageText: updatedProduct.image_text,
        category: updatedProduct.category_name,
        categoryId: updatedProduct.category_id,
        location: updatedProduct.location,
        isActive: Boolean(updatedProduct.is_active),
        createdAt: updatedProduct.created_at,
        updatedAt: updatedProduct.updated_at
      }
    })
  } catch (error) {
    console.error('Product update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Delete product (only by owner)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    
    // Check if product exists and belongs to user
    const existingProduct = await database.get(
      'SELECT seller_id FROM products WHERE id = ?',
      [productId]
    )

    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' })
    }

    if (existingProduct.seller_id !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this product' })
    }

    await database.run('DELETE FROM products WHERE id = ?', [productId])

    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    console.error('Product delete error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
