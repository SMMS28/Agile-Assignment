import React, { useState } from 'react'
import type { User } from '../types'
import { THEME } from '../constants/theme'

interface SettingsPageProps {
  user: User | null
  isDark: boolean
  onToggleTheme: () => void
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ user, isDark, onToggleTheme }) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    marketing: false
  })

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Please log in to access settings
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You need to be logged in to access your settings.
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
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your account preferences and privacy settings
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Appearance
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">
                    Dark Mode
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Switch between light and dark themes
                  </p>
                </div>
                <button
                  onClick={onToggleTheme}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isDark ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isDark ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.email ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.email ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive browser notifications
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, push: !prev.push }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.push ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.push ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-800 dark:text-slate-100">
                    Marketing Emails
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Receive promotional content and updates
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, marketing: !prev.marketing }))}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications.marketing ? 'bg-emerald-500' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications.marketing ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Privacy Settings */}
          <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Privacy & Security
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Profile Visibility
                </h3>
                <select className="w-full md:w-64 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <option value="public">Public</option>
                  <option value="friends">Friends Only</option>
                  <option value="private">Private</option>
                </select>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-800 dark:text-slate-100 mb-2">
                  Data Sharing
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Control how your data is used for analytics and improvements
                </p>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="data-sharing" value="allow" className="mr-2" defaultChecked />
                    <span className="text-slate-800 dark:text-slate-100">Allow</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="data-sharing" value="limit" className="mr-2" />
                    <span className="text-slate-800 dark:text-slate-100">Limited</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="data-sharing" value="deny" className="mr-2" />
                    <span className="text-slate-800 dark:text-slate-100">Deny</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className={`${THEME.glassmorphism.card} p-6 rounded-lg`}>
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-4">
              Account Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Change Password
              </button>
              <button className="w-full md:w-auto bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold py-3 px-6 rounded-lg transition-colors ml-0 md:ml-3">
                Export Data
              </button>
              <button className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors ml-0 md:ml-3">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
