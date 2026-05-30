'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { socials } from '../../data/socials'
import { useNmTheme } from '../ui/useNmTheme'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'



// Reduced to 4 essential colors
const COLORS = ['#6c63ff', '#06b6d4', '#ec4899', '#1a1a2e']
const SIZES = [3, 6, 12]

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

// Faint hint lines drawn on empty canvas
function drawHint(ctx, w, h, canvasBg, hintColor) {
  ctx.fillStyle = canvasBg
  ctx.fillRect(0, 0, w, h)

  ctx.save()
  ctx.strokeStyle = hintColor
  ctx.lineWidth = 1
  ctx.setLineDash([4, 8])
  ctx.lineCap = 'round'
  ctx.globalAlpha = 0.35

  // Faint smile arc
  ctx.beginPath()
  ctx.arc(w / 2, h / 2 - 20, 38, 0.15 * Math.PI, 0.85 * Math.PI)
  ctx.stroke()

  // Two dots for eyes
  ctx.setLineDash([])
  ctx.globalAlpha = 0.25
  ctx.beginPath(); ctx.arc(w / 2 - 14, h / 2 - 38, 3, 0, 2 * Math.PI); ctx.fill()
  ctx.beginPath(); ctx.arc(w / 2 + 14, h / 2 - 38, 3, 0, 2 * Math.PI); ctx.fill()

  ctx.restore()
}

export default function Contact({ darkMode }) {
  const [sectionRef, inView] = useInView()
  const canvasRef = useRef(null)
  const ctxRef = useRef(null)
  const drawing = useRef(false)
  const lastPos = useRef(null)

  const [tool, setTool] = useState('pen')
  const [color, setColor] = useState('#6c63ff')
  const [size, setSize] = useState(6)
  const [hasDrawn, setHasDrawn] = useState(false)

  const d = darkMode

  const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, divClr, insetShadow, canvasBg, hintColor } = useNmTheme(darkMode)

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
    drawHint(ctx, canvas.width, canvas.height, canvasBg, hintColor)
  }, [canvasBg, hintColor])

  const getPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height
    const src = e.touches ? e.touches[0] : e
    return {
      x: (src.clientX - rect.left) * scaleX,
      y: (src.clientY - rect.top) * scaleY,
    }
  }, [])

  const startDraw = useCallback((e) => {
    e.preventDefault()
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    drawing.current = true
    if (!hasDrawn) setHasDrawn(true)
    const pos = getPos(e, canvas)
    lastPos.current = pos
    ctx.beginPath()
    ctx.arc(pos.x, pos.y, (tool === 'eraser' ? size * 3 : size) / 2, 0, Math.PI * 2)
    ctx.fillStyle = tool === 'eraser' ? canvasBg : color
    ctx.fill()
  }, [tool, size, color, canvasBg, hasDrawn, getPos])

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
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'
    ctx.stroke()
    lastPos.current = pos
  }, [tool, size, color, canvasBg])

  const endDraw = useCallback(() => { drawing.current = false }, [])

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx) return
    drawHint(ctx, canvas.width, canvas.height, canvasBg, hintColor)
    setHasDrawn(false)
  }

  return (
    <SectionWrapper id="contact" darkMode={darkMode} sectionRef={sectionRef}>

      {/* Header */}
      <SectionHeader
        number="05 — Contact"
        title="Let's Connect"
        subtitle="Reach out through any of the links — or just doodle something on the canvas below. 🎨"
        inView={inView}
        lbl={lbl}
        muted={muted}
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* ── Whiteboard (3 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ background: pageBg, boxShadow: raised, borderRadius: 24, padding: '1.5rem' }}
          className="lg:col-span-3 flex flex-col gap-4"
        >

          {/* ── Simplified toolbar ── */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Pen / Eraser */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl"
              style={{ background: pageBg, boxShadow: insetShadow }}
            >
              {[
                { id: 'pen', icon: '✏️' },
                { id: 'eraser', icon: '🧹' },
              ].map(({ id, icon }) => (
                <button key={id} onClick={() => setTool(id)}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-base transition-all duration-150 active:scale-90"
                  style={{
                    border: 'none', cursor: 'pointer',
                    background: tool === id ? accent : 'transparent',
                    boxShadow: tool === id ? `0 2px 10px ${accent}50` : raised,
                  }}
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* 4 color swatches */}
            <div className="flex items-center gap-2">
              {COLORS.map(c => (
                <button key={c} onClick={() => { setColor(c); setTool('pen') }}
                  className="rounded-full border-none cursor-pointer transition-all duration-150 active:scale-90"
                  style={{
                    width: color === c ? 26 : 20,
                    height: color === c ? 26 : 20,
                    background: c,
                    flexShrink: 0,
                    boxShadow: color === c
                      ? `0 0 0 2.5px ${pageBg}, 0 0 0 4.5px ${c}, 0 4px 10px ${c}55`
                      : raised,
                  }}
                />
              ))}
            </div>

            {/* 3 brush sizes */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-xl"
              style={{ background: pageBg, boxShadow: insetShadow }}
            >
              {SIZES.map(s => (
                <button key={s} onClick={() => setSize(s)}
                  className="w-8 h-8 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-150 active:scale-90"
                  style={{
                    background: size === s ? accent : 'transparent',
                    boxShadow: size === s ? `0 2px 8px ${accent}50` : raised,
                  }}
                >
                  <span style={{
                    width: Math.min(Math.max(s * 0.9, 3), 14),
                    height: Math.min(Math.max(s * 0.9, 3), 14),
                    borderRadius: '50%',
                    background: size === s ? '#fff' : (d ? 'rgba(255,255,255,0.35)' : 'rgba(26,26,46,0.3)'),
                    display: 'block',
                  }} />
                </button>
              ))}
            </div>

            {/* Clear — right aligned */}
            <button onClick={clearCanvas}
              className="ml-auto px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95"
              style={{ border: 'none', cursor: 'pointer', background: pageBg, boxShadow: raised, color: muted }}
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
              height={360}
              style={{
                width: '100%', height: 'auto', display: 'block',
                background: canvasBg, touchAction: 'none',
              }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
            />
          </div>

          {/* Caption */}
          <p style={{ fontSize: 11, color: muted, fontStyle: 'italic', textAlign: 'center' }}>
            {hasDrawn
              ? '🎨 Nice! Keep going...'
              : 'A small interactive space — doodle, sketch, or just play around.'}
          </p>

        </motion.div>

        {/* ── Right info panel (2 cols) ── */}
        <div className="lg:col-span-2 flex flex-col gap-4">

          {/* Availability card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ background: pageBg, boxShadow: raised, borderRadius: 20, padding: '1.5rem' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `linear-gradient(135deg, ${accent}30, ${accent}10)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
              }}>👋</div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: text }}>Available for work</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                    style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }} />
                  <span style={{ fontSize: 11, color: muted }}>Open to opportunities</span>
                </div>
              </div>
            </div>
            <div style={{ height: 1, background: divClr, marginBottom: 14 }} />
            {[
              { emoji: '📧', label: 'Email', value: 'anujchahar135@gmail.com', href: 'mailto:anujchahar135@gmail.com' },
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
                    : <p style={{ fontSize: 12, fontWeight: 600, color: muted }}>{value}</p>}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Socials card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ background: pageBg, boxShadow: raised, borderRadius: 20, padding: '1.5rem' }}
          >
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
          </motion.div>

        </div>
      </div>
    </SectionWrapper>
  )
}