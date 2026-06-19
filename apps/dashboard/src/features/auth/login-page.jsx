import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { LockKeyhole, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { login, parseAuthPayload } from './auth.api.js'
import { useAuthStore } from './auth.store.js'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email.'),
  password: z.string().min(8, 'Password must be at least 8 characters.')
})

export const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useAuthStore((state) => state.setSession)
  const destination = location.state?.from?.pathname || '/dashboard'

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const mutation = useMutation({
    mutationFn: async (values) => {
      const payload = await login(values)
      const session = parseAuthPayload(payload)

      if (!session.accessToken || !session.user) {
        throw new Error('Login response did not include a valid session.')
      }

      return session
    },
    onSuccess: (session) => {
      setSession({
        accessToken: session.accessToken,
        user: session.user
      })
      navigate(destination, { replace: true })
    }
  })

  return (
    <main className="grid min-h-screen place-items-center bg-canvas px-4 py-10 text-ink">
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: 'easeOut' }}
        className="w-full max-w-[400px] border border-line bg-surface"
      >
        <div className="border-b border-line px-6 py-5">
          <div className="mb-5 flex h-9 w-9 items-center justify-center border border-line bg-card">
            <LockKeyhole className="h-4 w-4" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-semibold tracking-normal">Portfolio CMS</h1>
          <p className="mt-2 text-sm text-muted">Admin access</p>
        </div>

        <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit((values) => mutation.mutate(values))}>
          <label className="block">
            <span className="text-xs font-medium uppercase text-muted">Email</span>
            <input
              className="mt-2 h-11 w-full border border-line bg-canvas px-3 text-sm text-ink outline-none transition focus:border-ink focus:shadow-focus"
              type="email"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && <span className="mt-2 block text-xs text-ink">{errors.email.message}</span>}
          </label>

          <label className="block">
            <span className="text-xs font-medium uppercase text-muted">Password</span>
            <input
              className="mt-2 h-11 w-full border border-line bg-canvas px-3 text-sm text-ink outline-none transition focus:border-ink focus:shadow-focus"
              type="password"
              autoComplete="current-password"
              {...register('password')}
            />
            {errors.password && <span className="mt-2 block text-xs text-ink">{errors.password.message}</span>}
          </label>

          {mutation.isError && (
            <div className="border border-line bg-card px-3 py-2 text-sm text-ink">
              {mutation.error?.response?.data?.error?.message || mutation.error?.message || 'Sign in failed.'}
            </div>
          )}

          <button
            className="flex h-11 w-full items-center justify-center gap-2 border border-ink bg-ink px-4 text-sm font-medium text-canvas transition hover:bg-canvas hover:text-ink disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            Sign in
          </button>
        </form>
      </motion.section>
    </main>
  )
}
