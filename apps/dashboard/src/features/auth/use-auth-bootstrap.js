import { useQuery } from '@tanstack/react-query'
import { getMe, refreshSession } from './auth.api.js'
import { useAuthStore } from './auth.store.js'

export const useAuthBootstrap = () => {
  const setSession = useAuthStore((state) => state.setSession)
  const clearAuth = useAuthStore((state) => state.clearAuth)

  return useQuery({
    queryKey: ['auth', 'bootstrap'],
    queryFn: async () => {
      const refreshed = await refreshSession()
      const accessToken = refreshed.meta?.accessToken
      if (!accessToken) {
        clearAuth()
        return null
      }

      useAuthStore.getState().setAccessToken(accessToken)
      const me = await getMe()
      const user = me.data?.user || null
      setSession({ accessToken, user })
      return user
    },
    retry: false,
    staleTime: 5 * 60_000
  })
}
