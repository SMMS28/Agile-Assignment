import React from 'react'
import { Store } from '../icons'
import { THEME } from '../../constants/theme'

export const Footer: React.FC = () => (
  <footer className={`${THEME.gradients.footer} text-white dark:text-slate-200`}>
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Store /> Marketify
          </h3>
          <p className="text-slate-300">
            Your trusted marketplace for unique finds and creative treasures.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Browse Products</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Start Selling</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">How It Works</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Success Stories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Safety Guidelines</a></li>
            <li><a href="#" className="text-slate-300 hover:text-white transition-colors">Community Rules</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-4">Stay Updated</h4>
          <p className="text-slate-300 mb-4">Get the latest deals and updates delivered to your inbox.</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-l-lg text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none"
            />
            <button className="bg-emerald-500 text-white px-4 rounded-r-lg hover:bg-emerald-600 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-600 mt-8 pt-8 text-center text-slate-300">
        <p>&copy; 2024 Marketify. All rights reserved. Made with ❤️ for creative entrepreneurs.</p>
      </div>
    </div>
  </footer>
)
