import type { Product } from '../types'

export const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Handmade Ceramic Vase',
    description: 'A beautiful, one-of-a-kind vase for your home decor.',
    price: 495,
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
            
            <!-- Vase 2 - Earthy Brown -->
            <ellipse cx="280" cy="320" rx="20" ry="6" fill="#2C2C2C"/>
            <path d="M260 320 Q260 280 270 240 Q280 200 290 160 Q300 120 310 80 Q320 40 330 0" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <path d="M330 0 Q340 40 350 80 Q360 120 370 160 Q380 200 390 240 Q400 280 400 320" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            
            <!-- Vase 3 - Dusty Blue -->
            <ellipse cx="380" cy="320" rx="22" ry="7" fill="#2C2C2C"/>
            <path d="M358 320 Q358 280 368 240 Q378 200 388 160 Q398 120 408 80 Q418 40 428 0" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            <path d="M428 0 Q438 40 448 80 Q458 120 468 160 Q478 200 488 240 Q498 280 498 320" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            
            <text x="300" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Handmade Ceramic Vases</text>
        </svg>
    `),
    imageText: 'Handmade Ceramic Vase',
    category: 'Home & Garden',
    categoryId: 3,
    seller: 'Jane Smith',
    location: 'San Francisco, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 2,
    name: 'Vintage Film Camera',
    description: 'Capture memories the old-fashioned way. In working condition.',
    price: 1320,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D3D3D3;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="camera" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2F2F2F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg2)"/>
            
            <!-- Camera Body -->
            <rect x="200" y="150" width="200" height="120" rx="10" fill="url(#camera)" stroke="#333" stroke-width="2"/>
            <rect x="210" y="160" width="180" height="100" rx="5" fill="#444"/>
            
            <!-- Lens -->
            <circle cx="300" cy="210" r="40" fill="#1A1A1A" stroke="#333" stroke-width="3"/>
            <circle cx="300" cy="210" r="30" fill="#2A2A2A"/>
            <circle cx="300" cy="210" r="20" fill="#0A0A0A"/>
            <text x="300" y="215" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#666">50mm</text>
            
            <!-- Viewfinder -->
            <rect x="280" y="130" width="40" height="20" rx="3" fill="url(#camera)"/>
            
            <!-- Flash -->
            <rect x="350" y="140" width="30" height="15" rx="2" fill="#E6E6FA"/>
            
            <!-- Buttons and Details -->
            <circle cx="230" cy="180" r="5" fill="#666"/>
            <circle cx="370" cy="180" r="5" fill="#666"/>
            <rect x="320" y="170" width="20" height="10" rx="2" fill="#888"/>
            
            <text x="300" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Vintage Film Camera</text>
        </svg>
    `),
    imageText: 'Vintage Film Camera',
    category: 'Collectibles',
    categoryId: 6,
    seller: 'Jane Smith',
    location: 'Oakland, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 3,
    name: 'Artisan Leather Wallet',
    description: 'Hand-stitched wallet made from genuine full-grain leather.',
    price: 825,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F0E68C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#DAA520;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="leather" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#654321;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg3)"/>
            
            <!-- Wallet -->
            <rect x="200" y="150" width="200" height="100" rx="8" fill="url(#leather)" stroke="#4A2C17" stroke-width="2"/>
            <rect x="205" y="155" width="190" height="90" rx="5" fill="#A0522D" opacity="0.3"/>
            
            <!-- Stitching -->
            <line x1="210" y1="160" x2="390" y2="160" stroke="#2F1B14" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="210" y1="240" x2="390" y2="240" stroke="#2F1B14" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="210" y1="160" x2="210" y2="240" stroke="#2F1B14" stroke-width="1" stroke-dasharray="3,2"/>
            <line x1="390" y1="160" x2="390" y2="240" stroke="#2F1B14" stroke-width="1" stroke-dasharray="3,2"/>
            
            <!-- Card Slots -->
            <rect x="220" y="170" width="70" height="8" fill="#4A2C17" opacity="0.5"/>
            <rect x="220" y="185" width="70" height="8" fill="#4A2C17" opacity="0.5"/>
            <rect x="220" y="200" width="70" height="8" fill="#4A2C17" opacity="0.5"/>
            
            <!-- Bill Compartment -->
            <rect x="310" y="170" width="70" height="60" fill="#2F1B14" opacity="0.3"/>
            
            <text x="300" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Artisan Leather Wallet</text>
        </svg>
    `),
    imageText: 'Artisan Leather Wallet',
    category: 'Fashion',
    categoryId: 1,
    seller: 'Jane Smith',
    location: 'Berkeley, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 4,
    name: 'Abstract Canvas Art',
    description: 'A unique piece of abstract art to brighten up any room.',
    price: 2750,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg4" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5F5;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E0E0E0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg4)"/>
            
            <!-- Canvas Frame -->
            <rect x="100" y="50" width="400" height="300" fill="#8B4513" stroke="#654321" stroke-width="8"/>
            <rect x="120" y="70" width="360" height="260" fill="#FFFEF7"/>
            
            <!-- Abstract Art -->
            <circle cx="200" cy="150" r="40" fill="#FF6B6B" opacity="0.7"/>
            <circle cx="350" cy="200" r="60" fill="#4ECDC4" opacity="0.6"/>
            <polygon points="250,100 320,140 280,200 200,180" fill="#45B7D1" opacity="0.8"/>
            <rect x="300" y="120" width="80" height="60" fill="#96CEB4" opacity="0.7" transform="rotate(25 340 150)"/>
            <circle cx="180" cy="250" r="30" fill="#FFEAA7" opacity="0.8"/>
            <path d="M150 200 Q200 180 250 220 Q300 260 350 240" stroke="#DDA0DD" stroke-width="8" fill="none" opacity="0.6"/>
            
            <text x="300" y="380" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Abstract Canvas Art</text>
        </svg>
    `),
    imageText: 'Abstract Canvas Art',
    category: 'Crafts',
    categoryId: 5,
    seller: 'Jane Smith',
    location: 'Palo Alto, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 5,
    name: 'Sterling Silver Necklace',
    description: 'Elegant necklace with a modern twist, perfect for any occasion.',
    price: 1045,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg5" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#E6E6FA;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#D8BFD8;stop-opacity:1" />
                </linearGradient>
                <radialGradient id="silver" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#F8F8FF;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" />
                </radialGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg5)"/>
            
            <!-- Necklace Chain -->
            <path d="M200 100 Q250 80 300 100 Q350 120 400 100" stroke="url(#silver)" stroke-width="4" fill="none"/>
            <path d="M180 120 Q230 100 280 120 Q330 140 380 120 Q420 110 450 130" stroke="url(#silver)" stroke-width="4" fill="none"/>
            
            <!-- Pendant -->
            <ellipse cx="300" cy="180" rx="25" ry="35" fill="url(#silver)" stroke="#A0A0A0" stroke-width="2"/>
            <circle cx="300" cy="170" r="8" fill="#4169E1" opacity="0.8"/>
            <circle cx="300" cy="190" r="6" fill="#F8F8FF"/>
            
            <!-- Chain links -->
            <circle cx="220" cy="95" r="3" fill="url(#silver)"/>
            <circle cx="240" cy="88" r="3" fill="url(#silver)"/>
            <circle cx="260" cy="92" r="3" fill="url(#silver)"/>
            <circle cx="280" cy="96" r="3" fill="url(#silver)"/>
            <circle cx="320" cy="96" r="3" fill="url(#silver)"/>
            <circle cx="340" cy="92" r="3" fill="url(#silver)"/>
            <circle cx="360" cy="88" r="3" fill="url(#silver)"/>
            <circle cx="380" cy="95" r="3" fill="url(#silver)"/>
            
            <text x="300" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Sterling Silver Necklace</text>
        </svg>
    `),
    imageText: 'Sterling Silver Necklace',
    category: 'Jewelry',
    categoryId: 4,
    seller: 'Jane Smith',
    location: 'San Jose, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 6,
    name: 'Bluetooth Wireless Headphones',
    description: 'High-quality sound with noise cancellation technology.',
    price: 1980,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg6" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F0F8FF;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E0E6FF;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="headphone" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2F2F2F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg6)"/>
            
            <!-- Headband -->
            <path d="M200 150 Q300 100 400 150" stroke="url(#headphone)" stroke-width="12" fill="none" stroke-linecap="round"/>
            <path d="M210 155 Q300 110 390 155" stroke="#444" stroke-width="6" fill="none" stroke-linecap="round"/>
            
            <!-- Left Ear Cup -->
            <circle cx="200" cy="200" r="40" fill="url(#headphone)" stroke="#333" stroke-width="2"/>
            <circle cx="200" cy="200" r="30" fill="#444"/>
            <circle cx="200" cy="200" r="20" fill="#1A1A1A"/>
            <text x="200" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#888">L</text>
            
            <!-- Right Ear Cup -->
            <circle cx="400" cy="200" r="40" fill="url(#headphone)" stroke="#333" stroke-width="2"/>
            <circle cx="400" cy="200" r="30" fill="#444"/>
            <circle cx="400" cy="200" r="20" fill="#1A1A1A"/>
            <text x="400" y="205" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#888">R</text>
            
            <!-- Adjustable sliders -->
            <rect x="190" y="140" width="20" height="30" rx="3" fill="#666"/>
            <rect x="390" y="140" width="20" height="30" rx="3" fill="#666"/>
            
            <!-- Bluetooth indicator -->
            <circle cx="420" cy="180" r="4" fill="#0066FF"/>
            
            <text x="300" y="320" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Bluetooth Headphones</text>
        </svg>
    `),
    imageText: 'Bluetooth Wireless Headphones',
    category: 'Electronics',
    categoryId: 2,
    seller: 'Jane Smith',
    location: 'Mountain View, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 7,
    name: 'Organic Cotton T-Shirt',
    description: 'Soft, sustainable, and comfortable everyday wear.',
    price: 385,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg7" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F0FFF0;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E0FFE0;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg7)"/>
            
            <!-- T-Shirt -->
            <!-- Shoulders -->
            <path d="M200 120 Q250 100 300 120 Q350 100 400 120 L420 140 Q400 130 380 140 L380 180 Q380 200 360 220 L240 220 Q220 200 220 180 L220 140 Q200 130 180 140 Z" fill="#90EE90" stroke="#228B22" stroke-width="2"/>
            
            <!-- Main body -->
            <rect x="240" y="140" width="120" height="160" rx="5" fill="#90EE90" stroke="#228B22" stroke-width="2"/>
            
            <!-- Sleeves -->
            <ellipse cx="190" cy="160" rx="30" ry="40" fill="#90EE90" stroke="#228B22" stroke-width="2"/>
            <ellipse cx="410" cy="160" rx="30" ry="40" fill="#90EE90" stroke="#228B22" stroke-width="2"/>
            
            <!-- Neckline -->
            <path d="M270 140 Q300 130 330 140 Q320 150 300 155 Q280 150 270 140" fill="#F0FFF0"/>
            
            <!-- Organic label -->
            <rect x="260" y="200" width="80" height="20" fill="#228B22" opacity="0.8"/>
            <text x="300" y="213" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="white" font-weight="bold">ORGANIC</text>
            
            <text x="300" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Organic Cotton T-Shirt</text>
        </svg>
    `),
    imageText: 'Organic Cotton T-Shirt',
    category: 'Fashion',
    categoryId: 1,
    seller: 'Jane Smith',
    location: 'Fremont, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  },
  {
    id: 8,
    name: 'Hand-poured Soy Candle',
    description: 'Scented with essential oils for a relaxing ambiance.',
    price: 275,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="bg8" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFF8DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#F5DEB3;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="candle" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#FFFACD;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#F0E68C;stop-opacity:1" />
                </linearGradient>
                <radialGradient id="flame" cx="50%" cy="30%" r="70%">
                    <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#FF6347;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#FF4500;stop-opacity:0.8" />
                </radialGradient>
            </defs>
            <rect width="600" height="400" fill="url(#bg8)"/>
            
            <!-- Candle Jar -->
            <rect x="250" y="180" width="100" height="120" rx="5" fill="#F5F5DC" stroke="#DDD" stroke-width="2"/>
            <rect x="255" y="185" width="90" height="110" rx="3" fill="url(#candle)"/>
            
            <!-- Wick -->
            <line x1="300" y1="185" x2="300" y2="165" stroke="#8B4513" stroke-width="2"/>
            
            <!-- Flame -->
            <ellipse cx="300" cy="160" rx="8" ry="15" fill="url(#flame)"/>
            
            <!-- Label -->
            <rect x="260" y="220" width="80" height="40" fill="#F5F5DC" stroke="#DDD" stroke-width="1"/>
            <text x="300" y="235" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#8B4513" font-weight="bold">SOY CANDLE</text>
            <text x="300" y="248" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#8B4513">Lavender</text>
            <text x="300" y="258" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#8B4513">Essential Oil</text>
            
            <!-- Glow effect -->
            <circle cx="300" cy="160" r="25" fill="#FFD700" opacity="0.1"/>
            <circle cx="300" cy="160" r="35" fill="#FFD700" opacity="0.05"/>
            
            <text x="300" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#4A4A4A" font-weight="bold">Hand-poured Soy Candle</text>
        </svg>
    `),
    imageText: 'Hand-poured Soy Candle',
    category: 'Crafts',
    categoryId: 5,
    seller: 'Jane Smith',
    location: 'Sunnyvale, CA',
    isWishlisted: false,
    createdAt: '2025-09-10 09:21:42'
  }
]
