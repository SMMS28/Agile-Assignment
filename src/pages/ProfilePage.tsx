import React from 'react'
import type { User } from '../types'
import { THEME } from '../constants/theme'

interface ProfilePageProps {
  user: User | null
  onLogout: () => void
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ user, onLogout }) => {
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Please log in to view your profile
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You need to be logged in to access your profile page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            My Profile
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="md:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Basic Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    readOnly
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                  />
                </div>
                {user.phone && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={user.phone}
                      readOnly
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                )}
                {user.location && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={user.location}
                      readOnly
                      className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Account Stats */}
            <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Account Statistics
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Reviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-600">0</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Followers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Avatar */}
            <div className={`${THEME.glassmorphism.card} p-6 rounded-lg text-center`}>
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                {user.name[0]}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {user.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {user.email}
              </p>
              {user.joinedAt && (
                <p className="text-slate-500 dark:text-slate-500 text-xs mt-2">
                  Member since {new Date(user.joinedAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Quick Actions */}
            <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
              <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
                Quick Actions
              </h4>
              <div className="space-y-3">
                <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors">
                  Edit Profile
                </button>
                <button className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold py-3 px-4 rounded-lg transition-colors">
                  Change Password
                </button>
                <button 
                  onClick={onLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
