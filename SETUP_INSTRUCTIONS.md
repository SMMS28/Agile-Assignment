# Marketify - E-commerce Marketplace Setup Instructions

## Overview
This is a modern React-based e-commerce marketplace application called "Marketify" with the following features:
- Beautiful, responsive UI with dark/light theme support
- Product browsing and filtering by category
- Shopping cart functionality
- Search functionality
- Seller onboarding with AI-powered product description generation
- Smooth animations and transitions

## Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies
Run the following command in your project directory to install all required dependencies:

```bash
npm install
```

This will install:
- **Tailwind CSS** - For styling and responsive design
- **Lucide React** - For beautiful icons
- **React** - The main framework
- **TypeScript** - For type safety
- **Vite** - For fast development and building

### 2. Icon Setup
The application currently uses temporary emoji icons that work without any dependencies. Once you install `lucide-react`, you can replace the temporary icon components in `src/App.tsx` with the proper Lucide React imports:

```typescript
// Replace this temporary setup:
const Store = () => <span className="text-2xl">🏪</span>;

// With this proper import:
import { Store, Search, ShoppingCart, ... } from 'lucide-react';
```

### 3. Start Development Server
Once dependencies are installed, start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### 4. Build for Production
To create a production build:

```bash
npm run build
```

### 5. Preview Production Build
To preview the production build locally:

```bash
npm run preview
```

## Features

### 🏠 Home Page
- Hero section with call-to-action
- Featured products showcase
- Community-driven marketplace information

### 🛍️ Shop Page
- Product grid with filtering by category
- Categories: Fashion, Electronics, Home & Garden, Jewelry, Crafts, Collectibles
- Responsive product cards with hover effects

### 🛒 Shopping Cart
- Add/remove items
- Quantity adjustment
- Real-time total calculation
- Slide-out cart panel

### 🔍 Search Functionality
- Real-time product search
- Trending items display when search is empty
- Search results with product cards

### 🌙 Theme Support
- Light and dark mode toggle
- Persistent theme preference
- Smooth theme transitions

### 👤 Seller Features
- Become a seller page
- AI-powered product description generation
- Item listing modal with form validation

### 📱 Responsive Design
- Mobile-first approach
- Responsive navigation
- Optimized for all screen sizes

## Project Structure

```
src/
├── App.tsx              # Main application component
├── index.css            # Global styles with Tailwind
├── main.tsx             # Application entry point
└── lib/
    └── api.ts           # API utilities (existing)

Configuration Files:
├── tailwind.config.js   # Tailwind CSS configuration
├── postcss.config.js    # PostCSS configuration
├── package.json         # Dependencies and scripts
└── vite.config.ts       # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage

## Technologies Used

- **React 19** - Latest React with hooks
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server
- **ESLint & Prettier** - Code quality and formatting

## Browser Support

The application supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### Common Issues

1. **Node.js not found**: Make sure Node.js is installed and in your PATH
2. **Dependencies not installing**: Try clearing npm cache with `npm cache clean --force`
3. **Build errors**: Ensure all dependencies are properly installed with `npm install`

### Getting Help

If you encounter any issues:
1. Check that all dependencies are installed correctly
2. Ensure you're using Node.js version 16 or higher
3. Try deleting `node_modules` and `package-lock.json`, then run `npm install` again

## Next Steps

After successful installation, you can:
1. Customize the product data in `ALL_PRODUCTS` array
2. Add more categories in the `CATEGORIES` array
3. Integrate with a real backend API
4. Add user authentication
5. Implement payment processing
6. Add more seller features

Enjoy building with Marketify! 🚀
