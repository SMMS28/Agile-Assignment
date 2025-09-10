import React from 'react'
import type { Page } from '../../types'
import { Store } from '../icons'
import { THEME } from '../../constants/theme'

interface FloatingHeaderBarProps {
  setPage: (p: Page) => void
  activePage: Page
}

export const FloatingHeaderBar: React.FC<FloatingHeaderBarProps> = ({ setPage, activePage }) => {
  const getNavButtonClass = (page: Page) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      activePage === page
        ? 'bg-emerald-500 text-white shadow'
        : 'text-slate-800 dark:text-slate-200 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/40'
    }`

  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 px-6 py-2 rounded-full ${THEME.glassmorphism.header} shadow-lg`}>
      <button
        onClick={() => setPage('home')}
        className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 select-none focus:outline-none hover:text-amber-500 transition-colors"
      >
        <Store /> Marketify
      </button>
      <nav className="flex items-center space-x-2">
        <button onClick={() => setPage('home')} className={getNavButtonClass('home')}>
          Home
        </button>
        <button onClick={() => setPage('shop')} className={getNavButtonClass('shop')}>
          Shop
        </button>
        <button onClick={() => setPage('about')} className={getNavButtonClass('about')}>
          About
        </button>
        <button onClick={() => setPage('sell')} className={getNavButtonClass('sell')}>
          Sell
        </button>
        <button onClick={() => setPage('map')} className={getNavButtonClass('map')}>
          Map
        </button>
      </nav>
    </div>
  )
}
