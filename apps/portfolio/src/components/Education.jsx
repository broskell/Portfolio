const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

function TimelineRow({ period, year, current, children }) {
  return (
    <div className="tl-item anim d2 flex flex-col md:flex-row gap-0 mb-12 relative">
      <div className="hidden md:block w-36 shrink-0 text-right pr-7 relative md:sticky md:top-24 md:self-start">
        <span className="block font-mono text-xs text-neutral-400 font-bold">{period}</span>
        <span className="block font-bold text-neutral-600 text-lg" style={fjalla}>{year}</span>
        <div
          className={`absolute right-[-6px] top-2.5 w-3 h-3 rounded-full border-2 border-black z-10 ${
            current ? 'tl-dot-current bg-yellow-400' : 'bg-neutral-700'
          }`}
        />
      </div>
      <div className={`tl-card md:ml-10 flex-1 rounded-2xl p-6 ${current ? 'bg-yellow-400/3' : 'bg-neutral-900'}`} style={current ? { borderColor: 'rgba(255,215,0,0.15)' } : undefined}>
        {children}
      </div>
    </div>
  )
}

function BulletList({ items, size = 'sm' }) {
  const textClass = size === 'xs' ? 'text-xs' : 'text-sm'
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className={`flex gap-2 ${textClass} text-neutral-400`}>
          <span className="text-yellow-700 shrink-0">▹</span>
          {typeof item === 'string' ? item : item}
        </li>
      ))}
    </ul>
  )
}

export default function Education() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Academic Path</p>
      <h1 className="mb-12 text-white" style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Education &amp; <span className="text-yellow-400">Journey</span>
      </h1>

      <div className="term-win bg-neutral-950 rounded-2xl overflow-hidden shadow-2xl mb-16 border border-neutral-900">
        <div className="bg-neutral-900 px-5 py-3 flex items-center gap-2 border-b border-neutral-800">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <span className="font-mono text-xs text-neutral-500 ml-3">$ cat education.txt</span>
        </div>
        <div className="p-6 font-mono text-sm leading-loose">
          <div><span className="text-yellow-700">saathvik@portfolio:~$ </span><span className="text-white font-bold">cat education.txt</span></div>
          <div className="pl-4 mt-2 space-y-1">
            <div><span className="text-white font-bold">Institution:</span> <span className="text-neutral-300">Indian Institute of Technology, Jodhpur</span></div>
            <div><span className="text-neutral-500">Program:    </span> <span className="text-neutral-400">BS in Applied AI & Data Science</span></div>
            <div><span className="text-neutral-500">Duration:   </span> <span className="text-neutral-400">2025 – 2029</span></div>
            <div><span className="text-neutral-500">CGPA:       </span> <span className="text-yellow-400 font-bold">9.75 / 10</span> <span className="text-neutral-600">(Semester 1)</span></div>
            <div><span className="text-neutral-500">Semester:   </span> <span className="text-green-400 font-bold">2 — In Progress</span></div>
          </div>
          <div className="mt-3 pl-4 space-y-1">
            <div><span className="text-white font-bold">Institution:</span> <span className="text-neutral-300">LeapStart School of Technology, Hyderabad</span></div>
            <div><span className="text-neutral-500">Program:    </span> <span className="text-neutral-400">Experiential Learning (Dual Track)</span></div>
            <div><span className="text-neutral-500">Duration:   </span> <span className="text-neutral-400">2025 – 2029</span></div>
          </div>
          <div className="mt-3"><span className="text-yellow-700">saathvik@portfolio:~$ </span><span className="text-neutral-700 animate-blink">█</span></div>
        </div>
      </div>

      <p className="anim d2 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">The Story So Far</p>
      <h2 className="anim d2 mb-10 text-white" style={{ ...fjalla, fontSize: '2rem' }}>
        My <span className="text-yellow-400">Timeline</span>
      </h2>

      <div className="relative">
        <div
          className="absolute top-0 bottom-0 w-px hidden md:block pointer-events-none"
          style={{ left: '148px', background: 'linear-gradient(to bottom, transparent, #333 10%, #333 90%, transparent)' }}
        />

        <TimelineRow period="Jun – Aug" year="2024">
          <h3 className="font-bold text-white text-lg mb-1">Pre-College Preparation</h3>
          <p className="font-mono text-xs text-neutral-500 italic mb-4">Gap period — self-paced exploration of tech fundamentals</p>
          <BulletList items={[
            'Completed Udemy and Google certifications to build foundational tech skills',
            'Sparked deep interest in AI and Data Science',
            'Self-paced learning to prepare for college-level coursework',
          ]} />
        </TimelineRow>

        <TimelineRow period="Sep – Dec" year="2024">
          <h3 className="font-bold text-white text-lg mb-1">First Semester — Dual Track Learning</h3>
          <p className="font-mono text-xs text-neutral-500 italic mb-4">IIT Jodhpur + LeapStart School of Technology</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-black border border-neutral-800 rounded-xl p-4">
              <div className="font-mono text-[11px] tracking-wider text-yellow-600 mb-3 border-b border-neutral-800 pb-2">IIT Jodhpur</div>
              <BulletList size="xs" items={[
                <span key="1"><strong className="text-neutral-200">Core:</strong> Python, SQL, Data Analysis, Prompt Engineering</span>,
                <span key="2"><strong className="text-neutral-200">Libs:</strong> NumPy, Pandas, Matplotlib, Scikit-learn</span>,
                <span key="3"><strong className="text-neutral-200">Tools:</strong> Colab, Kaggle, KNIME, Hugging Face</span>,
                <span key="4"><strong className="text-neutral-200">Projects:</strong> Flashcard app, Quick Commerce analysis</span>,
              ]} />
            </div>
            <div className="bg-black border border-neutral-800 rounded-xl p-4">
              <div className="font-mono text-[11px] tracking-wider text-yellow-600 mb-3 border-b border-neutral-800 pb-2">LeapStart School of Technology</div>
              <BulletList size="xs" items={[
                <span key="1"><strong className="text-neutral-200">Web:</strong> HTML5, CSS3, JavaScript, DOM</span>,
                <span key="2"><strong className="text-neutral-200">Systems:</strong> Linux, Ubuntu, VirtualBox, Shell</span>,
                <span key="3"><strong className="text-neutral-200">DevOps:</strong> Git, GitHub, VS Code</span>,
                <span key="4"><strong className="text-neutral-200">Built:</strong> Portfolio, resume & UI replica sites</span>,
              ]} />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 bg-yellow-400/8 border border-yellow-800/40 rounded-xl px-5 py-3">
            <span className="font-mono text-[11px] tracking-wider text-yellow-600 uppercase">Semester 1 CGPA</span>
            <span className="text-yellow-400 font-bold text-xl" style={fjalla}>9.75</span>
          </div>
        </TimelineRow>

        <TimelineRow period="Late Dec" year="2024">
          <h3 className="font-bold text-white text-lg mb-1">SDLC Workshop</h3>
          <p className="font-mono text-xs text-neutral-500 italic mb-4">Mentor: SaiRam Bingi (PMP®, CBAP®, CSM®, ITIL®, PRINCE 2)</p>
          <BulletList items={[
            'Learned SDLC fundamentals, business case creation, project charter, and FRD',
            <span key="p"><strong className="text-neutral-200">Applied Project:</strong> Rapid Blood Bank Supply Platform (MVP)</span>,
            'Designed FRD and developed working prototype with HTML, CSS, JS, Firebase',
          ]} />
        </TimelineRow>

        <TimelineRow period="Dec – Jan" year="2024–25">
          <h3 className="font-bold text-white text-lg mb-1">Cybersecurity Tasks</h3>
          <p className="font-mono text-xs text-neutral-500 italic mb-4">Future Interns — Security Assessment Experience</p>
          <BulletList items={[
            'Vulnerability assessment on OWASP Juice Shop using Burp Suite on Kali Linux',
            'Identified common web vulnerabilities and analyzed attack flows',
            <span key="s"><strong className="text-neutral-200">Secure File Sharing:</strong> Python encryption system using cryptography libraries</span>,
          ]} />
        </TimelineRow>

        <TimelineRow period="Jan – Now" year="2025" current>
          <div className="flex items-center gap-3 mb-1 flex-wrap">
            <h3 className="font-bold text-white text-lg">Semester 2 — In Progress</h3>
            <span className="font-mono text-[10px] tracking-wider text-yellow-400 bg-yellow-400/8 border border-yellow-700/50 px-3 py-1 rounded-full uppercase">Active</span>
          </div>
          <p className="font-mono text-xs text-neutral-500 italic mb-5">LeapStart School of Technology · Hyderabad</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-black border border-neutral-800 rounded-xl p-4">
              <div className="font-mono text-[11px] tracking-wider text-yellow-600 mb-3 border-b border-neutral-800 pb-2">Frontend & Frameworks</div>
              <BulletList size="xs" items={[
                <span key="1"><strong className="text-neutral-200">React:</strong> Components, hooks, state management</span>,
                <span key="2"><strong className="text-neutral-200">TypeScript:</strong> Type safety, interfaces, generics</span>,
                <span key="3"><strong className="text-neutral-200">Advanced JS:</strong> ES6+, async/await, closures, modules</span>,
                <span key="4"><strong className="text-neutral-200">jQuery:</strong> DOM manipulation, AJAX workflows</span>,
              ]} />
            </div>
            <div className="bg-black border border-neutral-800 rounded-xl p-4">
              <div className="font-mono text-[11px] tracking-wider text-yellow-600 mb-3 border-b border-neutral-800 pb-2">Backend & Databases</div>
              <BulletList size="xs" items={[
                <span key="1"><strong className="text-neutral-200">PostgreSQL:</strong> Relational schema design, indexing, queries</span>,
                <span key="2"><strong className="text-neutral-200">PHP:</strong> REST API development, server-side logic</span>,
                <span key="3"><strong className="text-neutral-200">Node.js:</strong> Fastify APIs, Socket.IO, BullMQ queues</span>,
              ]} />
            </div>
            <div className="bg-black border border-neutral-800 rounded-xl p-4 md:col-span-2">
              <div className="font-mono text-[11px] tracking-wider text-yellow-600 mb-3 border-b border-neutral-800 pb-2">LeapStart LMS — Antigravity (Live Project)</div>
              <BulletList size="xs" items={[
                <span key="1">Core contributor on <strong className="text-neutral-200">LeapStart LMS</strong> — a next-gen, role-aware EdTech platform built by Antigravity from the ground up</span>,
                <span key="2">Stack: <strong className="text-neutral-200">Next.js 15 · Fastify · Socket.IO · PostgreSQL · Redis · AWS · Docker · K8s</strong></span>,
                <span key="3">Building: real-time chat (sub-50ms), geolocation attendance, 4-layer proctoring engine, 30+ table DB schema</span>,
                <span key="4">Target: <strong className="text-neutral-200">5,000+ concurrent users</strong> — stateless API, PgBouncer, BullMQ workers, MeiliSearch</span>,
              ]} />
            </div>
          </div>
          <div className="inline-flex items-center gap-3 bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-3">
            <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 6px #4ade80' }} />
            <span className="font-mono text-[11px] tracking-wider text-green-400 uppercase">Semester 2 Active</span>
          </div>
        </TimelineRow>
      </div>
    </section>
  )
}
