import React from 'react'
import type { User } from '../../types'
import { Sun, Moon, Heart } from '../icons'
import { THEME } from '../../constants/theme'

interface FloatingIconButtonProps {
  onClick: () => void
  children: React.ReactNode
}

const FloatingIconButton: React.FC<FloatingIconButtonProps> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className={`p-3 rounded-full backdrop-blur-xl ${THEME.glassmorphism.button} shadow-lg hover:shadow-xl text-slate-800 dark:text-slate-200 transition-all duration-300`}
  >
    {children}
  </button>
)

interface FloatingSideControlsProps {
  isDark: boolean
  onToggleTheme: () => void
  wishlistCount: number
  onWishlistClick: () => void
  showSearch: boolean
  onToggleSearch: () => void
  user: User | null
  onDashboardClick: () => void
}

export const FloatingSideControls: React.FC<FloatingSideControlsProps> = ({ 
  isDark, 
  onToggleTheme, 
  wishlistCount, 
  onWishlistClick, 
  showSearch, 
  onToggleSearch, 
  user, 
  onDashboardClick 
}) => (
  <div className={`fixed top-6 right-6 z-50 flex items-center space-x-3 transition-opacity duration-200 ${showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <FloatingIconButton onClick={onToggleSearch}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    </FloatingIconButton>
    
    <FloatingIconButton onClick={onToggleTheme}>
      {isDark ? <Sun /> : <Moon />}
    </FloatingIconButton>
    
    {user && (
      <FloatingIconButton onClick={onDashboardClick}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </FloatingIconButton>
    )}
    
    <FloatingIconButton onClick={onWishlistClick}>
      <div className="relative">
        <Heart filled={wishlistCount > 0} size={24} />
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full font-bold">
            {wishlistCount}
          </span>
        )}
      </div>
    </FloatingIconButton>
  </div>
)
