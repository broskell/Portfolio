import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getProjects } from '../api'

function ProjectSkeleton() {
  return (
    <div className="bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 animate-pulse">
      <div className="bg-neutral-900 aspect-video" />
      <div className="p-6 space-y-3">
        <div className="h-4 bg-neutral-800 rounded w-1/3" />
        <div className="h-6 bg-neutral-800 rounded w-2/3" />
        <div className="h-16 bg-neutral-800 rounded" />
      </div>
    </div>
  )
}

function ProjectCard({ project, index, inView }) {
  const isFlagship = project.order === 0
  const isWide = isFlagship || project.order === 3

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      whileHover={{
        y: -8,
        boxShadow: '0 0 40px rgba(255, 215, 0, 0.12), 0 20px 60px rgba(0,0,0,0.5)',
      }}
      className={`bg-neutral-950 rounded-2xl overflow-hidden border border-neutral-900 hover:border-gold-dim/40 transition-colors ${
        isWide ? 'lg:col-span-2' : ''
      }`}
    >
      <div className={isWide ? 'grid grid-cols-1 md:grid-cols-[1fr_1.2fr]' : 'flex flex-col h-full'}>
        {project.image ? (
          <div className="bg-neutral-900 aspect-video relative border-b md:border-b-0 md:border-r border-neutral-800 overflow-hidden">
            <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
          </div>
        ) : isFlagship ? (
          <div
            className="bg-neutral-900 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-neutral-800 min-h-52"
            style={{ background: 'linear-gradient(135deg, #0a0a0a, #111114)' }}
          >
            <div className="absolute inset-0 opacity-5 grid-texture" style={{ backgroundSize: '32px 32px' }} />
            <div className="relative flex flex-col items-center gap-3 p-8">
              <span style={{ fontFamily: "'Fjalla One', sans-serif", fontSize: '2.2rem', color: 'rgba(212,175,55,0.15)', letterSpacing: '6px' }}>
                ANTIGRAVITY
              </span>
            </div>
          </div>
        ) : null}

        <div className="p-6 md:p-7 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`w-2 h-2 rounded-full ${project.status?.includes('Progress') ? 'bg-gold' : 'bg-green-400'}`}
              style={{ boxShadow: project.status?.includes('Progress') ? '0 0 8px #ffd700' : '0 0 8px #4ade80' }}
            />
            <span className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">{project.status}</span>
          </div>
          <div className="font-mono text-[10px] text-neutral-600 tracking-wider mb-1">
            PROJECT / {String(project.order).padStart(2, '0')}
          </div>
          <h3 className="font-bold text-white text-xl mb-1">{project.title}</h3>
          {project.subtitle && (
            <p className="font-mono text-xs text-gold-dim/70 mb-3">{project.subtitle}</p>
          )}
          <p className="text-neutral-500 text-sm leading-relaxed mb-4 flex-1">{project.description}</p>

          {project.highlights?.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4 text-xs font-mono">
              {project.highlights.slice(0, 4).map((h) => (
                <div key={h} className="bg-black border border-neutral-800 rounded-lg px-3 py-2 text-neutral-400">
                  {h}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-5">
            {project.techStack?.map((tech) => (
              <span key={tech} className="font-mono text-[11px] bg-neutral-900 border border-neutral-800 text-neutral-400 px-2.5 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>

          {(project.liveUrl || project.githubUrl) && (
            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-white text-black font-bold text-sm py-2.5 rounded-xl hover:bg-gold transition-colors"
                >
                  ↗ Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center bg-transparent border border-neutral-700 text-neutral-400 font-bold text-sm py-2.5 rounded-xl hover:border-neutral-500 hover:text-white transition-all"
                >
                  ⌥ GitHub
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  )
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 })

  useEffect(() => {
    getProjects()
      .then((res) => setProjects(res.data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const featured = projects.filter((p) => p.featured)
  const other = projects.filter((p) => !p.featured)

  return (
    <section id="projects" ref={ref} className="max-w-6xl mx-auto px-6 py-20 scroll-mt-16">
      <p className="section-label">My Work</p>
      <h2 className="heading text-white mb-4">
        Featured
        <br />
        Projects
        <br />
        <span className="accent">Showcase.</span>
      </h2>
      <p className="text-neutral-500 text-sm max-w-lg leading-relaxed mb-12">
        A showcase of applications built using modern technologies and hands-on learning — from voice AI to sports booking platforms.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ProjectSkeleton key={i} />)
          : featured.map((p, i) => <ProjectCard key={p._id} project={p} index={i} inView={inView} />)}
      </div>

      {!loading && other.length > 0 && (
        <>
          <div className="h-px bg-neutral-900 mb-12" />
          <p className="section-label">Also Built</p>
          <h3 className="text-3xl mb-8" style={{ fontFamily: "'Fjalla One', sans-serif" }}>
            Other <span className="text-gold">Work</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {other.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="bg-neutral-950 rounded-xl p-5 border border-neutral-900 hover:border-gold-dim hover:bg-gold/5 hover:-translate-y-1 transition-all duration-250"
              >
                <h4 className="font-bold text-white text-sm mb-2">{p.title}</h4>
                <p className="text-neutral-500 text-xs leading-relaxed">{p.description}</p>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </section>
  )
}
