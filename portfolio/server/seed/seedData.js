import 'dotenv/config'
import mongoose from 'mongoose'
import Project from '../models/Project.js'
import Skill from '../models/Skill.js'
import { connectDB } from '../config/db.js'

const projects = [
  {
    title: 'LeapStart LMS — Antigravity',
    subtitle: 'Educational Operating System · Built from scratch',
    description:
      'Core contributor on a next-generation, role-aware educational platform unifying real-time chat (Discord-class), live attendance with face verification, a 4-layer proctoring engine, scheduling, assessments, social feed, and gamification — targeting 5,000+ concurrent users.',
    techStack: [
      'Next.js 15',
      'Fastify',
      'TypeScript',
      'Socket.IO',
      'PostgreSQL',
      'Redis',
      'Drizzle ORM',
      'AWS S3',
      'Docker',
      'Kubernetes',
    ],
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: true,
    order: 0,
    status: 'In Progress · Flagship',
    highlights: [
      '30+ DB tables',
      '<50ms WS latency',
      '5,000+ target users',
      '8 role types',
      'Modules: Real-time chat · Attendance Hub (selfie + geo) · Test & Proctoring · Scheduler · Connect (social) · Play Zone',
    ],
  },
  {
    title: 'Honey — Voice AI Study Buddy',
    description:
      "An interactive voice-powered AI assistant built for students. Features speech-to-text, text-to-speech, and intelligent responses powered by Groq's LLaMA model. Helps with study sessions through natural conversation.",
    techStack: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Groq API', 'LLaMA 3.1'],
    liveUrl: 'https://honey-voice-buddy.onrender.com/',
    githubUrl: 'https://github.com/broskell/honey-voice-agent',
    image: '/assets/honey_preview.png',
    featured: true,
    order: 1,
    status: 'Live',
  },
  {
    title: 'PlayHub — Sport Booking Web App',
    description:
      'A comprehensive sports facility booking platform designed for LST students. Enables easy scheduling and management of sport courts with real-time availability and Firebase authentication.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firestore'],
    liveUrl: 'https://playhub-lst.netlify.app/',
    githubUrl: 'https://github.com/broskell/LeapStart-PlayHub',
    image: '/assets/playhub_preview.png',
    featured: true,
    order: 2,
    status: 'Live',
  },
  {
    title: 'Lexis — AI Study Assistant',
    description:
      'A live lecture companion that turns speech into structured study material. Captures lectures via browser microphone, generates transcripts, then uses AI to create notes, summaries, mindmaps, quizzes, and flashcards. Includes Google sign-in, a dashboard, and lesson-aware Q&A powered by Groq.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase Auth', 'Vercel', 'Groq API', 'LLaMA 3.1'],
    liveUrl: 'https://lexis-phi.vercel.app/',
    githubUrl: 'https://github.com/broskell/Lexis',
    image: '/assets/main_dashboard.png',
    featured: true,
    order: 3,
    status: 'Live · Featured Project',
  },
  {
    title: 'Library Management System',
    description:
      'Full-stack LMS for LeapStart — React, PHP, PostgreSQL. Authentication, book inventory, issue/return workflows, admin dashboard.',
    techStack: ['React', 'PHP', 'PostgreSQL'],
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: false,
    order: 4,
    status: 'Built',
  },
  {
    title: 'Blood Bank Supply Platform',
    description: 'Rapid Blood Bank MVP — Firebase backend, FRD documentation. SDLC workshop project.',
    techStack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: false,
    order: 5,
    status: 'MVP',
  },
  {
    title: 'Secure File Sharing Tool',
    description:
      "File encryption system using Python's cryptography library for secure transfer between parties.",
    techStack: ['Python', 'Cryptography'],
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: false,
    order: 6,
    status: 'Built',
  },
  {
    title: 'Quick Commerce Analysis',
    description:
      'Business data analysis examining quick-commerce market trends with Pandas & Matplotlib.',
    techStack: ['Python', 'Pandas', 'Matplotlib'],
    liveUrl: '',
    githubUrl: '',
    image: '',
    featured: false,
    order: 7,
    status: 'Analysis',
  },
]

const skills = [
  // Languages
  { name: 'Python', category: 'Languages', proficiency: 92, icon: 'python' },
  { name: 'JavaScript', category: 'Languages', proficiency: 90, icon: 'javascript' },
  { name: 'HTML5', category: 'Languages', proficiency: 88, icon: 'html5' },
  { name: 'CSS3', category: 'Languages', proficiency: 88, icon: 'css3' },
  { name: 'PostgreSQL', category: 'Languages', proficiency: 82, icon: 'postgresql' },
  { name: 'TailwindCSS', category: 'Frontend', proficiency: 90, icon: 'tailwindcss' },
  { name: 'Shell Script', category: 'Languages', proficiency: 78, icon: 'bash' },
  { name: 'TypeScript', category: 'Languages', proficiency: 65, icon: 'typescript', learning: true },
  { name: 'React', category: 'Frontend', proficiency: 85, icon: 'react' },
  { name: 'Node.js', category: 'Backend', proficiency: 70, icon: 'nodejs', learning: true },
  { name: 'PHP', category: 'Languages', proficiency: 75, icon: 'php' },
  // Data Science & AI
  { name: 'NumPy', category: 'Tools', proficiency: 85, icon: 'numpy' },
  { name: 'Pandas', category: 'Tools', proficiency: 85, icon: 'pandas' },
  { name: 'Matplotlib', category: 'Tools', proficiency: 80, icon: 'matplotlib' },
  { name: 'Scikit-learn', category: 'Tools', proficiency: 78, icon: 'scikitlearn' },
  { name: 'Jupyter / Colab', category: 'Tools', proficiency: 82, icon: 'jupyter' },
  { name: 'Kaggle', category: 'Tools', proficiency: 80, icon: 'kaggle' },
  { name: 'Hugging Face', category: 'Tools', proficiency: 75, icon: 'huggingface' },
  { name: 'KNIME', category: 'Tools', proficiency: 72, icon: 'knime' },
  { name: 'Orange', category: 'Tools', proficiency: 70, icon: 'orange' },
  // DevOps & Systems
  { name: 'Linux', category: 'Tools', proficiency: 85, icon: 'linux' },
  { name: 'Ubuntu', category: 'Tools', proficiency: 82, icon: 'ubuntu' },
  { name: 'VirtualBox', category: 'Tools', proficiency: 78, icon: 'virtualbox' },
  { name: 'Git', category: 'Tools', proficiency: 88, icon: 'git' },
  { name: 'GitHub', category: 'Tools', proficiency: 90, icon: 'github' },
  { name: 'VS Code', category: 'Tools', proficiency: 92, icon: 'vscode' },
  { name: 'Networking', category: 'Tools', proficiency: 72, icon: 'ssh' },
  // Web Platforms & APIs
  { name: 'Firebase', category: 'Backend', proficiency: 85, icon: 'firebase' },
  { name: 'Vercel', category: 'Tools', proficiency: 82, icon: 'vercel' },
  { name: 'Netlify', category: 'Tools', proficiency: 80, icon: 'netlify' },
  { name: 'Express', category: 'Backend', proficiency: 75, icon: 'express' },
  { name: 'Groq API', category: 'Backend', proficiency: 88, icon: 'groq' },
  { name: 'LLaMA 3.1', category: 'Backend', proficiency: 85, icon: 'meta' },
  { name: 'Next.js 15', category: 'Frontend', proficiency: 72, icon: 'nextjs' },
  { name: 'Fastify', category: 'Backend', proficiency: 68, icon: 'fastify' },
  { name: 'Socket.IO', category: 'Backend', proficiency: 70, icon: 'socketio' },
  { name: 'Redis', category: 'Backend', proficiency: 65, icon: 'redis' },
  { name: 'Docker', category: 'Tools', proficiency: 68, icon: 'docker' },
  { name: 'Kubernetes', category: 'Tools', proficiency: 60, icon: 'kubernetes' },
  // Cybersecurity
  { name: 'Kali Linux', category: 'Tools', proficiency: 75, icon: 'kali' },
  { name: 'Burp Suite', category: 'Tools', proficiency: 70, icon: 'burp' },
  { name: 'OWASP', category: 'Tools', proficiency: 72, icon: 'owasp' },
  { name: 'Cryptography', category: 'Tools', proficiency: 78, icon: 'cryptography' },
]

async function seed() {
  await connectDB()
  await Project.deleteMany({})
  await Skill.deleteMany({})
  await Project.insertMany(projects)
  await Skill.insertMany(skills)
  console.log(`✅ Seeded ${projects.length} projects, ${skills.length} skills`)
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
