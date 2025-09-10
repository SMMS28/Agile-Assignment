import React, { useState, useEffect } from 'react'
import type { Product, User } from '../types'
import { GoogleMap } from '../components/map/GoogleMap'
import { ALL_PRODUCTS } from '../data/products'

interface MapPageProps {
  user: User | null
  onLogout: () => void
}

export const MapPage: React.FC<MapPageProps> = ({ user }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Fetch products for map markers
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Try to fetch from API first, fallback to static data
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        } else {
          setProducts(ALL_PRODUCTS) // Fallback to static data
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts(ALL_PRODUCTS) // Fallback to static data
      }
    }

    fetchProducts()
  }, [])

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Please log in to access the map
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You need to be logged in to view the interactive map and discover products near you.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-emerald-100/40 dark:bg-emerald-900/20 backdrop-blur-xl border-b border-emerald-200/30 dark:border-emerald-700/30 p-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Marketplace Map
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover products near you
        </p>
      </div>

      {/* Map Container */}
      <div className="flex-1 p-4">
        <GoogleMap 
          products={products}
          onProductSelect={setSelectedProduct}
        />
      </div>

      {/* Selected Product Info */}
      {selectedProduct && (
        <div className="bg-emerald-100/40 dark:bg-emerald-900/20 backdrop-blur-xl border-t border-emerald-200/30 dark:border-emerald-700/30 p-4">
          <div className="flex items-center space-x-4">
            <img
              src={selectedProduct.imageUrl || '/api/placeholder/100/100'}
              alt={selectedProduct.name}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                {selectedProduct.name}
              </h3>
              <p className="text-emerald-600 font-semibold">{selectedProduct.price} kr</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {selectedProduct.location && `📍 ${selectedProduct.location}`}
              </p>
            </div>
            <button
              onClick={() => setSelectedProduct(null)}
              className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
