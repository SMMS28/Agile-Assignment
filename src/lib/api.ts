import axios from 'axios'

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      window.location.reload()
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },
  
  register: async (name: string, email: string, password: string, location?: string, phone?: string) => {
    const response = await api.post('/auth/register', { name, email, password, location, phone })
    return response.data
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile')
    return response.data
  },
  
  updateProfile: async (data: { name?: string; email?: string }) => {
    const response = await api.put('/auth/profile', data)
    return response.data
  }
}

// Products API
export const productsAPI = {
  getAll: async (params?: { category?: number; search?: string; location?: string; page?: number; limit?: number }) => {
    const response = await api.get('/products', { params })
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },
  
  create: async (productData: {
    name: string
    description?: string
    price: number
    imageUrl?: string
    imageText?: string
    categoryId: number
    location?: string
  }) => {
    const response = await api.post('/products', productData)
    return response.data
  },

  getUserListings: async (params?: { page?: number; limit?: number }) => {
    const response = await api.get('/products/user/listings', { params })
    return response.data
  },

  update: async (id: number, productData: {
    name?: string
    description?: string
    price?: number
    categoryId?: number
    location?: string
    isActive?: boolean
  }) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  delete: async (id: number) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  }
}

// Categories API
export const categoriesAPI = {
  getAll: async () => {
    const response = await api.get('/categories')
    return response.data
  },
  
  getById: async (id: number) => {
    const response = await api.get(`/categories/${id}`)
    return response.data
  }
}

// Wishlist API
export const wishlistAPI = {
  get: async () => {
    const response = await api.get('/wishlist')
    return response.data
  },
  
  add: async (productId: number) => {
    const response = await api.post('/wishlist', { productId })
    return response.data
  },
  
  remove: async (productId: number) => {
    const response = await api.delete(`/wishlist/${productId}`)
    return response.data
  },
  
  toggle: async (productId: number) => {
    const response = await api.post('/wishlist/toggle', { productId })
    return response.data
  }
}

export default api
