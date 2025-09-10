/* eslint-disable */
/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useCallback } from 'react'

// Type imports
import type { Page, Product, WishlistItem } from './types'

// Component imports
import { FloatingHeaderBar } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'

// Icon imports
import { X, Sun, Moon } from './components/icons'

// Constants
import { THEME } from './constants/theme'

// Mock data is now moved to individual page components

// Main App Component
const App: React.FC = () => {
  // State management
  const [page, setPage] = useState<Page>('home')
  const [isDark, setIsDark] = useState(false)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [showSearch, setShowSearch] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [animationKey, setAnimationKey] = useState(0)

  // Effects
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const savedWishlist = localStorage.getItem('wishlist')

    if (savedTheme === 'dark') setIsDark(true)
    if (savedWishlist) setWishlistItems(JSON.parse(savedWishlist))
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // Handlers
  const handleSetPage = useCallback((newPage: Page) => {
    setPage(newPage)
    setAnimationKey(prev => prev + 1)
    setShowSearch(false)
  }, [])

  const handleToggleTheme = useCallback(() => {
    setIsDark(prev => !prev)
  }, [])

  // Authentication handlers removed for simplified version

  const isInWishlist = useCallback((productId: number) => {
    return wishlistItems.some(item => item.id === productId)
  }, [wishlistItems])

  const handleToggleWishlist = useCallback((product: Product) => {
    setWishlistItems(prev => {
      const isAlreadyInWishlist = prev.some(item => item.id === product.id)
      if (isAlreadyInWishlist) {
        return prev.filter(item => item.id !== product.id)
      } else {
        return [...prev, product]
      }
    })
  }, [])

  const handleSubmitGlobalSearch = useCallback(() => {
    if (globalSearch.trim()) {
      setPage('shop')
      setShowSearch(false)
    }
  }, [globalSearch])

  // Render page content
  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            setPage={handleSetPage}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )
      case 'about':
        return <AboutPage />
      // Add other page cases as needed
      default:
        return (
          <HomePage
            setPage={handleSetPage}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )
    }
  }

  return (
    <div className={`font-sans ${THEME.gradients.background} text-slate-800 dark:text-slate-100 transition-colors duration-300`}>
      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInDown { animation: fadeInDown 0.3s ease-out forwards; }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slideInLeft { animation: slideInLeft 0.5s ease-out forwards; }
      `}</style>

      {/* Header */}
      <FloatingHeaderBar setPage={handleSetPage} activePage={page} />
      
      {/* Main Content */}
      <main key={animationKey} className="animate-fadeIn">
        {renderPage()}
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Search Bar - Simplified for now */}
      {showSearch && (
        <div className="fixed top-6 right-6 z-50 w-80">
          <div className="relative">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitGlobalSearch(); }} className="w-full">
              <input
                autoFocus
                value={globalSearch}
                onChange={(e) => setGlobalSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-12 py-3 rounded-2xl bg-emerald-100/20 dark:bg-emerald-900/30 backdrop-blur-xl border border-emerald-200/30 dark:border-emerald-700/30 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 shadow-lg"
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              >
                <X />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Controls - Simplified for now */}
      <div className={`fixed top-6 right-6 z-50 flex items-center space-x-3 transition-opacity duration-200 ${showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className={`p-3 rounded-full backdrop-blur-xl ${THEME.glassmorphism.button} shadow-lg hover:shadow-xl text-slate-800 dark:text-slate-200 transition-all duration-300`}
        >
          🔍
        </button>
        <button
          onClick={handleToggleTheme}
          className={`p-3 rounded-full backdrop-blur-xl ${THEME.glassmorphism.button} shadow-lg hover:shadow-xl text-slate-800 dark:text-slate-200 transition-all duration-300`}
        >
          {isDark ? <Sun /> : <Moon />}
        </button>
      </div>

      {/* Profile Button - TODO: Add authentication modal */}

      {/* TODO: Add modals and other components as separate files */}
    </div>
  )
}

export default App
