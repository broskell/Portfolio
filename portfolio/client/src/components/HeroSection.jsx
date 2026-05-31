import { Link } from 'react-router-dom'
import { RESUME_URL } from '../config/nav'

export default function HeroSection() {
  return (
    <section className="hero relative min-h-[100svh] flex flex-col overflow-hidden">
      <div className="hero-vignette pointer-events-none" aria-hidden="true" />
      <div className="hero-spotlight pointer-events-none" aria-hidden="true" />
      <div className="hero-grid pointer-events-none" aria-hidden="true" />
      <div className="hero-noise pointer-events-none" aria-hidden="true" />

      <div className="hero-corner hero-corner-tl pointer-events-none" aria-hidden="true" />
      <div className="hero-corner hero-corner-tr pointer-events-none" aria-hidden="true" />
      <div className="hero-corner hero-corner-bl pointer-events-none" aria-hidden="true" />
      <div className="hero-corner hero-corner-br pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 pt-24 pb-6 max-w-5xl mx-auto w-full">
        <div className="anim-1 hero-intro flex items-center gap-4 w-full max-w-lg mb-8">
          <span className="hero-intro-line flex-1" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.4em] text-neutral-500 uppercase shrink-0">
            Hello, I&apos;m
          </span>
          <span className="hero-intro-line flex-1" />
        </div>

        <div className="anim-2 hero-stage w-full max-w-[780px]">
          <div className="hero-stage-inner">
            <video
              autoPlay
              muted
              playsInline
              loop
              className="hero-name-video"
              aria-label="Saathvik Kellampalli"
            >
              <source src="/assets/Cinematic_Text_Animation_Video_Generation.mp4" type="video/mp4" />
            </video>
            <div className="hero-stage-fade" aria-hidden="true" />
          </div>
        </div>

        <div className="anim-3 hero-dock w-full max-w-2xl">
          <div className="hero-dock-inner">
            <p className="hero-credentials">
              <span className="hero-credentials-highlight">BS Applied AI &amp; DS</span>
              <span className="hero-credentials-sep" aria-hidden="true" />
              <span>IIT Jodhpur</span>
              <span className="hero-credentials-sep" aria-hidden="true" />
              <span>LeapStart School of Technology</span>
            </p>

            <blockquote className="hero-quote">
              <span className="hero-quote-bar" aria-hidden="true" />
              <span>
                Building strong foundations in technology
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                to shape a smarter future.
              </span>
            </blockquote>

            <div className="anim-4 hero-actions">
              <a href={RESUME_URL} download="Saathvik_Kellampalli_Resume.pdf" className="hero-btn hero-btn-primary">
                <span className="hero-btn-icon">↓</span>
                Download CV
              </a>
              <Link to="/projects" className="hero-btn hero-btn-gold">
                View Projects
                <span className="hero-btn-arrow">→</span>
              </Link>
              <Link to="/terminal" className="hero-btn hero-btn-ghost">
                <span className="text-yellow-500/90 font-mono">&gt;_</span>
                Terminal
              </Link>
            </div>

            <div className="hero-dock-footer">
              <div className="anim-5 hero-social">
                <a href="https://github.com/broskell" target="_blank" rel="noopener noreferrer" className="hero-social-link" aria-label="GitHub">
                  <GitHubIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/kellampalli-saathvik-354799360/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-social-link"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon />
                </a>
                <Link to="/contact" className="hero-social-link" aria-label="Contact">
                  <MailIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="anim-6 relative z-10 flex flex-col items-center gap-2 pb-8 pt-4">
        <div className="hero-scroll-track">
          <div className="hero-scroll-thumb" />
        </div>
        <span className="font-mono text-[10px] tracking-[0.25em] text-neutral-600 uppercase">Scroll</span>
      </div>
    </section>
  )
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}
