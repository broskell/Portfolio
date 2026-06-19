import { http } from '../../api/http.js'

const redactAuthPayload = (credentials) => ({
  email: credentials?.email,
  password: credentials?.password ? '[REDACTED]' : undefined
})

export const parseAuthPayload = (payload) => ({
  accessToken: payload?.meta?.accessToken || payload?.accessToken || null,
  user: payload?.data?.user || payload?.user || null
})

export const login = async (credentials) => {
  try {
    console.log('Request', '/auth/login', redactAuthPayload(credentials))
    const response = await http.post('/auth/login', credentials)
    console.log('Response', response.data)
    return response.data
  } catch (error) {
    console.log('Error', error.response?.status, error.response?.data)
    throw error
  }
}

export const logout = async () => {
  try {
    console.log('Request', '/auth/logout')
    const response = await http.post('/auth/logout')
    console.log('Response', response.data || null)
    return response.data
  } catch (error) {
    console.log('Error', error.response?.status, error.response?.data)
    throw error
  }
}

export const refreshSession = async () => {
  try {
    console.log('Request', '/auth/refresh')
    const response = await http.post('/auth/refresh')
    console.log('Response', response.data)
    return response.data
  } catch (error) {
    console.log('Error', error.response?.status, error.response?.data)
    throw error
  }
}

export const getMe = async () => {
  try {
    console.log('Request', '/auth/me')
    const response = await http.get('/auth/me')
    console.log('Response', response.data)
    return response.data
  } catch (error) {
    console.log('Error', error.response?.status, error.response?.data)
    throw error
  }
}
