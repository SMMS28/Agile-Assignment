import React, { useState } from 'react'
import type { User } from '../../types'
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

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M4 21v-2a4 4 0 0 1 3-3.87"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
)

interface FloatingProfileButtonProps {
  onClick: () => void
  user: User | null
  onLogout: () => void
  onDashboard: () => void
}

export const FloatingProfileButton: React.FC<FloatingProfileButtonProps> = ({ 
  onClick, 
  user, 
  onLogout, 
  onDashboard 
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="fixed top-6 left-6 z-50">
      <FloatingIconButton 
        onClick={user ? () => setShowDropdown(!showDropdown) : onClick}
      >
        {user ? (
          <span className="font-bold">{user.name[0]}</span>
        ) : (
          <UserIcon />
        )}
      </FloatingIconButton>
      
      {user && showDropdown && (
        <div className="absolute top-12 left-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-xl shadow-lg min-w-[200px] py-2">
          <div className="px-4 py-2 border-b border-white/20 dark:border-slate-700/50">
            <p className="font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
          </div>
          <button 
            onClick={() => {
              onDashboard()
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onLogout()
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}
