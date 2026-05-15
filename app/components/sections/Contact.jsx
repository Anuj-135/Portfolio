'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

import { socials } from "../../data/contact"

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