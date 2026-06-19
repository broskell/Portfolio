import { useQuery } from '@tanstack/react-query'
import { getMe, refreshSession } from './auth.api.js'
import { useAuthStore } from './auth.store.js'

export const useAuthBootstrap = () => {
  const setSession = useAuthStore((state) => state.setSession)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryKey: ['auth', 'bootstrap'],
    queryFn: async () => {
      const hasRefreshCookie = document.cookie.includes('hasRefreshToken=true')
      if (!accessToken && !hasRefreshCookie) {
        clearAuth()
        return null
      }

      try {
        const refreshed = await refreshSession()
        const nextAccessToken = refreshed.meta?.accessToken
        if (!nextAccessToken) {
          clearAuth()
          document.cookie = 'hasRefreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
          return null
        }

        useAuthStore.getState().setAccessToken(nextAccessToken)
        const me = await getMe()
        const user = me.data?.user || null
        setSession({ accessToken: nextAccessToken, user })
        return user
      } catch (err) {
        clearAuth()
        document.cookie = 'hasRefreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
        return null
      }
    },
    retry: false,
    staleTime: 5 * 60_000
  })
}
