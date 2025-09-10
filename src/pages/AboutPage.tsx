import React from 'react'
import { ShieldCheck, Headset, Globe } from '../components/icons'
import { THEME } from '../constants/theme'

export const AboutPage: React.FC = () => (
  <div className={`${THEME.gradients.section}`}>
    <div className="container mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-6">
          About Marketify
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 mb-12">
          We're building the world's most trusted marketplace for unique, handcrafted, and vintage
          items. Our mission is to empower creators and connect them with people who appreciate
          authentic, quality products.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-6">
            Our Story
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-4">
            Founded in 2024, Marketify started as a simple idea: what if there was a place where
            creators could showcase their work and connect directly with people who truly value
            craftsmanship and creativity?
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Today, we're proud to be home to thousands of sellers and millions of unique products,
            from handmade jewelry to vintage collectibles, all backed by our commitment to
            authenticity and quality.
          </p>
        </div>
        <div className="relative">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6">
              By the Numbers
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Active Sellers</span>
                <span className="text-2xl font-bold text-emerald-600">50,000+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Products Listed</span>
                <span className="text-2xl font-bold text-emerald-600">2M+</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Happy Customers</span>
                <span className="text-2xl font-bold text-emerald-600">1M+</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          What Makes Us Different
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Every seller is verified and every product is backed by our quality guarantee.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <Headset />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personal Touch</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Connect directly with creators and learn the story behind each unique piece.
            </p>
          </div>
          <div className="bg-emerald-50/50 dark:bg-emerald-800/30 backdrop-blur-sm p-8 rounded-lg border border-emerald-200/30 dark:border-emerald-700/30">
            <div className="mx-auto text-emerald-500 mb-4">
              <Globe />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Join a worldwide community of creators, collectors, and conscious consumers.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)
