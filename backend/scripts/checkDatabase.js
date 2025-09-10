import database from '../config/database.js'

async function checkDatabase() {
  try {
    await database.connect()
    
    console.log('🔍 Database Contents:')
    console.log('===================')
    
    // Check users
    const users = await database.all('SELECT id, name, email, created_at FROM users ORDER BY created_at DESC')
    console.log(`\n👥 Users (${users.length}):`)
    users.forEach(user => {
      console.log(`   ID: ${user.id}, Name: ${user.name}, Email: ${user.email}, Created: ${user.created_at}`)
    })
    
    // Check categories
    const categories = await database.all('SELECT id, name, icon FROM categories ORDER BY name')
    console.log(`\n📂 Categories (${categories.length}):`)
    categories.forEach(cat => {
      console.log(`   ID: ${cat.id}, Name: ${cat.name}, Icon: ${cat.icon}`)
    })
    
    // Check products
    const products = await database.all('SELECT id, name, price, category_id, seller_id, location FROM products ORDER BY created_at DESC')
    console.log(`\n🛍️  Products (${products.length}):`)
    products.forEach(product => {
      console.log(`   ID: ${product.id}, Name: ${product.name}, Price: ${product.price} kr, Category: ${product.category_id}, Seller: ${product.seller_id}, Location: ${product.location}`)
    })
    
    // Check wishlists
    const wishlists = await database.all('SELECT user_id, product_id, created_at FROM wishlists ORDER BY created_at DESC')
    console.log(`\n❤️  Wishlist Items (${wishlists.length}):`)
    wishlists.forEach(item => {
      console.log(`   User: ${item.user_id}, Product: ${item.product_id}, Added: ${item.created_at}`)
    })
    
  } catch (error) {
    console.error('❌ Error checking database:', error)
  } finally {
    await database.close()
  }
}

checkDatabase()
