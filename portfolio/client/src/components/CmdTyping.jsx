import { useTypingEffect } from '../hooks/useTypingEffect'
import { TYPING_STRINGS } from '../data/typingStrings'

export default function CmdTyping({ prompt = 'C:\\Users\\Saathvik>' }) {
  const text = useTypingEffect(TYPING_STRINGS)

  return (
    <div className="w-full max-w-lg rounded-xl overflow-hidden border border-gold-dim/50 shadow-[0_0_40px_rgba(255,215,0,0.08)]">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900 border-b border-gold-dim/30">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <span className="font-mono text-[11px] text-neutral-500 ml-2 tracking-wide">portfolio.exe</span>
      </div>
      <div className="bg-[#0a0a0a] px-5 py-6 font-mono text-sm min-h-[120px]">
        <div className="text-gold-dim mb-2">{prompt}</div>
        <div className="text-gold-mid leading-relaxed break-words">
          {text}
          <span className="text-gold animate-blink ml-0.5">█</span>
        </div>
      </div>
    </div>
  )
}
