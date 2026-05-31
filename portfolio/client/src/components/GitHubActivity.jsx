import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function GitHubActivity() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-6 pb-20">
      <p className="section-label">Open Source</p>
      <h2 className="heading text-white mb-8" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        GitHub
        <br />
        Contribution
        <br />
        <span className="accent">Activity.</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        className="bg-[#0d1117] border border-[#30363d] rounded-md p-6 hover:border-[#484f58] transition-colors"
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-[#7d8590]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="font-mono text-sm text-[#e6edf3]">broskell</span>
            <span className="font-mono text-xs text-[#7d8590]">contributions in the last year</span>
          </div>
          <a
            href="https://github.com/broskell"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-gold-dim hover:underline transition-colors flex items-center gap-1"
          >
            View on GitHub ↗
          </a>
        </div>

        <div className="bg-[#161b22] rounded p-4 border border-[#21262d]">
          <img
            src="https://ghchart.rshah.org/39d353/broskell"
            alt="GitHub Contribution Chart"
            className="w-full h-auto"
            style={{ filter: 'brightness(1.1)' }}
          />
        </div>

        <p className="font-mono text-[10px] text-[#484f58] text-center mt-4 tracking-wider">
          Live activity from github.com/broskell
        </p>
      </motion.div>
    </section>
  )
}
