import axios from 'axios'
import { getApiBaseUrl } from './api-base-url'

const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
})

export const getProjects = () => api.get('/projects')
export const getSkills = () => api.get('/skills')
export const sendMessage = async (data) => {
  try {
    console.log('Request', '/contact', data)
    const response = await api.post('/contact', data)
    console.log('Response', response.data)
    return response
  } catch (error) {
    console.log('Error', error.response?.status, error.response?.data)
    throw error
  }
}

export default api
