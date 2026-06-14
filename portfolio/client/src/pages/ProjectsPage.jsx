const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

function Tag({ children }) {
  return (
    <span className="font-mono text-[11px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded">
      {children}
    </span>
  )
}

function StatusDot({ live = true, label }) {
  return (
    <div className="flex items-center gap-2 mb-3">
      <span
        className={`w-2 h-2 rounded-full ${live ? 'bg-green-400 shadow-[0_0_8px_#4ade80]' : 'bg-yellow-400'}`}
        style={!live ? { boxShadow: '0 0 8px #ffd700' } : undefined}
      />
      <span className={`font-mono text-[10px] tracking-wider uppercase ${live ? 'text-neutral-500' : 'text-yellow-500'}`}>
        {label}
      </span>
    </div>
  )
}

export default function ProjectsPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-14 pt-[4.5rem] pb-16">
      <p className="anim d1 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">My Work</p>
      <h1 className="anim d1 mb-4 text-white" style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Featured <span className="text-yellow-400">Projects</span>
      </h1>
      <p className="anim d2 text-neutral-500 text-sm max-w-lg leading-relaxed mb-12">
        A showcase of applications built using modern technologies and hands-on learning — from voice AI to sports booking platforms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {/* Antigravity */}
        <article className="proj-card anim d2 bg-neutral-950 rounded-2xl overflow-hidden lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
            <div
              className="bg-neutral-900 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800 min-h-52"
              style={{ background: 'linear-gradient(135deg, #0a0a0a, #111114)' }}
            >
              <div className="absolute inset-0 opacity-5 grid-texture" style={{ backgroundSize: '32px 32px' }} />
              <div className="relative flex flex-col items-center gap-3 p-8">
                <span style={{ ...fjalla, fontSize: '2.2rem', color: 'rgba(212,175,55,0.15)', letterSpacing: '6px' }}>ANTIGRAVITY</span>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Next.js 15', 'Socket.IO', 'PostgreSQL', 'Redis', 'AWS', 'K8s'].map((t) => (
                    <span key={t} className="font-mono text-[10px] text-yellow-700 bg-yellow-400/8 border border-yellow-900/40 px-2.5 py-1 rounded">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-7 flex flex-col">
              <StatusDot live={false} label="In Progress · Flagship" />
              <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 00</div>
              <h3 className="font-bold text-white text-xl mb-1">LeapStart LMS — Antigravity</h3>
              <p className="font-mono text-xs text-yellow-700/70 mb-3">Educational Operating System · Built from scratch</p>
              <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">
                Core contributor on a next-generation, role-aware educational platform unifying real-time chat (Discord-class), live attendance with face verification, a 4-layer proctoring engine, scheduling, assessments, social feed, and gamification — targeting 5,000+ concurrent users.
              </p>
              <div className="grid grid-cols-2 gap-2 mb-5 text-xs font-mono">
                <div className="bg-black border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400"><span className="text-white">30+</span> DB tables</div>
                <div className="bg-black border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400"><span className="text-white">&lt;50ms</span> WS latency</div>
                <div className="bg-black border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400"><span className="text-white">5,000+</span> target users</div>
                <div className="bg-black border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400"><span className="text-white">8</span> role types</div>
              </div>
              <div className="flex flex-wrap gap-2 mb-5">
                {['Next.js 15', 'Fastify', 'TypeScript', 'Socket.IO', 'PostgreSQL', 'Redis', 'Drizzle ORM', 'AWS S3', 'Docker', 'Kubernetes'].map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </div>
              <div className="bg-yellow-400/4 border border-yellow-900/30 rounded-xl px-4 py-3 font-mono text-xs text-yellow-700/80">
                ⚡ Modules: Real-time chat · Attendance Hub (selfie + geo) · Test & Proctoring · Scheduler · Connect (social) · Play Zone
              </div>
            </div>
          </div>
        </article>

        {/* Roast My Project */}
        <article className="proj-card anim d2 bg-neutral-950 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-neutral-900 aspect-video relative border-b border-neutral-800 overflow-hidden">
            <img src="/assets/roast_my_project_preview.png" alt="Roast My Project Preview" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <StatusDot label="Live" />
            <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 01</div>
            <h3 className="font-bold text-white text-xl mb-3">Roast My Project — AI Feedback SaaS</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
              Built a multi-model AI feedback platform routing Gemini and Groq dynamically for project reviews, resume analysis, and startup validation. Implemented Firebase/Twilio auth, Cloudinary uploads, and Payload CMS; deployed production-ready SaaS on Next.js 16 + React 19.
            </p>
            <div className="flex flex-wrap gap-2 mb-5 font-mono">
              {['Next.js 16', 'React 19', 'Payload CMS', 'Gemini', 'Groq', 'Firebase', 'Twilio', 'Cloudinary', 'Tailwind CSS v4', 'MongoDB'].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="flex gap-3">
              <a href="https://roast-my-project.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
              <a href="https://github.com/broskell/Roast-My-Project" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
            </div>
          </div>
        </article>

        {/* Alimony.AI */}
        <article className="proj-card anim d2 bg-neutral-950 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-neutral-900 aspect-video relative border-b border-neutral-800 overflow-hidden">
            <img src="/assets/alimony_preview.png" alt="Alimony.AI Preview" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <StatusDot label="Live" />
            <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 02</div>
            <h3 className="font-bold text-white text-xl mb-3">Alimony.AI — Legal-Tech SaaS</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
              Developed an AI-powered Indian family law platform automating alimony calculations per Supreme Court (Rajnesh v. Neha, 2020) guidelines. Built Gemini-powered legal assistant, lawyer discovery dashboard, appointment booking, and document generation workflows.
            </p>
            <div className="flex flex-wrap gap-2 mb-5 font-mono">
              {['React', 'Node.js', 'Express', 'PostgreSQL', 'Prisma', 'Gemini', 'Zustand', 'Tailwind CSS'].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="flex gap-3">
              <a href="https://alimony-ai.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
              <a href="https://github.com/broskell/Alimony.AI" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
            </div>
          </div>
        </article>

        {/* SINGULARITY */}
        <article className="proj-card anim d3 bg-neutral-950 rounded-2xl overflow-hidden lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
            <div className="bg-neutral-900 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800 min-h-48 overflow-hidden">
              <img src="/assets/singularity_preview.png" alt="SINGULARITY Preview" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-7 flex flex-col">
              <StatusDot label="Live" />
              <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 03</div>
              <h3 className="font-bold text-white text-xl mb-3">SINGULARITY — Cinematic 3D Web Experience</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
                Built a 11-scene scrollytelling experience (pixel to cosmological scale) with custom GLSL shaders and audio-reactive interactions. Optimised rendering performance for complex real-time 3D scenes using GSAP ScrollTrigger and Lenis scroll-driven camera animation.
              </p>
              <div className="flex flex-wrap gap-2 mb-5 font-mono">
                {['Next.js', 'Three.js', 'React Three Fiber', 'GLSL', 'GSAP', 'Lenis'].map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <div className="flex gap-3">
                <a href="https://singularity-nine-virid.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
                <a href="https://github.com/broskell/Singularity" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
              </div>
            </div>
          </div>
        </article>

        {/* Lexis */}
        <article className="proj-card anim d4 bg-neutral-950 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-neutral-900 aspect-video relative border-b border-neutral-800 overflow-hidden">
            <img src="/assets/main_dashboard.png" alt="Lexis Preview" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <StatusDot label="Live · Featured Project" />
            <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 04</div>
            <h3 className="font-bold text-white text-xl mb-3">Lexis — AI Study Assistant</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
              A live lecture companion that turns speech into structured study material. Captures lectures via browser microphone, generates transcripts, then uses AI to create notes, summaries, mindmaps, quizzes, and flashcards. Includes Google sign-in, a dashboard, and lesson-aware Q&A powered by Groq.
            </p>
            <div className="flex flex-wrap gap-2 mb-5 font-mono">
              {['HTML', 'CSS', 'JavaScript', 'Firebase Auth', 'Vercel', 'Groq API', 'LLaMA 3.1'].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="flex gap-3">
              <a href="https://lexis-phi.vercel.app/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
              <a href="https://github.com/broskell/Lexis" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
            </div>
          </div>
        </article>

        {/* Honey */}
        <article className="proj-card anim d2 bg-neutral-950 rounded-2xl overflow-hidden flex flex-col">
          <div className="bg-neutral-900 aspect-video relative border-b border-neutral-800 overflow-hidden">
            <img src="/assets/honey_preview.png" alt="Honey Preview" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div className="p-6 flex flex-col flex-1">
            <StatusDot label="Live" />
            <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 05</div>
            <h3 className="font-bold text-white text-xl mb-3">Honey — Voice AI Study Buddy</h3>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
              An interactive voice-powered AI assistant built for students. Features speech-to-text, text-to-speech, and intelligent responses powered by Groq's LLaMA model. Helps with study sessions through natural conversation.
            </p>
            <div className="flex flex-wrap gap-2 mb-5 font-mono">
              {['HTML', 'CSS', 'JavaScript', 'Node.js', 'Groq API', 'LLaMA 3.1'].map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div className="flex gap-3">
              <a href="https://honey-voice-buddy.onrender.com/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
              <a href="https://github.com/broskell/honey-voice-agent" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
            </div>
          </div>
        </article>

        {/* PlayHub */}
        <article className="proj-card anim d3 bg-neutral-950 rounded-2xl overflow-hidden lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr]">
            <div className="bg-neutral-900 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800 min-h-48 overflow-hidden">
              <img src="/assets/playhub_preview.png" alt="PlayHub Preview" className="absolute inset-0 w-full h-full object-cover" />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <StatusDot label="Live" />
              <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">PROJECT / 06</div>
              <h3 className="font-bold text-white text-xl mb-3">PlayHub — Sport Booking Web App</h3>
              <p className="text-neutral-500 text-sm leading-relaxed mb-5 flex-1">
                A comprehensive sports facility booking platform designed for LST students. Enables easy scheduling and management of sport courts with real-time availability and Firebase authentication.
              </p>
              <div className="flex flex-wrap gap-2 mb-5 font-mono">
                {['HTML', 'CSS', 'JavaScript', 'Firebase', 'Firestore'].map((t) => <Tag key={t}>{t}</Tag>)}
              </div>
              <div className="flex gap-3">
                <a href="https://playhub-lst.netlify.app/" target="_blank" rel="noopener noreferrer" className="proj-link-demo flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl no-underline">↗ Live Demo</a>
                <a href="https://github.com/broskell/LeapStart-PlayHub" target="_blank" rel="noopener noreferrer" className="proj-link-code flex-1 text-center bg-transparent text-neutral-400 font-bold text-sm py-2.5 rounded-xl no-underline">⌥ GitHub</a>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div className="h-px bg-neutral-900 mb-12" />
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Also Built</p>
      <h2 className="mb-8 text-white" style={{ ...fjalla, fontSize: '2rem' }}>
        Other <span className="text-yellow-400">Work</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          ['Library Management System', 'Delivered first end-to-end live client deployment: normalised PostgreSQL schema, REST APIs in PHP, RBAC, search and pagination in React.'],
          ['Blood Bank Supply Platform', 'Rapid Blood Bank MVP — Firebase backend, FRD documentation. SDLC workshop project.'],
          ['Secure File Sharing Tool', "File encryption system using Python's cryptography library for secure transfer between parties."],
          ['Quick Commerce Analysis', 'Business data analysis examining quick-commerce market trends with Pandas & Matplotlib.'],
          ['Fitness App (Vite + PWA Builder)', 'A progressive web application for tracking fitness routines and workouts, built using Vite and optimized for mobile installation.'],
          ['Lexis AI Note-Taking (Hugging Face, NLP)', 'AI-powered note-taking and summarization platform leveraging Hugging Face transformers and NLP model pipelines.'],
          ['Solar System Scrollytelling (Three.js, R3F)', 'An interactive scrollytelling experience visualizing the solar system with real-time 3D rendering in Three.js and React Three Fiber.'],
          ['Honey (AI-Powered Study Chatbot)', 'A responsive chatbot assistant helping students with core subjects and query resolution using NLP.'],
          ['Advanced UI Replicas (React, Next.js, Tailwind)', 'A collection of highly polished, responsive replicas of complex modern user interfaces.'],
        ].map(([title, desc]) => (
          <div key={title} className="other-card bg-neutral-950 rounded-xl p-5 border border-neutral-900 hover:border-yellow-500/35 hover:-translate-y-1 transition-all duration-300">
            <h4 className="font-bold text-white text-sm mb-2">{title}</h4>
            <p className="text-neutral-500 text-xs leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
