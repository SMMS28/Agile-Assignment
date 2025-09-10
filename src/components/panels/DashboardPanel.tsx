import React from 'react'
import type { User } from '../../types'
import { X } from '../icons'
import { THEME } from '../../constants/theme'

interface DashboardPanelProps {
  isOpen: boolean
  onClose: () => void
  user: User | null
  onNavigateToProfile: () => void
  onNavigateToSettings: () => void
  onStartSelling: () => void
}

export const DashboardPanel: React.FC<DashboardPanelProps> = ({
  isOpen,
  onClose,
  user,
  onNavigateToProfile,
  onNavigateToSettings,
  onStartSelling
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-start">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className={`relative w-full max-w-md h-full min-h-screen ${THEME.glassmorphism.panel} transform translate-x-0 transition-transform duration-300 ease-out animate-slideInLeft`}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-200/30 dark:border-emerald-700/30">
          <h2 className={`text-xl font-bold ${THEME.text.primary}`}>
            Dashboard
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
          {user ? (
            <div className="space-y-6">
              {/* User Info */}
              <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user.name[0]}
                  </div>
                  <div>
                    <h3 className={`text-lg font-semibold ${THEME.text.primary}`}>
                      {user.name}
                    </h3>
                    <p className={THEME.text.muted}>
                      {user.email}
                    </p>
                  </div>
                </div>
                {user.joinedAt && (
                  <p className={`text-sm ${THEME.text.muted}`}>
                    Member since {new Date(user.joinedAt).toLocaleDateString()}
                  </p>
                )}
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className={`${THEME.glassmorphism.card} p-4 rounded-lg text-center`}>
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className={`text-sm ${THEME.text.muted}`}>Listings</div>
                </div>
                <div className={`${THEME.glassmorphism.card} p-4 rounded-lg text-center`}>
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className={`text-sm ${THEME.text.muted}`}>Sales</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
                <h4 className={`font-semibold ${THEME.text.primary} mb-4`}>
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      onStartSelling()
                      onClose()
                    }}
                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                  >
                    Start Selling
                  </button>
                  <button 
                    onClick={() => {
                      onNavigateToProfile()
                      onClose()
                    }}
                    className={`w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 ${THEME.text.primary} font-semibold py-3 px-4 rounded-lg transition-colors`}
                  >
                    View Profile
                  </button>
                  <button 
                    onClick={() => {
                      onNavigateToSettings()
                      onClose()
                    }}
                    className={`w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 ${THEME.text.primary} font-semibold py-3 px-4 rounded-lg transition-colors`}
                  >
                    Settings
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
                <h4 className={`font-semibold ${THEME.text.primary} mb-4`}>
                  Recent Activity
                </h4>
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📊</div>
                  <p className={THEME.text.muted}>
                    No recent activity
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👤</div>
              <h3 className={`text-lg font-semibold ${THEME.text.primary} mb-2`}>
                Please log in
              </h3>
              <p className={THEME.text.muted}>
                You need to be logged in to access your dashboard
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
