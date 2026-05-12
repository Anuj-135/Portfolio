'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/',
    color: '#6c63ff',
    icon: (
      <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    color: '#0a66c2',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Twitter',
    href: 'https://twitter.com/',
    color: '#1da1f2',
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
]

const COLORS = ['#6c63ff', '#f43f5e', '#10b981', '#f59e0b', '#06b6d4', '#ec4899', '#1a1a2e', '#ffffff']
const SIZES = [2, 4, 8, 14]

function useInView(threshold = 0.1) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return [ref, inView]
}

export default function Contact({ darkMode }) {
  const [sectionRef, inView] = useInView()
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const drawing = useRef(false)
  const lastPos = useRef(null)

  const [tool, setTool] = useState('pen')   // pen | eraser
  const [color, setColor] = useState('#6c63ff')
  const [size, setSize] = useState(4)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)

  const d = darkMode
  const accent = '#6c63ff'
  const pageBg = d ? '#0d0d1a' : '#e8e8f0'
  const raised = d
    ? '6px 6px 16px #07071099, -6px -6px 16px #131324'
    : '6px 6px 16px #c8c8d0, -6px -6px 16px #ffffff'
  const insetShadow = d
    ? 'inset 3px 3px 8px #07071099, inset -3px -3px 8px #13132480'
    : 'inset 3px 3px 8px #c0c0c8, inset -3px -3px 8px #ffffff'
  const text = d ? '#f0ede8' : '#1a1a2e'
  const muted = d ? 'rgba(240,237,232,0.45)' : 'rgba(26,26,46,0.50)'
  const lbl = d ? 'rgba(240,237,232,0.28)' : 'rgba(26,26,46,0.32)'
  const divClr = d ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,46,0.07)'

  const canvasBg = d ? '#13132a' : '#f8f8fc'

  const reveal = (delay = 0) => ({
    transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(24px)',
  })

  // Init canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctxRef.current = ctx
    ctx.fillStyle = canvasBg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [canvasBg])

  const getPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    }
  }, [])

  const startDraw = useCallback((e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    drawing.current = true
    setHasDrawn(true)
    const pos = getPos(e, canvas)
    lastPos.current = pos
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, (tool === 'eraser' ? size * 3 : size) / 2, 0, Math.PI * 2)
    ctx.fillStyle = tool === 'eraser' ? canvasBg : color
    ctx.fill()
  }, [tool, size, color, canvasBg, getPos])

  const draw = useCallback((e) => {
    e.preventDefault()
    if (!drawing.current) return
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    const pos = getPos(e, canvas)
    ctx.beginPath()
    ctx.moveTo(lastPos.current.x, lastPos.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = tool === 'eraser' ? canvasBg : color
    ctx.lineWidth = tool === 'eraser' ? size * 3 : size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }, [tool, size, color, canvasBg])

  const endDraw = useCallback(() => { drawing.current = false }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    ctx.fillStyle = canvasBg
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    setHasDrawn(false)
  }

  const handleSend = async () => {
    if (!hasDrawn) return
    setSending(true)
    await new Promise(r => setTimeout(r, 1200))
    setSending(false)
    setSent(true)
    setTimeout(() => { setSent(false); clearCanvas() }, 3500)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ background: pageBg, transition: 'background 0.4s ease' }}
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
    >
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 400, height: 400, borderRadius: '50%',
        background: d ? 'rgba(108,99,255,0.07)' : 'rgba(108,99,255,0.05)',
        filter: 'blur(110px)', pointerEvents: 'none',
      }} />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <div style={reveal(0)} className="mb-10 sm:mb-14">
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: lbl }}>
            05 — Contact
          </span>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: text, marginTop: 8 }}>
            Let's Connect<span style={{ color: accent }}>.</span>
          </h2>
          <p style={{ fontSize: 14, color: muted, marginTop: 10, maxWidth: 500, lineHeight: 1.7 }}>
            Skip the boring form — draw me a message on the whiteboard! Doodle, write, sketch anything.
            Or just reach out directly through the links.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ── Left: Whiteboard (3 cols) ── */}
          <div style={{ ...reveal(100), background: pageBg, boxShadow: raised, borderRadius: 24, padding: '1.5rem' }}
            className="lg:col-span-3 flex flex-col gap-4"
          >
            {/* Toolbar */}
            <div className="flex items-center gap-3 flex-wrap">

              {/* Pen / Eraser */}
              <div className="flex items-center gap-2 p-1 rounded-xl" style={{ background: pageBg, boxShadow: insetShadow }}>
                {[
                  { id: 'pen', label: '✏️' },
                  { id: 'eraser', label: '🧹' },
                ].map(({ id, label }) => (
                  <button key={id} onClick={() => setTool(id)}
                    className="px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-150 active:scale-95"
                    style={{
                      border: 'none', cursor: 'pointer',
                      fontSize: 16,
                      background: tool === id ? accent : 'transparent',
                      boxShadow: tool === id ? `0 2px 10px ${accent}50` : raised,
                      color: tool === id ? '#fff' : muted,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Color swatches */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {COLORS.map(c => (
                  <button key={c} onClick={() => { setColor(c); setTool('pen') }}
                    className="transition-all duration-150 active:scale-90"
                    style={{
                      width: color === c ? 26 : 20,
                      height: color === c ? 26 : 20,
                      borderRadius: '50%', border: 'none', cursor: 'pointer',
                      background: c,
                      boxShadow: color === c
                        ? `0 0 0 3px ${pageBg}, 0 0 0 5px ${c}, 0 4px 12px ${c}60`
                        : raised,
                      transition: 'all 0.15s ease',
                    }}
                  />
                ))}
              </div>

              {/* Brush sizes */}
              <div className="flex items-center gap-2 p-1.5 rounded-xl" style={{ background: pageBg, boxShadow: insetShadow }}>
                {SIZES.map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className="flex items-center justify-center transition-all duration-150 active:scale-90"
                    style={{
                      width: 28, height: 28, borderRadius: '50%',
                      border: 'none', cursor: 'pointer',
                      background: size === s ? accent : 'transparent',
                      boxShadow: size === s ? `0 2px 8px ${accent}50` : raised,
                    }}
                  >
                    <span style={{
                      width: Math.max(s * 0.9, 3), height: Math.max(s * 0.9, 3),
                      borderRadius: '50%',
                      background: size === s ? '#fff' : (d ? 'rgba(255,255,255,0.4)' : 'rgba(26,26,46,0.35)'),
                      display: 'block',
                    }} />
                  </button>
                ))}
              </div>

              {/* Clear */}
              <button onClick={clearCanvas}
                className="ml-auto px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95"
                style={{
                  border: 'none', cursor: 'pointer',
                  background: pageBg, boxShadow: raised,
                  color: muted,
                }}
              >
                🗑️ Clear
              </button>
            </div>

            {/* Canvas */}
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              boxShadow: insetShadow,
              cursor: tool === 'eraser' ? 'cell' : 'crosshair',
              lineHeight: 0,
            }}>
              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                style={{ width: '100%', height: 'auto', display: 'block', background: canvasBg, touchAction: 'none' }}
                onMouseDown={startDraw}
                onMouseMove={draw}
                onMouseUp={endDraw}
                onMouseLeave={endDraw}
                onTouchStart={startDraw}
                onTouchMove={draw}
                onTouchEnd={endDraw}
              />
            </div>

            {/* Hint + send */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p style={{ fontSize: 11, color: muted, fontStyle: 'italic' }}>
                {hasDrawn ? '✨ Looking good! Send it when ready.' : '👆 Start drawing to leave me a message!'}
              </p>
              <button
                onClick={handleSend}
                disabled={!hasDrawn || sending || sent}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                style={{
                  border: 'none', cursor: hasDrawn ? 'pointer' : 'not-allowed',
                  background: sent
                    ? 'linear-gradient(135deg,#10b981,#059669)'
                    : `linear-gradient(135deg,${accent},#a78bfa)`,
                  boxShadow: sent
                    ? '0 4px 16px rgba(16,185,129,0.45)'
                    : `0 4px 16px ${accent}50`,
                  minWidth: 130,
                  justifyContent: 'center',
                }}
              >
                {sent && '✓ Message sent!'}
                {sending && <><span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>}
                {!sent && !sending && <><svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg> Send Drawing</>}
              </button>
            </div>
          </div>

          {/* ── Right: Info panel (2 cols) ── */}
          <div className="lg:col-span-2 flex flex-col gap-4">

            {/* Availability */}
            <div style={{ ...reveal(200), background: pageBg, boxShadow: raised, borderRadius: 20, padding: '1.5rem' }}>
              <div className="flex items-center gap-3 mb-4">
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: `linear-gradient(135deg,${accent}30,${accent}10)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
                }}>
                  👋
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: text }}>Available for work</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                      style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }} />
                    <span style={{ fontSize: 11, color: muted }}>Open to opportunities</span>
                  </div>
                </div>
              </div>
              <div style={{ height: 1, background: divClr, marginBottom: 16 }} />
              {[
                { emoji: '📧', label: 'Email', value: 'anuj@example.com', href: 'mailto:anuj@example.com' },
                { emoji: '📍', label: 'Location', value: 'India', href: null },
                { emoji: '⚡', label: 'Response', value: 'Within 24 hours', href: null },
              ].map(({ emoji, label, value, href }) => (
                <div key={label} className="flex items-center gap-3 mb-3 last:mb-0">
                  <div style={{
                    width: 34, height: 34, borderRadius: 10, flexShrink: 0,
                    background: pageBg, boxShadow: insetShadow,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15,
                  }}>{emoji}</div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: lbl }}>{label}</p>
                    {href
                      ? <a href={href} style={{ fontSize: 12, fontWeight: 600, color: accent }}>{value}</a>
                      : <p style={{ fontSize: 12, fontWeight: 600, color: muted }}>{value}</p>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div style={{ ...reveal(300), background: pageBg, boxShadow: raised, borderRadius: 20, padding: '1.5rem' }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 14 }}>
                Find me on
              </p>
              <div className="flex flex-col gap-3">
                {socials.map(({ label, href, color, icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 active:scale-95"
                    style={{ background: pageBg, boxShadow: raised, textDecoration: 'none' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = `${raised}, 0 0 0 1.5px ${color}40`}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = raised}
                  >
                    <div style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      background: `${color}18`, boxShadow: insetShadow,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color,
                    }}>{icon}</div>
                    <span style={{ fontSize: 13, fontWeight: 600, color: text }}>{label}</span>
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      style={{ marginLeft: 'auto', color: muted }}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Fun note */}
            <div style={{ ...reveal(400), background: pageBg, boxShadow: raised, borderRadius: 20, padding: '1.25rem 1.5rem' }}>
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🎨</span>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 700, color: text }}>Be creative!</p>
                  <p style={{ fontSize: 11, color: muted, marginTop: 3, lineHeight: 1.6 }}>
                    Draw a smiley, write your name, sketch a rocket — anything goes. I'd love to see it!
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}