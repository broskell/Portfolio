import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const getProjects = () => api.get('/projects')
export const getSkills = () => api.get('/skills')
export const sendMessage = (data) => api.post('/contact', data)

export default api
