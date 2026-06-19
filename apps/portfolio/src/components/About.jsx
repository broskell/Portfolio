import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const INTERESTS = ['AI', 'Web Dev', 'Linux', 'Security', 'Data Sci', 'Open Source']

const VALUES = [
  {
    num: '01',
    title: 'Build First, Overthink Later',
    text: "I learn best when I'm creating. Shipping a rough prototype beats planning forever.",
  },
  {
    num: '02',
    title: 'Curiosity as a Skill',
    text: 'I actively explore new tools, frameworks, and ideas — from OWASP Juice Shop to Suno AI.',
  },
  {
    num: '03',
    title: 'Quality over Quantity',
    text: 'A well-crafted solution that solves a real problem is worth more than ten half-baked ones.',
  },
  {
    num: '04',
    title: 'Consistency Compounds',
    text: "Daily progress — even small — is how I've gone from zero to 9.75 CGPA and three deployed apps.",
  },
]

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="about" ref={ref} className="max-w-5xl mx-auto px-6 py-20 scroll-mt-16">
      <p className="section-label">Who I Am</p>
      <h2 className="heading text-white mb-12">
        About
        <br />
        My Story
        <br />
        <span className="accent">&amp; Drive.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="md:sticky top-20"
        >
          <div
            className="w-44 h-44 mx-auto mb-6 rounded-full p-[3px] animate-gold-pulse"
            style={{ background: 'linear-gradient(135deg, #B8860B, transparent, #B8860B)' }}
          >
            <div className="relative w-full h-full rounded-full bg-neutral-900 overflow-hidden flex items-center justify-center">
              <img src="/assets/pfp.jpg" alt="Saathvik Kellampalli" className="absolute w-full h-full object-cover rounded-full" />
            </div>
          </div>
          <div className="mb-4 px-2">
            <img src="/assets/name.jpeg" alt="Saathvik Kellampalli" className="w-full h-auto object-contain max-h-16 opacity-90" />
          </div>
          <div className="flex justify-center mb-6">
            <span className="font-mono text-[10px] tracking-[0.1em] text-yellow-600 bg-gold/8 border border-yellow-800/40 px-4 py-1.5 rounded-full">
              UG @ IITJ × LST
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="mb-10 space-y-4">
            <p className="text-neutral-300 leading-relaxed text-base">
              I'm <strong className="text-white">Saathvik Kellampalli</strong>, a first-year undergrad pursuing{' '}
              <strong className="text-gold/80">BS in Applied AI & Data Science</strong> at IIT Jodhpur alongside
              hands-on, project-based learning at LeapStart School of Technology in Hyderabad.
            </p>
            <p className="text-neutral-400 leading-relaxed text-base">
              My journey into technology started with curiosity for how things work — from algorithms to
              operating systems to web applications. During my pre-college gap, I dived headfirst into online
              certifications and never looked back. Now I'm building real products, exploring AI tools.
            </p>
            <p className="text-neutral-400 leading-relaxed text-base">
              I believe in <strong className="text-white">learning by building</strong>. Every project teaches me
              something new — voice AI with Groq, secure file sharing with Python's cryptography stack,
              or a sports booking platform deployed on Firebase.
            </p>
          </div>

          <p className="section-label mb-4">Interests & Passions</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-10">
            {INTERESTS.map((item) => (
              <div
                key={item}
                className="bg-neutral-900 rounded-xl p-4 text-center border border-neutral-900 hover:border-gold-dim hover:bg-gold/5 hover:-translate-y-1 transition-all duration-250"
              >
                <div className="font-bold text-neutral-300 text-[11px]">{item}</div>
              </div>
            ))}
          </div>

          <p className="section-label mb-2">Core Values</p>
          <ul className="mb-10">
            {VALUES.map((v, i) => (
              <li key={v.num} className={`flex gap-4 items-start py-5 ${i < VALUES.length - 1 ? 'border-b border-neutral-900' : ''}`}>
                <span style={{ fontFamily: "'Fjalla One', sans-serif", fontSize: '1.5rem', color: '#252525', minWidth: '32px' }}>
                  {v.num}
                </span>
                <div>
                  <h4 className="font-bold text-white text-sm mb-1">{v.title}</h4>
                  <p className="font-mono text-xs text-neutral-500 leading-relaxed">{v.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-gold/4 border border-yellow-800/30 rounded-2xl p-6 hover:border-yellow-700/50 transition-colors">
            <p className="font-mono text-sm text-yellow-600/80 leading-relaxed italic">
              "Driven by curiosity and a passion for technology, I actively seek out new knowledge
              and hands-on experience with AI, open-source systems, and modern web frameworks to
              solve real-world challenges."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
