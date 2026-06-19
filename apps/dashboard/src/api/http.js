import axios from 'axios'
import { useAuthStore } from '../features/auth/auth.store.js'
import { getApiBaseUrl } from './api-base-url.js'

const API_URL = getApiBaseUrl()

export const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      originalRequest.url &&
      !originalRequest.url.includes('/auth/refresh') &&
      !originalRequest.url.includes('/auth/login')
    ) {
      originalRequest._retry = true
      try {
        const refreshResponse = await http.post('/auth/refresh')
        const accessToken = refreshResponse.data?.meta?.accessToken
        if (accessToken) {
          useAuthStore.getState().setAccessToken(accessToken)
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return http(originalRequest)
        }
      } catch (refreshError) {
        useAuthStore.getState().clearAuth()
        document.cookie = 'hasRefreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
      }
    }

    return Promise.reject(error)
  }
)
