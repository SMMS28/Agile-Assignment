// ================================
// TYPE DEFINITIONS
// ================================

export interface User {
  id: number
  name: string
  email: string
  phone?: string
  location?: string
  joinedAt?: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  imageText: string
  category: string
  categoryId?: number
  seller?: string
  location?: string
  isWishlisted?: boolean
  createdAt?: string
  isActive?: boolean
}

export interface Category {
  id: number
  name: string
  description?: string
  icon?: React.ReactNode
}

export type Page = 'home' | 'shop' | 'about' | 'sell' | 'map' | 'profile' | 'settings'
export type SidebarTab = 'dashboard' | 'listings' | 'history' | 'profile'
export type WishlistItem = Product
