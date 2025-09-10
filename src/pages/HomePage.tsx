import React from 'react'
import type { Page, Product } from '../types'
import { ProductCard } from '../components/ui/ProductCard'
import { ChevronRight, ShieldCheck, Headset, Globe } from '../components/icons'
import { THEME } from '../constants/theme'
import { ALL_PRODUCTS } from '../data/products'

interface HomePageProps {
  setPage: (page: Page) => void
  isInWishlist: (id: number) => boolean
  onToggleWishlist: (product: Product) => void
}

export const HomePage: React.FC<HomePageProps> = ({ setPage, isInWishlist, onToggleWishlist }) => (
  <>
    {/* Hero Section */}
    <section className={`py-32 ${THEME.gradients.background} text-center`}>
      <div className="container mx-auto px-6">
        <h1 className="text-6xl font-bold text-slate-800 dark:text-slate-100 mb-6 animate-fadeInUp">
          Your Creative <span className="text-emerald-600">Marketplace</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto animate-fadeInUp" style={{ animationDelay: '200ms' }}>
          Discover everything from vintage treasures to handmade crafts. Buy, sell, and connect with
          a community of enthusiasts.
        </p>
        <button
          onClick={() => setPage('shop')}
          className={`${THEME.gradients.button} text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp`}
          style={{ animationDelay: '400ms' }}
        >
          Explore The Shop <ChevronRight />
        </button>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ALL_PRODUCTS.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWished={isInWishlist(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <section className={`py-20 ${THEME.gradients.section}`}>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Why Choose Marketify?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
          We're more than just a marketplace. We're a community of creators, collectors, and
          entrepreneurs.
        </p>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Your payments and personal information are protected with bank-level security.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <Headset />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Our dedicated support team is always here to help you with any questions or issues.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <Globe />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Connect with buyers and sellers from around the world and expand your market.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Call to Action */}
    <section className={`py-20 ${THEME.gradients.sectionAlt}`}>
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              Ready to Start Selling?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
              Join thousands of entrepreneurs who have turned their passion into profit on Marketify.
            </p>
            <button
              onClick={() => setPage('sell')}
              className={`${THEME.gradients.button} text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              Start Selling Today
            </button>
          </div>
          <div className="relative">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  $
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 dark:text-slate-100">Seller Dashboard</h4>
                  <p className="text-sm text-slate-500">Manage your listings</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Active Listings</span>
                  <span className="text-sm font-semibold text-emerald-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Sales</span>
                  <span className="text-sm font-semibold text-emerald-600">2,450 kr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">This Month</span>
                  <span className="text-sm font-semibold text-emerald-600">+18%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
)
