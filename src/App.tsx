import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { FormEvent, ReactNode } from 'react';

// Temporary icon components until lucide-react is installed
const Store = () => <span className="text-2xl">🏪</span>;
const Search = () => <span className="text-xl">🔍</span>;
const ShoppingCart = () => <span className="text-xl">🛒</span>;
const Menu = () => <span className="text-xl">☰</span>;
const ShieldCheck = () => <span className="text-2xl">🛡️</span>;
const Headset = () => <span className="text-2xl">🎧</span>;
const Globe = () => <span className="text-2xl">🌍</span>;
const X = () => <span className="text-xl">✕</span>;
const Sparkles = () => <span className="text-lg">✨</span>;
const ChevronRight = () => <span className="text-lg">→</span>;
const Sun = () => <span className="text-xl">☀️</span>;
const Moon = () => <span className="text-xl">🌙</span>;
const Plus = () => <span className="text-sm">+</span>;
const Minus = () => <span className="text-sm">−</span>;
const Trash2 = () => <span className="text-lg">🗑️</span>;

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'shop' | 'about' | 'sell';
type Theme = 'light' | 'dark';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  imageText: string;
  category: string;
}

interface CartItem extends Product {
    quantity: number;
}

interface Category {
  id: number;
  name: string;
  icon: ReactNode;
}

// --- MOCK DATA ---
const ALL_PRODUCTS: Product[] = [
    { id: 1, name: "Handmade Ceramic Vase", description: "A beautiful, one-of-a-kind vase for your home decor.", price: 45.00, imageUrl: "https://images.unsplash.com/photo-1578500529168-161d71e2275b?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Handmade Ceramic Vase" , category: "Home & Garden" },
    { id: 2, name: "Vintage Film Camera", description: "Capture memories the old-fashioned way. In working condition.", price: 120.00, imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Vintage Film Camera", category: "Collectibles" },
    { id: 3, name: "Artisan Leather Wallet", description: "Hand-stitched wallet made from genuine full-grain leather.", price: 75.00, imageUrl: "https://images.unsplash.com/photo-1614031688524-783b52ca365a?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Artisan Leather Wallet", category: "Fashion" },
    { id: 4, name: "Abstract Canvas Art", description: "A unique piece of abstract art to brighten up any room.", price: 250.00, imageUrl: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Abstract Canvas Art", category: "Crafts" },
    { id: 5, name: "Wireless Smart Headphones", description: "High-fidelity audio with noise-cancellation.", price: 199.00, imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf4022?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Wireless Smart Headphones", category: "Electronics" },
    { id: 6, name: "Minimalist Gold Necklace", description: "An elegant and subtle piece for everyday wear.", price: 150.00, imageUrl: "https://images.unsplash.com/photo-1611652022417-a5511f4a9b9a?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Minimalist Gold Necklace", category: "Jewelry" },
    { id: 7, name: "Organic Cotton Throw Pillow", description: "Soft, comfortable, and sustainably made.", price: 40.00, imageUrl: "https://images.unsplash.com/photo-1617343121703-e18e847c0f1a?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Organic Cotton Throw Pillow", category: "Home & Garden" },
    { id: 8, name: "Hand-poured Soy Candle", description: "Scented with essential oils for a relaxing ambiance.", price: 25.00, imageUrl: "https://images.unsplash.com/photo-1614032115322-a63351980838?q=80&w=600&h=400&auto=format&fit=crop", imageText: "Hand-poured Soy Candle", category: "Crafts" },
];

const CATEGORIES: Category[] = [
    { id: 1, name: "Fashion", icon: <i className="fas fa-tshirt"></i> },
    { id: 2, name: "Electronics", icon: <i className="fas fa-plug"></i> },
    { id: 3, name: "Home & Garden", icon: <i className="fas fa-couch"></i> },
    { id: 4, name: "Jewelry", icon: <i className="fas fa-gem"></i> },
    { id: 5, name: "Crafts", icon: <i className="fas fa-paint-brush"></i> },
    { id: 6, name: "Collectibles", icon: <i className="fas fa-book-open"></i> },
];

// --- API SERVICE ---
// const GeminiAPIService = {
//     // ... (unchanged)
// };


// --- LAYOUT COMPONENTS ---
const Header: React.FC<{
    setPage: (page: Page) => void;
    activePage: Page;
    theme: Theme;
    setTheme: (theme: Theme) => void;
    onCartClick: () => void;
    cartItemCount: number;
    onAddToCart: (product: Product) => void;
    isScrolled: boolean;
}> = ({ setPage, activePage, theme, setTheme, onCartClick, cartItemCount, onAddToCart, isScrolled }) => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const headerRef = useRef<HTMLElement>(null);

    const searchResults = useMemo(() => {
        if (!searchTerm.trim()) return [];
        return ALL_PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);
    
    const navLinkClasses = (page: Page) => 
        `pb-1 border-b-2 transition-all duration-300 ${activePage === page ? 'text-amber-500 border-amber-500' : 'text-slate-600 border-transparent hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400'}`;

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

  useEffect(() => {

    
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setIsSearchOpen(false);
                setSearchTerm('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchTerm('');
        }
    }
    
    return (
        <header 
            ref={headerRef} 
            className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-md dark:bg-slate-900/80 dark:border-b dark:border-slate-800' : 'bg-white/50 dark:bg-slate-900/50'}`}
        >
            <nav className={`container mx-auto px-6 flex justify-between items-center transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
                <a href="#" onClick={() => setPage('home')} className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2 animate-slideInLeft">
                    <span className="text-amber-500"><Store /></span> Marketify
                </a>
                <div className={`hidden md:flex items-center space-x-8 font-medium transition-opacity duration-300 ${isSearchOpen ? 'opacity-0 invisible w-0' : 'opacity-100 visible w-auto'}`}>
                    <a href="#" onClick={() => setPage('home')} className={`${navLinkClasses('home')} animate-fadeInUp`} style={{animationDelay: '100ms'}}>Home</a>
                    <a href="#" onClick={() => setPage('shop')} className={`${navLinkClasses('shop')} animate-fadeInUp`} style={{animationDelay: '200ms'}}>Shop</a>
                    <a href="#" onClick={() => setPage('about')} className={`${navLinkClasses('about')} animate-fadeInUp`} style={{animationDelay: '300ms'}}>About Us</a>
                    <a href="#" onClick={() => setPage('sell')} className={`${navLinkClasses('sell')} animate-fadeInUp`} style={{animationDelay: '400ms'}}>Become a Seller</a>
                </div>
                 <div className={`hidden md:flex items-center w-full max-w-sm transition-all duration-300 ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible w-0'}`}>
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110 hover:rotate-12">
                        {theme === 'light' ? <Moon /> : <Sun />}
                    </button>
                    <button onClick={handleSearchToggle} className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110">
                        {isSearchOpen ? <X /> : <Search />}
                    </button>
                    <button onClick={onCartClick} className="p-2 rounded-full text-slate-600 hover:text-amber-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-amber-400 dark:hover:bg-slate-800 transition-all duration-300 transform hover:scale-110 relative">
                        <ShoppingCart />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-sky-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold animate-fadeIn">{cartItemCount}</span>
                        )}
                    </button>
                    <button className="md:hidden text-slate-600 dark:text-slate-300"><Menu /></button>
                </div>
            </nav>
            {isSearchOpen && (
                 <div className="absolute top-full left-0 right-0 z-30 bg-white/95 dark:bg-slate-800/95 backdrop-blur-md shadow-lg animate-fadeInDown">
                    <div className="container mx-auto px-6 py-6">
                         {searchTerm.trim() === '' ? (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Trending Items</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {ALL_PRODUCTS.slice(0, 4).map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
                                </div>
                            </div>
                        ) : searchResults.length === 0 ? (
                            <p className="text-center text-slate-500 py-8">No products found for "{searchTerm}"</p>
                        ) : (
                            <div>
                                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-4">Search Results</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {searchResults.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

const Footer: React.FC = () => (
    <footer className="bg-slate-800 text-white">
        <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                 <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><Store /> Marketify</h3>
                    <p className="text-slate-400">The best place to discover, buy, and sell unique items.</p>
                 </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Shop</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-slate-400 hover:text-white">Featured</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white">New Arrivals</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Support</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-slate-400 hover:text-white">Help Center</a></li>
                        <li><a href="#" className="text-slate-400 hover:text-white">Seller Handbook</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                    <p className="text-slate-400 mb-4">Get the latest updates and deals.</p>
                    <div className="flex">
                        <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-l-lg text-slate-800 focus:outline-none" />
                        <button className="bg-amber-500 text-white px-4 rounded-r-lg hover:bg-amber-600 font-semibold">Subscribe</button>
                    </div>
                </div>
            </div>
            <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500">&copy; {new Date().getFullYear()} Marketify. All Rights Reserved.</div>
        </div>
    </footer>
);

// --- UI COMPONENTS ---
const ProductCard: React.FC<{ product: Product; onAddToCart: (product: Product) => void; }> = ({ product, onAddToCart }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group dark:bg-slate-800 dark:border dark:border-slate-700">
        <div className="overflow-hidden">
            <img src={product.imageUrl} alt={product.imageText} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" />
        </div>
        <div className="p-6">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{product.category}</p>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2 truncate">{product.name}</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4 h-12 overflow-hidden">{product.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">${product.price.toFixed(2)}</span>
                <button onClick={() => onAddToCart(product)} className="bg-amber-50 text-amber-600 font-semibold py-2 px-4 rounded-lg hover:bg-amber-100 transition-all duration-300 flex items-center gap-2 transform hover:scale-105 dark:bg-amber-900/50 dark:text-amber-300 dark:hover:bg-amber-900">
                    <ShoppingCart /> Add to Cart
                </button>
            </div>
        </div>
    </div>
);

// --- PAGES ---
const HomePage: React.FC<{ setPage: (page: Page) => void; onAddToCart: (product: Product) => void; }> = ({ setPage, onAddToCart }) => (
     <>
        <section className="bg-cover bg-center text-white" style={{backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url('https://images.unsplash.com/photo-1481437156560-3205f6a85705?q=80&w=1920&h=1080&auto=format&fit=crop')"}}>
             <div className="container mx-auto px-6 py-40 text-center">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fadeInUp">Unique Finds, Directly From The Creator</h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeInUp" style={{animationDelay: '200ms'}}>Discover everything from vintage treasures to handmade crafts. Buy, sell, and connect with a community of enthusiasts.</p>
                <button onClick={() => setPage('shop')} className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp" style={{animationDelay: '400ms'}}>
                    Explore The Shop <ChevronRight />
                </button>
            </div>
        </section>
        
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Featured This Week</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-12 max-w-2xl mx-auto">A curated selection of our favorite items from talented sellers around the globe.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ALL_PRODUCTS.slice(0, 4).map((p, i) => 
                        <div key={p.id} className="animate-fadeInUp" style={{animationDelay: `${i * 100}ms`}}>
                            <ProductCard product={p} onAddToCart={onAddToCart} />
                        </div>
                    )}
                </div>
            </div>
        </section>

         <section className="py-20 bg-slate-50 dark:bg-slate-800">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&h=600&auto=format&fit=crop" alt="Community" className="rounded-lg shadow-lg" />
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">A Community-Driven Marketplace</h2>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">Marketify is more than just a platform to buy and sell. We're a community of creators, collectors, and curators passionate about unique and quality goods. We empower sellers and delight buyers.</p>
                        <button onClick={() => setPage('about')} className="text-amber-500 font-semibold hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 transition-colors">
                            Learn More About Us <ChevronRight />
                        </button>
                    </div>
                </div>
            </div>
         </section>
    </>
);

const ShopPage: React.FC<{ onAddToCart: (product: Product) => void; }> = ({ onAddToCart }) => {
    const [filter, setFilter] = useState('All');
    const filteredProducts = filter === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === filter);

    return (
        <div className="container mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">Shop Our Collection</h1>
            <p className="text-slate-500 dark:text-slate-400 mb-8">Find your next favorite item from thousands of unique listings.</p>

            <div className="flex space-x-2 mb-10 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-2">
                <button onClick={() => setFilter('All')} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === 'All' ? 'text-amber-600 border-b-2 border-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>All</button>
                {CATEGORIES.map(c => (
                    <button key={c.id} onClick={() => setFilter(c.name)} className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === c.name ? 'text-amber-600 border-b-2 border-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'}`}>{c.name}</button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
            </div>
        </div>
    );
};

const AboutPage: React.FC = () => (
    <div className="bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6 py-20">
            <div className="text-center max-w-3xl mx-auto">
                 <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">Our Mission</h1>
                 <p className="text-xl text-slate-600 dark:text-slate-300">To empower small creators and connect people with unique, high-quality goods in a community-focused online marketplace.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center my-20">
                <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=800&h=600&auto=format&fit=crop" alt="Creators working in a studio" className="rounded-lg shadow-lg" />
                <div>
                    <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">For the Love of Craft</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">Marketify was founded on a simple idea: that the best products are made with passion. We wanted to create a space where artisans, collectors, and curators could share their creations with the world, and where shoppers could find items that tell a story.</p>
                </div>
            </div>

            <div className="text-center my-20">
                 <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Why Shop With Us?</h2>
                 <div className="grid md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
                        <div className="mx-auto text-amber-500 mb-4"><ShieldCheck /></div>
                        <h3 className="text-xl font-semibold dark:text-white mb-2">Secure Transactions</h3>
                        <p className="text-slate-500 dark:text-slate-400">Shop with confidence with our buyer and seller protection.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
                        <div className="mx-auto text-amber-500 mb-4"><Headset /></div>
                        <h3 className="text-xl font-semibold dark:text-white mb-2">24/7 Support</h3>
                        <p className="text-slate-500 dark:text-slate-400">Our dedicated team is here to help you around the clock.</p>
                    </div>
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
                        <div className="mx-auto text-amber-500 mb-4"><Globe /></div>
                        <h3 className="text-xl font-semibold dark:text-white mb-2">Global Community</h3>
                        <p className="text-slate-500 dark:text-slate-400">Connect with buyers and sellers from all over the world.</p>
                    </div>
                 </div>
            </div>
        </div>
    </div>
);

const BecomeSellerPage: React.FC<{ onStartSellingClick: () => void; }> = ({ onStartSellingClick }) => {
  return (
    <>
        <div className="bg-slate-50 dark:bg-slate-800">
            <div className="container mx-auto px-6 py-20 text-center">
                <h1 className="text-5xl font-bold text-slate-800 dark:text-white mb-4">Turn Your Passion Into Profit</h1>
                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">Join our community of creative entrepreneurs and start selling your unique products to a global audience.</p>
                <button onClick={onStartSellingClick} className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Start Selling Today
                </button>
            </div>
            
            <div className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-white mb-12">How It Works</h2>
                    <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        <div className="text-center">
                           <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">1</div>
                           <h3 className="text-xl font-semibold dark:text-white mb-2">List Your Item</h3>
                           <p className="text-slate-500 dark:text-slate-400">Create your listing in minutes. Use our AI tools to write a great description.</p>
                        </div>
                        <div className="text-center">
                           <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">2</div>
                           <h3 className="text-xl font-semibold dark:text-white mb-2">Ship Your Order</h3>
                           <p className="text-slate-500 dark:text-slate-400">Once your item sells, pack it up and ship it to its new home.</p>
                        </div>
                        <div className="text-center">
                           <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold dark:bg-amber-900/50 dark:text-amber-300">3</div>
                           <h3 className="text-xl font-semibold dark:text-white mb-2">Get Paid</h3>
                           <p className="text-slate-500 dark:text-slate-400">Securely receive your earnings with our fast and reliable payment system.</p>
                        </div>
                    </div>
                </div>
      </div>
      </div>
    </>
    )
};

// --- MODAL & WIDGET COMPONENTS ---
const SellItemModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [itemName, setItemName] = useState('');
    const [itemKeywords, setItemKeywords] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Mock API call
    const handleGenerateDescription = async () => {
        if (!itemName || !itemKeywords) {
            alert('Please enter an item name and some keywords first.');
            return;
        }
        setIsGenerating(true);
        setItemDescription("AI is thinking...");
        
        await new Promise(resolve => setTimeout(resolve, 1500));

        const description = `Introducing the stunning ${itemName}! This piece is defined by its ${itemKeywords}, making it a must-have for any collection. Crafted with care and designed to impress, it's the perfect blend of style and quality. Don't miss out on this unique find!`;
        setItemDescription(description);
        setIsGenerating(false);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        alert('Item listed for sale! (This is a demo)');
        setItemName('');
        setItemKeywords('');
        setItemDescription('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl m-4 sm:max-w-xl sm:w-full z-10 p-8 transform transition-all duration-300 ease-in-out dark:bg-slate-800 animate-fadeInUp" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">List Your Item</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"><X /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="item-name" className="block text-slate-700 font-medium mb-2 dark:text-slate-300">Item Name</label>
                        <input type="text" id="item-name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="e.g., Vintage Leather Jacket" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="item-keywords" className="block text-slate-700 font-medium mb-2 dark:text-slate-300">Keywords for AI</label>
                        <input type="text" id="item-keywords" value={itemKeywords} onChange={(e) => setItemKeywords(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="e.g., 1980s, brown, size medium, bomber style" required />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="item-description" className="block text-slate-700 font-medium mb-2 dark:text-slate-300">Description</label>
                        <textarea id="item-description" rows={5} value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white" placeholder="Your detailed product description..."></textarea>
                        <button type="button" onClick={handleGenerateDescription} disabled={isGenerating} className="mt-2 flex items-center justify-center bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-sky-600 hover:to-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                            <Sparkles /> {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
                        </button>
                    </div>
                    <div className="flex justify-end">
                        <button type="submit" className="bg-amber-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-amber-600 transition duration-300">List Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const CartPanel: React.FC<{ 
    isOpen: boolean; 
    onClose: () => void; 
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onRemoveItem: (productId: number) => void;
}> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
    const subtotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

    return (
        <>
            <div className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
                <div className="p-6 border-b dark:border-slate-700 flex justify-between items-center">
                    <h2 className="text-2xl font-bold dark:text-white">Your Cart</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 dark:hover:text-white"><X /></button>
                </div>
                
                {cartItems.length === 0 ? (
                    <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
                        <div className="text-slate-300 dark:text-slate-600 mb-4 text-6xl"><ShoppingCart /></div>
                        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Your cart is empty</h3>
                        <p className="text-slate-500 mt-2">Looks like you haven't added anything yet.</p>
                    </div>
                ) : (
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                       {cartItems.map(item => (
                           <div key={item.id} className="flex items-center space-x-4 animate-fadeIn">
                               <img src={item.imageUrl} alt={item.imageText} className="w-20 h-20 rounded-md object-cover" />
                               <div className="flex-grow">
                                   <h4 className="font-semibold dark:text-white">{item.name}</h4>
                                   <p className="text-sm text-slate-500 dark:text-slate-400">${item.price.toFixed(2)}</p>
                                   <div className="flex items-center mt-2">
                                       <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 border rounded-md dark:border-slate-600"><Minus /></button>
                                       <span className="px-3 font-semibold dark:text-white">{item.quantity}</span>
                                       <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 border rounded-md dark:border-slate-600"><Plus /></button>
                                   </div>
                               </div>
                               <button onClick={() => onRemoveItem(item.id)} className="text-slate-400 hover:text-red-500"><Trash2 /></button>
                           </div>
                       ))}
                    </div>
                )}
                
                {cartItems.length > 0 && (
                    <div className="p-6 border-t dark:border-slate-700">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium text-slate-600 dark:text-slate-300">Subtotal</span>
                            <span className="text-2xl font-bold dark:text-white">${subtotal.toFixed(2)}</span>
                        </div>
                        <button className="w-full bg-amber-500 text-white font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg">
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
    const [page, setPage] = useState<Page>('home');
    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'light');
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isSellModalOpen, setIsSellModalOpen] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove(theme === 'light' ? 'dark' : 'light');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Trigger page transition animation
    const handleSetPage = (newPage: Page) => {
        if (page !== newPage) {
            setPage(newPage);
            setAnimationKey(prev => prev + 1);
        }
    };

    const handleAddToCart = (product: Product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const handleUpdateQuantity = (productId: number, newQuantity: number) => {
        if (newQuantity <= 0) {
            handleRemoveItem(productId);
        } else {
            setCartItems(prev => prev.map(item => item.id === productId ? { ...item, quantity: newQuantity } : item));
        }
    };
    
    const handleRemoveItem = (productId: number) => {
        setCartItems(prev => prev.filter(item => item.id !== productId));
    };
    
    const cartItemCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);

    const renderPage = () => {
        switch (page) {
            case 'home': return <HomePage setPage={handleSetPage} onAddToCart={handleAddToCart} />;
            case 'shop': return <ShopPage onAddToCart={handleAddToCart} />;
            case 'about': return <AboutPage />;
            case 'sell': return <BecomeSellerPage onStartSellingClick={() => setIsSellModalOpen(true)} />;
            default: return <HomePage setPage={handleSetPage} onAddToCart={handleAddToCart} />;
        }
    };

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
    );
};

export default App;
