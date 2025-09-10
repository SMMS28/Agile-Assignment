import React from 'react'
import type { WishlistItem } from '../../types'
import { X, Heart } from '../icons'
import { THEME } from '../../constants/theme'

interface WishlistPanelProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: WishlistItem[]
  onRemoveItem: (productId: number) => void
}

export const WishlistPanel: React.FC<WishlistPanelProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveItem
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`relative w-full max-w-md h-full min-h-screen ${THEME.glassmorphism.panelRight} transform translate-x-0 transition-transform duration-300 ease-out animate-slideInRight`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-200/30 dark:border-emerald-700/30">
          <h2 className={`text-xl font-bold ${THEME.text.primary}`}>
            Wishlist ({wishlistItems.length})
          </h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${THEME.glassmorphism.button} hover:bg-emerald-100/60 dark:hover:bg-emerald-800/50 transition-colors`}
          >
            <X />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💝</div>
              <h3 className={`text-lg font-semibold ${THEME.text.primary} mb-2`}>
                Your wishlist is empty
              </h3>
              <p className={THEME.text.muted}>
                Start adding items you love to your wishlist
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className={`${THEME.glassmorphism.card} p-4 rounded-lg`}
                >
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.imageUrl || '/api/placeholder/80/80'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold ${THEME.text.primary} truncate`}>
                        {item.name}
                      </h4>
                      <p className="text-emerald-600 font-semibold text-sm">
                        {item.price} kr
                      </p>
                      <p className={`${THEME.text.muted} text-sm truncate`}>
                        {item.description}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className={`p-2 rounded-full ${THEME.glassmorphism.button} hover:bg-red-100/60 dark:hover:bg-red-800/50 transition-colors`}
                      title="Remove from wishlist"
                    >
                      <Heart filled={false} size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {wishlistItems.length > 0 && (
          <div className="p-6 border-t border-emerald-200/30 dark:border-emerald-700/30">
            <button
              onClick={onClose}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
