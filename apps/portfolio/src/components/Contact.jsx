import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { sendMessage } from '../api'
import { useTypingEffect } from '../hooks/useTypingEffect'

function TerminalSuccess({ show }) {
  const msg = "Message received! I'll get back to you soon."
  const typed = useTypingEffect(show ? [msg, msg] : [], 35, 60000)

  if (!show) return null

  return (
    <div className="bg-green-400/8 border border-green-800/30 rounded-xl p-5 font-mono text-sm">
      <div className="text-gold-dim mb-1">saathvik@portfolio:~$ echo $STATUS</div>
      <div className="text-green-400">
        {typed || msg.slice(0, 1)}
        <span className="text-gold animate-blink">█</span>
      </div>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email.'
    if (!form.subject.trim()) e.subject = 'Please enter a subject.'
    if (!form.message.trim()) e.message = 'Please write a message.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await sendMessage(form)
      setSuccess(true)
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSuccess(false), 8000)
    } catch {
      setErrors({ form: 'Failed to send. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section ref={ref} className="max-w-5xl mx-auto px-6 py-14">
      <p className="font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-2">Let's Connect</p>
      <h1 className="mb-12 text-white" style={{ fontFamily: "'Fjalla One', sans-serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Contact <span className="text-yellow-400">Me</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-12 items-start">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          className="md:sticky top-20"
        >
          <h3 className="text-4xl md:text-5xl leading-tight mb-6" style={{ fontFamily: "'Fjalla One', sans-serif" }}>
            Let's build
            <br />
            something
            <br />
            <span className="text-gold">great</span> together.
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed mb-10">
            Whether it's a project collaboration, internship opportunity, or just a conversation about
            tech — I'm always open to connecting with interesting people.
          </p>

          <div className="flex flex-col gap-3 mb-8">
            <a
              href="https://github.com/broskell"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-950 rounded-2xl p-5 flex items-center gap-4 border border-neutral-900 hover:border-gold-dim hover:bg-gold/5 hover:translate-x-1 transition-all"
            >
              <div className="w-11 h-11 bg-neutral-900 rounded-xl flex items-center justify-center text-lg shrink-0">⌥</div>
              <div>
                <div className="font-bold text-white text-sm">GitHub</div>
                <div className="font-mono text-xs text-neutral-500">github.com/broskell</div>
              </div>
              <span className="ml-auto text-neutral-600">→</span>
            </a>
            <a
              href="https://www.linkedin.com/in/kellampalli-saathvik-354799360/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-950 rounded-2xl p-5 flex items-center gap-4 border border-neutral-900 hover:border-gold-dim hover:bg-gold/5 hover:translate-x-1 transition-all"
            >
              <div className="w-11 h-11 bg-neutral-900 rounded-xl flex items-center justify-center font-bold text-sm shrink-0">in</div>
              <div>
                <div className="font-bold text-white text-sm">LinkedIn</div>
                <div className="font-mono text-xs text-neutral-500">kellampalli-saathvik</div>
              </div>
              <span className="ml-auto text-neutral-600">→</span>
            </a>
          </div>

          <div className="bg-gold/4 border border-yellow-800/30 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #4ade80' }} />
              <span className="font-mono text-[11px] tracking-wider text-green-400 uppercase">Available</span>
            </div>
            <p className="font-mono text-xs text-neutral-400 leading-relaxed">
              Open to internships, collabs, and interesting projects. Currently in Semester 2 at IITJ.
            </p>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          onSubmit={handleSubmit}
          className="bg-neutral-950 rounded-2xl p-8 sm:p-10 border border-neutral-900 hover:border-neutral-700 transition-colors"
        >
          <h3 className="font-bold text-white text-xl mb-1">Send a Message</h3>
          <div className="font-mono text-[11px] tracking-wider text-neutral-600 mb-8">RESPONSE_EXPECTED → within 48 hours</div>

          <div className="space-y-5">
            {['name', 'email', 'subject'].map((field) => (
              <div key={field}>
                <label className="block font-bold text-neutral-500 text-xs tracking-wide mb-2 capitalize" htmlFor={field}>
                  {field === 'email' ? 'Email Address' : field === 'name' ? 'Full Name' : 'Subject'}
                </label>
                <input
                  id={field}
                  type={field === 'email' ? 'email' : 'text'}
                  value={form[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className={`w-full rounded-xl px-4 py-3.5 text-white text-sm bg-[#0a0a0a] border transition-colors outline-none focus:border-gold-dim ${
                    errors[field] ? 'border-red-400' : 'border-neutral-900'
                  }`}
                  placeholder={
                    field === 'name' ? 'Your full name' : field === 'email' ? 'your@email.com' : "What's this about?"
                  }
                />
                {errors[field] && <span className="font-mono text-xs text-red-400 mt-1 block">{errors[field]}</span>}
              </div>
            ))}
            <div>
              <label className="block font-bold text-neutral-500 text-xs tracking-wide mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full rounded-xl px-4 py-3.5 text-white text-sm bg-[#0a0a0a] border resize-y transition-colors outline-none focus:border-gold-dim ${
                  errors.message ? 'border-red-400' : 'border-neutral-900'
                }`}
                placeholder="Tell me about your project, idea, or just say hello..."
              />
              {errors.message && <span className="font-mono text-xs text-red-400 mt-1 block">{errors.message}</span>}
            </div>

            {errors.form && <p className="font-mono text-xs text-red-400">{errors.form}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white text-black font-bold py-4 rounded-xl text-sm hover:bg-gold transition-all disabled:opacity-50 cursor-pointer border-none"
            >
              {submitting ? 'Sending...' : 'Send Message →'}
            </button>

            <TerminalSuccess show={success} />
          </div>
        </motion.form>
      </div>
    </section>
  )
}
