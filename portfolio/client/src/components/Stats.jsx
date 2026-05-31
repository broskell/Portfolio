import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const STATS = [
  { value: '7+', label: 'Programming Languages' },
  { value: '3+', label: 'Live Projects' },
  { value: '30+', label: 'AI Tools Explored' },
]

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <section ref={ref} className="max-w-4xl mx-auto px-6 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-3 border border-neutral-900 rounded-2xl overflow-hidden divide-x divide-neutral-900"
      >
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-neutral-950 py-8 text-center hover:bg-neutral-900 transition-colors group"
          >
            <div
              className="text-4xl text-gold leading-none mb-2 group-hover:scale-110 transition-transform"
              style={{ fontFamily: "'Fjalla One', sans-serif" }}
            >
              {stat.value}
            </div>
            <div className="font-mono text-[10px] tracking-[0.15em] text-neutral-500 uppercase px-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
