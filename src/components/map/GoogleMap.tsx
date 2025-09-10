import React, { useState, useEffect, useRef } from 'react'
import type { Product } from '../../types'
import { DemoMap } from './DemoMap'

interface GoogleMapProps {
  products: Product[]
  onProductSelect?: (product: Product) => void
}

export const GoogleMap: React.FC<GoogleMapProps> = ({ products, onProductSelect }) => {
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

      // Dynamic import for Google Maps Loader
      const { Loader } = await import('@googlemaps/js-api-loader')
      
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
                <circle cx="20" cy="20" r="18" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
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
