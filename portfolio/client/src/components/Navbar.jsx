import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { PAGES } from '../config/nav'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [toast, setToast] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && !e.shiftKey && !e.altKey) {
        const page = PAGES.find((p) => p.key === e.key)
        if (page) {
          e.preventDefault()
          setToast(`→ ${page.label}`)
          setTimeout(() => {
            navigate(page.path)
            setToast('')
          }, 300)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [navigate])

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border transition-all duration-200 no-underline ${
      isActive
        ? 'text-yellow-400 bg-yellow-400/10 border-yellow-700/40'
        : 'text-neutral-500 border-transparent hover:text-white hover:bg-neutral-900 hover:border-neutral-700'
    }`

  const mobileClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl no-underline font-semibold text-sm transition-all duration-200 ${
      isActive ? 'text-yellow-400 bg-yellow-400/5' : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
    }`

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-900 flex items-center px-6 gap-8">
        <NavLink to="/" className="font-mono text-yellow-400 text-xl tracking-widest font-bold shrink-0 no-underline">
          SK
        </NavLink>

        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {PAGES.map((p) => (
            <NavLink key={p.path} to={p.path} end={p.path === '/'} className={linkClass}>
              <span>{p.label}</span>
              <span className="font-mono text-[10px] px-1 py-0.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-600 ml-0.5">
                ⌃{p.key}
              </span>
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden ml-auto flex flex-col gap-1.5 bg-transparent border-none cursor-pointer p-1"
          aria-label="Menu"
        >
          <span className="block w-5 h-0.5 bg-neutral-400 rounded" />
          <span className="block w-5 h-0.5 bg-neutral-400 rounded" />
          <span className="block w-5 h-0.5 bg-neutral-400 rounded" />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-black border-b border-neutral-900 p-3 flex flex-col gap-1 md:hidden">
          {PAGES.map((p) => (
            <NavLink
              key={p.path}
              to={p.path}
              end={p.path === '/'}
              className={mobileClass}
              onClick={() => setMobileOpen(false)}
            >
              {p.label}
              <small className="ml-auto font-mono text-[10px] text-neutral-600">Ctrl+{p.key}</small>
            </NavLink>
          ))}
        </div>
      )}

      {toast && (
        <div
          className="fixed z-[9999] left-1/2 font-mono text-sm text-yellow-400 bg-neutral-900 border border-yellow-900 px-5 py-2 rounded-full pointer-events-none whitespace-nowrap transition-all duration-300"
          style={{ bottom: '70px', transform: 'translateX(-50%) translateY(0)', opacity: 1 }}
        >
          {toast}
        </div>
      )}
    </>
  )
}
