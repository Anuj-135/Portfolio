'use client'

import { useEffect, useRef, useState } from 'react'

const stats = [
    { number: '1+', label: 'Years Experience' },
    { number: '10+', label: 'Projects Built' },
    { number: '5+', label: 'Tech Stacks' },
    { number: '100%', label: 'Passion' },
]

const stack = [
    { name: 'React', color: '#61dafb' },
    { name: 'Next.js', color: '#a78bfa' },
    { name: 'Tailwind', color: '#38bdf8' },
    { name: 'JavaScript', color: '#f7df1e' },
    { name: 'Node.js', color: '#68a063' },
    { name: 'Git', color: '#f05032' },
    { name: 'HTML/CSS', color: '#e34f26' },
    { name: 'MongoDB', color: '#4db33d' },
]

const facts = [
    { icon: '📍', text: 'Based in India' },
    { icon: '🎓', text: 'CS Student' },
    { icon: '🚀', text: 'Learning Full Stack' },
    { icon: '🎯', text: 'Open to Opportunities' },
]

const currently = [
    { emoji: '💻', line: 'Building this portfolio' },
    { emoji: '📚', line: 'Learning Node.js + Express' },
    { emoji: '🔍', line: 'Exploring databases' },
    { emoji: '🤝', line: 'Open to collaborating' },
]

function useInView(threshold = 0.12) {
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
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
    })

    // Neumorphic tokens — must match page bg exactly
    const pageBg = d ? '#0d0d1a' : '#e8e8f0'
    const raised = d
        ? '6px 6px 16px #070710, -6px -6px 16px #131324'
        : '6px 6px 16px #c8c8d0, -6px -6px 16px #ffffff'
    const inset = d
        ? 'inset 4px 4px 10px #07071010, inset -4px -4px 10px #13132420'
        : 'inset 4px 4px 10px #c8c8d0, inset -4px -4px 10px #ffffff'
    const statInset = d
        ? 'inset 3px 3px 8px #07071080, inset -3px -3px 8px #13132480'
        : 'inset 3px 3px 8px #c0c0c8, inset -3px -3px 8px #ffffff'

    const text = d ? '#f0ede8' : '#1a1a2e'
    const muted = d ? 'rgba(240,237,232,0.45)' : 'rgba(26,26,46,0.50)'
    const lbl = d ? 'rgba(240,237,232,0.28)' : 'rgba(26,26,46,0.32)'
    const accent = '#6c63ff'
    const divClr = d ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,46,0.07)'

    const card = (extraStyle = {}) => ({
        background: pageBg,
        boxShadow: raised,
        borderRadius: 20,
        padding: '1.75rem',
        transition: 'box-shadow 0.25s ease',
        ...extraStyle,
    })

    return (
        <section
            id="about"
            ref={sectionRef}
            style={{ background: pageBg, transition: 'background 0.4s ease' }}
            className="relative min-h-screen py-28 px-6"
        >
            {/* Ambient glow */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%,-50%)',
                width: 600, height: 600, borderRadius: '50%',
                background: d ? 'rgba(108,99,255,0.07)' : 'rgba(108,99,255,0.05)',
                filter: 'blur(130px)', pointerEvents: 'none',
            }} />

            <div className="relative z-10 max-w-6xl mx-auto">

                {/* Section header */}
                <div style={reveal(0)} className="mb-12">
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: lbl }}>
                        01 — About me
                    </span>
                    <h2 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: text, marginTop: 8 }}>
                        Who I Am<span style={{ color: accent }}>.</span>
                    </h2>
                </div>

                {/* Bento grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {/* ── Card 1: Bio (2 cols) ── */}
                    <div style={{ ...card(), ...reveal(100) }} className="lg:col-span-2">
                        {/* Avatar row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                                background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: 17, fontWeight: 900, color: '#fff',
                                boxShadow: `0 4px 16px ${accent}55`,
                            }}>
                                AC
                            </div>
                            <div>
                                <p style={{ fontWeight: 700, fontSize: 15, color: text }}>Anuj Chahar</p>
                                <p style={{ fontSize: 13, color: muted, marginTop: 2 }}>Frontend Developer · Full Stack Learner</p>
                            </div>
                            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{
                                    width: 8, height: 8, borderRadius: '50%', background: '#34d399',
                                    boxShadow: '0 0 6px rgba(52,211,153,0.9)',
                                    animation: 'pulse 2s infinite',
                                }} />
                                <span style={{ fontSize: 12, color: muted, fontWeight: 500 }}>Available</span>
                            </div>
                        </div>

                        <div style={{ height: 1, background: divClr, marginBottom: 20 }} />

                        <p style={{ fontSize: 14, lineHeight: 1.85, color: muted, marginBottom: 14 }}>
                            Hey! I'm Anuj — a frontend developer from India with a deep passion for
                            building beautiful, performant web experiences. I love turning ideas into
                            pixel-perfect interfaces that are as functional as they are visually refined.
                        </p>
                        <p style={{ fontSize: 14, lineHeight: 1.85, color: muted }}>
                            Right now I'm on a journey to grow from a focused frontend developer into a
                            well-rounded full stack engineer. I enjoy working with{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>React</span>,{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>Next.js</span>, and{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>Tailwind CSS</span>,
                            and I'm actively expanding into backend and databases.
                        </p>
                    </div>

                    {/* ── Card 2: Quick facts ── */}
                    <div style={{ ...card(), ...reveal(180) }} className="flex flex-col gap-3">
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 4 }}>
                            Quick Facts
                        </p>
                        {facts.map(({ icon, text: t }) => (
                            <div key={t} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '10px 14px', borderRadius: 12,
                                boxShadow: inset,
                                background: pageBg,
                                fontSize: 13, fontWeight: 500, color: muted,
                            }}>
                                <span style={{ fontSize: 16 }}>{icon}</span>
                                <span>{t}</span>
                            </div>
                        ))}
                    </div>

                    {/* ── Card 3: Stats (full width) ── */}
                    <div style={{ ...card(), ...reveal(260) }} className="lg:col-span-3">
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 20 }}>
                            By the numbers
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            {stats.map(({ number, label: slbl }, i) => (
                                <div key={slbl} style={{
                                    ...reveal(300 + i * 70),
                                    background: pageBg,
                                    boxShadow: statInset,
                                    borderRadius: 14,
                                    padding: '20px 16px',
                                    textAlign: 'center',
                                }}>
                                    <p style={{ fontSize: 32, fontWeight: 900, color: accent, lineHeight: 1 }}>{number}</p>
                                    <p style={{ fontSize: 12, color: muted, marginTop: 6, fontWeight: 500 }}>{slbl}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Card 4: Tech stack (2 cols) ── */}
                    <div style={{ ...card(), ...reveal(380) }} className="lg:col-span-2">
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 16 }}>
                            Tech Stack
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                            {stack.map(({ name, color }) => (
                                <span key={name} style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '6px 14px', borderRadius: 100,
                                    background: pageBg,
                                    boxShadow: raised,
                                    fontSize: 12, fontWeight: 600, color: muted,
                                    cursor: 'default',
                                    transition: 'color 0.2s',
                                }}>
                                    <span style={{
                                        width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                                        backgroundColor: color, boxShadow: `0 0 5px ${color}90`,
                                    }} />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* ── Card 5: Currently ── */}
                    <div style={{ ...card({ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }), ...reveal(460) }}>
                        <div>
                            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 16 }}>
                                Currently
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {currently.map(({ emoji, line }) => (
                                    <div key={line} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, fontWeight: 500, color: muted }}>
                                        <span style={{ fontSize: 16 }}>{emoji}</span>
                                        <span>{line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginTop: 24, paddingTop: 16, borderTop: `1px solid ${divClr}` }}>
                            <button
                                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    width: '100%', padding: '11px 0', borderRadius: 12,
                                    border: 'none', cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    boxShadow: `0 4px 18px ${accent}50`,
                                    color: '#fff', fontSize: 13, fontWeight: 700,
                                    transition: 'opacity 0.2s, transform 0.2s',
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

                </div>
            </div>

            <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.4} }`}</style>
        </section>
    )
}