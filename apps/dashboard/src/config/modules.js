import {
  Award,
  BarChart3,
  BriefcaseBusiness,
  FolderKanban,
  Home,
  Mail,
  Medal,
  Newspaper,
  Settings,
  Sparkles,
  Star,
  Timer
} from 'lucide-react'

export const moduleRoutes = [
  { path: 'projects', label: 'Projects', icon: FolderKanban },
  { path: 'skills', label: 'Skills', icon: Sparkles },
  { path: 'certificates', label: 'Certificates', icon: Medal },
  { path: 'experience', label: 'Experience', icon: BriefcaseBusiness },
  { path: 'blogs', label: 'Blogs', icon: Newspaper },
  { path: 'timeline', label: 'Timeline', icon: Timer },
  { path: 'achievements', label: 'Achievements', icon: Award },
  { path: 'messages', label: 'Messages', icon: Mail },
  { path: 'testimonials', label: 'Testimonials', icon: Star },
  { path: 'analytics', label: 'Analytics', icon: BarChart3 },
  { path: 'settings', label: 'Settings', icon: Settings }
]

export const primaryRoutes = [{ path: 'dashboard', label: 'Dashboard', icon: Home }]
