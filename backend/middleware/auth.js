import jwt from 'jsonwebtoken'
import database from '../config/database.js'

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1] // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development')
    
    // Verify user still exists in database
    const user = await database.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.userId]
    )

    if (!user) {
      return res.status(401).json({ error: 'Invalid token - user not found' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' })
    }
    return res.status(403).json({ error: 'Invalid token' })
  }
}

export const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    req.user = null
    return next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret-key-for-development')
    const user = await database.get(
      'SELECT id, name, email FROM users WHERE id = ?',
      [decoded.userId]
    )
    
    req.user = user || null
  } catch (error) {
    req.user = null
  }

  next()
}
