import database from '../config/database.js'
import bcrypt from 'bcryptjs'

// Mock data from the frontend
const CATEGORIES_DATA = [
  { name: 'Fashion', icon: 'fas fa-tshirt' },
  { name: 'Electronics', icon: 'fas fa-plug' },
  { name: 'Home & Garden', icon: 'fas fa-couch' },
  { name: 'Jewelry', icon: 'fas fa-gem' },
  { name: 'Crafts', icon: 'fas fa-paint-brush' },
  { name: 'Collectibles', icon: 'fas fa-book-open' },
]

const PRODUCTS_DATA = [
  {
    name: 'Handmade Ceramic Vase',
    description: 'A beautiful, one-of-a-kind vase for your home decor.',
    price: 495.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Handmade Ceramic Vase',
    category: 'Home & Garden',
    location: 'San Francisco, CA',
  },
  {
    name: 'Vintage Film Camera',
    description: 'Capture memories the old-fashioned way. In working condition.',
    price: 1320.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Vintage Film Camera',
    category: 'Collectibles',
    location: 'Oakland, CA',
  },
  {
    name: 'Artisan Leather Wallet',
    description: 'Hand-stitched wallet made from genuine full-grain leather.',
    price: 825.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Artisan Leather Wallet',
    category: 'Fashion',
    location: 'Berkeley, CA',
  },
  {
    name: 'Abstract Canvas Art',
    description: 'A unique piece of abstract art to brighten up any room.',
    price: 2750.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Abstract Canvas Art',
    category: 'Crafts',
    location: 'Palo Alto, CA',
  },
  {
    name: 'Sterling Silver Necklace',
    description: 'Elegant necklace with a modern twist, perfect for any occasion.',
    price: 1045.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Sterling Silver Necklace',
    category: 'Jewelry',
    location: 'San Jose, CA',
  },
  {
    name: 'Bluetooth Wireless Headphones',
    description: 'High-quality sound with noise cancellation technology.',
    price: 1980.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Bluetooth Wireless Headphones',
    category: 'Electronics',
    location: 'Mountain View, CA',
  },
  {
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, sustainable, and comfortable everyday wear.',
    price: 385.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Organic Cotton T-Shirt',
    category: 'Fashion',
    location: 'Fremont, CA',
  },
  {
    name: 'Hand-poured Soy Candle',
    description: 'Scented with essential oils for a relaxing ambiance.',
    price: 275.0,
    image_url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
    image_text: 'Hand-poured Soy Candle',
    category: 'Crafts',
    location: 'Sunnyvale, CA',
  },
]

const SAMPLE_USERS = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  },
  {
    name: 'Mike Johnson',
    email: 'mike@example.com',
    password: 'password123'
  }
]

async function seedDatabase() {
  try {
    await database.connect()

    console.log('🌱 Seeding database...')

    // Check if data already exists
    const existingCategories = await database.get('SELECT COUNT(*) as count FROM categories')
    const existingProducts = await database.get('SELECT COUNT(*) as count FROM products')
    const existingUsers = await database.get('SELECT COUNT(*) as count FROM users')

    if (existingCategories.count > 0 || existingProducts.count > 0 || existingUsers.count > 0) {
      console.log('⚠️  Database already contains data. Skipping seed.')
      console.log(`   Categories: ${existingCategories.count}`)
      console.log(`   Products: ${existingProducts.count}`)
      console.log(`   Users: ${existingUsers.count}`)
      return
    }

    // Insert categories
    console.log('📂 Inserting categories...')
    for (const category of CATEGORIES_DATA) {
      await database.run(
        'INSERT INTO categories (name, icon) VALUES (?, ?)',
        [category.name, category.icon]
      )
    }

    // Insert sample users
    console.log('👥 Inserting sample users...')
    for (const user of SAMPLE_USERS) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      await database.run(
        'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
        [user.name, user.email, hashedPassword]
      )
    }

    // Get category IDs for products
    const categories = await database.all('SELECT id, name FROM categories')
    const categoryMap = {}
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id
    })

    // Get a sample seller (first user)
    const sampleSeller = await database.get('SELECT id FROM users LIMIT 1')

    // Insert products
    console.log('🛍️  Inserting products...')
    for (const product of PRODUCTS_DATA) {
      const categoryId = categoryMap[product.category]
      await database.run(
        'INSERT INTO products (name, description, price, image_url, image_text, category_id, seller_id, location) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [
          product.name,
          product.description,
          product.price,
          product.image_url,
          product.image_text,
          categoryId,
          sampleSeller.id,
          product.location
        ]
      )
    }

    // Add some sample wishlist items
    console.log('❤️  Adding sample wishlist items...')
    const users = await database.all('SELECT id FROM users')
    const products = await database.all('SELECT id FROM products LIMIT 3')
    
    for (let i = 0; i < Math.min(users.length, 2); i++) {
      for (let j = 0; j < Math.min(products.length, 2); j++) {
        try {
          await database.run(
            'INSERT INTO wishlists (user_id, product_id) VALUES (?, ?)',
            [users[i].id, products[j].id]
          )
        } catch (error) {
          // Ignore duplicate key errors
          if (!error.message.includes('UNIQUE constraint failed')) {
            throw error
          }
        }
      }
    }

    console.log('✅ Database seeded successfully!')
    console.log('📊 Data inserted:')
    console.log(`   Categories: ${CATEGORIES_DATA.length}`)
    console.log(`   Products: ${PRODUCTS_DATA.length}`)
    console.log(`   Users: ${SAMPLE_USERS.length}`)
    console.log('🔐 Sample login credentials:')
    SAMPLE_USERS.forEach(user => {
      console.log(`   Email: ${user.email}, Password: ${user.password}`)
    })

  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  } finally {
    await database.close()
  }
}

seedDatabase()
