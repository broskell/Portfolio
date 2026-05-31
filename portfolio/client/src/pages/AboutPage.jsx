import { Link } from 'react-router-dom'
import { MaterialIcon } from '../components/SkillChip'

const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

const INTERESTS = [
  { label: 'AI', icon: 'robot_2' },
  { label: 'Web Dev', icon: 'language' },
  { label: 'Linux', icon: 'linux' },
  { label: 'Security', icon: 'lock' },
  { label: 'Data Sci', icon: 'bar_chart' },
  { label: 'Open Source', icon: 'build' },
]

function LinuxIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-neutral-300" viewBox="0 0 256 256">
      <path
        fill="currentColor"
        d="M229 214.25a8 8 0 0 1-11.24-1.25C216.39 211.27 184 169.86 184 88a56 56 0 0 0-112 0c0 81.86-32.37 123.27-33.75 125a8 8 0 0 1-12.51-10c.15-.2 7.69-9.9 15.13-28.74C47.77 156.8 56 127.64 56 88a72 72 0 0 1 144 0c0 39.64 8.23 68.8 15.13 86.28c7.48 18.94 15.06 28.64 15.14 28.74a8 8 0 0 1-1.27 11.23M100 88a12 12 0 1 0 12 12a12 12 0 0 0-12-12m68 12a12 12 0 1 0-12 12a12 12 0 0 0 12-12m-68.42 28.84a8 8 0 0 0-7.15 14.31l32 16a7.94 7.94 0 0 0 7.15 0l32-16a8 8 0 0 0-7.16-14.31L128 143.05ZM128 176a54.07 54.07 0 0 0-47 28.11a8 8 0 1 0 14 7.78a37.35 37.35 0 0 1 66 0a8 8 0 0 0 14-7.78A54.07 54.07 0 0 0 128 176"
      />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-14 pt-[4.5rem] pb-16">
      <p className="anim d1 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Who I Am</p>
      <h1 className="anim d1 mb-12 text-white" style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        About <span className="text-yellow-400">Me</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        <div className="anim d2 md:sticky top-20">
          <div className="w-44 h-44 mx-auto mb-6 rounded-full p-[3px] avatar-ring" style={{ background: 'linear-gradient(135deg, #B8860B, transparent, #B8860B)' }}>
            <div className="relative w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
              <span style={{ ...fjalla, fontSize: '3rem', color: '#FFD700' }}>SK</span>
              <img src="/assets/pfp.jpg" alt="Saathvik Kellampalli" className="absolute w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="mb-4 px-2">
            <img src="/assets/name.jpeg" alt="Saathvik Kellampalli" className="name-img-sm w-full h-auto object-contain max-h-16" />
          </div>
          <div className="flex justify-center mb-6">
            <span className="font-mono text-[10px] tracking-[0.1em] text-yellow-600 bg-yellow-400/8 border border-yellow-800/40 px-4 py-1.5 rounded-full">
              UG @ IITJ × LST
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarLink to="/education">Education Timeline</SidebarLink>
            <SidebarLink to="/projects">My Projects</SidebarLink>
            <SidebarLink to="/techstack">Tech Stack</SidebarLink>
            <SidebarLink to="/contact">Get In Touch</SidebarLink>
          </div>
        </div>

        <div>
          <div className="anim d3 mb-10 space-y-4">
            <p className="text-neutral-300 leading-relaxed text-base">
              I'm <strong className="text-white">Saathvik Kellampalli</strong>, a first-year undergrad pursuing{' '}
              <strong className="text-yellow-400/80">BS in Applied AI & Data Science</strong> at IIT Jodhpur alongside
              hands-on, project-based learning at LeapStart School of Technology in Hyderabad.
            </p>
            <p className="text-neutral-400 leading-relaxed text-base">
              My journey into technology started with curiosity for how things work — from algorithms to operating systems to web applications. During my pre-college gap, I dived headfirst into online certifications and never looked back. Now I'm building real products, exploring AI tools.
            </p>
            <p className="text-neutral-400 leading-relaxed text-base">
              I believe in <strong className="text-white">learning by building</strong>. Every project teaches me something new — voice AI with Groq, secure file sharing with Python's cryptography stack, or a sports booking platform deployed on Firebase.
            </p>
          </div>

          <p className="anim d3 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-4">Interests & Passions</p>
          <div className="anim d4 grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
            {INTERESTS.map((item) => (
              <div key={item.label} className="card-hover bg-neutral-900 rounded-xl p-4 text-center">
                <div className="text-2xl mb-2 flex justify-center text-neutral-300">
                  {item.icon === 'linux' ? <LinuxIcon /> : <MaterialIcon name={item.icon} className="text-2xl" />}
                </div>
                <div className="font-bold text-neutral-300 text-[11px]">{item.label}</div>
              </div>
            ))}
          </div>

          <p className="anim d4 font-mono text-[10px] tracking-[0.2em] text-neutral-500 uppercase mb-2">Core Values</p>
          <ul className="anim d4 mb-10">
            {[
              ['01', 'Build First, Overthink Later', "I learn best when I'm creating. Shipping a rough prototype beats planning forever."],
              ['02', 'Curiosity as a Skill', 'I actively explore new tools, frameworks, and ideas — from OWASP Juice Shop to Suno AI.'],
              ['03', 'Quality over Quantity', 'A well-crafted solution that solves a real problem is worth more than ten half-baked ones.'],
              ['04', 'Consistency Compounds', "Daily progress — even small — is how I've gone from zero to 9.75 CGPA and three deployed apps."],
            ].map(([num, title, text], i, arr) => (
              <li key={num} className={`flex gap-4 items-start py-5 ${i < arr.length - 1 ? 'border-b border-neutral-900' : ''}`}>
                <span style={{ ...fjalla, fontSize: '1.5rem', color: '#252525', minWidth: '32px' }}>{num}</span>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{title}</h4>
                  <p className="font-mono text-xs text-neutral-500 leading-relaxed">{text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="anim d5 bg-yellow-400/4 border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-700/50 transition-colors">
            <p className="font-mono text-sm text-yellow-600/80 leading-relaxed italic">
              "Driven by curiosity and a passion for technology, I actively seek out new knowledge and hands-on experience with AI, open-source systems, and modern web frameworks to solve real-world challenges."
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function SidebarLink({ to, children }) {
  return (
    <Link to={to} className="flex items-center gap-2 font-mono text-xs text-neutral-500 py-2 border-b border-neutral-900 hover:text-white transition-colors no-underline">
      <span className="text-yellow-700">▹</span> {children}
    </Link>
  )
}
