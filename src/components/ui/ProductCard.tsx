import React, { useState } from 'react'
import type { Product } from '../../types'
import { Heart } from '../icons'
import { THEME } from '../../constants/theme'

interface ProductCardProps {
  product: Product
  isWished: boolean
  onToggleWishlist: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isWished, onToggleWishlist }) => {
  const [imageError, setImageError] = useState(false)

  // Generate fallback SVG image
  const fallbackImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" fill="#f1f5f9"/>
            <rect x="50" y="50" width="500" height="300" fill="#e2e8f0" rx="8"/>
            <circle cx="200" cy="150" r="30" fill="#cbd5e1"/>
            <rect x="50" y="280" width="500" height="70" fill="#cbd5e1" rx="4"/>
            <text x="300" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#64748b">Image Preview</text>
            <text x="300" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">${product.name}</text>
        </svg>
    `)}`

  return (
    <div className={`${THEME.glassmorphism.card} rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative`}>
      <div className="overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.imageUrl}
          alt={product.imageText}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          onError={() => setImageError(true)}
        />
      </div>
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-3 right-3 bg-emerald-100/70 dark:bg-emerald-900/50 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
        aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart filled={isWished} />
      </button>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 group-hover:text-emerald-600 transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
            {product.price.toFixed(2)} kr
          </span>
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-xs px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.location && (
            <span className="text-xs text-slate-500 dark:text-slate-400">
              📍 {product.location}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
