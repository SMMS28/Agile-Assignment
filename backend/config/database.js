import sqlite3 from 'sqlite3'
import { promisify } from 'util'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Enable verbose mode for debugging
const sqlite = sqlite3.verbose()

class Database {
  constructor() {
    this.db = null
  }

  async connect() {
    const dbPath = path.join(__dirname, '..', 'database', 'marketify.db')
    
    return new Promise((resolve, reject) => {
      this.db = new sqlite.Database(dbPath, (err) => {
        if (err) {
          console.error('Error opening database:', err.message)
          reject(err)
        } else {
          console.log('Connected to SQLite database')
          // Enable foreign keys
          this.db.run('PRAGMA foreign_keys = ON')
          resolve()
        }
      })
    })
  }

  async close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) {
            reject(err)
          } else {
            console.log('Database connection closed')
            resolve()
          }
        })
      } else {
        resolve()
      }
    })
  }

  // Promisify common database methods
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function(err) {
        if (err) {
          reject(err)
        } else {
          resolve({ id: this.lastID, changes: this.changes })
        }
      })
    })
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) {
          reject(err)
        } else {
          resolve(row)
        }
      })
    })
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }
}

// Create a singleton instance
const database = new Database()

export default database
