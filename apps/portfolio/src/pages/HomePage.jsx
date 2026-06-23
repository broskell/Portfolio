import { Link } from 'react-router-dom'
import { QUICK_NAV } from '../config/nav'
import HeroSection from '../components/HeroSection'
import ProfileCodeWindow from '../components/ProfileCodeWindow'

const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

function QuickNavIcon({ type }) {
  if (type === 'terminal') return <span className="text-2xl text-yellow-400">&gt;_</span>
  if (type === 'contact') return <span className="text-2xl text-yellow-400">✉</span>
  return (
    <span className="text-2xl text-yellow-400">
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#B89230">
        {type === 'about' && (
          <path d="M440-280h80v-240h-80v240Zm68.5-331.5Q520-623 520-640t-11.5-28.5Q497-680 480-680t-28.5 11.5Q440-657 440-640t11.5 28.5Q463-600 480-600t28.5-11.5ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
        )}
        {type === 'blog' && (
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T776-120H200Zm0-80h560v-560H200v560Zm80-80h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 400v-560 560Z" />
        )}
        {type === 'education' && (
          <path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z" />
        )}
        {type === 'projects' && (
          <path d="M160-240v-480 520-40Zm0 80q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v200h-80v-200H447l-80-80H160v480h200v80H160ZM584-56 440-200l144-144 56 57-87 87 87 87-56 57Zm192 0-56-57 87-87-87-87 56-57 144 144L776-56Z" />
        )}
        {type === 'techstack' && (
          <path d="M480-400 40-640l440-240 440 240-440 240Zm0 160L63-467l84-46 333 182 333-182 84 46-417 227Zm0 160L63-307l84-46 333 182 333-182 84 46L480-80Zm0-411 273-149-273-149-273 149 273 149Zm0-149Z" />
        )}
      </svg>
    </span>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* STATS */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            ['7+', 'Programming Languages'],
            ['6+', 'Live Projects'],
            ['30+', 'AI Tools Explored'],
          ].map(([val, label]) => (
            <div key={label} className="bg-neutral-950/65 border border-neutral-900/80 rounded-2xl py-8 text-center backdrop-blur-md hover:border-yellow-500/25 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,215,0,0.03)] hover:-translate-y-1 transition-all duration-300">
              <div className="text-4xl text-yellow-400 leading-none mb-2 font-bold tracking-wide" style={{ ...fjalla, textShadow: '0 0 15px rgba(255, 215, 0, 0.15)' }}>{val}</div>
              <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-500 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Quick Navigation</p>
        <h2 className="mb-8 text-white" style={{ ...fjalla, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}>
          Explore My <span className="text-yellow-400">Portfolio</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {QUICK_NAV.map((item) => (
            <Link key={item.path} to={item.path} className="quick-card bg-neutral-950/45 border border-neutral-900/80 backdrop-blur-md rounded-2xl p-6 flex flex-col gap-3 no-underline transition-all duration-300 hover:border-yellow-500/35 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(0,0,0,0.6),0_0_20px_rgba(255,215,0,0.03)]">
              <div className="transition-transform duration-300 hover:scale-115 w-fit">
                <QuickNavIcon type={item.icon} />
              </div>
              <span className="font-bold text-white text-sm tracking-wide">{item.label}</span>
              <span className="font-mono text-[11px] text-neutral-500 leading-relaxed">{item.desc}</span>
              <span className="font-mono text-[10px] text-neutral-600 bg-neutral-900 border border-neutral-800 rounded px-2.5 py-0.5 w-fit mt-auto">
                Ctrl + {item.key}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* GITHUB */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Open Source</p>
        <h2 className="mb-8 text-white" style={{ ...fjalla, fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)' }}>
          GitHub <span className="text-yellow-400">Activity</span>
        </h2>
        <div className="bg-[#0d1117] border border-[#30363d] rounded-md p-6 hover:border-[#484f58] transition-colors">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-[#e6edf3]">broskell</span>
              <span className="font-mono text-xs text-[#7d8590]">contributions in the last year</span>
            </div>
            <a href="https://github.com/broskell" target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-[#B8860B] hover:underline">
              View on GitHub ↗
            </a>
          </div>
          <div className="bg-[#161b22] rounded p-4 border border-[#21262d]">
            <img src="https://ghchart.rshah.org/39d353/broskell" alt="GitHub Contribution Chart" className="w-full h-auto" style={{ filter: 'brightness(1.1)' }} />
          </div>
          <p className="font-mono text-[10px] text-[#484f58] text-center mt-4 tracking-wider">Live activity from github.com/broskell</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-28">
        <ProfileCodeWindow />
      </section>
    </>
  )
}
