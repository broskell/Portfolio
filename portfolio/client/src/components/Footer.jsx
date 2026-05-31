export default function Footer() {
  return (
    <footer className="max-w-5xl mx-auto px-6 pt-12 pb-28 border-t border-neutral-900 text-center">
      <div className="mb-6 flex justify-center">
        <img
          src="/assets/name.jpeg"
          alt="Saathvik Kellampalli"
          className="w-auto h-20 object-contain opacity-60 hover:opacity-100 transition-opacity duration-500"
          style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.15))' }}
        />
      </div>

      <div className="max-w-3xl mx-auto mb-12">
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden text-left">
          <div className="bg-neutral-900 px-5 py-3 flex items-center gap-2 border-b border-neutral-800">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="font-mono text-xs text-neutral-500 ml-3">profile.js</span>
          </div>
          <pre className="p-7 font-mono text-sm leading-relaxed text-neutral-500 overflow-x-auto">{`const profile = {
  name:        'Saathvik Kellampalli',
  role:        'Student · Tech Enthusiast · Builder',
  education:  ['IIT Jodhpur', 'LeapStart School of Technology'],
  skills:     ['Python', 'React', 'PostgreSQL', 'Linux', 'TailwindCSS'],
  hardWorker:  true,
  quickLearner: true,
  hireable:   function() {
    return this.hardWorker && this.skills.length >= 5;
  }
};`}</pre>
        </div>
      </div>

      <p className="font-mono text-xs text-neutral-700 tracking-wider">
        © 2026 Saathvik Kellampalli — All rights reserved
      </p>
    </footer>
  )
}
