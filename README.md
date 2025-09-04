# 🛍️ Marketify - E-commerce Marketplace

A modern, responsive e-commerce marketplace built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with dark/light theme support, shopping cart functionality, and AI-powered product description generation.

![Marketify Preview](https://images.unsplash.com/photo-1481437156560-3205f6a85705?q=80&w=1200&h=600&auto=format&fit=crop)

## ✨ Features

- 🏠 **Home Page** - Hero section with featured products
- 🛒 **Shopping Cart** - Add/remove items with quantity management
- 🔍 **Search Functionality** - Real-time product search
- 🌙 **Dark/Light Theme** - Toggle between themes with persistence
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Smooth Animations** - Beautiful transitions and hover effects
- 🏷️ **Category Filtering** - Browse products by category
- 🤖 **AI Integration** - AI-powered product description generation
- ⚡ **Fast Performance** - Built with Vite for optimal speed

## 🚀 Live Demo

- **Demo HTML**: Open `demo.html` in your browser for a standalone version
- **Development Server**: Run `npm run dev` and visit `http://localhost:5173`

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React (with emoji fallbacks)
- **Build Tool**: Vite
- **Package Manager**: npm
- **Linting**: ESLint, Prettier

## 📦 Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/marketify.git
   cd marketify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎯 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
```

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
├── index.css            # Global styles with Tailwind
├── lib/
│   └── api.ts           # API utilities
└── assets/              # Static assets

Configuration Files:
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Features Overview

### Shopping Experience
- Browse products with beautiful card layouts
- Filter by categories (Fashion, Electronics, Home & Garden, etc.)
- Real-time search with instant results
- Add items to cart with quantity management
- Responsive cart panel with smooth animations

### Theme System
- Light and dark mode support
- Theme persistence across sessions
- Smooth transitions between themes
- System preference detection

