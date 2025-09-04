import React, { useState, useEffect, useMemo, useRef } from 'react'
import type { FormEvent, ReactNode } from 'react'

// Temporary icon components until lucide-react is installed
const Store = () => <span className="text-2xl">🏪</span>
const Search = () => <span className="text-xl">🔍</span>
const ShoppingCart = () => <span className="text-xl">🛒</span>
const Menu = () => <span className="text-xl">☰</span>
const ShieldCheck = () => <span className="text-2xl">🛡️</span>
const Headset = () => <span className="text-2xl">🎧</span>
const Globe = () => <span className="text-2xl">🌍</span>
const X = () => <span className="text-xl">✕</span>
const Sparkles = () => <span className="text-lg">✨</span>
const ChevronRight = () => <span className="text-lg">→</span>
const Sun = () => <span className="text-xl">☀️</span>
const Moon = () => <span className="text-xl">🌙</span>
const Plus = () => <span className="text-sm">+</span>
const Minus = () => <span className="text-sm">−</span>
const Trash2 = () => <span className="text-lg">🗑️</span>

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'shop' | 'about' | 'sell'
type Theme = 'light' | 'dark'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  imageText: string
  category: string
}

interface CartItem extends Product {
  quantity: number
}

interface Category {
  id: number
  name: string
  icon: ReactNode
}

// --- MOCK DATA ---
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Handmade Ceramic Vase',
    description: 'A beautiful, one-of-a-kind vase for your home decor.',
    price: 45.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#D2B48C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#BC9A6A;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="surface" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2C2C2C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg)"/>
            <rect x="0" y="350" width="600" height="50" fill="url(#surface)"/>
            
            <!-- Vase 1 - Deep Plum -->
            <ellipse cx="180" cy="320" rx="25" ry="8" fill="#2C2C2C"/>
            <path d="M155 320 Q155 280 165 250 Q175 220 185 200 Q195 180 200 160 Q205 140 210 120 Q215 100 220 80 Q225 60 230 40 Q235 20 240 0" 
                  fill="#6B4C93" stroke="#5A3F7A" stroke-width="2"/>
            <path d="M240 0 Q245 20 250 40 Q255 60 260 80 Q265 100 270 120 Q275 140 280 160 Q285 180 290 200 Q295 220 305 250 Q315 280 315 320" 
                  fill="#6B4C93" stroke="#5A3F7A" stroke-width="2"/>
            <path d="M230 0 Q235 15 240 30 Q245 45 250 60 Q255 75 260 90 Q265 105 270 120 Q275 135 280 150 Q285 165 290 180 Q295 195 300 210 Q305 225 310 240 Q315 255 315 280" 
                  fill="#8B5FBF" opacity="0.3"/>
            
            <!-- Vase 2 - Earthy Brown -->
            <ellipse cx="280" cy="320" rx="20" ry="6" fill="#2C2C2C"/>
            <path d="M260 320 Q260 280 270 240 Q280 200 290 160 Q300 120 310 80 Q320 40 330 0" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <path d="M330 0 Q340 40 350 80 Q360 120 370 160 Q380 200 390 240 Q400 280 400 320" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <path d="M320 0 Q325 20 330 40 Q335 60 340 80 Q345 100 350 120 Q355 140 360 160 Q365 180 370 200 Q375 220 380 240 Q385 260 390 280 Q395 300 400 320" 
                  fill="#A0522D" opacity="0.3"/>
            
            <!-- Vase 3 - Dusty Blue -->
            <ellipse cx="380" cy="320" rx="22" ry="7" fill="#2C2C2C"/>
            <path d="M358 320 Q358 280 368 240 Q378 200 388 160 Q398 120 408 80 Q418 40 428 0" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            <path d="M428 0 Q438 40 448 80 Q458 120 468 160 Q478 200 488 240 Q498 280 498 320" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            <path d="M418 0 Q423 20 428 40 Q433 60 438 80 Q443 100 448 120 Q453 140 458 160 Q463 180 468 200 Q473 220 478 240 Q483 260 488 280 Q493 300 498 320" 
                  fill="#87CEEB" opacity="0.3"/>
            
            <!-- Vase 4 - Off-White -->
            <ellipse cx="480" cy="320" rx="18" ry="6" fill="#2C2C2C"/>
            <path d="M462 320 Q462 280 472 240 Q482 200 492 160 Q502 120 512 80 Q522 40 532 0" 
                  fill="#F5F5DC" stroke="#E6E6FA" stroke-width="2"/>
            <path d="M532 0 Q542 40 552 80 Q562 120 572 160 Q582 200 592 240 Q602 280 602 320" 
                  fill="#F5F5DC" stroke="#E6E6FA" stroke-width="2"/>
            <path d="M522 0 Q527 20 532 40 Q537 60 542 80 Q547 100 552 120 Q557 140 562 160 Q567 180 572 200 Q577 220 582 240 Q587 260 592 280 Q597 300 602 320" 
                  fill="#FFFFFF" opacity="0.3"/>
            
            <!-- Vase 5 - Golden Yellow -->
            <ellipse cx="520" cy="320" rx="20" ry="7" fill="#2C2C2C"/>
            <path d="M500 320 Q500 280 510 240 Q520 200 530 160 Q540 120 550 80 Q560 40 570 0" 
                  fill="#DAA520" stroke="#B8860B" stroke-width="2"/>
            <path d="M570 0 Q580 40 590 80 Q600 120 610 160 Q620 200 630 240 Q640 280 640 320" 
                  fill="#DAA520" stroke="#B8860B" stroke-width="2"/>
            <path d="M560 0 Q565 20 570 40 Q575 60 580 80 Q585 100 590 120 Q595 140 600 160 Q605 180 610 200 Q615 220 620 240 Q625 260 630 280 Q635 300 640 320" 
                  fill="#FFD700" opacity="0.3"/>
            
            <!-- Subtle shadows -->
            <ellipse cx="180" cy="325" rx="25" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="280" cy="325" rx="20" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="380" cy="325" rx="22" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="480" cy="325" rx="18" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="520" cy="325" rx="20" ry="3" fill="#000000" opacity="0.2"/>
        </svg>
    `),
    imageText: 'Handmade Ceramic Vase',
    category: 'Home & Garden',
  },
  {
    id: 2,
    name: 'Vintage Film Camera',
    description: 'Capture memories the old-fashioned way. In working condition.',
    price: 120.0,
    imageUrl: 'https://picsum.photos/600/400?random=2',
    imageText: 'Vintage Film Camera',
    category: 'Collectibles',
  },
  {
    id: 3,
    name: 'Artisan Leather Wallet',
    description: 'Hand-stitched wallet made from genuine full-grain leather.',
    price: 75.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="woodBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#654321;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="leather" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#D2B48C;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#CD853F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#A0522D;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="leatherShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#654321;stop-opacity:0.6" />
                </linearGradient>
                <pattern id="woodGrain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="url(#woodBg)"/>
                    <path d="M0,10 Q10,5 20,10 Q10,15 0,10" stroke="#5D4037" stroke-width="0.5" fill="none" opacity="0.3"/>
                    <path d="M0,5 Q10,0 20,5 Q10,10 0,5" stroke="#4E342E" stroke-width="0.3" fill="none" opacity="0.2"/>
                </pattern>
            </defs>
            
            <!-- Wooden background -->
            <rect width="600" height="400" fill="url(#woodGrain)"/>
            
            <!-- Wood planks and seams -->
            <line x1="0" y1="0" x2="600" y2="0" stroke="#2E1B14" stroke-width="2"/>
            <line x1="0" y1="100" x2="600" y2="100" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="200" x2="600" y2="200" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="300" x2="600" y2="300" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="400" x2="600" y2="400" stroke="#2E1B14" stroke-width="2"/>
            
            <!-- Diagonal seam -->
            <line x1="400" y1="0" x2="500" y2="400" stroke="#1A0E0A" stroke-width="3"/>
            
            <!-- Metal bolt -->
            <circle cx="520" cy="50" r="8" fill="#2C2C2C"/>
            <circle cx="520" cy="50" r="5" fill="#404040"/>
            <circle cx="520" cy="50" r="2" fill="#606060"/>
            
            <!-- Wallet shadow -->
            <ellipse cx="300" cy="280" rx="80" ry="15" fill="#000000" opacity="0.3"/>
            
            <!-- Main wallet body -->
            <rect x="220" y="200" width="160" height="100" rx="8" fill="url(#leather)"/>
            
            <!-- Wallet front pocket (overlapping) -->
            <rect x="240" y="180" width="120" height="80" rx="6" fill="url(#leatherShadow)"/>
            
            <!-- Wallet back pocket -->
            <rect x="260" y="160" width="100" height="60" rx="5" fill="url(#leather)"/>
            
            <!-- Stitching details -->
            <line x1="350" y1="200" x2="350" y2="300" stroke="#654321" stroke-width="1.5"/>
            <line x1="220" y1="280" x2="380" y2="280" stroke="#654321" stroke-width="1.5"/>
            
            <!-- Axe logo -->
            <g transform="translate(300, 220)">
                <!-- Axe blade -->
                <ellipse cx="-15" cy="0" rx="8" ry="12" fill="#8B4513" transform="rotate(-30)"/>
                <!-- Axe handle -->
                <rect x="-25" y="-2" width="20" height="4" rx="2" fill="#8B4513"/>
                <!-- Axe head detail -->
                <ellipse cx="-15" cy="0" rx="5" ry="8" fill="#654321" transform="rotate(-30)"/>
            </g>
            
            <!-- Leather texture lines -->
            <path d="M230 210 Q250 205 270 210 Q290 215 310 210 Q330 205 350 210 Q370 215 390 210" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            <path d="M230 230 Q250 225 270 230 Q290 235 310 230 Q330 225 350 230 Q370 235 390 230" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            <path d="M230 250 Q250 245 270 250 Q290 255 310 250 Q330 245 350 250 Q370 255 390 250" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            
            <!-- Burnished edges -->
            <rect x="220" y="200" width="160" height="100" rx="8" fill="none" stroke="#8B4513" stroke-width="2" opacity="0.6"/>
            <rect x="240" y="180" width="120" height="80" rx="6" fill="none" stroke="#8B4513" stroke-width="1.5" opacity="0.5"/>
            <rect x="260" y="160" width="100" height="60" rx="5" fill="none" stroke="#8B4513" stroke-width="1.5" opacity="0.5"/>
            
            <!-- Wood grain details -->
            <path d="M50 50 Q100 45 150 50 Q200 55 250 50 Q300 45 350 50 Q400 55 450 50 Q500 45 550 50" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 150 Q100 145 150 150 Q200 155 250 150 Q300 145 350 150 Q400 155 450 150 Q500 145 550 150" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 250 Q100 245 150 250 Q200 255 250 250 Q300 245 350 250 Q400 255 450 250 Q500 245 550 250" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 350 Q100 345 150 350 Q200 355 250 350 Q300 345 350 350 Q400 355 450 350 Q500 345 550 350" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
        </svg>
    `),
    imageText: 'Artisan Leather Wallet',
    category: 'Fashion',
  },
  {
    id: 4,
    name: 'Abstract Canvas Art',
    description: 'A unique piece of abstract art to brighten up any room.',
    price: 250.0,
    imageUrl: 'https://picsum.photos/600/400?random=4',
    imageText: 'Abstract Canvas Art',
    category: 'Crafts',
  },
  {
    id: 5,
    name: 'Wireless Smart Headphones',
    description: 'High-fidelity audio with noise-cancellation.',
    price: 199.0,
    imageUrl: 'https://picsum.photos/600/400?random=5',
    imageText: 'Wireless Smart Headphones',
    category: 'Electronics',
  },
  {
    id: 6,
    name: 'Minimalist Gold Necklace',
    description: 'An elegant and subtle piece for everyday wear.',
    price: 150.0,
    imageUrl: 'https://picsum.photos/600/400?random=6',
    imageText: 'Minimalist Gold Necklace',
    category: 'Jewelry',
  },
  {
    id: 7,
    name: 'Organic Cotton Throw Pillow',
    description: 'Soft, comfortable, and sustainably made.',
    price: 40.0,
    imageUrl: 'https://picsum.photos/600/400?random=7',
    imageText: 'Organic Cotton Throw Pillow',
    category: 'Home & Garden',
  },
  {
    id: 8,
    name: 'Hand-poured Soy Candle',
    description: 'Scented with essential oils for a relaxing ambiance.',
    price: 25.0,
    imageUrl: 'https://picsum.photos/600/400?random=8',
    imageText: 'Hand-poured Soy Candle',
    category: 'Crafts',
  },
]

const CATEGORIES: Category[] = [
  { id: 1, name: 'Fashion', icon: <i className="fas fa-tshirt"></i> },
  { id: 2, name: 'Electronics', icon: <i className="fas fa-plug"></i> },
  { id: 3, name: 'Home & Garden', icon: <i className="fas fa-couch"></i> },
  { id: 4, name: 'Jewelry', icon: <i className="fas fa-gem"></i> },
  { id: 5, name: 'Crafts', icon: <i className="fas fa-paint-brush"></i> },
  { id: 6, name: 'Collectibles', icon: <i className="fas fa-book-open"></i> },
]

// --- API SERVICE ---
// const GeminiAPIService = {
//     // ... (unchanged)
// };

// --- LAYOUT COMPONENTS ---
const Header: React.FC<{
  setPage: (page: Page) => void
  activePage: Page
  theme: Theme
  setTheme: (theme: Theme) => void
  onCartClick: () => void
  cartItemCount: number
  onAddToCart: (product: Product) => void
  isScrolled: boolean
}> = ({
  setPage,
  activePage,
  theme,
  setTheme,
  onCartClick,
  cartItemCount,
  onAddToCart,
  isScrolled,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const headerRef = useRef<HTMLElement>(null)

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm])

  const navLinkClasses = (page: Page) =>
    `pb-1 border-b-2 transition-all duration-300 ${activePage === page ? 'text-amber-500 border-amber-500' : 'text-slate-600 border-transparent hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400'}`

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false)
        setSearchTerm('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen)
    if (isSearchOpen) {
      setSearchTerm('')
    }
  }

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md dark:bg-slate-900/80 dark:border-b dark:border-slate-800' : 'bg-white/50 dark:bg-slate-900/50'}`}
    >
      <nav
        className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}
      >
        <a
          href="#"
          onClick={() => setPage('home')}
          className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 animate-slideInLeft"
        >
          <span className="text-amber-500">
            <Store />
          </span>{' '}
          Marketify
        </a>
        <div
          className={`hidden md:flex items-center space-x-8 font-medium transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 invisible w-0' : 'opacity-100 visible w-auto'}`}
        >
          <a
            href="#"
            onClick={() => setPage('home')}
            className={`${navLinkClasses('home')} animate-fadeInUp`}
            style={{ animationDelay: '100ms' }}
          >
            Home
          </a>
          <a
            href="#"
            onClick={() => setPage('shop')}
            className={`${navLinkClasses('shop')} animate-fadeInUp`}
            style={{ animationDelay: '200ms' }}
          >
            Shop
          </a>
          <a
            href="#"
            onClick={() => setPage('about')}
            className={`${navLinkClasses('about')} animate-fadeInUp`}
            style={{ animationDelay: '300ms' }}
          >
            About Us
          </a>
          <a
            href="#"
            onClick={() => setPage('sell')}
            className={`${navLinkClasses('sell')} animate-fadeInUp`}
            style={{ animationDelay: '400ms' }}
          >
            Become a Seller
          </a>
        </div>
        <div
          className={`hidden md:flex items-center w-full max-w-sm transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'}`}
        >
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12"
          >
            {theme === 'light' ? <Moon /> : <Sun />}
          </button>
          <button
            onClick={handleSearchToggle}
            className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110"
          >
            {isSearchOpen ? <X /> : <Search />}
          </button>
          <button
            onClick={onCartClick}
            className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110 relative"
          >
            <ShoppingCart />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-fadeIn">
                {cartItemCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-slate-600 dark:text-slate-300">
            <Menu />
          </button>
        </div>
      </nav>
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 z-30 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-lg animate-fadeInDown">
          <div className="container mx-auto px-6 py-6">
            {searchTerm.trim() === '' ? (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
                  Trending Items
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALL_PRODUCTS.slice(0, 4).map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
                  ))}
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <p className="text-center text-slate-500 py-8">
                No products found for "{searchTerm}"
              </p>
            ) : (
              <div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">
                  Search Results
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {searchResults.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-white">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Store /> Marketify
          </h3>
          <p className="text-slate-400">The best place to discover, buy, and sell unique items.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                Featured
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white">
                Seller Handbook
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-slate-400 mb-4">Get the latest updates and deals.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-l-lg text-slate-800 focus:outline-none"
            />
            <button className="bg-amber-500 text-white px-4 rounded-r-lg hover:bg-amber-600 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500">
        &copy; {new Date().getFullYear()} Marketify. All Rights Reserved.
      </div>
    </div>
  </footer>
)

// --- UI COMPONENTS ---
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void }> = ({
  product,
  onAddToCart,
}) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const fallbackImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" fill="#f3f4f6"/>
            <rect x="200" y="150" width="200" height="100" rx="10" fill="#e5e7eb"/>
            <circle cx="250" cy="180" r="15" fill="#9ca3af"/>
            <rect x="280" y="170" width="80" height="20" rx="5" fill="#9ca3af"/>
            <text x="300" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">${product.name}</text>
        </svg>
    `)}`

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group dark:bg-slate-800 dark:border dark:border-slate-700">
      <div className="overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.imageUrl}
          alt={product.imageText}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          onError={handleImageError}
        />
      </div>
      <div className="p-6">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{product.category}</p>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4 h-12 overflow-hidden">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-amber-50 text-amber-600 font-semibold py-2 px-4 rounded-lg hover:bg-amber-100 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-900"
          >
            <ShoppingCart /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

// --- PAGES ---
const HomePage: React.FC<{
  setPage: (page: Page) => void
  onAddToCart: (product: Product) => void
}> = ({ setPage, onAddToCart }) => (
  <>
    <section
      className="relative bg-cover bg-center text-white min-h-screen"
      style={{
        backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)),
                url('data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="household-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                                <rect width="200" height="200" fill="#F5F5DC"/>
                                <!-- Sofa -->
                                <rect x="20" y="120" width="60" height="40" rx="5" fill="#4A90E2"/>
                                <rect x="25" y="125" width="50" height="30" rx="3" fill="#357ABD"/>
                                <!-- Armchair -->
                                <rect x="100" y="100" width="35" height="50" rx="8" fill="#4A90E2"/>
                                <rect x="105" y="105" width="25" height="40" rx="5" fill="#357ABD"/>
                                <!-- Jeans -->
                                <rect x="150" y="80" width="25" height="60" rx="3" fill="#2C3E50"/>
                                <rect x="155" y="85" width="15" height="50" rx="2" fill="#1A252F"/>
                                <!-- Dress -->
                                <rect x="20" y="40" width="20" height="50" rx="2" fill="#E74C3C"/>
                                <rect x="25" y="45" width="10" height="40" rx="1" fill="#C0392B"/>
                                <!-- T-shirt -->
                                <rect x="50" y="30" width="25" height="30" rx="3" fill="#1ABC9C"/>
                                <rect x="55" y="35" width="15" height="20" rx="2" fill="#16A085"/>
                                <!-- Laptop -->
                                <rect x="120" y="20" width="40" height="25" rx="2" fill="#95A5A6"/>
                                <rect x="125" y="25" width="30" height="15" rx="1" fill="#2C3E50"/>
                                <!-- Headphones -->
                                <rect x="180" y="30" width="15" height="20" rx="8" fill="#1ABC9C"/>
                                <rect x="185" y="35" width="5" height="10" rx="2" fill="#16A085"/>
                                <!-- Plant -->
                                <circle cx="30" cy="180" r="15" fill="#27AE60"/>
                                <rect x="25" y="195" width="10" height="10" rx="2" fill="#E74C3C"/>
                                <!-- Pillow -->
                                <rect x="80" y="180" width="20" height="20" rx="3" fill="#E74C3C"/>
                                <circle cx="90" cy="190" r="3" fill="#FFFFFF"/>
                                <!-- Vase -->
                                <rect x="130" y="160" width="15" height="25" rx="3" fill="#1ABC9C"/>
                                <rect x="135" y="165" width="5" height="15" rx="1" fill="#16A085"/>
                                <!-- Mug -->
                                <rect x="170" y="180" width="12" height="15" rx="2" fill="#1ABC9C"/>
                                <rect x="175" y="185" width="2" height="5" rx="1" fill="#16A085"/>
                                <!-- Books -->
                                <rect x="20" y="200" width="8" height="12" fill="#3498DB"/>
                                <rect x="30" y="200" width="8" height="12" fill="#F39C12"/>
                                <rect x="40" y="200" width="8" height="12" fill="#E74C3C"/>
                            </pattern>
                        </defs>
                        <rect width="400" height="400" fill="url(#household-pattern)"/>
                    </svg>
                `)}')
            `,
      }}
    >
      <div className="container mx-auto px-6 py-40 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fadeInUp">
          Unique Finds, Directly From The Creator
        </h1>
        <p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: '200ms' }}
        >
          Discover everything from vintage treasures to handmade crafts. Buy, sell, and connect with
          a community of enthusiasts.
        </p>
        <button
          onClick={() => setPage('shop')}
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp"
          style={{ animationDelay: '400ms' }}
        >
          Explore The Shop <ChevronRight />
        </button>
      </div>
    </section>

    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Featured This Week
        </h2>
        <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">
          A curated selection of our favorite items from talented sellers around the globe.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALL_PRODUCTS.slice(0, 4).map((p, i) => (
            <div key={p.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <ProductCard product={p} onAddToCart={onAddToCart} />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&h=600&auto=format&fit=crop"
            alt="Community"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              A Community-Driven Marketplace
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Marketify is more than just a platform to buy and sell. We're a community of creators,
              collectors, and curators passionate about unique and quality goods. We empower sellers
              and delight buyers.
            </p>
            <button
              onClick={() => setPage('about')}
              className="text-amber-500 font-semibold hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors"
            >
              Learn More About Us <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
)

const ShopPage: React.FC<{ onAddToCart: (product: Product) => void }> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState('All')
  const filteredProducts =
    filter === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === filter)

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
        Shop Our Collection
      </h1>
      <p className="text-slate-500 dark:text-slate-400 mb-8">
        Find your next favorite item from thousands of unique listings.
      </p>

      <div className="flex space-x-2 mb-10 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === 'All' ? 'text-amber-600 border-b-2 border-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.name)}
            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === c.name ? 'text-amber-600 border-b-2 border-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  )
}

const AboutPage: React.FC = () => (
  <div className="bg-white dark:bg-slate-900">
    <div className="container mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">Our Mission</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          To empower small creators and connect people with unique, high-quality goods in a
          community-focused online marketplace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center my-20">
        <img
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&h=600&auto=format&fit=crop"
          alt="Creators working in a studio"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            For the Love of Craft
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Marketify was founded on a simple idea: that the best products are made with passion. We
            wanted to create a space where artisans, collectors, and curators could share their
            creations with the world, and where shoppers could find items that tell a story.
          </p>
        </div>
      </div>

      <div className="text-center my-20">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
          Why Shop With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">Secure Transactions</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Shop with confidence with our buyer and seller protection.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <Headset />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">24/7 Support</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Our dedicated team is here to help you around the clock.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <Globe />
            </div>
            <h3 className="text-xl font-semibold dark:text-white mb-2">Global Community</h3>
            <p className="text-slate-500 dark:text-slate-400">
              Connect with buyers and sellers from all over the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BecomeSellerPage: React.FC<{ onStartSellingClick: () => void }> = ({
  onStartSellingClick,
}) => {
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Turn Your Passion Into Profit
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Join our community of creative entrepreneurs and start selling your unique products to a
            global audience.
          </p>
          <button
            onClick={onStartSellingClick}
            className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Selling Today
          </button>
        </div>

        <div className="py-20 bg-white dark:bg-slate-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">
                  1
                </div>
                <h3 className="text-xl font-semibold dark:text-white mb-2">List Your Item</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Create your listing in minutes. Use our AI tools to write a great description.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">
                  2
                </div>
                <h3 className="text-xl font-semibold dark:text-white mb-2">Ship Your Order</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Once your item sells, pack it up and ship it to its new home.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">
                  3
                </div>
                <h3 className="text-xl font-semibold dark:text-white mb-2">Get Paid</h3>
                <p className="text-slate-500 dark:text-slate-400">
                  Securely receive your earnings with our fast and reliable payment system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// --- MODAL & WIDGET COMPONENTS ---
const SellItemModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [itemName, setItemName] = useState('')
  const [itemKeywords, setItemKeywords] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock API call
  const handleGenerateDescription = async () => {
    if (!itemName || !itemKeywords) {
      alert('Please enter an item name and some keywords first.')
      return
    }
    setIsGenerating(true)
    setItemDescription('AI is thinking...')

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const description = `Introducing the stunning ${itemName}! This piece is defined by its ${itemKeywords}, making it a must-have for any collection. Crafted with care and designed to impress, it's the perfect blend of style and quality. Don't miss out on this unique find!`
    setItemDescription(description)
    setIsGenerating(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    alert('Item listed for sale! (This is a demo)')
    setItemName('')
    setItemKeywords('')
    setItemDescription('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-xl m-4 sm:max-w-xl sm:w-full z-10 p-8 transform transition-all duration-300 ease-in-out dark:bg-slate-800 animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">List Your Item</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="item-name"
              className="block text-slate-700 font-medium mb-2 dark:text-slate-300"
            >
              Item Name
            </label>
            <input
              type="text"
              id="item-name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              placeholder="e.g., Vintage Leather Jacket"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="item-keywords"
              className="block text-slate-700 font-medium mb-2 dark:text-slate-300"
            >
              Keywords for AI
            </label>
            <input
              type="text"
              id="item-keywords"
              value={itemKeywords}
              onChange={(e) => setItemKeywords(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              placeholder="e.g., 1980s, brown, size medium, bomber style"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="item-description"
              className="block text-slate-700 font-medium mb-2 dark:text-slate-300"
            >
              Description
            </label>
            <textarea
              id="item-description"
              rows={5}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
              placeholder="Your detailed product description..."
            ></textarea>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="mt-2 flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-sky-600 hover:to-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles /> {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-600 transition duration-300"
            >
              List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const CartPanel: React.FC<{
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: number, newQuantity: number) => void
  onRemoveItem: (productId: number) => void
}> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems]
  )

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}
      >
        <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
          <h2 className="text-2xl font-bold dark:text-white">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
          >
            <X />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <div className="text-slate-300 dark:text-slate-600 mb-4 text-6xl">
              <ShoppingCart />
            </div>
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">
              Your cart is empty
            </h3>
            <p className="text-slate-500 mt-2">Looks like you haven't added anything yet.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 animate-fadeIn">
                <img
                  src={item.imageUrl}
                  alt={item.imageText}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold dark:text-white">{item.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ${item.price.toFixed(2)}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border rounded-md dark:border-slate-600"
                    >
                      <Minus />
                    </button>
                    <span className="px-3 font-semibold dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border rounded-md dark:border-slate-600"
                    >
                      <Plus />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-slate-400 hover:text-red-500"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="p-6 border-t dark:border-slate-700">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-slate-600 dark:text-slate-300">
                Subtotal
              </span>
              <span className="text-2xl font-bold dark:text-white">${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home')
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem('theme') as Theme) || 'light'
  )
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove(theme === 'light' ? 'dark' : 'light')
    root.classList.add(theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Trigger page transition animation
  const handleSetPage = (newPage: Page) => {
    if (page !== newPage) {
      setPage(newPage)
      setAnimationKey((prev) => prev + 1)
    }
  }

  const handleAddToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId)
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
      )
    }
  }

  const handleRemoveItem = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  )

  const renderPage = () => {
    switch (page) {
      case 'home':
        return <HomePage setPage={handleSetPage} onAddToCart={handleAddToCart} />
      case 'shop':
        return <ShopPage onAddToCart={handleAddToCart} />
      case 'about':
        return <AboutPage />
      case 'sell':
        return <BecomeSellerPage onStartSellingClick={() => setIsSellModalOpen(true)} />
      default:
        return <HomePage setPage={handleSetPage} onAddToCart={handleAddToCart} />
    }
  }

  return (
    <div className="font-sans bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
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

      <Header
        setPage={handleSetPage}
        activePage={page}
        theme={theme}
        setTheme={setTheme}
        onCartClick={() => setIsCartOpen(true)}
        cartItemCount={cartItemCount}
        onAddToCart={handleAddToCart}
        isScrolled={isScrolled}
      />
      <main key={animationKey} className="animate-fadeIn">
        {renderPage()}
      </main>
      <Footer />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      <SellItemModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />
    </div>
  )
}

export default App
