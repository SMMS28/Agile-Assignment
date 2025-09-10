import React, { useState, useEffect, useMemo } from 'react'
import type { Product } from '../types'
import { ProductCard } from '../components/ui/ProductCard'
import { ALL_PRODUCTS } from '../data/products'

interface ShopPageProps {
  onToggleWishlist: (product: Product) => void
  isInWishlist: (id: number) => boolean
  initialQuery?: string
}

export const ShopPage: React.FC<ShopPageProps> = ({ 
  onToggleWishlist, 
  isInWishlist, 
  initialQuery = '' 
}) => {
  const [filter, setFilter] = useState('All')
  const [searchQuery] = useState(initialQuery)
  const [locationFilter, setLocationFilter] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        // Try to fetch from API first, fallback to static data
        const response = await fetch('/api/products')
        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        } else {
          setProducts(ALL_PRODUCTS) // Fallback to static data
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts(ALL_PRODUCTS) // Fallback to static data
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const filteredProducts = useMemo(() => {
    if (products.length === 0) {
      // Fallback filtering for static data
      const term = searchQuery.trim().toLowerCase()
      const byCategory =
        filter === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === filter)
      const bySearch = term
        ? byCategory.filter(
            (p) =>
              p.name.toLowerCase().includes(term) ||
              p.description.toLowerCase().includes(term) ||
              p.category.toLowerCase().includes(term)
          )
        : byCategory
      const byLocation = locationFilter
        ? bySearch.filter((p) => p.location?.toLowerCase().includes(locationFilter.toLowerCase()))
        : bySearch
      return byLocation
    }

    // Use API data if available
    const term = searchQuery.trim().toLowerCase()
    const byCategory =
      filter === 'All' ? products : products.filter((p) => p.category === filter)
    const bySearch = term
      ? byCategory.filter(
          (p) =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term)
        )
      : byCategory
    const byLocation = locationFilter
      ? bySearch.filter((p) => p.location?.toLowerCase().includes(locationFilter.toLowerCase()))
      : bySearch
    return byLocation
  }, [products, filter, searchQuery, locationFilter])

  const categories = ['All', 'Fashion', 'Electronics', 'Home & Garden', 'Jewelry', 'Crafts', 'Collectibles']

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Shop All Products
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Discover unique items from talented sellers around the world
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Category
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Filter by location..."
              className="w-full md:w-64 px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Search Query Display */}
          {searchQuery && (
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Showing results for: <span className="font-semibold">"{searchQuery}"</span>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            {loading ? 'Loading...' : `${filteredProducts.length} products found`}
          </p>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWished={isInWishlist(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              No products found
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Try adjusting your filters or search terms
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
