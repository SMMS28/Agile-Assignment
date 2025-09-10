import React from 'react'
import type { Product } from '../../types'

interface DemoMapProps {
  products: Product[]
  onProductSelect?: (product: Product) => void
}

export const DemoMap: React.FC<DemoMapProps> = ({ products, onProductSelect }) => {
  // Bay Area locations with approximate coordinates for demo
  const locationCoords: { [key: string]: { lat: number, lng: number } } = {
    'San Francisco, CA': { lat: 37.7749, lng: -122.4194 },
    'Oakland, CA': { lat: 37.8044, lng: -122.2712 },
    'Berkeley, CA': { lat: 37.8715, lng: -122.2730 },
    'Palo Alto, CA': { lat: 37.4419, lng: -122.1430 },
    'San Jose, CA': { lat: 37.3382, lng: -121.8863 },
    'Mountain View, CA': { lat: 37.3861, lng: -122.0839 },
    'Fremont, CA': { lat: 37.5485, lng: -121.9886 },
    'Sunnyvale, CA': { lat: 37.3688, lng: -122.0363 }
  }

  const productsWithCoords = products.filter(p => p.location && locationCoords[p.location])

  const handleProductClick = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product)
    }
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-800 rounded-lg shadow-lg relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-700 dark:to-slate-600">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Bay Area Outline (simplified) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          <path 
            d="M 50 100 Q 80 80 120 90 Q 160 85 200 95 Q 240 100 280 110 Q 320 120 350 140 L 350 200 Q 320 220 280 210 Q 240 200 200 195 Q 160 190 120 200 Q 80 210 50 190 Z"
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
          />
        </svg>
      </div>
          
      {/* Product Markers */}
      <div className="absolute inset-0">
        {productsWithCoords.map((product) => {
          const coords = locationCoords[product.location!]
          // Convert lat/lng to pixel positions (simplified)
          const x = ((coords.lng + 122.5) / 1.0) * 100
          const y = ((38.0 - coords.lat) / 0.5) * 100
          
          return (
            <div
              key={product.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ 
                left: `${Math.max(5, Math.min(95, x))}%`, 
                top: `${Math.max(5, Math.min(95, y))}%` 
              }}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-emerald-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs">🏪</span>
                </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap z-10 opacity-0 hover:opacity-100 transition-opacity">
                  {product.name}
                </div>
              </div>
            </div>
          )
        })}
      </div>
        
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-sm mb-2">Bay Area Products</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">{productsWithCoords.length} items near you</p>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-4 h-4 bg-emerald-500 rounded-full border border-white"></div>
          <span>Product Location</span>
        </div>
      </div>

      {/* No Google Maps API Notice */}
      <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 max-w-xs">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          📍 Demo Map - Add Google Maps API key for full functionality
        </p>
      </div>
    </div>
  )
}
