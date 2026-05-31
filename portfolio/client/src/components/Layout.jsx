import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import BottomBar from './BottomBar'

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <Outlet />
      <BottomBar />
    </div>
  )
}
