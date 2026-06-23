import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import EducationPage from './pages/EducationPage'
import ProjectsPage from './pages/ProjectsPage'
import TechStackPage from './pages/TechStackPage'
import TerminalPage from './pages/TerminalPage'
import ContactPage from './pages/ContactPage'
import BlogListPage from './pages/BlogListPage'
import BlogDetailPage from './pages/BlogDetailPage'
import { wakeupBackend } from './api'

export default function App() {
  useEffect(() => {
    // Non-blocking ping to wake up the backend on Render
    wakeupBackend().catch(() => {})
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/education" element={<EducationPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/techstack" element={<TechStackPage />} />
          <Route path="/terminal" element={<TerminalPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
