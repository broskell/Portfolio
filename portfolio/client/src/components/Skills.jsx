import { MaterialIcon, SkillChip } from './SkillChip'
import { AI_TOOLS_TABLE, CYBERSECURITY, TECH_SECTIONS, WEB_PLATFORMS } from '../data/techStack'

const fjalla = { fontFamily: "'Fjalla One', sans-serif" }

export default function Skills() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-14">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">My Arsenal</p>
      <h1 className="mb-4 text-white" style={{ ...fjalla, fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Skills &amp; <span className="text-yellow-400">Tech Stack</span>
      </h1>
      <p className="text-neutral-500 text-sm max-w-md leading-relaxed mb-12">
        A constantly growing toolkit built through hands-on projects, coursework, and obsessive exploration.
      </p>

      <div className="grid grid-cols-3 border border-neutral-900 rounded-2xl overflow-hidden divide-x divide-neutral-900 mb-4">
        {[
          ['10+', 'Languages'],
          ['18+', 'Tools & Platforms'],
          ['50+', 'AI Tools Explored'],
        ].map(([v, l]) => (
          <div key={l} className="bg-neutral-950 py-8 text-center hover:bg-neutral-900 transition-colors">
            <div className="text-4xl text-yellow-400 mb-2" style={fjalla}>{v}</div>
            <div className="font-mono text-[10px] tracking-wider text-neutral-500 uppercase">{l}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-6 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
          <span className="w-3 h-3 rounded bg-neutral-800 border border-neutral-700" /> Proficient
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-500">
          <span className="w-3 h-3 rounded border border-dashed border-neutral-600" /> Currently Learning
        </div>
      </div>

      {TECH_SECTIONS.map((section) => (
        <div key={section.title} className="anim d3 mb-12">
          <div className="cat-divider flex items-center gap-3 mb-6 pb-4">
            <span className="font-bold text-white text-base flex items-center gap-1">
              <MaterialIcon name={section.icon} /> {section.title}
            </span>
            <span className="ml-auto font-mono text-[10px] text-yellow-600 bg-yellow-400/8 border border-yellow-900/40 px-3 py-1 rounded-full">
              {section.count}
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {section.chips.map((chip) => (
              <SkillChip key={chip.name} chip={chip} />
            ))}
          </div>
        </div>
      ))}

      <div className="anim d4 grid grid-cols-1 sm:grid-cols-2 gap-10 mb-16">
        <div>
          <div className="cat-divider flex items-center gap-3 mb-6 pb-4">
            <span className="font-bold text-white text-base flex items-center gap-1">
              <MaterialIcon name="cloud" /> Web Platforms &amp; APIs
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {WEB_PLATFORMS.map((chip) => (
              <SkillChip key={chip.name} chip={chip} />
            ))}
          </div>
        </div>
        <div>
          <div className="cat-divider flex items-center gap-3 mb-6 pb-4">
            <span className="font-bold text-white text-base flex items-center gap-1">
              <MaterialIcon name="lock" /> Cybersecurity
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {CYBERSECURITY.map((chip) => (
              <SkillChip key={chip.name} chip={chip} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-neutral-900 mb-12" />
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Explored &amp; Used</p>
      <h2 className="mb-8 text-white" style={{ ...fjalla, fontSize: '2rem' }}>
        AI Tools <span className="text-yellow-400">Explored</span>
      </h2>

      <div className="bg-neutral-950 border border-neutral-900 rounded-2xl overflow-hidden mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-900">
              <th className="font-mono text-[11px] tracking-wider text-yellow-600 text-left px-6 py-4 uppercase w-44">Category</th>
              <th className="font-mono text-[11px] tracking-wider text-yellow-600 text-left px-6 py-4 uppercase">Tools &amp; Platforms</th>
            </tr>
          </thead>
          <tbody>
            {AI_TOOLS_TABLE.map((row, i) => (
              <tr key={row.cat} className={`ai-row transition-colors ${i < AI_TOOLS_TABLE.length - 1 ? 'border-b border-neutral-900/50' : ''}`}>
                <td className="px-6 py-4 align-top">
                  <span className="font-mono text-xs font-bold text-white bg-neutral-800 px-3 py-1.5 rounded whitespace-nowrap">{row.cat}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {row.tools.map((t) => (
                      <span key={t} className="font-mono text-xs text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-lg">{t}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
