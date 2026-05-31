export default function ProfileCodeWindow() {
  return (
    <div className="code-win bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl hover:border-neutral-600 transition-colors">
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
  )
}
