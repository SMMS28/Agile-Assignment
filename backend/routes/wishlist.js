import express from 'express'
import { body, validationResult } from 'express-validator'
import database from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Get user's wishlist
router.get('/', authenticateToken, async (req, res) => {
  try {
    const wishlistItems = await database.all(`
      SELECT p.*, c.name as category_name, u.name as seller_name, w.created_at as added_at
      FROM wishlists w
      JOIN products p ON w.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN users u ON p.seller_id = u.id
      WHERE w.user_id = ? AND p.is_active = 1
      ORDER BY w.created_at DESC
    `, [req.user.id])

    res.json({
      wishlist: wishlistItems.map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: parseFloat(item.price),
        imageUrl: item.image_url,
        imageText: item.image_text,
        category: item.category_name,
        categoryId: item.category_id,
        seller: item.seller_name,
        addedAt: item.added_at,
        createdAt: item.created_at
      }))
    })
  } catch (error) {
    console.error('Wishlist fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Add product to wishlist
router.post('/', authenticateToken, [
  body('productId').isInt().withMessage('Product ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { productId } = req.body

    // Check if product exists and is active
    const product = await database.get(
      'SELECT id FROM products WHERE id = ? AND is_active = 1',
      [productId]
    )

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check if already in wishlist
    const existingItem = await database.get(
      'SELECT id FROM wishlists WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    )

    if (existingItem) {
      return res.status(409).json({ error: 'Product already in wishlist' })
    }

    // Add to wishlist
    await database.run(
      'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
      [req.user.id, productId]
    )

    res.status(201).json({ message: 'Product added to wishlist' })
  } catch (error) {
    console.error('Add to wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Remove product from wishlist
router.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params

    const result = await database.run(
      'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    )

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Product not found in wishlist' })
    }

    res.json({ message: 'Product removed from wishlist' })
  } catch (error) {
    console.error('Remove from wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Toggle product in wishlist (add if not present, remove if present)
router.post('/toggle', authenticateToken, [
  body('productId').isInt().withMessage('Product ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { productId } = req.body

    // Check if product exists and is active
    const product = await database.get(
      'SELECT id FROM products WHERE id = ? AND is_active = 1',
      [productId]
    )

    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }

    // Check if already in wishlist
    const existingItem = await database.get(
      'SELECT id FROM wishlists WHERE user_id = ? AND product_id = ?',
      [req.user.id, productId]
    )

    if (existingItem) {
      // Remove from wishlist
      await database.run(
        'DELETE FROM wishlists WHERE user_id = ? AND product_id = ?',
        [req.user.id, productId]
      )
      res.json({ message: 'Product removed from wishlist', action: 'removed' })
    } else {
      // Add to wishlist
      await database.run(
        'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
        [req.user.id, productId]
      )
      res.json({ message: 'Product added to wishlist', action: 'added' })
    }
  } catch (error) {
    console.error('Toggle wishlist error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
