import express from 'express'
import database from '../config/database.js'

const router = express.Router()

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await database.all(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      GROUP BY c.id
      ORDER BY c.name
    `)

    res.json({
      categories: categories.map(category => ({
        id: category.id,
        name: category.name,
        icon: category.icon,
        productCount: category.product_count,
        createdAt: category.created_at
      }))
    })
  } catch (error) {
    console.error('Categories fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get single category by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const category = await database.get(`
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.id = ?
      GROUP BY c.id
    `, [id])

    if (!category) {
      return res.status(404).json({ error: 'Category not found' })
    }

    res.json({
      category: {
        id: category.id,
        name: category.name,
        icon: category.icon,
        productCount: category.product_count,
        createdAt: category.created_at
      }
    })
  } catch (error) {
    console.error('Category fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
