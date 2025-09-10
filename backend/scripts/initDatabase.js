import database from '../config/database.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function initDatabase() {
  try {
    // Ensure database directory exists
    const dbDir = path.join(__dirname, '..', 'database')
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true })
    }

    await database.connect()

    // Create tables
    console.log('Creating database tables...')

    // Users table
    await database.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        location TEXT,
        phone TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Categories table
    await database.run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        icon TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `)

    // Products table
    await database.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10,2) NOT NULL,
        image_url TEXT,
        image_text TEXT,
        category_id INTEGER,
        seller_id INTEGER,
        location TEXT,
        is_active BOOLEAN DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id),
        FOREIGN KEY (seller_id) REFERENCES users(id)
      )
    `)

    // Wishlists table (many-to-many relationship between users and products)
    await database.run(`
      CREATE TABLE IF NOT EXISTS wishlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
        UNIQUE(user_id, product_id)
      )
    `)

    // Orders table
    await database.run(`
      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        total_amount DECIMAL(10,2) NOT NULL,
        status TEXT DEFAULT 'pending',
        shipping_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `)

    // Order items table
    await database.run(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER DEFAULT 1,
        price DECIMAL(10,2) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id)
      )
    `)

    // Create indexes for better performance
    await database.run('CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id)')
    await database.run('CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id)')
    await database.run('CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id)')
    await database.run('CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id)')

    console.log('✅ Database initialized successfully!')
    console.log('📊 Tables created:')
    console.log('   - users')
    console.log('   - categories')
    console.log('   - products')
    console.log('   - wishlists')
    console.log('   - orders')
    console.log('   - order_items')

  } catch (error) {
    console.error('❌ Error initializing database:', error)
    process.exit(1)
  } finally {
    await database.close()
  }
}

initDatabase()
