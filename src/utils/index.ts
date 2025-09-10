// ================================
// UTILITY FUNCTIONS
// ================================

export const generateId = () => Math.floor(Math.random() * 1000000)

export const detectLocation = (): Promise<string> => {
  return new Promise((resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const location = reverseGeocode(latitude, longitude)
          resolve(location)
        },
        () => resolve("San Francisco, CA")
      )
    } else {
      resolve("San Francisco, CA")
    }
  })
}

export const reverseGeocode = (lat: number, lng: number): string => {
  const bayAreaLocations = [
    "San Francisco, CA", "Oakland, CA", "Berkeley, CA", "Palo Alto, CA",
    "San Jose, CA", "Mountain View, CA", "Fremont, CA", "Sunnyvale, CA"
  ]
  const index = Math.floor((Math.abs(lat) + Math.abs(lng)) * 100) % bayAreaLocations.length
  return bayAreaLocations[index]
}
