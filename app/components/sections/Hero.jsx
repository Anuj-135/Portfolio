'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roles, workingOn, codeLines } from '../../data/hero'
import { socials } from '../../data/socials'
import { useNmTheme } from "../ui/useNmTheme"
import SocialIcons from '../ui/SocialIcons'
import NmButton from '../ui/NmButton'

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
}
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function Hero({ darkMode }) {
    const [roleIndex, setRoleIndex] = useState(0)
    const d = darkMode

    useEffect(() => {
        const t = setInterval(() => setRoleIndex(i => (i + 1) % roles.length), 2800)
        return () => clearInterval(t)
    }, [])

    const scrollTo = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, divClr } = useNmTheme(darkMode)

    return (
        <section
            id="hero"
            style={{ background: pageBg, transition: 'background 0.4s ease' }}
            className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-24 pb-16 overflow-hidden mt-5"
        >
            {/* Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div style={{
                    position: 'absolute', top: '-10%', left: '-5%',
                    width: 500, height: 500, borderRadius: '50%',
                    background: `radial-gradient(circle, ${d ? 'rgba(108,99,255,0.12)' : 'rgba(108,99,255,0.08)'} 0%, transparent 70%)`,
                }} />
                <div style={{
                    position: 'absolute', bottom: '-10%', right: '-5%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: `radial-gradient(circle, ${d ? 'rgba(167,139,250,0.10)' : 'rgba(167,139,250,0.07)'} 0%, transparent 70%)`,
                }} />
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `linear-gradient(${d ? 'rgba(108,99,255,0.03)' : 'rgba(108,99,255,0.03)'} 1px, transparent 1px),
                            linear-gradient(90deg, ${d ? 'rgba(108,99,255,0.03)' : 'rgba(108,99,255,0.03)'} 1px, transparent 1px)`,
                    backgroundSize: '72px 72px',
                }} />
            </div>

            <div className="relative z-10 max-w-6xl w-full mx-auto">

                {/* ── Single col (mobile/tablet) → Two col (desktop) ── */}
                <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 xl:gap-28 items-center gap-14">

                    {/* ════ LEFT — Text content ════ */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="flex flex-col gap-5 w-full lg:order-1 order-1 items-center text-center lg:items-start lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div variants={fadeUp}>
                            <span
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                                style={{ background: pageBg, boxShadow: raised, color: accent }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"
                                    style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }} />
                                Open to work
                            </span>
                        </motion.div>

                        {/* Heading */}
                        <motion.div variants={fadeUp}>
                            <h1
                                className="font-black leading-[1.05] tracking-tight"
                                style={{
                                    fontSize: 'clamp(2rem, 5.5vw, 4rem)',
                                    letterSpacing: '-0.035em',
                                    color: text,
                                }}
                            >
                                Hi, I'm{' '}
                                <span style={{
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    Anuj Chahar
                                </span>
                            </h1>
                        </motion.div>

                        {/* Rotating role */}
                        <motion.div variants={fadeUp}
                            className="flex items-center gap-2.5 flex-wrap justify-center lg:justify-start"
                            style={{ minHeight: 36 }}
                        >
                            <span style={{ fontSize: 15, fontWeight: 500, color: muted, flexShrink: 0 }}>I'm a</span>
                            <div style={{ position: 'relative', height: 34, minWidth: 200, maxWidth: '100%', overflow: 'hidden' }}>
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={roleIndex}
                                        initial={{ opacity: 0, y: 14 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -14 }}
                                        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                                        style={{
                                            position: 'absolute', left: 0, top: 0,
                                            fontSize: 15, fontWeight: 800,
                                            color: accent,
                                            background: pageBg, boxShadow: raised,
                                            padding: '4px 14px', borderRadius: 100,
                                            whiteSpace: 'nowrap',
                                        }}
                                    >
                                        {roles[roleIndex]}
                                    </motion.span>
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Description */}
                        <motion.p variants={fadeUp}
                            className="leading-relaxed mx-auto lg:mx-0"
                            style={{ fontSize: 14, color: muted, maxWidth: 480 }}
                        >
                            I build modern, scalable, and interactive web experiences
                            using{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>React</span>,{' '}
                            <span style={{ color: accent, fontWeight: 600 }}>Next.js</span>,
                            and cutting-edge frontend technologies.
                        </motion.p>

                        {/* CTA buttons */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
                            <NmButton variant="gradient" onClick={() => scrollTo('#projects')}>
                                View Projects →
                            </NmButton>

                            <NmButton variant="raised" darkMode={darkMode} onClick={() => scrollTo('#contact')}>
                                Contact Me
                            </NmButton>

                            <NmButton variant="inset" darkMode={darkMode} href="/resume.pdf">
                                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
                                </svg>
                                Resume
                            </NmButton>
                        </motion.div>

                        {/* Socials */}
                        <motion.div variants={fadeUp} className="flex items-center gap-3 flex-wrap justify-center lg:justify-start">
                            <span style={{ fontSize: 11, color: muted, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                Find me
                            </span>
                            <div style={{ width: 20, height: 1, background: divClr }} />
                            <SocialIcons socials={socials} raised={raised} pageBg={pageBg} muted={muted} accent={accent} />
                        </motion.div>
                    </motion.div>

                    {/* ════ RIGHT — Floating visuals ════ */}
                    <motion.div
                        className="w-full lg:order-2 order-2 flex items-center justify-center px-4 sm:px-8 lg:px-0"
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-none mx-auto">

                            {/* Glow orb */}
                            <motion.div
                                animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
                                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                                style={{
                                    position: 'absolute', top: '15%', left: '5%',
                                    width: 260, height: 260, borderRadius: '50%',
                                    background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
                                    filter: 'blur(28px)', pointerEvents: 'none', zIndex: 0,
                                }}
                            />

                            {/* Code editor card */}
                            <div style={{
                                background: pageBg,
                                boxShadow: raised,
                                borderRadius: 20,
                                overflow: 'hidden',
                                position: 'relative', zIndex: 2,
                            }}>
                                {/* Title bar */}
                                <div style={{
                                    padding: '10px 14px',
                                    background: d ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                                    borderBottom: `1px solid ${divClr}`,
                                    display: 'flex', alignItems: 'center', gap: 8,
                                }}>
                                    <div className="flex gap-1.5">
                                        {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                                            <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c, display: 'block' }} />
                                        ))}
                                    </div>
                                    <span style={{ fontSize: 10, color: muted, marginLeft: 6, fontFamily: 'monospace' }}>anuj.js</span>
                                    <span style={{
                                        marginLeft: 'auto', fontSize: 9, fontWeight: 600,
                                        padding: '1px 7px', borderRadius: 4,
                                        background: `${accent}20`, color: accent,
                                    }}>JS</span>
                                </div>

                                {/* Code body */}
                                <div style={{ padding: '16px 18px', fontFamily: 'monospace', fontSize: 12, lineHeight: 2 }}>
                                    {codeLines.map((line, li) => (
                                        <motion.div
                                            key={li}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.7 + li * 0.09, duration: 0.35 }}
                                            style={{ display: 'flex', paddingLeft: line.indent * 16 }}
                                        >
                                            <span style={{ color: d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.13)', marginRight: 14, userSelect: 'none', fontSize: 10 }}>
                                                {String(li + 1).padStart(2, '0')}
                                            </span>
                                            {line.tokens.map((tok, ti) => (
                                                <span key={ti} style={{ color: tok.c || muted }}>{tok.t}</span>
                                            ))}
                                        </motion.div>
                                    ))}
                                    <motion.div
                                        animate={{ opacity: [1, 0, 1] }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        style={{
                                            display: 'inline-block', width: 7, height: 14,
                                            background: accent, borderRadius: 2,
                                            verticalAlign: 'middle', marginLeft: 2,
                                        }}
                                    />
                                </div>

                                {/* Status bar */}
                                <div style={{
                                    padding: '7px 14px',
                                    background: `${accent}10`,
                                    borderTop: `1px solid ${divClr}`,
                                    display: 'flex', alignItems: 'center', gap: 7,
                                }}>
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%', background: '#10b981',
                                        boxShadow: '0 0 5px rgba(16,185,129,0.8)', display: 'block'
                                    }}
                                        className="animate-pulse"
                                    />
                                    <span style={{ fontSize: 9, color: muted, fontFamily: 'monospace' }}>
                                        ready to build something great
                                    </span>
                                </div>
                            </div>

                            {/* Experience badge — top left */}
                            <motion.div
                                initial={{ opacity: 0, x: -16, y: -16 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.1 }}
                                style={{
                                    position: 'absolute', top: -40, left: -40,
                                    background: pageBg, boxShadow: raisedSm,
                                    borderRadius: 14, padding: '8px 14px',
                                    display: 'flex', alignItems: 'center', gap: 8, zIndex: 4,
                                }}
                            >
                                <div style={{
                                    width: 32, height: 32, borderRadius: 9,
                                    background: `linear-gradient(135deg, ${accent}35, #a78bfa25)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 16, boxShadow: inset,
                                }}>🚀</div>
                                <div>
                                    <p style={{ fontSize: 15, fontWeight: 900, color: accent, lineHeight: 1 }}>1+</p>
                                    <p style={{ fontSize: 9, color: muted, fontWeight: 500, marginTop: 1 }}>Yrs Exp</p>
                                </div>
                            </motion.div>

                            {/* Currently on card — bottom right */}
                            <motion.div
                                initial={{ opacity: 0, x: 16, y: 16 }}
                                animate={{ opacity: 1, x: 0, y: 0 }}
                                transition={{ duration: 0.7, delay: 1.25 }}
                                style={{
                                    position: 'absolute', bottom: -40, right: -40,
                                    background: pageBg, boxShadow: raisedSm,
                                    borderRadius: 16, padding: '12px 14px',
                                    minWidth: 170, zIndex: 4,
                                }}
                            >
                                <p style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: muted, marginBottom: 9 }}>
                                    Currently on
                                </p>
                                {workingOn.map(({ icon, text: t }, i) => (
                                    <motion.div
                                        key={t}
                                        initial={{ opacity: 0, x: 8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1.4 + i * 0.09 }}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: 7,
                                            marginBottom: i < workingOn.length - 1 ? 7 : 0,
                                        }}
                                    >
                                        <span style={{
                                            width: 24, height: 24, borderRadius: 7, flexShrink: 0,
                                            background: pageBg, boxShadow: inset,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                                        }}>{icon}</span>
                                        <span style={{ fontSize: 10, fontWeight: 600, color: muted, lineHeight: 1.3 }}>{t}</span>
                                    </motion.div>
                                ))}
                            </motion.div>

                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.8 }}
                    className="flex flex-col items-center gap-2 mt-14"
                >
                    <span style={{ fontSize: 9, color: muted, letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: 18, height: 28, borderRadius: 100,
                            border: `1.5px solid ${d ? 'rgba(255,255,255,0.15)' : 'rgba(26,26,46,0.15)'}`,
                            display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 5,
                        }}
                    >
                        <div style={{ width: 3, height: 6, borderRadius: 100, background: accent }} />
                    </motion.div>
                </motion.div>

            </div>
        </section>
    )
}