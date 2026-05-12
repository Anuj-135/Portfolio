'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Built' },
    { number: '5+', label: 'Tech Stacks' },
    { number: '100%', label: 'Passion' },
]

const stack = [
    { name: 'React', color: '#61dafb' },
    { name: 'Next.js', color: '#a78bfa' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Express.js', color: '#888888' },
    { name: 'Git', color: '#f05032' },
    { name: 'HTML', color: '#e34f26' },
    { name: 'CSS', color: '#264de4' },
    { name: 'MongoDB', color: '#4db33d' },
    { name: 'REST APIs', color: '#ff6b6b' },
    { name: 'Figma', color: '#f24e1e' },
]

const currently = [
    { emoji: '💻', line: 'Building this portfolio' },
    { emoji: '📚', line: 'Learning Node.js + Express' },
    { emoji: '🔍', line: 'Exploring databases' },
    { emoji: '🤝', line: 'Open to collaborating' },
]

function useInView(threshold = 0.1) {
    const ref = useRef(null)
    const [inView, setInView] = useState(false)
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setInView(true) },
            { threshold }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])
    return [ref, inView]
}

export default function About({ darkMode }) {
    const [sectionRef, inView] = useInView()
    const d = darkMode

    const reveal = (delay = 0) => ({
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
    })

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
    const accent = '#6c63ff'

    const card = (extra = {}) => ({
        background: pageBg,
        boxShadow: raised,
        borderRadius: 20,
        padding: '1.5rem',
        transition: 'box-shadow 0.25s ease',
        ...extra,
    })

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ background: pageBg, transition: 'background 0.4s ease' }}
            className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        >
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 500, height: 500, borderRadius: '50%',
                background: d ? 'rgba(108,99,255,0.07)' : 'rgba(108,99,255,0.05)',
                filter: 'blur(120px)', pointerEvents: 'none',
            }} />

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Header */}
                <div style={reveal(0)} className="mb-10 sm:mb-12">
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: lbl }}>
                        01 — About me
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: text, marginTop: 8 }}>
                        Who I Am<span style={{ color: accent }}>.</span>
                    </h2>
                </div>

                {/* ── Bento Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Card 1 — Bio (2 cols) */}
                    <div style={{ ...card(), ...reveal(100) }} className="md:col-span-2 lg:col-span-2">
                        <div className="flex items-start sm:items-center gap-3 mb-5 flex-wrap sm:flex-nowrap">
                            <div style={{
                                width: 48, height: 48, borderRadius: 13, flexShrink: 0,
                                background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 15, fontWeight: 900, color: '#fff',
                                boxShadow: `0 4px 14px ${accent}50`,
                            }}>
                                AC
                            </div>
                            <div className="flex-1 min-w-0">
                                <p style={{ fontWeight: 700, fontSize: 14, color: text }}>Anuj Chahar</p>
                                <p style={{ fontSize: 12, color: muted, marginTop: 2 }}>Frontend Developer · Full Stack Learner</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
                                <span className="animate-pulse" style={{
                                    width: 7, height: 7, borderRadius: '50%', background: '#34d399',
                                    boxShadow: '0 0 6px rgba(52,211,153,0.9)', display: 'inline-block',
                                }} />
                                <span style={{ fontSize: 12, color: muted, fontWeight: 500 }}>Available</span>
                            </div>
                        </div>

                        <div style={{ height: 1, background: divClr, marginBottom: 16 }} />

                        <p style={{ fontSize: 13, lineHeight: 1.85, color: muted, marginBottom: 12 }}>
                            Hey! I'm Anuj — a frontend developer from India with a deep passion for
                            building beautiful, performant web experiences. I love turning ideas into
                            pixel-perfect interfaces that are as functional as they are visually refined.
                        </p>
                        <p style={{ fontSize: 13, lineHeight: 1.85, color: muted }}>
                            Right now I'm on a journey to grow from a focused frontend developer into a
                            well-rounded full stack engineer. I enjoy working with{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>React</span>,{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>Next.js</span>, and{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>Tailwind CSS</span>,
                            and I'm actively expanding into backend and databases.
                        </p>
                    </div>

                    {/* Card 2 — Profile photo (top right) */}
                    <div
                        style={{ ...card({ padding: 0, overflow: 'hidden', minHeight: 260 }), ...reveal(180) }}
                        className="relative"
                    >
                        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 260 }}>
                            <Image
                                src="/profile.jpg"
                                alt="Anuj Chahar"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                            />
                            {/* Fallback gradient shown behind image */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: 12,
                                background: `linear-gradient(135deg, ${d ? '#1a1040' : '#ddddf5'}, ${d ? '#0d0d1a' : '#e8e8f0'})`,
                                zIndex: -1,
                            }}>
                                <div style={{
                                    width: 80, height: 80, borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 28, fontWeight: 900, color: '#fff',
                                    boxShadow: `0 8px 24px ${accent}60`,
                                }}>
                                    AC
                                </div>
                                <p style={{ fontSize: 11, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Add profile.jpg to /public
                                </p>
                            </div>
                        </div>
                        {/* Name overlay */}
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '24px 16px 14px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
                        }}>
                            <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>Anuj Chahar</p>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', margin: '2px 0 0' }}>Frontend Developer</p>
                        </div>
                    </div>

                    {/* Card 3 — Stats (full width) */}
                    <div style={{ ...card(), ...reveal(260) }} className="lg:col-span-3 md:col-span-2">
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 16 }}>
                            By the numbers
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {stats.map(({ number, label: slbl }, i) => (
                                <div key={slbl} style={{
                                    ...reveal(300 + i * 60),
                                    background: pageBg, boxShadow: insetShadow,
                                    borderRadius: 14, padding: '16px 12px', textAlign: 'center',
                                }}>
                                    <p style={{ fontSize: 28, fontWeight: 900, color: accent, lineHeight: 1 }}>{number}</p>
                                    <p style={{ fontSize: 11, color: muted, marginTop: 5, fontWeight: 500 }}>{slbl}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 4 — Currently (bottom left, 1 col) */}
                    <div style={{ ...card({ display: 'flex', flexDirection: 'column' }), ...reveal(380) }}>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 14 }}>
                            Currently
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                            {currently.map(({ emoji, line }) => (
                                <div key={line} style={{
                                    display: 'flex', alignItems: 'center', gap: 10,
                                    padding: '9px 12px', borderRadius: 11,
                                    boxShadow: insetShadow, background: pageBg,
                                    fontSize: 13, fontWeight: 500, color: muted,
                                }}>
                                    <span style={{ fontSize: 15 }}>{emoji}</span>
                                    <span>{line}</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginTop: 16, paddingTop: 14, borderTop: `1px solid ${divClr}` }}>
                            <button
                                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    width: '100%', padding: '10px 0', borderRadius: 11,
                                    border: 'none', cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    boxShadow: `0 4px 16px ${accent}50`,
                                    color: '#fff', fontSize: 12, fontWeight: 700,
                                    transition: 'opacity 0.2s, transform 0.15s',
                                }}
                                onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                                onMouseDown={e => e.currentTarget.style.transform = 'scale(0.97)'}
                                onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Let's work together →
                            </button>
                        </div>
                    </div>

                    {/* Card 5 — Tech stack (2 cols) */}
                    <div
                        style={{ ...card({ display: 'flex', flexDirection: 'column' }), ...reveal(460) }}
                        className="lg:col-span-2 md:col-span-2"
                    >
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 14 }}>
                            Tech Stack
                        </p>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                            {stack.map(({ name, color }) => (
                                <span
                                    key={name}
                                    style={{ boxShadow: raised }}
                                    className={`flex items-center justify-center gap-1.5
                    px-2 py-1.5 rounded-full text-[11px] font-semibold
                    whitespace-nowrap cursor-default transition-colors duration-200
                    ${d ? 'text-white/45' : 'text-[#1a1a2e]/50'}`}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                        style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}90` }}
                                    />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}