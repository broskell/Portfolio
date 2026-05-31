import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

const COLORS = { out: '#aaa', gold: '#E6BE8A', green: '#4ade80', err: '#f87171', dim: '#555', title: '#fff', blank: '' }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const commands = {
  help: () => [
    { t: 'title', v: 'Available Commands' },
    { t: 'blank' },
    { t: 'gold', v: '  whoami      →  About Saathvik' },
    { t: 'out', v: '  skills      →  List of skills & technologies' },
    { t: 'gold', v: '  projects    →  Featured projects' },
    { t: 'out', v: '  education   →  Academic background' },
    { t: 'gold', v: '  cgpa        →  Academic performance' },
    { t: 'out', v: '  contact     →  How to reach me' },
    { t: 'gold', v: '  ai          →  AI tools explored' },
    { t: 'out', v: '  quote       →  A random motivational quote' },
    { t: 'gold', v: '  date        →  Current date & time' },
    { t: 'out', v: '  clear       →  Clear the terminal' },
    { t: 'blank' },
    { t: 'dim', v: '  Tip: Click the quick-buttons below or type above.' },
  ],
  whoami: () => [
    { t: 'blank' },
    { t: 'gold', v: '  Saathvik Kellampalli' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'out', v: '  Role     : UG Student | Tech Enthusiast | Builder' },
    { t: 'out', v: '  College  : IIT Jodhpur × LeapStart School of Technology' },
    { t: 'out', v: '  Program  : BS Applied AI & Data Science' },
    { t: 'out', v: '  Batch    : 2025 – 2029' },
    { t: 'out', v: '  Based in : Hyderabad, India' },
    { t: 'blank' },
    { t: 'green', v: '  hardWorker: true  |  quickLearner: true  |  hireable: true' },
    { t: 'blank' },
  ],
  skills: () => [
    { t: 'blank' },
    { t: 'title', v: '  Skills & Technologies' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  Languages : Python, JavaScript, TypeScript, HTML5, CSS3, PHP, PostgreSQL, Shell' },
    { t: 'out', v: '  Frontend  : React, TailwindCSS, Next.js 15, Framer Motion, jQuery' },
    { t: 'gold', v: '  Backend   : Node.js, Fastify, PHP/Laravel, Socket.IO, BullMQ, Redis' },
    { t: 'out', v: '  Database  : PostgreSQL, Drizzle ORM, Redis, Firebase, pgvector' },
    { t: 'gold', v: '  Data Sci  : NumPy, Pandas, Matplotlib, Scikit-learn, KNIME' },
    { t: 'out', v: '  DevOps    : Git, GitHub, Docker, Kubernetes (K3s), AWS S3, Vercel' },
    { t: 'gold', v: '  Systems   : Linux, Ubuntu, VirtualBox, Bash/Shell' },
    { t: 'out', v: '  Security  : Kali Linux, Burp Suite, OWASP, Python Cryptography' },
    { t: 'gold', v: '  AI/LLM    : Groq API, LLaMA 3.1, Hugging Face, Prompt Engineering' },
    { t: 'blank' },
  ],
  projects: () => [
    { t: 'blank' },
    { t: 'title', v: '  Featured Projects' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  00 LeapStart LMS — Antigravity (FLAGSHIP)' },
    { t: 'out', v: '     Tech: Next.js 15 · Fastify · Socket.IO · PostgreSQL · Redis · AWS · Docker · K8s' },
    { t: 'out', v: '     Role: Core contributor — real-time chat, attendance, proctoring, 30+ DB tables' },
    { t: 'out', v: '     Target: 5,000+ concurrent users · Sub-50ms WebSocket latency' },
    { t: 'blank' },
    { t: 'gold', v: '  01 Honey    — Voice AI Study Buddy' },
    { t: 'out', v: '     Live: https://honey-voice-buddy.onrender.com/' },
    { t: 'blank' },
    { t: 'gold', v: '  02 PlayHub  — Sports Facility Booking Platform' },
    { t: 'out', v: '     Live: https://playhub-lst.netlify.app/' },
    { t: 'blank' },
    { t: 'gold', v: '  03 Lexis    — AI Live Lecture Companion (FEATURED)' },
    { t: 'out', v: '     Live: https://lexis-phi.vercel.app/' },
    { t: 'blank' },
    { t: 'dim', v: '  Also: Library Management System · Blood Bank MVP · Secure File Sharing' },
    { t: 'blank' },
  ],
  education: () => [
    { t: 'blank' },
    { t: 'title', v: '  Education' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  IIT Jodhpur' },
    { t: 'out', v: '  Program  : BS Applied AI & Data Science' },
    { t: 'out', v: '  Duration : 2025 – 2029' },
    { t: 'out', v: '  Status   : Semester 2 — In Progress' },
    { t: 'blank' },
    { t: 'gold', v: '  LeapStart School of Technology' },
    { t: 'out', v: '  Program  : Experiential Learning (Dual Track)' },
    { t: 'out', v: '  Building : LeapStart LMS — Antigravity' },
    { t: 'blank' },
    { t: 'dim', v: '  Run `cgpa` for academic performance details.' },
    { t: 'blank' },
  ],
  cgpa: () => [
    { t: 'blank' },
    { t: 'title', v: '  Academic Performance' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  Semester 1 CGPA : 9.75 / 10.00' },
    { t: 'out', v: '  Semester 2      : In Progress (Jan 2025 onwards)' },
    { t: 'blank' },
    { t: 'green', v: '  ████████████████████████████████████░░░░  9.75/10' },
    { t: 'blank' },
  ],
  contact: () => [
    { t: 'blank' },
    { t: 'title', v: '  Contact Information' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  GitHub   : https://github.com/broskell' },
    { t: 'out', v: '  LinkedIn : linkedin.com/in/kellampalli-saathvik-354799360' },
    { t: 'gold', v: '  Email    : Available via contact form on this portfolio' },
    { t: 'blank' },
    { t: 'dim', v: '  Navigate to Contact page (Ctrl+7) to send a message.' },
    { t: 'blank' },
  ],
  ai: () => [
    { t: 'blank' },
    { t: 'title', v: '  AI Tools Explored (20+)' },
    { t: 'out', v: '  ─────────────────────────────────────────' },
    { t: 'gold', v: '  LLMs      : ChatGPT, Claude, Gemini, Perplexity, Grok, DeepSeek' },
    { t: 'out', v: '  Dev Tools : Cursor, Windsurf, Loveable, Replit, Bolt, CodePen' },
    { t: 'gold', v: '  Creative  : Canva, Midjourney, VEED, Gamma, Suno AI, NapkinAI' },
    { t: 'out', v: '  Viz & Math: Flourish, GeoGebra, CalcPlot3D' },
    { t: 'gold', v: '  Workflow  : Flowgorithm, Manas, Prompt Cowboy' },
    { t: 'blank' },
  ],
  date: () => [
    { t: 'blank' },
    {
      t: 'green',
      v: `  ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' })}`,
    },
    { t: 'blank' },
  ],
  quote: () => {
    const q = [
      'Building strong foundations in technology to shape a smarter future.',
      'Learn fast, build faster, iterate forever.',
      'Every expert was once a beginner who refused to quit.',
      'The best code is the one that solves a real problem for a real person.',
      'Consistency is the compound interest of learning.',
    ]
    return [
      { t: 'blank' },
      { t: 'gold', v: `  "${q[Math.floor(Math.random() * q.length)]}"` },
      { t: 'dim', v: "  — Saathvik's wall" },
      { t: 'blank' },
    ]
  },
  clear: () => '__clear__',
}

const QUICK_CMDS = ['help', 'whoami', 'skills', 'projects', 'education', 'cgpa', 'contact', 'ai', 'quote', 'date', 'clear']
const BOOT = [
  { t: 'gold', v: '  ╔════════════════════════════════════════════╗' },
  { t: 'gold', v: '  ║   Saathvik Kellampalli — Portfolio CLI     ║' },
  { t: 'gold', v: '  ╚════════════════════════════════════════════╝' },
  { t: 'blank' },
  { t: 'green', v: '  System ready. Session started.' },
  { t: 'dim', v: "  Type 'help' to see available commands." },
  { t: 'blank' },
]

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export default function Terminal() {
  const [lines, setLines] = useState([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [histIdx, setHistIdx] = useState(-1)
  const [isTyping, setIsTyping] = useState(false)
  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const bootedRef = useRef(false)
  const { ref, inView } = useInView({ triggerOnce: true })

  const scrollBottom = useCallback(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight, behavior: 'smooth' })
  }, [])

  useEffect(() => {
    scrollBottom()
  }, [lines, scrollBottom])

  const typeLines = useCallback(async (newLines) => {
    setIsTyping(true)

    for (const line of newLines) {
      if (line.type === 'prompt') {
        setLines((prev) => [...prev, { ...line, id: uid() }])
        await sleep(80)
        continue
      }

      if (line.t === 'blank') {
        setLines((prev) => [...prev, { ...line, id: uid(), display: '' }])
        await sleep(40)
        continue
      }

      const id = uid()
      const full = line.v || ''
      const speed = line.t === 'title' ? 14 : line.t === 'dim' ? 10 : 18

      setLines((prev) => [...prev, { ...line, id, display: '', typing: true }])

      for (let i = 0; i <= full.length; i++) {
        const slice = full.slice(0, i)
        setLines((prev) => prev.map((l) => (l.id === id ? { ...l, display: slice } : l)))
        await sleep(speed)
      }

      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, typing: false } : l)))
      await sleep(60)
    }

    setIsTyping(false)
  }, [])

  useEffect(() => {
    if (!inView || bootedRef.current) return
    bootedRef.current = true
    typeLines(BOOT).then(() => inputRef.current?.focus())
  }, [inView, typeLines])

  const runCmd = async (raw) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd || isTyping) return

    if (history[0] !== cmd) setHistory((h) => [cmd, ...h])
    setHistIdx(-1)
    setInput('')

    if (cmd === 'clear') {
      setLines([])
      return
    }

    const promptLine = { type: 'prompt', text: cmd }
    let output = []

    if (cmd in commands) {
      const result = commands[cmd]()
      if (result !== '__clear__') output = result
    } else {
      output = [
        { t: 'err', v: `  bash: ${cmd}: command not found` },
        { t: 'dim', v: '  Type `help` to see available commands.' },
        { t: 'blank' },
      ]
    }

    await typeLines([promptLine, ...output])
  }

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-6 py-14">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Interactive</p>
      <h1 className="mb-2 text-white" style={{ fontFamily: "'Fjalla One', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        &gt;_ <span className="text-yellow-400">Terminal</span>
      </h1>
      <p className="font-mono text-xs text-neutral-500 mb-8">
        Type <code className="text-yellow-600 bg-neutral-900 px-2 py-0.5 rounded">help</code> to see all commands.
      </p>

      <div className="term-win bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl border border-neutral-800 focus-within:border-neutral-600 transition-colors">
        <div className="bg-neutral-900 px-5 py-3.5 flex items-center gap-2 border-b border-neutral-800">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="font-mono text-xs text-neutral-500 mx-auto">saathvik@portfolio ~ bash</span>
        </div>
        <div ref={outputRef} className="px-6 py-5 font-mono text-sm leading-loose min-h-[380px] max-h-[480px] overflow-y-auto">
          {lines.map((line) => {
            if (line.type === 'prompt') {
              return (
                <div key={line.id}>
                  <span style={{ color: '#B8860B' }}>saathvik@portfolio:~$ </span>
                  <span style={{ color: '#fff' }}>{line.text}</span>
                </div>
              )
            }
            const style = {
              color: COLORS[line.t] || '#aaa',
              fontWeight: line.t === 'title' ? 700 : 400,
              height: line.t === 'blank' ? '6px' : 'auto',
              minHeight: line.t === 'blank' ? '6px' : undefined,
            }
            const text = line.display ?? line.v ?? ''
            return (
              <div key={line.id} style={style}>
                {text}
                {line.typing && <span className="text-yellow-400 animate-blink">█</span>}
              </div>
            )
          })}
          {isTyping && lines.length === 0 && (
            <span className="text-yellow-400 animate-blink text-xs">booting...</span>
          )}
        </div>
        <div className="flex items-center px-6 py-4 border-t border-neutral-900 bg-[#0a0a0a]">
          <span className="font-mono text-sm text-gold-dim whitespace-nowrap">saathvik@portfolio:~$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            disabled={isTyping}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runCmd(input)
              else if (e.key === 'ArrowUp') {
                e.preventDefault()
                if (histIdx < history.length - 1) {
                  const next = histIdx + 1
                  setHistIdx(next)
                  setInput(history[next])
                }
              } else if (e.key === 'ArrowDown') {
                e.preventDefault()
                if (histIdx > 0) {
                  const next = histIdx - 1
                  setHistIdx(next)
                  setInput(history[next])
                } else {
                  setHistIdx(-1)
                  setInput('')
                }
              }
            }}
            className="flex-1 bg-transparent border-none font-mono text-sm text-white px-2 outline-none disabled:opacity-40"
            style={{ caretColor: '#FFD700' }}
            autoComplete="off"
            spellCheck={false}
            placeholder={isTyping ? 'typing...' : 'type a command...'}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {QUICK_CMDS.map((c) => (
          <button
            key={c}
            type="button"
            disabled={isTyping}
            onClick={() => runCmd(c)}
            className="font-mono text-xs text-neutral-400 bg-neutral-950 px-4 py-2 rounded-lg border border-neutral-900 hover:border-gold-dim hover:text-gold-mid hover:bg-gold/5 transition-all cursor-pointer disabled:opacity-40"
          >
            {c}
          </button>
        ))}
      </div>
      <p className="font-mono text-[10px] text-neutral-600 mt-3">↑ / ↓ arrow keys to navigate history · Enter to run</p>
    </section>
  )
}
