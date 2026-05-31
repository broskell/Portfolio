import { NavLink } from 'react-router-dom'
import { PAGES } from '../config/nav'

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-14 z-50 bg-black/90 backdrop-blur-md border-t border-neutral-900 flex items-center justify-around md:hidden">
      {PAGES.map((p) => (
        <NavLink
          key={p.path}
          to={p.path}
          end={p.path === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg no-underline min-w-[44px] transition-all duration-200 ${
              isActive ? 'text-yellow-400' : 'text-neutral-500 hover:text-white hover:bg-neutral-900'
            }`
          }
        >
          <span className="text-[10px] font-semibold tracking-wide">{p.label.split(' ')[0]}</span>
        </NavLink>
      ))}
    </div>
  )
}
