import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import database from './config/database.js'

// Import routes
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import categoryRoutes from './routes/categories.js'
import wishlistRoutes from './routes/wishlist.js'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
      imgSrc: ["'self'", "data:", "blob:"],
      connectSrc: ["'self'"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// CORS configuration - allow all origins since we're serving frontend from same server
app.use(cors({
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200
}))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/wishlist', wishlistRoutes)

// Serve static files from the React app build directory
const frontendPath = path.join(__dirname, '..', 'dist')
app.use(express.static(frontendPath))

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' })
  }
  res.sendFile(path.join(frontendPath, 'index.html'))
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err)
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  res.status(err.status || 500).json({
    error: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Graceful shutdown...')
  try {
    await database.close()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during shutdown:', error)
    process.exit(1)
  }
})

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Graceful shutdown...')
  try {
    await database.close()
    console.log('✅ Database connection closed')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error during shutdown:', error)
    process.exit(1)
  }
})

// Start server
async function startServer() {
  try {
    // Initialize database connection
    await database.connect()
    console.log('📊 Database connected successfully')

    // Start the server
    app.listen(PORT, () => {
      console.log('🚀 Marketify Backend Server Started')
      console.log('=====================================')
      console.log(`📍 Server running on port ${PORT}`)
      console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🔗 API Base URL: http://localhost:${PORT}/api`)
      console.log(`❤️  Health Check: http://localhost:${PORT}/health`)
      console.log('=====================================')
      console.log('📋 Available Endpoints:')
      console.log('   POST /api/auth/register')
      console.log('   POST /api/auth/login')
      console.log('   GET  /api/auth/profile')
      console.log('   PUT  /api/auth/profile')
      console.log('   GET  /api/products')
      console.log('   GET  /api/products/:id')
      console.log('   POST /api/products')
      console.log('   GET  /api/categories')
      console.log('   GET  /api/categories/:id')
      console.log('   GET  /api/wishlist')
      console.log('   POST /api/wishlist')
      console.log('   POST /api/wishlist/toggle')
      console.log('   DELETE /api/wishlist/:productId')
      console.log('=====================================')
    })
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
