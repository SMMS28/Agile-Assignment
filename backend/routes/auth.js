import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import database from '../config/database.js'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// Register endpoint
router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('location').optional().trim(),
  body('phone').optional().trim()
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password, location, phone } = req.body

    // Check if user already exists
    const existingUser = await database.get('SELECT id FROM users WHERE email = ?', [email])
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const result = await database.run(
      'INSERT INTO users (name, email, password_hash, location, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, location || null, phone || null]
    )

    // Generate JWT token
    const token = jwt.sign(
      { userId: result.id, email },
      process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      { expiresIn: '7d' }
    )

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: result.id,
        name,
        email,
        location: location || null,
        phone: phone || null,
        joinedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Login endpoint
router.post('/login', [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password required')
], async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    // Find user
    const user = await database.get('SELECT id, name, email, password_hash, location, phone, created_at FROM users WHERE email = ?', [email])
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password_hash)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback-secret-key-for-development',
      { expiresIn: '7d' }
    )

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        phone: user.phone,
        joinedAt: user.created_at
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await database.get(
      'SELECT id, name, email, location, phone, created_at FROM users WHERE id = ?',
      [req.user.id]
    )

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        location: user.location,
        phone: user.phone,
        joinedAt: user.created_at
      }
    })
  } catch (error) {
    console.error('Profile fetch error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Update user profile
router.put('/profile', [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Valid email required'),
  body('location').optional().trim(),
  body('phone').optional().trim()
], authenticateToken, async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, location, phone } = req.body
    const updates = {}
    const params = []
    
    if (name !== undefined) {
      updates.name = '?'
      params.push(name)
    }
    if (email !== undefined) {
      // Check if email is already taken by another user
      const existingUser = await database.get(
        'SELECT id FROM users WHERE email = ? AND id != ?',
        [email, req.user.id]
      )
      if (existingUser) {
        return res.status(409).json({ error: 'Email already in use' })
      }
      updates.email = '?'
      params.push(email)
    }
    if (location !== undefined) {
      updates.location = '?'
      params.push(location)
    }
    if (phone !== undefined) {
      updates.phone = '?'
      params.push(phone)
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    updates.updated_at = 'CURRENT_TIMESTAMP'
    const setClause = Object.keys(updates).map(key => 
      key === 'updated_at' ? `${key} = ${updates[key]}` : `${key} = ?`
    ).join(', ')
    
    params.push(req.user.id)

    await database.run(
      `UPDATE users SET ${setClause} WHERE id = ?`,
      params
    )

    // Fetch updated user
    const updatedUser = await database.get(
      'SELECT id, name, email, location, phone, created_at FROM users WHERE id = ?',
      [req.user.id]
    )

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        location: updatedUser.location,
        phone: updatedUser.phone,
        joinedAt: updatedUser.created_at
      }
    })
  } catch (error) {
    console.error('Profile update error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
