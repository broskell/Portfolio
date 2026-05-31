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



      <p className="font-mono text-xs text-neutral-700 tracking-wider">
        © 2026 Saathvik Kellampalli — All rights reserved
      </p>
    </footer>
  )
}
