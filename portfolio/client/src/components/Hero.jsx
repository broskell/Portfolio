import { motion } from 'framer-motion'
import CmdTyping from './CmdTyping'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col relative overflow-hidden pt-16 pb-24 md:pb-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 65%, rgba(255,215,0,0.06) 0%, transparent 70%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-[0.015] grid-texture" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="font-mono text-neutral-500 text-xs mb-6 tracking-widest">Hello, I'm</p>

            <h1 className="heading text-white mb-6">
              Saathvik
              <br />
              Kellampalli
              <br />
              <span className="accent">Builder.</span>
            </h1>

            <CmdTyping />

            <p className="text-neutral-400 text-sm mt-8 mb-6 font-semibold tracking-wide">
              <span className="text-gold/80">BS Applied AI & DS</span> &nbsp;|&nbsp; IIT Jodhpur
              &nbsp;|&nbsp; LeapStart School of Technology
            </p>

            <div className="border-l-2 border-gold-dim/60 pl-5 text-left mb-8 max-w-md">
              <p className="font-mono text-neutral-400 text-sm leading-relaxed">
                Building strong foundations in technology
                <br />
                to shape a smarter future.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="/assets/Saathvik_Kellampalli_Resume (1).pdf"
                download
                className="bg-white text-black font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-gold transition-colors duration-300"
              >
                ↓ Download CV
              </a>
              <a
                href="#projects"
                className="bg-gold/10 border border-gold-dim/50 text-gold font-bold text-xs px-5 py-2.5 rounded-lg hover:bg-gold/20 transition-all"
              >
                View Projects →
              </a>
              <a
                href="#terminal"
                className="bg-transparent border border-neutral-700 text-neutral-300 font-bold text-xs px-5 py-2.5 rounded-lg hover:border-neutral-500 hover:text-white transition-all"
              >
                &gt;_ Terminal
              </a>
            </div>

            <div className="flex gap-10">
              <SocialLink href="https://github.com/broskell" label="GitHub">
                <GitHubIcon />
              </SocialLink>
              <SocialLink
                href="https://www.linkedin.com/in/kellampalli-saathvik-354799360/"
                label="LinkedIn"
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink href="#contact" label="Contact">
                <MailIcon />
              </SocialLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div
                className="absolute inset-0 rounded-full animate-gold-pulse"
                style={{
                  background: 'linear-gradient(135deg, #B8860B, transparent, #B8860B)',
                  padding: '3px',
                }}
              >
                <div className="w-full h-full rounded-full bg-neutral-900 overflow-hidden border-2 border-black">
                  <img
                    src="/assets/pfp.jpg"
                    alt="Saathvik Kellampalli"
                    className="w-full h-full object-cover"
                    style={{ filter: 'drop-shadow(0 0 30px rgba(255, 215, 0, 0.25))' }}
                  />
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 hidden md:block">
                <video
                  autoPlay
                  muted
                  playsInline
                  loop
                  className="w-48 h-auto mix-blend-screen opacity-80 pointer-events-none"
                >
                  <source src="/assets/Cinematic_Text_Animation_Video_Generation.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-2 opacity-70 md:opacity-100 pb-4">
        <div
          className="scroll-line w-px h-10 md:h-14 animate-scroll-pulse"
          style={{ background: 'linear-gradient(to bottom, #B8860B, transparent)' }}
        />
        <span className="font-mono text-[10px] tracking-[0.2em] text-neutral-600">scroll</span>
      </div>
    </section>
  )
}

function SocialLink({ href, label, children }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="text-neutral-400 hover:text-gold hover:scale-110 transition-all duration-300"
    >
      {children}
    </a>
  )
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
