/* eslint-disable */
/// <reference types="@types/google.maps" />
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

// Icon components
const Store = () => <span className="text-2xl">🏪</span>
const Heart: React.FC<{ filled?: boolean; size?: number }> = ({ filled = false, size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 21s-6.716-4.585-9.243-7.111C.23 11.363.23 8.137 2.757 5.61c1.757-1.757 4.607-1.757 6.364 0L12 6.485l2.879-2.875c1.757-1.757 4.607-1.757 6.364 0 2.527 2.527 2.527 5.753 0 8.279C18.716 16.415 12 21 12 21z"
      fill={filled ? 'rgba(244, 114, 182, 0.55)' : 'none'}
      stroke={'rgba(244, 114, 182, 0.85)'}
      strokeWidth={2}
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
)
// const Menu = () => (
//   <svg
//     width="22"
//     height="22"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <line x1="3" y1="6" x2="21" y2="6" />
//     <line x1="3" y1="12" x2="21" y2="12" />
//     <line x1="3" y1="18" x2="21" y2="18" />
//   </svg>
// )
const ShieldCheck = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
)
const Headset = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
    <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3" />
  </svg>
)
const Globe = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)
const X = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)
const Sparkles = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5 3l2 4 4 2-4 2-2 4-2-4-4-2 4-2 2-4zm14 8l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM13 5l1.5 3L18 9l-3.5 1L13 13l-1.5-3L8 9l3.5-1L13 5z" />
  </svg>
)
const ChevronRight = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
)
const Trash2 = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)
const Sun = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
)
const Moon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

// --- TYPE DEFINITIONS ---
type Page = 'home' | 'shop' | 'about' | 'sell' | 'dashboard' | 'map'
type SidebarTab = 'dashboard' | 'listings' | 'history' | 'profile'

interface Product {
  id: number
  name: string
  description: string
  price: number
  imageUrl: string
  imageText: string
  category: string
  location?: string
  seller?: string
  isActive?: boolean
}

type WishlistItem = Product

interface Category {
  id: number
  name: string
  icon: ReactNode
}

// --- MOCK DATA ---
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Handmade Ceramic Vase',
    description: 'A beautiful, one-of-a-kind vase for your home decor.',
    price: 45.0,
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
            <path d="M230 0 Q235 15 240 30 Q245 45 250 60 Q255 75 260 90 Q265 105 270 120 Q275 135 280 150 Q285 165 290 180 Q295 195 300 210 Q305 225 310 240 Q315 255 315 280" 
                  fill="#8B5FBF" opacity="0.3"/>
            
            <!-- Vase 2 - Earthy Brown -->
            <ellipse cx="280" cy="320" rx="20" ry="6" fill="#2C2C2C"/>
            <path d="M260 320 Q260 280 270 240 Q280 200 290 160 Q300 120 310 80 Q320 40 330 0" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <path d="M330 0 Q340 40 350 80 Q360 120 370 160 Q380 200 390 240 Q400 280 400 320" 
                  fill="#8B4513" stroke="#654321" stroke-width="2"/>
            <path d="M320 0 Q325 20 330 40 Q335 60 340 80 Q345 100 350 120 Q355 140 360 160 Q365 180 370 200 Q375 220 380 240 Q385 260 390 280 Q395 300 400 320" 
                  fill="#A0522D" opacity="0.3"/>
            
            <!-- Vase 3 - Dusty Blue -->
            <ellipse cx="380" cy="320" rx="22" ry="7" fill="#2C2C2C"/>
            <path d="M358 320 Q358 280 368 240 Q378 200 388 160 Q398 120 408 80 Q418 40 428 0" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            <path d="M428 0 Q438 40 448 80 Q458 120 468 160 Q478 200 488 240 Q498 280 498 320" 
                  fill="#708090" stroke="#5F6A7A" stroke-width="2"/>
            <path d="M418 0 Q423 20 428 40 Q433 60 438 80 Q443 100 448 120 Q453 140 458 160 Q463 180 468 200 Q473 220 478 240 Q483 260 488 280 Q493 300 498 320" 
                  fill="#87CEEB" opacity="0.3"/>
            
            <!-- Vase 4 - Off-White -->
            <ellipse cx="480" cy="320" rx="18" ry="6" fill="#2C2C2C"/>
            <path d="M462 320 Q462 280 472 240 Q482 200 492 160 Q502 120 512 80 Q522 40 532 0" 
                  fill="#F5F5DC" stroke="#E6E6FA" stroke-width="2"/>
            <path d="M532 0 Q542 40 552 80 Q562 120 572 160 Q582 200 592 240 Q602 280 602 320" 
                  fill="#F5F5DC" stroke="#E6E6FA" stroke-width="2"/>
            <path d="M522 0 Q527 20 532 40 Q537 60 542 80 Q547 100 552 120 Q557 140 562 160 Q567 180 572 200 Q577 220 582 240 Q587 260 592 280 Q597 300 602 320" 
                  fill="#FFFFFF" opacity="0.3"/>
            
            <!-- Vase 5 - Golden Yellow -->
            <ellipse cx="520" cy="320" rx="20" ry="7" fill="#2C2C2C"/>
            <path d="M500 320 Q500 280 510 240 Q520 200 530 160 Q540 120 550 80 Q560 40 570 0" 
                  fill="#DAA520" stroke="#B8860B" stroke-width="2"/>
            <path d="M570 0 Q580 40 590 80 Q600 120 610 160 Q620 200 630 240 Q640 280 640 320" 
                  fill="#DAA520" stroke="#B8860B" stroke-width="2"/>
            <path d="M560 0 Q565 20 570 40 Q575 60 580 80 Q585 100 590 120 Q595 140 600 160 Q605 180 610 200 Q615 220 620 240 Q625 260 630 280 Q635 300 640 320" 
                  fill="#FFD700" opacity="0.3"/>
            
            <!-- Subtle shadows -->
            <ellipse cx="180" cy="325" rx="25" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="280" cy="325" rx="20" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="380" cy="325" rx="22" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="480" cy="325" rx="18" ry="3" fill="#000000" opacity="0.2"/>
            <ellipse cx="520" cy="325" rx="20" ry="3" fill="#000000" opacity="0.2"/>
        </svg>
    `),
    imageText: 'Handmade Ceramic Vase',
    category: 'Home & Garden',
  },
  {
    id: 2,
    name: 'Vintage Film Camera',
    description: 'Capture memories the old-fashioned way. In working condition.',
    price: 120.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cameraBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2C2C2C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#cameraBg)"/>
            <!-- Camera body -->
            <rect x="200" y="120" width="200" height="140" rx="20" fill="#2C2C2C" stroke="#404040" stroke-width="2"/>
            <!-- Camera lens -->
            <circle cx="300" cy="200" r="50" fill="#1A1A1A" stroke="#404040" stroke-width="3"/>
            <circle cx="300" cy="200" r="35" fill="#2C2C2C"/>
            <circle cx="300" cy="200" r="20" fill="#1A1A1A"/>
            <!-- Viewfinder -->
            <rect x="250" y="80" width="100" height="30" rx="5" fill="#1A1A1A"/>
            <!-- Flash -->
            <rect x="320" y="90" width="20" height="15" rx="3" fill="#404040"/>
            <!-- Camera strap -->
            <rect x="180" y="100" width="240" height="8" rx="4" fill="#8B4513"/>
        </svg>
    `),
    imageText: 'Vintage Film Camera',
    category: 'Collectibles',
  },
  {
    id: 3,
    name: 'Artisan Leather Wallet',
    description: 'Hand-stitched wallet made from genuine full-grain leather.',
    price: 75.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="woodBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#654321;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#3E2723;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="leather" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#D2B48C;stop-opacity:1" />
                    <stop offset="50%" style="stop-color:#CD853F;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#A0522D;stop-opacity:1" />
                </linearGradient>
                <linearGradient id="leatherShadow" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#8B4513;stop-opacity:0.3" />
                    <stop offset="100%" style="stop-color:#654321;stop-opacity:0.6" />
                </linearGradient>
                <pattern id="woodGrain" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <rect width="20" height="20" fill="url(#woodBg)"/>
                    <path d="M0,10 Q10,5 20,10 Q10,15 0,10" stroke="#5D4037" stroke-width="0.5" fill="none" opacity="0.3"/>
                    <path d="M0,5 Q10,0 20,5 Q10,10 0,5" stroke="#4E342E" stroke-width="0.3" fill="none" opacity="0.2"/>
                </pattern>
            </defs>
            
            <!-- Wooden background -->
            <rect width="600" height="400" fill="url(#woodGrain)"/>
            
            <!-- Wood planks and seams -->
            <line x1="0" y1="0" x2="600" y2="0" stroke="#2E1B14" stroke-width="2"/>
            <line x1="0" y1="100" x2="600" y2="100" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="200" x2="600" y2="200" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="300" x2="600" y2="300" stroke="#2E1B14" stroke-width="1"/>
            <line x1="0" y1="400" x2="600" y2="400" stroke="#2E1B14" stroke-width="2"/>
            
            <!-- Diagonal seam -->
            <line x1="400" y1="0" x2="500" y2="400" stroke="#1A0E0A" stroke-width="3"/>
            
            <!-- Metal bolt -->
            <circle cx="520" cy="50" r="8" fill="#2C2C2C"/>
            <circle cx="520" cy="50" r="5" fill="#404040"/>
            <circle cx="520" cy="50" r="2" fill="#606060"/>
            
            <!-- Wallet shadow -->
            <ellipse cx="300" cy="280" rx="80" ry="15" fill="#000000" opacity="0.3"/>
            
            <!-- Main wallet body -->
            <rect x="220" y="200" width="160" height="100" rx="8" fill="url(#leather)"/>
            
            <!-- Wallet front pocket (overlapping) -->
            <rect x="240" y="180" width="120" height="80" rx="6" fill="url(#leatherShadow)"/>
            
            <!-- Wallet back pocket -->
            <rect x="260" y="160" width="100" height="60" rx="5" fill="url(#leather)"/>
            
            <!-- Stitching details -->
            <line x1="350" y1="200" x2="350" y2="300" stroke="#654321" stroke-width="1.5"/>
            <line x1="220" y1="280" x2="380" y2="280" stroke="#654321" stroke-width="1.5"/>
            
            <!-- Axe logo -->
            <g transform="translate(300, 220)">
                <!-- Axe blade -->
                <ellipse cx="-15" cy="0" rx="8" ry="12" fill="#8B4513" transform="rotate(-30)"/>
                <!-- Axe handle -->
                <rect x="-25" y="-2" width="20" height="4" rx="2" fill="#8B4513"/>
                <!-- Axe head detail -->
                <ellipse cx="-15" cy="0" rx="5" ry="8" fill="#654321" transform="rotate(-30)"/>
            </g>
            
            <!-- Leather texture lines -->
            <path d="M230 210 Q250 205 270 210 Q290 215 310 210 Q330 205 350 210 Q370 215 390 210" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            <path d="M230 230 Q250 225 270 230 Q290 235 310 230 Q330 225 350 230 Q370 235 390 230" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            <path d="M230 250 Q250 245 270 250 Q290 255 310 250 Q330 245 350 250 Q370 255 390 250" 
                  stroke="#8B4513" stroke-width="0.5" fill="none" opacity="0.4"/>
            
            <!-- Burnished edges -->
            <rect x="220" y="200" width="160" height="100" rx="8" fill="none" stroke="#8B4513" stroke-width="2" opacity="0.6"/>
            <rect x="240" y="180" width="120" height="80" rx="6" fill="none" stroke="#8B4513" stroke-width="1.5" opacity="0.5"/>
            <rect x="260" y="160" width="100" height="60" rx="5" fill="none" stroke="#8B4513" stroke-width="1.5" opacity="0.5"/>
            
            <!-- Wood grain details -->
            <path d="M50 50 Q100 45 150 50 Q200 55 250 50 Q300 45 350 50 Q400 55 450 50 Q500 45 550 50" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 150 Q100 145 150 150 Q200 155 250 150 Q300 145 350 150 Q400 155 450 150 Q500 145 550 150" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 250 Q100 245 150 250 Q200 255 250 250 Q300 245 350 250 Q400 255 450 250 Q500 245 550 250" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
            <path d="M50 350 Q100 345 150 350 Q200 355 250 350 Q300 345 350 350 Q400 355 450 350 Q500 345 550 350" 
                  stroke="#2E1B14" stroke-width="0.5" fill="none" opacity="0.3"/>
        </svg>
    `),
    imageText: 'Artisan Leather Wallet',
    category: 'Fashion',
  },
  {
    id: 4,
    name: 'Abstract Canvas Art',
    description: 'A unique piece of abstract art to brighten up any room.',
    price: 250.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="artBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#artBg)"/>
            <!-- Abstract shapes -->
            <circle cx="150" cy="100" r="40" fill="#FF6B6B" opacity="0.8"/>
            <rect x="250" y="80" width="80" height="60" rx="10" fill="#4ECDC4" opacity="0.7" transform="rotate(15 290 110)"/>
            <polygon points="400,120 450,80 500,120 450,160" fill="#45B7D1" opacity="0.6"/>
            <ellipse cx="200" cy="250" rx="60" ry="30" fill="#96CEB4" opacity="0.8"/>
            <rect x="350" y="200" width="100" height="80" rx="20" fill="#FFEAA7" opacity="0.7" transform="rotate(-20 400 240)"/>
            <circle cx="100" cy="300" r="35" fill="#DDA0DD" opacity="0.6"/>
            <polygon points="450,250 500,200 550,250 500,300" fill="#98D8C8" opacity="0.8"/>
        </svg>
    `),
    imageText: 'Abstract Canvas Art',
    category: 'Crafts',
  },
  {
    id: 5,
    name: 'Wireless Smart Headphones',
    description: 'High-fidelity audio with noise-cancellation.',
    price: 199.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="headphoneBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2C2C2C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#headphoneBg)"/>
            <!-- Headphone band -->
            <path d="M150 200 Q300 150 450 200" stroke="#404040" stroke-width="8" fill="none"/>
            <!-- Left ear cup -->
            <circle cx="150" cy="200" r="60" fill="#2C2C2C" stroke="#404040" stroke-width="3"/>
            <circle cx="150" cy="200" r="45" fill="#1A1A1A"/>
            <circle cx="150" cy="200" r="30" fill="#404040"/>
            <!-- Right ear cup -->
            <circle cx="450" cy="200" r="60" fill="#2C2C2C" stroke="#404040" stroke-width="3"/>
            <circle cx="450" cy="200" r="45" fill="#1A1A1A"/>
            <circle cx="450" cy="200" r="30" fill="#404040"/>
            <!-- Cable -->
            <path d="M450 200 Q500 250 550 300" stroke="#666" stroke-width="3" fill="none"/>
        </svg>
    `),
    imageText: 'Wireless Smart Headphones',
    category: 'Electronics',
  },
  {
    id: 6,
    name: 'Minimalist Gold Necklace',
    description: 'An elegant and subtle piece for everyday wear.',
    price: 150.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="jewelryBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#jewelryBg)"/>
            <!-- Necklace chain -->
            <path d="M200 200 Q300 150 400 200" stroke="#FFD700" stroke-width="3" fill="none"/>
            <!-- Pendant -->
            <circle cx="300" cy="200" r="25" fill="#FFD700" stroke="#B8860B" stroke-width="2"/>
            <circle cx="300" cy="200" r="15" fill="#FFF8DC"/>
            <circle cx="300" cy="200" r="8" fill="#FFD700"/>
            <!-- Chain links -->
            <circle cx="250" cy="180" r="8" fill="#FFD700" opacity="0.7"/>
            <circle cx="350" cy="180" r="8" fill="#FFD700" opacity="0.7"/>
        </svg>
    `),
    imageText: 'Minimalist Gold Necklace',
    category: 'Jewelry',
  },
  {
    id: 7,
    name: 'Organic Cotton Throw Pillow',
    description: 'Soft, comfortable, and sustainably made.',
    price: 40.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="pillowBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#F5F5DC;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#E6E6FA;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#pillowBg)"/>
            <!-- Pillow -->
            <rect x="200" y="150" width="200" height="150" rx="20" fill="#E6E6FA" stroke="#DDA0DD" stroke-width="2"/>
            <!-- Pillow pattern -->
            <circle cx="250" cy="200" r="15" fill="#DDA0DD" opacity="0.6"/>
            <circle cx="350" cy="200" r="15" fill="#DDA0DD" opacity="0.6"/>
            <circle cx="300" cy="250" r="15" fill="#DDA0DD" opacity="0.6"/>
            <!-- Stitching -->
            <path d="M200 200 Q300 180 400 200" stroke="#DDA0DD" stroke-width="1" fill="none" opacity="0.5"/>
            <path d="M200 250 Q300 230 400 250" stroke="#DDA0DD" stroke-width="1" fill="none" opacity="0.5"/>
        </svg>
    `),
    imageText: 'Organic Cotton Throw Pillow',
    category: 'Home & Garden',
  },
  {
    id: 8,
    name: 'Hand-poured Soy Candle',
    description: 'Scented with essential oils for a relaxing ambiance.',
    price: 25.0,
    imageUrl:
      'data:image/svg+xml;base64,' +
      btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="candleBg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style="stop-color:#2C2C2C;stop-opacity:1" />
                    <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
                </linearGradient>
            </defs>
            <rect width="600" height="400" fill="url(#candleBg)"/>
            <!-- Candle base -->
            <rect x="250" y="200" width="100" height="150" rx="10" fill="#F5F5DC" stroke="#E6E6FA" stroke-width="2"/>
            <!-- Candle wax -->
            <rect x="260" y="180" width="80" height="20" rx="5" fill="#FFF8DC"/>
            <!-- Flame -->
            <ellipse cx="300" cy="160" rx="8" ry="20" fill="#FF6B6B"/>
            <ellipse cx="300" cy="165" rx="5" ry="12" fill="#FFD700"/>
            <!-- Wax drips -->
            <path d="M270 200 Q275 210 280 200" stroke="#FFF8DC" stroke-width="3" fill="none"/>
            <path d="M320 200 Q325 210 330 200" stroke="#FFF8DC" stroke-width="3" fill="none"/>
        </svg>
    `),
    imageText: 'Hand-poured Soy Candle',
    category: 'Crafts',
  },
]

const CATEGORIES: Category[] = [
  { id: 1, name: 'Fashion', icon: <i className="fas fa-tshirt"></i> },
  { id: 2, name: 'Electronics', icon: <i className="fas fa-plug"></i> },
  { id: 3, name: 'Home & Garden', icon: <i className="fas fa-couch"></i> },
  { id: 4, name: 'Jewelry', icon: <i className="fas fa-gem"></i> },
  { id: 5, name: 'Crafts', icon: <i className="fas fa-paint-brush"></i> },
  { id: 6, name: 'Collectibles', icon: <i className="fas fa-book-open"></i> },
]

// --- API SERVICE ---
// const GeminiAPIService = {
//     // ... (unchanged)
// };

// --- LAYOUT COMPONENTS ---
// Floating translucent header bar rendered at the center top of the viewport
const FloatingHeaderBar: React.FC<{
  setPage: (p: Page) => void
  activePage: Page
}> = ({ setPage, activePage }) => {
  const navClasses = (page: Page) =>
    `px-4 py-1 rounded-full text-sm font-medium transition-colors ${
      activePage === page
        ? 'bg-amber-500 text-white shadow'
        : 'text-slate-800 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800/40'
    }`
  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 px-6 py-2 rounded-full backdrop-blur-xl border border-white/30 dark:border-slate-700/30 bg-white/40 dark:bg-slate-900/10 shadow-lg"
    >
      <button
        onClick={() => setPage('home')}
        className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2 select-none focus:outline-none hover:text-amber-500 transition-colors"
      >
        <span className="text-amber-500">
          <Store />
        </span>
        Marketify
      </button>
      {/* nav links */}
      <button onClick={() => setPage('shop')} className={navClasses('shop')}>Buy</button>
      <button onClick={() => setPage('sell')} className={navClasses('sell')}>Sell</button>
      <button onClick={() => setPage('map')} className={navClasses('map')}>Map</button>
      <button onClick={() => setPage('about')} className={navClasses('about')}>About</button>
    </div>
  )
}

// const Header: React.FC<any> = () => null

const Footer: React.FC = () => (
  <footer className="bg-slate-800 text-white dark:bg-slate-900 dark:text-slate-200">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Store /> Marketify
          </h3>
          <p className="text-slate-400 dark:text-slate-400">
            The best place to discover, buy, and sell unique items.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Shop</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white dark:hover:text-slate-100">
                Featured
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white dark:hover:text-slate-100">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-white dark:hover:text-slate-100">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-white dark:hover:text-slate-100">
                Seller Handbook
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="text-slate-400 dark:text-slate-400 mb-4">
            Get the latest updates and deals.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-l-lg text-slate-800 dark:text-slate-100 dark:bg-slate-800 focus:outline-none"
            />
            <button className="bg-amber-500 text-white px-4 rounded-r-lg hover:bg-amber-600 font-semibold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-slate-500 dark:text-slate-400">
        &copy; {new Date().getFullYear()} Marketify. All Rights Reserved.
      </div>
    </div>
  </footer>
)

// --- UI COMPONENTS ---
const ProductCard: React.FC<{
  product: Product
  isWished: boolean
  onToggleWishlist: (product: Product) => void
}> = ({ product, isWished, onToggleWishlist }) => {
  const [imageError, setImageError] = useState(false)

  const handleImageError = () => {
    setImageError(true)
  }

  const fallbackImage = `data:image/svg+xml;base64,${btoa(`
        <svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="400" fill="#f3f4f6"/>
            <rect x="200" y="150" width="200" height="100" rx="10" fill="#e5e7eb"/>
            <circle cx="250" cy="180" r="15" fill="#9ca3af"/>
            <rect x="280" y="170" width="80" height="20" rx="5" fill="#9ca3af"/>
            <text x="300" y="280" text-anchor="middle" font-family="Arial, sans-serif" font-size="16" fill="#6b7280">${product.name}</text>
        </svg>
    `)}`

  return (
    <div className="bg-white/70 dark:bg-slate-800/20 backdrop-blur-xl border border-white/40 dark:border-slate-700/30 rounded-3xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group relative">
      <div className="overflow-hidden">
        <img
          src={imageError ? fallbackImage : product.imageUrl}
          alt={product.imageText}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          onError={handleImageError}
        />
      </div>
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-3 right-3 bg-white/70 dark:bg-slate-900/50 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-full p-2 shadow-sm hover:shadow-md transition-all duration-200"
        aria-label={isWished ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart filled={isWished} />
      </button>
      <div className="p-6">
        <div className="flex justify-between items-start mb-1">
          <p className="text-sm text-slate-600 dark:text-slate-400">{product.category}</p>
          {product.location && (
            <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center">
              📍 {product.location}
            </p>
          )}
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2 truncate">
          {product.name}
        </h3>
        <p className="text-slate-700 dark:text-slate-300 mb-3 h-12 overflow-hidden">
          {product.description}
        </p>
        {product.seller && (
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
            Sold by {product.seller}
          </p>
        )}
        <span className="text-2xl font-semibold text-slate-800 dark:text-white drop-shadow-sm">
          {product.price.toFixed(2)} kr
        </span>
      </div>
    </div>
  )
}

// --- PAGES ---
const HomePage: React.FC<{
  setPage: (page: Page) => void
  isInWishlist: (id: number) => boolean
  onToggleWishlist: (product: Product) => void
}> = ({ setPage, isInWishlist, onToggleWishlist }) => (
  <>
    <section
      className="relative bg-cover bg-top text-white min-h-screen"
      style={{
        backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)),
                url('data:image/svg+xml;base64,${btoa(`
                    <svg width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="household-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
                                <rect width="200" height="200" fill="#F5F5DC"/>
                                <!-- Sofa -->
                                <rect x="20" y="120" width="60" height="40" rx="5" fill="#4A90E2"/>
                                <rect x="25" y="125" width="50" height="30" rx="3" fill="#357ABD"/>
                                <!-- Armchair -->
                                <rect x="100" y="100" width="35" height="50" rx="8" fill="#4A90E2"/>
                                <rect x="105" y="105" width="25" height="40" rx="5" fill="#357ABD"/>
                                <!-- Jeans -->
                                <rect x="150" y="80" width="25" height="60" rx="3" fill="#2C3E50"/>
                                <rect x="155" y="85" width="15" height="50" rx="2" fill="#1A252F"/>
                                <!-- Dress -->
                                <rect x="20" y="40" width="20" height="50" rx="2" fill="#E74C3C"/>
                                <rect x="25" y="45" width="10" height="40" rx="1" fill="#C0392B"/>
                                <!-- T-shirt -->
                                <rect x="50" y="30" width="25" height="30" rx="3" fill="#1ABC9C"/>
                                <rect x="55" y="35" width="15" height="20" rx="2" fill="#16A085"/>
                                <!-- Laptop -->
                                <rect x="120" y="20" width="40" height="25" rx="2" fill="#95A5A6"/>
                                <rect x="125" y="25" width="30" height="15" rx="1" fill="#2C3E50"/>
                                <!-- Headphones -->
                                <rect x="180" y="30" width="15" height="20" rx="8" fill="#1ABC9C"/>
                                <rect x="185" y="35" width="5" height="10" rx="2" fill="#16A085"/>
                                <!-- Plant -->
                                <circle cx="30" cy="180" r="15" fill="#27AE60"/>
                                <rect x="25" y="195" width="10" height="10" rx="2" fill="#E74C3C"/>
                                <!-- Pillow -->
                                <rect x="80" y="180" width="20" height="20" rx="3" fill="#E74C3C"/>
                                <circle cx="90" cy="190" r="3" fill="#FFFFFF"/>
                                <!-- Vase -->
                                <rect x="130" y="160" width="15" height="25" rx="3" fill="#1ABC9C"/>
                                <rect x="135" y="165" width="5" height="15" rx="1" fill="#16A085"/>
                                <!-- Mug -->
                                <rect x="170" y="180" width="12" height="15" rx="2" fill="#1ABC9C"/>
                                <rect x="175" y="185" width="2" height="5" rx="1" fill="#16A085"/>
                                <!-- Books -->
                                <rect x="20" y="200" width="8" height="12" fill="#3498DB"/>
                                <rect x="30" y="200" width="8" height="12" fill="#F39C12"/>
                                <rect x="40" y="200" width="8" height="12" fill="#E74C3C"/>
                            </pattern>
                        </defs>
                        <rect width="400" height="400" fill="url(#household-pattern)"/>
                    </svg>
                `)}')
            `,
      }}
    >
      <div className="container mx-auto px-6 py-40 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 animate-fadeInUp">
          Unique Finds, Directly From The Creator
        </h1>
        <p
          className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fadeInUp"
          style={{ animationDelay: '200ms' }}
        >
          Discover everything from vintage treasures to handmade crafts. Buy, sell, and connect with
          a community of enthusiasts.
        </p>
        <button
          onClick={() => setPage('shop')}
          className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 animate-fadeInUp"
          style={{ animationDelay: '400ms' }}
        >
          Explore The Shop <ChevronRight />
        </button>
      </div>
    </section>

    <section className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Featured This Week
        </h2>
        <p className="text-slate-500 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
          A curated selection of our favorite items from talented sellers around the globe.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {ALL_PRODUCTS.slice(0, 4).map((p, i) => (
            <div key={p.id} className="animate-fadeInUp" style={{ animationDelay: `${i * 100}ms` }}>
              <ProductCard
                product={p}
                isWished={isInWishlist(p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <img
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJjb21tdW5pdHlCZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0U2RjNGRjtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNCM0Q5RkY7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjY29tbXVuaXR5QmcpIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMjAwIiByPSIzMCIgZmlsbD0iIzJDMkMyQyIvPjxyZWN0IHg9IjE4NSIgeT0iMjMwIiB3aWR0aD0iMzAiIGhlaWdodD0iNjAiIHJ4PSIxNSIgZmlsbD0iIzJDMkMyQyIvPjxjaXJjbGUgY3g9IjQwMCIgY3k9IjE4MCIgcj0iMjUiIGZpbGw9IiMyQzJDMkMiLz48cmVjdCB4PSIzOTAiIHk9IjIwNSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjUwIiByeD0iMTAiIGZpbGw9IiMyQzJDMkMiLz48Y2lyY2xlIGN4PSI2MDAiIGN5PSIyMjAiIHI9IjI4IiBmaWxsPSIjMkMyQzJDIi8+PHJlY3QgeD0iNTg1IiB5PSIyNDgiIHdpZHRoPSIzMCIgaGVpZ2h0PSI1NSIgcng9IjE1IiBmaWxsPSIjMkMyQzJDIi8+PHJlY3QgeD0iMTAwIiB5PSI0MDAiIHdpZHRoPSI2MDAiIGhlaWdodD0iMTAwIiByeD0iMjAiIGZpbGw9IiM0QTkwRTIiIG9wYWNpdHk9IjAuMyIvPjx0ZXh0IHg9IjQwMCIgeT0iNDYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMyQzJDMkMiPkNvbW11bml0eTwvdGV4dD48L3N2Zz4="
            alt="Community"
            className="rounded-lg shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              A Community-Driven Marketplace
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Marketify is more than just a platform to buy and sell. We're a community of creators,
              collectors, and curators passionate about unique and quality goods. We empower sellers
              and delight buyers.
            </p>
            <button
              onClick={() => setPage('about')}
              className="text-amber-500 font-semibold hover:text-amber-600 transition-colors"
            >
              Learn More About Us <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  </>
)

const ShopPage: React.FC<{
  onToggleWishlist: (product: Product) => void
  isInWishlist: (id: number) => boolean
  initialQuery?: string
}> = ({ onToggleWishlist, isInWishlist, initialQuery = '' }) => {
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
        const { productsAPI } = await import('./lib/api')
        const params: any = {}
        
        if (filter !== 'All') {
          // Find category ID by name
          const category = CATEGORIES.find(c => c.name === filter)
          if (category) params.category = category.id
        }
        
        if (searchQuery) params.search = searchQuery
        if (locationFilter) params.location = locationFilter
        
        const response = await productsAPI.getAll(params)
        setProducts(response.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        // Fallback to static data
        setProducts(ALL_PRODUCTS)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [filter, searchQuery, locationFilter])

  const filteredProducts = useMemo(() => {
    if (products.length === 0) {
      // Fallback filtering for static data
      const term = searchQuery.trim().toLowerCase()
      const byCategory =
        filter === 'All' ? ALL_PRODUCTS : ALL_PRODUCTS.filter((p) => p.category === filter)
      if (!term) return byCategory
      return byCategory.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      )
    }
    return products
  }, [products, filter, searchQuery])

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
        Shop Our Collection
      </h1>
      <p className="text-slate-500 dark:text-slate-300 mb-8">
        Find your next favorite item from thousands of unique listings.
      </p>

      {/* Location Filter */}
      <div className="mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 max-w-md">
            <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              📍 Filter by Location
            </label>
            <input
              type="text"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              placeholder="Enter city, state, or region..."
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
          {locationFilter && (
            <button
              onClick={() => setLocationFilter('')}
              className="mt-6 px-3 py-2 text-sm bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="flex space-x-2 mb-10 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('All')}
          className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === 'All' ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-500'}`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilter(c.name)}
            className={`px-4 py-2 font-medium transition-colors whitespace-nowrap ${filter === c.name ? 'text-amber-600 border-b-2 border-amber-600' : 'text-slate-500'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
          <span className="ml-3 text-slate-600 dark:text-slate-400">Loading products...</span>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              isWished={isInWishlist(p.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const AboutPage: React.FC = () => (
  <div className="bg-white dark:bg-slate-950">
    <div className="container mx-auto px-6 py-20">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">Our Mission</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300">
          To empower small creators and connect people with unique, high-quality goods in a
          community-focused online marketplace.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center my-20">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJzdHVkaW9CZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRjhEQztzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMEU2OEM7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjc3R1ZGlvQmcpIi8+PHJlY3QgeD0iMjAwIiB5PSIyMDAiIHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiByeD0iMTAiIGZpbGw9IiNEMkI0OEMiIHN0cm9rZT0iIzg0NTEzIiBzdHJva2Utd2lkdGg9IjIiLz48cmVjdCB4PSIyMjAiIHk9IjIyMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0Y1REVCMiIvPjxyZWN0IHg9IjMyMCIgeT0iMjIwIiB3aWR0aD0iODAiIGhlaWdodD0iNjAiIHJ4PSI1IiBmaWxsPSIjRjVERUIzIi8+PHJlY3QgeD0iNDIwIiB5PSIyMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI2MCIgcng9IjUiIGZpbGw9IiNGNURFQjMiLz48cmVjdCB4PSI1MjAiIHk9IjIyMCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNSIgZmlsbD0iI0Y1REVCMiIvPjxyZWN0IHg9IjI1MCIgeT0iMzAwIiB3aWR0aD0iMjAiIGhlaWdodD0iODAiIHJ4PSIxMCIgZmlsbD0iIzg0NTEzIi8+PHJlY3QgeD0iMzUwIiB5PSIzMDAiIHdpZHRoPSIyMCIgaGVpZ2h0PSI4MCIgcng9IjEwIiBmaWxsPSIjODQ1MTMiLz48cmVjdCB4PSI0NTAiIHk9IjMwMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjgwIiByeD0iMTAiIGZpbGw9IiM4NDUxMyIvPjwvc3ZnPg=="
          alt="Creators working in a studio"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            For the Love of Craft
          </h2>
          <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
            Marketify was founded on a simple idea: that the best products are made with passion. We
            wanted to create a space where artisans, collectors, and curators could share their
            creations with the world, and where shoppers could find items that tell a story.
          </p>
        </div>
      </div>

      <div className="text-center my-20">
        <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">
          Why Shop With Us?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <ShieldCheck />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
            <p className="text-slate-500 dark:text-slate-300">
              Shop with confidence with our buyer and seller protection.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <Headset />
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p className="text-slate-500 dark:text-slate-300">
              Our dedicated team is here to help you around the clock.
            </p>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
            <div className="mx-auto text-amber-500 mb-4">
              <Globe />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-slate-500 dark:text-slate-300">
              Connect with buyers and sellers from all over the world.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const BecomeSellerPage: React.FC<{ onStartSellingClick: () => void }> = ({
  onStartSellingClick,
}) => {
  return (
    <>
      <div className="bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            Turn Your Passion Into Profit
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            Join our community of creative entrepreneurs and start selling your unique products to a
            global audience.
          </p>
          <button
            onClick={onStartSellingClick}
            className="bg-amber-500 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Start Selling Today
          </button>
        </div>

        <div className="py-20 bg-white dark:bg-slate-950">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-slate-800 dark:text-slate-100 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">List Your Item</h3>
                <p className="text-slate-500 dark:text-slate-300">
                  Create your listing in minutes. Use our AI tools to write a great description.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Ship Your Order</h3>
                <p className="text-slate-500 dark:text-slate-300">
                  Once your item sells, pack it up and ship it to its new home.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Get Paid</h3>
                <p className="text-slate-500 dark:text-slate-300">
                  Securely receive your earnings with our fast and reliable payment system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// --- MODAL & WIDGET COMPONENTS ---
const SellItemModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const [itemName, setItemName] = useState('')
  const [itemKeywords, setItemKeywords] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemPrice, setItemPrice] = useState('')
  const [itemCategory, setItemCategory] = useState('')
  const [itemLocation, setItemLocation] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDetectingLocation, setIsDetectingLocation] = useState(false)
  const [locationDetected, setLocationDetected] = useState(false)

  // Auto-detect location when modal opens
  useEffect(() => {
    if (isOpen && !locationDetected) {
      detectLocation()
    }
  }, [isOpen, locationDetected])

  // Detect user's location
  const detectLocation = async () => {
    setIsDetectingLocation(true)
    
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords
            
            // Use reverse geocoding to get readable address
            // For demo, we'll use approximate Bay Area locations
            const location = await reverseGeocode(latitude, longitude)
            setItemLocation(location)
            setLocationDetected(true)
            setIsDetectingLocation(false)
          },
          (error) => {
            console.error('Location detection failed:', error)
            // Fallback to default location
            setItemLocation('San Francisco, CA')
            setLocationDetected(true)
            setIsDetectingLocation(false)
          },
          { timeout: 10000, enableHighAccuracy: true }
        )
      } else {
        // Fallback if geolocation not supported
        setItemLocation('San Francisco, CA')
        setLocationDetected(true)
        setIsDetectingLocation(false)
      }
    } catch (error) {
      console.error('Error detecting location:', error)
      setItemLocation('San Francisco, CA')
      setLocationDetected(true)
      setIsDetectingLocation(false)
    }
  }

  // Simple reverse geocoding for demo (in production, use Google Maps Geocoding API)
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // Demo: Return approximate location based on coordinates
    const bayAreaLocations = [
      'San Francisco, CA',
      'Oakland, CA', 
      'Berkeley, CA',
      'Palo Alto, CA',
      'San Jose, CA',
      'Mountain View, CA',
      'Fremont, CA',
      'Sunnyvale, CA'
    ]
    
    // Use coordinates to determine closest city (simplified for demo)
    // In reality, this would use a geocoding service
    const cityIndex = Math.abs(Math.floor((lat + lng) * 1000)) % bayAreaLocations.length
    return bayAreaLocations[cityIndex]
  }

  // Mock AI description generation
  const handleGenerateDescription = async () => {
    if (!itemName || !itemKeywords) {
      alert('Please enter an item name and some keywords first.')
      return
    }
    setIsGenerating(true)
    setItemDescription('AI is thinking...')

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const description = `Introducing the stunning ${itemName}! This piece is defined by its ${itemKeywords}, making it a must-have for any collection. Crafted with care and designed to impress, it's the perfect blend of style and quality. Don't miss out on this unique find!`
    setItemDescription(description)
    setIsGenerating(false)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!itemName || !itemPrice || !itemCategory || !itemLocation) {
      alert('Please fill in all required fields.')
      return
    }
    
    alert(`Item listed for sale! (Demo)\nName: ${itemName}\nPrice: ${itemPrice} kr\nCategory: ${itemCategory}\nLocation: ${itemLocation}`)
    
    // Reset form
    setItemName('')
    setItemKeywords('')
    setItemDescription('')
    setItemPrice('')
    setItemCategory('')
    setItemLocation('')
    setLocationDetected(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white/30 dark:bg-slate-900/20 dark:text-slate-100 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-3xl shadow-xl m-4 sm:max-w-xl sm:w-full z-10 p-8 transform transition-all duration-300 ease-in-out animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">List Your Item</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl rounded-full p-2"
          >
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="item-name"
              className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
            >
              Item Name
            </label>
            <input
              type="text"
              id="item-name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
              placeholder="e.g., Vintage Leather Jacket"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="item-keywords"
              className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
            >
              Keywords for AI
            </label>
            <input
              type="text"
              id="item-keywords"
              value={itemKeywords}
              onChange={(e) => setItemKeywords(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
              placeholder="e.g., 1980s, brown, size medium, bomber style"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="item-price"
                className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
              >
                Price (kr) *
              </label>
              <input
                type="number"
                id="item-price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
                placeholder="250.00"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div>
              <label
                htmlFor="item-category"
                className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
              >
                Category *
              </label>
              <select
                id="item-category"
                value={itemCategory}
                onChange={(e) => setItemCategory(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
                required
              >
                <option value="">Select category...</option>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Home & Garden">Home & Garden</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Crafts">Crafts</option>
                <option value="Collectibles">Collectibles</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="item-location"
              className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
            >
              Location *
              {isDetectingLocation && (
                <span className="text-amber-600 text-sm ml-2">📍 Detecting your location...</span>
              )}
              {locationDetected && !isDetectingLocation && (
                <span className="text-green-600 text-sm ml-2">✓ Location detected</span>
              )}
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="item-location"
                value={itemLocation}
                onChange={(e) => setItemLocation(e.target.value)}
                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
                placeholder="Enter your location..."
                required
              />
              <button
                type="button"
                onClick={detectLocation}
                disabled={isDetectingLocation}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white rounded-lg transition-colors duration-200 flex items-center space-x-1"
              >
                <span>📍</span>
                <span className="hidden sm:inline">{isDetectingLocation ? 'Detecting...' : 'Auto-detect'}</span>
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your location helps buyers find items near them
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="item-description"
              className="block text-slate-700 dark:text-slate-300 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="item-description"
              rows={5}
              value={itemDescription}
              onChange={(e) => setItemDescription(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:bg-slate-800 dark:text-slate-100"
              placeholder="Your detailed product description..."
            ></textarea>
            <button
              type="button"
              onClick={handleGenerateDescription}
              disabled={isGenerating}
              className="mt-2 flex items-center justify-center text-slate-800 dark:text-white font-semibold py-2 px-5 rounded-full bg-white/40 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-slate-800/70 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles /> {isGenerating ? 'Generating...' : 'Generate with AI ✨'}
            </button>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-slate-800 dark:text-white font-semibold py-2 px-6 rounded-full bg-white/40 dark:bg-slate-800/50 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl hover:bg-white/60 dark:hover:bg-slate-800/70 transition duration-300"
            >
              List Item
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const WishlistPanel: React.FC<{
  isOpen: boolean
  onClose: () => void
  wishlistItems: WishlistItem[]
  onRemoveItem: (productId: number) => void
}> = ({ isOpen, onClose, wishlistItems, onRemoveItem }) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white/30 dark:bg-slate-900/20 backdrop-blur-xl border-l border-white/30 dark:border-slate-700/30 shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col rounded-l-3xl`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Wishlist</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl rounded-full p-2"
          >
            <X />
          </button>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <div className="text-slate-300 mb-4 text-6xl">
              <Heart />
            </div>
            <h3 className="text-xl font-semibold text-slate-700">Your wishlist is empty</h3>
            <p className="text-slate-500 mt-2">Start saving items you love.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {wishlistItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 animate-fadeIn">
                <img
                  src={item.imageUrl}
                  alt={item.imageText}
                  className="w-20 h-20 rounded-md object-cover"
                />
                <div className="flex-grow">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-slate-500">{item.price.toFixed(2)} kr</p>
                </div>
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="text-slate-400 hover:text-red-500 bg-white/40 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl rounded-full p-2"
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

const DashboardPanel: React.FC<{
  isOpen: boolean
  onClose: () => void
  user: User | null
  onLogout: () => void
}> = ({ isOpen, onClose, user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'profile' | 'listings' | 'orders'>('overview')
  const [userListings, setUserListings] = useState<Product[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    phone: user?.phone || ''
  })

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setEditForm({
        name: user.name,
        email: user.email,
        location: user.location || '',
        phone: user.phone || ''
      })
    }
  }, [user])

  // Fetch user's listings
  useEffect(() => {
    const fetchUserListings = async () => {
      try {
        const { productsAPI } = await import('./lib/api')
        const response = await productsAPI.getUserListings()
        setUserListings(response.products || [])
      } catch (error) {
        console.error('Error fetching user listings:', error)
      }
    }
    
    if (activeTab === 'listings' && user) {
      fetchUserListings()
    }
  }, [activeTab, user])

  const handleSaveProfile = async () => {
    if (!user) return
    try {
      const { authAPI } = await import('./lib/api')
      await authAPI.updateProfile(editForm)
      setIsEditing(false)
      // Note: In a full implementation, you'd want to update the user state here
    } catch (error: any) {
      console.error('Error updating profile:', error)
      alert(error.response?.data?.error || 'Failed to update profile')
    }
  }

  const renderTabContent = () => {
    if (!user) {
      return (
        <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
          <div className="text-slate-300 mb-4 text-6xl">
            <UserIcon />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">Please log in</h3>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Access your dashboard by logging in.</p>
        </div>
      )
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="p-6 space-y-4">
            <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-xl p-4">
              <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-2">Account Overview</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Name:</span> {user.name}</p>
                <p><span className="font-medium">Email:</span> {user.email}</p>
                {user.location && <p><span className="font-medium">Location:</span> {user.location}</p>}
                {user.phone && <p><span className="font-medium">Phone:</span> {user.phone}</p>}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-amber-100/60 dark:bg-amber-900/30 backdrop-blur-xl p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Active Listings</h3>
                <p className="text-2xl font-bold text-amber-600">{userListings.filter(l => l.isActive).length}</p>
              </div>
              <div className="bg-blue-100/60 dark:bg-blue-900/30 backdrop-blur-xl p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Total Listings</h3>
                <p className="text-2xl font-bold text-blue-600">{userListings.length}</p>
              </div>
            </div>
          </div>
        )
      
      case 'profile':
        return (
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Edit Profile</h3>
                <input
                  type="text"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  className="w-full p-3 border border-white/30 dark:border-slate-700/30 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                  className="w-full p-3 border border-white/30 dark:border-slate-700/30 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={editForm.location}
                  onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                  className="w-full p-3 border border-white/30 dark:border-slate-700/30 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                  className="w-full p-3 border border-white/30 dark:border-slate-700/30 rounded-lg bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl"
                />
                <div className="flex space-x-3">
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-slate-300 hover:bg-slate-400 text-slate-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Edit
                  </button>
                </div>
                <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-xl p-4 space-y-2">
                  <p><span className="font-medium">Name:</span> {user.name}</p>
                  <p><span className="font-medium">Email:</span> {user.email}</p>
                  <p><span className="font-medium">Location:</span> {user.location || 'Not set'}</p>
                  <p><span className="font-medium">Phone:</span> {user.phone || 'Not set'}</p>
                  <p><span className="font-medium">Member since:</span> {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}</p>
                </div>
              </div>
            )}
          </div>
        )
      
      case 'listings':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">My Listings ({userListings.length})</h3>
            {userListings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500 dark:text-slate-400">No listings yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {userListings.map((listing) => (
                  <div key={listing.id} className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl rounded-lg p-4 flex items-center space-x-3">
                    <img
                      src={listing.imageUrl}
                      alt={listing.imageText}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">{listing.name}</h4>
                      <p className="text-xs text-slate-500">{listing.price} kr</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${listing.isActive ? 'bg-green-500' : 'bg-slate-400'}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      
      case 'orders':
        return (
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Order History</h3>
            <div className="text-center py-8">
              <p className="text-slate-500 dark:text-slate-400">Order history feature coming soon!</p>
            </div>
          </div>
        )
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 left-0 h-full w-full max-w-md bg-white/30 dark:bg-slate-900/20 backdrop-blur-xl border-r border-white/30 dark:border-slate-700/30 shadow-2xl z-[60] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col rounded-r-3xl`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white bg-white/40 dark:bg-slate-800/40 border border-white/30 dark:border-slate-700/30 backdrop-blur-xl rounded-full p-2"
          >
            <X />
          </button>
        </div>

        {user && (
          <div className="px-6 py-3 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name[0]}
              </div>
              <div>
                <p className="font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {user && (
          <div className="px-6 py-3 border-b">
            <div className="flex space-x-1">
              {[
                { key: 'overview', label: '📊', title: 'Overview' },
                { key: 'profile', label: '👤', title: 'Profile' },
                { key: 'listings', label: '📦', title: 'Listings' },
                { key: 'orders', label: '🛒', title: 'Orders' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-white/60 dark:bg-slate-800/60 text-amber-600 shadow'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                  title={tab.title}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="flex-grow overflow-y-auto">
          {renderTabContent()}
        </div>

        {user && (
          <div className="p-6 border-t">
            <button
              onClick={onLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  )
}

// --- FLOATING SIDE CONTROLS (theme + wishlist) ---
const FloatingIconButton: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="p-3 rounded-full backdrop-blur-xl bg-white/50 dark:bg-slate-900/40 border border-white/30 dark:border-slate-700/30 shadow-lg hover:shadow-xl text-slate-800 dark:text-slate-200 transition-all duration-300"
  >
    {children}
  </button>
)

const FloatingSideControls: React.FC<{
  isDark: boolean
  onToggleTheme: () => void
  wishlistCount: number
  onWishlistClick: () => void
  showSearch: boolean
  onToggleSearch: () => void
  user: User | null
  onDashboardClick: () => void
}> = ({ isDark, onToggleTheme, wishlistCount, onWishlistClick, showSearch, onToggleSearch, user, onDashboardClick }) => (
  <div className={`fixed top-6 right-6 z-50 flex items-center space-x-3 transition-opacity duration-200 ${showSearch ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
    <FloatingIconButton onClick={onToggleSearch}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </FloatingIconButton>
    <FloatingIconButton onClick={onToggleTheme}>{isDark ? <Sun /> : <Moon />}</FloatingIconButton>
    {user && (
      <FloatingIconButton onClick={() => {
        console.log('Dashboard button clicked!');
        onDashboardClick();
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      </FloatingIconButton>
    )}
    <FloatingIconButton onClick={onWishlistClick}>
      <div className="relative">
        <Heart filled={wishlistCount > 0} size={24} />
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-sky-500 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full font-bold">
            {wishlistCount}
          </span>
        )}
      </div>
    </FloatingIconButton>
  </div>
)

// Simple profile/ user icon
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
)

// Floating profile button – top-left
const FloatingProfileButton: React.FC<{ 
  onClick: () => void; 
  user: User | null; 
  onLogout: () => void;
  onDashboard: () => void;
}> = ({ onClick, user, onLogout, onDashboard }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="fixed top-6 left-6 z-50">
      <FloatingIconButton 
        onClick={user ? () => setShowDropdown(!showDropdown) : onClick}
      >
        {user ? (
          <span className="font-bold">{user.name[0]}</span>
        ) : (
          <UserIcon />
        )}
      </FloatingIconButton>
      
      {user && showDropdown && (
        <div className="absolute top-12 left-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/30 dark:border-slate-700/30 rounded-xl shadow-lg min-w-[200px] py-2">
          <div className="px-4 py-2 border-b border-white/20 dark:border-slate-700/50">
            <p className="font-medium text-slate-800 dark:text-slate-200">{user.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
          </div>
          <button
            onClick={() => {
              onDashboard()
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-colors"
          >
            Dashboard
          </button>
          <button
            onClick={() => {
              onLogout()
              setShowDropdown(false)
            }}
            className="w-full text-left px-4 py-2 text-slate-800 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}



// --- DEMO MAP COMPONENT (Works without Google Maps API) ---
const DemoMap: React.FC<{
  products: Product[]
  onProductSelect?: (product: Product) => void
}> = ({ products, onProductSelect }) => {
  // Bay Area locations with approximate coordinates for demo
  const locationCoords: { [key: string]: { lat: number, lng: number } } = {
    'San Francisco, CA': { lat: 37.7749, lng: -122.4194 },
    'Oakland, CA': { lat: 37.8044, lng: -122.2712 },
    'Berkeley, CA': { lat: 37.8715, lng: -122.2730 },
    'Palo Alto, CA': { lat: 37.4419, lng: -122.1430 },
    'San Jose, CA': { lat: 37.3382, lng: -121.8863 },
    'Mountain View, CA': { lat: 37.3861, lng: -122.0839 },
    'Fremont, CA': { lat: 37.5485, lng: -121.9886 },
    'Sunnyvale, CA': { lat: 37.3688, lng: -122.0363 }
  }

  const productsWithCoords = products.filter(p => p.location && locationCoords[p.location])

  const handleProductClick = (product: Product) => {
    if (onProductSelect) {
      onProductSelect(product)
    }
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-slate-100 dark:bg-slate-800 rounded-lg shadow-lg relative overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-slate-700 dark:to-slate-600">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Bay Area Outline (simplified) */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
          <path 
            d="M 50 100 Q 80 80 120 90 Q 160 85 200 95 Q 240 100 280 110 Q 320 120 350 140 L 350 200 Q 320 220 280 210 Q 240 200 200 195 Q 160 190 120 200 Q 80 210 50 190 Z"
            fill="rgba(59, 130, 246, 0.1)"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="2"
          />
        </svg>
          </div>
          
      {/* Product Markers */}
      <div className="absolute inset-0">
        {productsWithCoords.map((product) => {
          const coords = locationCoords[product.location!]
          // Convert lat/lng to pixel positions (simplified)
          const x = ((coords.lng + 122.5) / 1.0) * 100
          const y = ((38.0 - coords.lat) / 0.5) * 100
          
          return (
            <div
              key={product.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
              style={{ 
                left: `${Math.max(5, Math.min(95, x))}%`, 
                top: `${Math.max(5, Math.min(95, y))}%` 
              }}
              onClick={() => handleProductClick(product)}
            >
              <div className="relative">
                <div className="w-8 h-8 bg-amber-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <span className="text-white text-xs">🏪</span>
          </div>
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white dark:bg-slate-800 px-2 py-1 rounded shadow-lg text-xs whitespace-nowrap z-10 opacity-0 hover:opacity-100 transition-opacity">
                  {product.name}
          </div>
      </div>
    </div>
  )
        })}
        </div>
        
      {/* Map Controls */}
      <div className="absolute top-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
        <h3 className="font-semibold text-sm mb-2">Bay Area Products</h3>
        <p className="text-xs text-slate-600 dark:text-slate-400">{productsWithCoords.length} items near you</p>
          </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-3">
        <div className="flex items-center space-x-2 text-xs">
          <div className="w-4 h-4 bg-amber-500 rounded-full border border-white"></div>
          <span>Product Location</span>
      </div>
      </div>

      {/* No Google Maps API Notice */}
      <div className="absolute top-4 right-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 max-w-xs">
        <p className="text-xs text-blue-800 dark:text-blue-200">
          📍 Demo Map - Add Google Maps API key for full functionality
        </p>
        </div>
    </div>
  )
}

// --- GOOGLE MAPS COMPONENT (Fallback to Demo) ---
const GoogleMap: React.FC<{
  products: Product[]
  onProductSelect?: (product: Product) => void
}> = ({ products, onProductSelect }) => {
  const [useDemo, setUseDemo] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.Marker[]>([])

  useEffect(() => {
    const initMap = async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        setUseDemo(true)
        return
      }

      const loader = new Loader({
        apiKey,
        version: 'weekly',
        libraries: ['places']
      })

      try {
        await loader.load()
        
        if (mapRef.current && !mapInstanceRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat: 37.7749, lng: -122.4194 },
            zoom: 10,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          })
          
          mapInstanceRef.current = map
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setUseDemo(true)
      }
    }

    initMap()
  }, [])

  useEffect(() => {
    if (!mapInstanceRef.current || useDemo) return

    markersRef.current.forEach(marker => marker.setMap(null))
    markersRef.current = []

    products.forEach(product => {
      if (product.location && mapInstanceRef.current) {
        const lat = 37.7749 + (Math.random() - 0.5) * 0.1
        const lng = -122.4194 + (Math.random() - 0.5) * 0.1

        const marker = new google.maps.Marker({
          position: { lat, lng },
          map: mapInstanceRef.current,
          title: product.name,
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#f59e0b" stroke="#ffffff" stroke-width="2"/>
                <text x="20" y="25" text-anchor="middle" font-family="Arial" font-size="20" fill="white">🏪</text>
              </svg>
            `),
            scaledSize: new google.maps.Size(40, 40)
          }
        })

        marker.addListener('click', () => {
          if (onProductSelect) {
            onProductSelect(product)
          }
        })

        markersRef.current.push(marker)
      }
    })
  }, [products, onProductSelect, useDemo])

  if (useDemo) {
    return <DemoMap products={products} onProductSelect={onProductSelect} />
  }

  return (
    <div 
      ref={mapRef} 
      className="w-full h-full min-h-[400px] rounded-lg shadow-lg"
      style={{ minHeight: '500px' }}
    />
  )
}

// --- SIDEBAR COMPONENT ---
const Sidebar: React.FC<{
  user: User | null
  activeTab: SidebarTab
  onTabChange: (tab: SidebarTab) => void
  onLogout: () => void
  userListings: Product[]
  onDeleteListing: (id: number) => void
  onToggleListingStatus: (id: number, isActive: boolean) => void
}> = ({ 
  user, 
  activeTab, 
  onTabChange, 
  onLogout, 
  userListings,
  onDeleteListing,
  onToggleListingStatus 
}) => {
  if (!user) return null

  const sidebarItems = [
    { id: 'dashboard' as SidebarTab, label: 'Dashboard', icon: '📊' },
    { id: 'listings' as SidebarTab, label: 'My Listings', icon: '📦' },
    { id: 'history' as SidebarTab, label: 'History', icon: '📋' },
    { id: 'profile' as SidebarTab, label: 'Profile', icon: '👤' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Welcome back, {user.name}!
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-amber-800 dark:text-amber-200">Active Listings</h3>
                <p className="text-2xl font-bold text-amber-600">{userListings.filter(l => l.isActive).length}</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Total Listings</h3>
                <p className="text-2xl font-bold text-blue-600">{userListings.length}</p>
              </div>
            </div>
          </div>
        )
      
      case 'listings':
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">My Listings</h2>
              <button className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors text-sm">
                Add New
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {userListings.length === 0 ? (
                <p className="text-slate-500 dark:text-slate-400 text-center py-8">
                  No listings yet. Create your first listing!
                </p>
              ) : (
                userListings.map((listing) => (
                  <div key={listing.id} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-slate-800 dark:text-slate-200">{listing.name}</h3>
                      {!listing.isActive && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Inactive</span>
                      )}
                    </div>
                    <p className="text-amber-600 font-semibold mb-2">{listing.price} kr</p>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => onToggleListingStatus(listing.id, listing.isActive || false)}
                        className={`px-3 py-1 text-xs rounded ${
                          listing.isActive 
                            ? 'bg-orange-500 hover:bg-orange-600' 
                            : 'bg-green-500 hover:bg-green-600'
                        } text-white transition-colors`}
                      >
                        {listing.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button 
                        onClick={() => onDeleteListing(listing.id)}
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )
      
      case 'history':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Activity History</h2>
            <div className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Today</p>
                <p className="font-medium">Viewed 5 products in Electronics</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Yesterday</p>
                <p className="font-medium">Added item to wishlist</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">2 days ago</p>
                <p className="font-medium">Updated profile information</p>
              </div>
            </div>
          </div>
        )
      
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Name</label>
                <p className="text-slate-800 dark:text-slate-200">{user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Email</label>
                <p className="text-slate-800 dark:text-slate-200">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Location</label>
                <p className="text-slate-800 dark:text-slate-200">{user.location || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">Phone</label>
                <p className="text-slate-800 dark:text-slate-200">{user.phone || 'Not specified'}</p>
              </div>
              <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="w-80 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-r border-white/30 dark:border-slate-700/30 h-full flex flex-col">
      {/* User Info Header */}
      <div className="p-6 border-b border-white/30 dark:border-slate-700/30">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user.name[0]}
          </div>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? 'bg-amber-500 text-white shadow'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="border-t border-white/30 dark:border-slate-700/30">
          {renderContent()}
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t border-white/30 dark:border-slate-700/30">
        <button
          onClick={onLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <span className="text-lg">🚪</span>
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}

// --- MAP PAGE COMPONENT ---
const MapPage: React.FC<{
  user: User | null
  onLogout: () => void
}> = ({ user, onLogout }) => {
  const [sidebarTab, setSidebarTab] = useState<SidebarTab>('dashboard')
  const [products, setProducts] = useState<Product[]>([])
  const [userListings, setUserListings] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // Fetch products for map markers
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { productsAPI } = await import('./lib/api')
        const response = await productsAPI.getAll()
        setProducts(response.products || [])
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts(ALL_PRODUCTS) // Fallback to static data
      }
    }

    fetchProducts()
  }, [])

  // Fetch user listings
  useEffect(() => {
    const fetchUserListings = async () => {
      if (!user) return
      
      try {
        const { productsAPI } = await import('./lib/api')
        const response = await productsAPI.getUserListings()
        setUserListings(response.products || [])
      } catch (error) {
        console.error('Error fetching user listings:', error)
      }
    }

    fetchUserListings()
  }, [user])

  const handleDeleteListing = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this listing?')) return
    
    try {
      const { productsAPI } = await import('./lib/api')
      await productsAPI.delete(productId)
      setUserListings(prev => prev.filter(p => p.id !== productId))
    } catch (error: any) {
      console.error('Error deleting listing:', error)
      alert(error.response?.data?.error || 'Failed to delete listing')
    }
  }

  const handleToggleListingStatus = async (productId: number, isActive: boolean) => {
    try {
      const { productsAPI } = await import('./lib/api')
      await productsAPI.update(productId, { isActive: !isActive })
      setUserListings(prev => prev.map(p => 
        p.id === productId ? { ...p, isActive: !isActive } : p
      ))
    } catch (error: any) {
      console.error('Error updating listing:', error)
      alert(error.response?.data?.error || 'Failed to update listing')
    }
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Please log in to access the map
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You need to be logged in to view the interactive map and manage your listings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <Sidebar
        user={user}
        activeTab={sidebarTab}
        onTabChange={setSidebarTab}
        onLogout={onLogout}
        userListings={userListings}
        onDeleteListing={handleDeleteListing}
        onToggleListingStatus={handleToggleListingStatus}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-white/30 dark:border-slate-700/30 p-4">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            Marketplace Map
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Discover products near you
          </p>
        </div>

        {/* Map Container */}
        <div className="flex-1 p-4">
          <GoogleMap 
            products={products}
            onProductSelect={setSelectedProduct}
          />
        </div>

        {/* Selected Product Info */}
        {selectedProduct && (
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-t border-white/30 dark:border-slate-700/30 p-4">
            <div className="flex items-center space-x-4">
              <img
                src={selectedProduct.imageUrl || '/api/placeholder/100/100'}
                alt={selectedProduct.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-slate-200">
                  {selectedProduct.name}
                </h3>
                <p className="text-amber-600 font-semibold">{selectedProduct.price} kr</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {selectedProduct.location && `📍 ${selectedProduct.location}`}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// --- AUTH MODAL ---
interface User { 
  id: number;
  email: string; 
  name: string;
  location?: string;
  phone?: string;
  joinedAt?: string;
}

const AuthModal: React.FC<{
  isOpen: boolean
  onClose: () => void
  onLogin: (user: User) => void
}> = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [location, setLocation] = useState('')
  const [phone, setPhone] = useState('')

  if (!isOpen) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    try {
      let response
      if (mode === 'signup') {
        // Import the authAPI at the top of the file
        const { authAPI } = await import('./lib/api')
        response = await authAPI.register(name, email, password, location, phone)
      } else {
        const { authAPI } = await import('./lib/api')
        response = await authAPI.login(email, password)
      }
      
      // Store token and user data
      localStorage.setItem('auth_token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      
      // Call the onLogin callback with user data
      onLogin(response.user)
      onClose()
      
      // Clear form
      setEmail('')
      setPassword('')
      setName('')
      setLocation('')
      setPhone('')
    } catch (error: any) {
      console.error('Authentication error:', error)
      alert(error.response?.data?.error || 'Authentication failed. Please try again.')
    }
  }

  // Mock social login handlers for demo
  const handleGoogleLogin = async () => {
    try {
      // Simulate Google OAuth flow
      alert('Google OAuth would open here in production!')
      
      // Mock user data for demo
      const mockUser = {
        id: Date.now(),
        name: 'Google User',
        email: 'user@gmail.com',
        location: 'Stockholm, Sweden',
        phone: '+46 70 123 4567',
        joinedAt: new Date().toISOString()
      }
      
      // Store mock token and user data
      localStorage.setItem('auth_token', 'mock_google_token_' + Date.now())
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      onLogin(mockUser)
      onClose()
    } catch (error) {
      console.error('Google login error:', error)
      alert('Google login failed. Please try again.')
    }
  }

  const handleFacebookLogin = async () => {
    try {
      // Simulate Facebook OAuth flow
      alert('Facebook OAuth would open here in production!')
      
      // Mock user data for demo
      const mockUser = {
        id: Date.now(),
        name: 'Facebook User',
        email: 'user@facebook.com',
        location: 'Göteborg, Sweden',
        phone: '+46 70 987 6543',
        joinedAt: new Date().toISOString()
      }
      
      // Store mock token and user data
      localStorage.setItem('auth_token', 'mock_facebook_token_' + Date.now())
      localStorage.setItem('user', JSON.stringify(mockUser))
      
      onLogin(mockUser)
      onClose()
    } catch (error) {
      console.error('Facebook login error:', error)
      alert('Facebook login failed. Please try again.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20 backdrop-blur-md" onClick={onClose}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-400/30 to-teal-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-orange-400/30 to-amber-400/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div
        className="relative bg-white/10 dark:bg-slate-900/20 backdrop-blur-2xl border border-white/20 dark:border-slate-700/30 rounded-3xl shadow-2xl w-96 p-8 animate-fadeInDown"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            {mode === 'login' ? 'Welcome Back' : 'Join Marketify'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account today'}
          </p>
        </div>
        
        {/* Mode Toggle */}
        <div className="relative bg-slate-100/50 dark:bg-slate-800/50 rounded-2xl p-1 mb-8">
          <div className="relative flex">
            {/* Sliding Background */}
            <div 
              className="absolute top-1 bottom-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl transition-all duration-300 ease-out" 
              style={{
                left: mode === 'login' ? '4px' : 'calc(50% + 2px)',
                right: mode === 'login' ? 'calc(50% - 2px)' : '4px',
                width: mode === 'login' ? 'calc(50% - 4px)' : 'calc(50% - 4px)'
              }}
            ></div>
            <button
              onClick={() => setMode('login')}
              className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 relative z-10 ${
                mode === 'login' 
                  ? 'text-white' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`flex-1 px-6 py-3 rounded-xl text-sm font-semibold transition-colors duration-300 relative z-10 ${
                mode === 'signup' 
                  ? 'text-white' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <>
              <div className="space-y-4">
                <div className="relative">
              <input
                type="text"
                    placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                    className="w-full px-4 py-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pointer-events-none"></div>
                </div>
                <div className="relative">
              <input
                type="text"
                placeholder="Location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 pointer-events-none"></div>
                </div>
                <div className="relative">
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
              />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 pointer-events-none"></div>
                </div>
              </div>
            </>
          )}
          <div className="relative">
          <input
            type="email"
              placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
              className="w-full px-4 py-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
          />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 pointer-events-none"></div>
          </div>
          <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
              className="w-full px-4 py-4 rounded-2xl bg-white/20 dark:bg-slate-800/30 border border-white/30 dark:border-slate-700/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200 backdrop-blur-sm text-slate-800 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 pointer-events-none"></div>
          </div>
          
          <button 
            type="submit" 
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold hover:from-emerald-600 hover:to-teal-600 transform hover:scale-[1.02] transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        {/* Social Login Options */}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20 dark:border-slate-600/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/10 dark:bg-slate-900/20 backdrop-blur-sm text-slate-500 dark:text-slate-400 rounded-full">
                {mode === 'login' ? 'Or continue with' : 'Or sign up with'}
              </span>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Google Login Button */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="group relative w-full inline-flex justify-center items-center px-4 py-4 border border-white/30 dark:border-slate-600/30 rounded-2xl shadow-lg bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 hover:scale-[1.02] transition-all duration-200"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <svg className="w-5 h-5 mr-3 relative z-10" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="relative z-10">Google</span>
            </button>
            
            {/* Facebook Login Button */}
            <button
              type="button"
              onClick={handleFacebookLogin}
              className="group relative w-full inline-flex justify-center items-center px-4 py-4 border border-white/30 dark:border-slate-600/30 rounded-2xl shadow-lg bg-white/20 dark:bg-slate-800/30 backdrop-blur-sm text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-white/30 dark:hover:bg-slate-700/50 hover:scale-[1.02] transition-all duration-200"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              <svg className="w-5 h-5 mr-3 relative z-10" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="relative z-10">Facebook</span>
            </button>
          </div>
          
          <p className="mt-6 text-xs text-center text-slate-500 dark:text-slate-400 leading-relaxed">
            By continuing, you agree to our{' '}
            <span className="text-emerald-500 hover:text-emerald-400 cursor-pointer transition-colors">Terms of Service</span>
            {' '}and{' '}
            <span className="text-emerald-500 hover:text-emerald-400 cursor-pointer transition-colors">Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// --- MAIN APP COMPONENT ---
const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home')
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [isSellModalOpen, setIsSellModalOpen] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const [, setIsScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [globalSearch, setGlobalSearch] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthOpen, setIsAuthOpen] = useState(false)

  // Check for existing authentication on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    const savedToken = localStorage.getItem('auth_token')
    
    if (savedUser && savedToken) {
      try {
        const parsedUser = JSON.parse(savedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error('Error parsing saved user:', error)
        localStorage.removeItem('user')
        localStorage.removeItem('auth_token')
      }
    }
  }, [])

  const searchSuggestions = useMemo(() => {
    const term = globalSearch.trim().toLowerCase()
    if (!term) return [] as Product[]
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
    ).slice(0, 6)
  }, [globalSearch])

  const handleSubmitGlobalSearch = () => {
    if (!globalSearch.trim()) return
    setPage('shop')
    setShowSearch(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [setIsScrolled])

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme')
      if (stored === 'dark') {
        setIsDark(true)
        return
      }
      if (stored === 'light') {
        setIsDark(false)
        return
      }
    } catch {
      // Ignore localStorage access errors
    }
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDark(prefersDark)
  }, [])

  // Apply theme class and persist
  useEffect(() => {
    const root = document.documentElement
    if (isDark) root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // Ignore localStorage access errors
    }
  }, [isDark])

  // Trigger page transition animation
  const handleSetPage = (newPage: Page) => {
    if (page !== newPage) {
      setPage(newPage)
      setAnimationKey((prev) => prev + 1)
    }
  }

  const handleRemoveWishlistItem = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const handleToggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  const wishlistCount = useMemo(() => wishlistItems.length, [wishlistItems])
  const isInWishlist = useCallback(
    (id: number) => wishlistItems.some((i) => i.id === id),
    [wishlistItems]
  )
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems((prev) => {
      const exists = prev.some((p) => p.id === product.id)
      if (exists) return prev.filter((p) => p.id !== product.id)
      return [...prev, product]
    })
  }

  const handleLogin = (u: User) => setUser(u)
  
  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <HomePage
            setPage={handleSetPage}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )
      case 'shop':
        return (
          <ShopPage
            onToggleWishlist={handleToggleWishlist}
            isInWishlist={isInWishlist}
            initialQuery={globalSearch}
          />
        )
      case 'about':
        return <AboutPage />
      case 'sell':
        return <BecomeSellerPage onStartSellingClick={() => setIsSellModalOpen(true)} />
      case 'dashboard':
        // Redirect to home and open dashboard panel instead
        if (user) {
          setPage('home')
          setIsDashboardOpen(true)
        }
        return <HomePage setPage={handleSetPage} isInWishlist={isInWishlist} onToggleWishlist={handleToggleWishlist} />
      case 'map':
        return <MapPage user={user} onLogout={handleLogout} />
      default:
        return (
          <HomePage
            setPage={handleSetPage}
            isInWishlist={isInWishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )
    }
  }

  return (
    <div className="font-sans bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-300">
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

      {/* Floating translucent header bar */}
      <FloatingHeaderBar setPage={handleSetPage} activePage={page} />
      <FloatingSideControls
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
        wishlistCount={wishlistCount}
        onWishlistClick={() => setIsWishlistOpen(true)}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((v) => !v)}
        user={user}
        onDashboardClick={() => {
          console.log('Setting dashboard open to true');
          setIsDashboardOpen(true);
        }}
      />
      <main key={animationKey} className="animate-fadeIn">
        {renderPage()}
      </main>
      <Footer />

      <WishlistPanel
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveItem={handleRemoveWishlistItem}
      />
      <DashboardPanel
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        user={user}
        onLogout={handleLogout}
      />
      <SellItemModal isOpen={isSellModalOpen} onClose={() => setIsSellModalOpen(false)} />

      {showSearch && (
        <div className="fixed top-6 right-6 z-50 w-80">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Search</h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSubmitGlobalSearch(); }}>
                <input
                  autoFocus
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                />
              </form>
              
              {searchSuggestions.length > 0 && (
                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                  {searchSuggestions.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setGlobalSearch(p.name)
                        handleSubmitGlobalSearch()
                      }}
                      className="w-full text-left p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded text-sm"
                    >
                      <div className="font-medium text-slate-800 dark:text-slate-200">{p.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{p.category} • {p.price} kr</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* profile button */}
      <FloatingProfileButton 
        onClick={() => setIsAuthOpen(true)} 
        user={user} 
        onLogout={handleLogout}
        onDashboard={() => setPage('dashboard')}
      />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLogin={handleLogin} />
    </div>
  )
}

export default App
