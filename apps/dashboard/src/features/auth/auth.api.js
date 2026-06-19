import { http } from '../../api/http.js'

export const login = async (credentials) => {
  const response = await http.post('/auth/login', credentials)
  return response.data
}

export const logout = async () => {
  await http.post('/auth/logout')
}

export const refreshSession = async () => {
  const response = await http.post('/auth/refresh')
  return response.data
}

export const getMe = async () => {
  const response = await http.get('/auth/me')
  return response.data
}
