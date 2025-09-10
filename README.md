# 🛍️ Marketify - E-commerce Marketplace

A modern, responsive e-commerce marketplace built with React, TypeScript, and Tailwind CSS. Features a beautiful UI with dark/light theme support, wishlist functionality, and AI-powered product description generation.

![Marketify Preview](https://images.unsplash.com/photo-1481437156560-3205f6a85705?q=80&w=1200&h=600&auto=format&fit=crop)

## ✨ Features

- 🏠 **Home Page** - Hero section with featured products
- ❤️ **Wishlist** - Save/remove items you love
 
 
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
 
- Save items to wishlist
- Slide-out wishlist panel with smooth animations

 

### Seller Features

- Become a seller page with step-by-step guide
- AI-powered product description generation
- Item listing modal with form validation
- Mock API integration for demonstration

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS for styling. Custom animations and configurations are defined in `tailwind.config.js`.

### Icons

Currently uses emoji-based icons for immediate functionality. To upgrade to Lucide React icons:

1. Install Lucide React: `npm install lucide-react`
2. Replace emoji components in `src/App.tsx` with proper imports
3. Update icon usage throughout the application

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is built with a mobile-first approach and includes:

- Responsive navigation with mobile menu
- Adaptive product grids
- Touch-friendly interactions
- Optimized layouts for all screen sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Unsplash](https://unsplash.com) for beautiful product images
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide React](https://lucide.dev) for the icon library
- [Vite](https://vitejs.dev) for the fast build tool

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Check the [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md) for detailed setup guide

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS**
