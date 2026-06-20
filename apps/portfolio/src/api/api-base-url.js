const DEFAULT_API_URL = import.meta.env.DEV
  ? '/api'
  : 'https://portfolio-57o9.onrender.com/api'

export const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL || DEFAULT_API_URL
  const trimmedUrl = configuredUrl.replace(/\/+$/, '')

  if (trimmedUrl === '/api' || trimmedUrl.endsWith('/api')) {
    return trimmedUrl
  }

  console.error(
    'VITE_API_URL must include /api. Received:',
    configuredUrl,
    'Using:',
    `${trimmedUrl}/api`
  )

  return `${trimmedUrl}/api`
}
