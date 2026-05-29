'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { stats, stack, currently } from '../../data/about'
import { useNmTheme } from '../ui/useNmTheme'
import NmCard from '../ui/NmCard'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
}
const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}


export default function About({ darkMode }) {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-80px' })
    const d = darkMode;

    // AFTER — single import
    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, divClr, insetShadow } = useNmTheme(darkMode)

    return (
        <SectionWrapper id="about" darkMode={darkMode} sectionRef={sectionRef}>

            {/* Section header */}
            <SectionHeader
                number="01 — About me"
                title="Who I Am"
                subtitle="Bio, stats and the tech I work with."
                inView={inView}
                lbl={lbl}
                muted={muted}
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? 'show' : 'hidden'}
                className="flex flex-col gap-5"
            >

                {/* ══ ROW 1: Bio — full width ══ */}
                <NmCard darkMode={d} className="w-full p-6 sm:p-7">
                    <div className="flex items-center gap-4 mb-5">
                        <div style={{
                            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                            background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: 15, fontWeight: 900, color: '#fff',
                            boxShadow: `0 4px 14px ${accent}50`,
                        }}>AC</div>
                        <div className="flex-1 min-w-0">
                            <p style={{ fontWeight: 700, fontSize: 15, color: text }}>Anuj Chahar</p>
                            <p style={{ fontSize: 12, color: muted, marginTop: 2 }}>Frontend Developer · Full Stack Learner</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-1.5 flex-shrink-0">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
                                style={{ boxShadow: '0 0 6px rgba(52,211,153,0.9)' }} />
                            <span style={{ fontSize: 11, color: muted, fontWeight: 500 }}>Available</span>
                        </div>
                    </div>
                    <div style={{ height: 1, background: divClr, marginBottom: 18 }} />
                    <p style={{ fontSize: 13.5, lineHeight: 1.85, color: muted, marginBottom: 14 }}>
                        Hey! I'm Anuj — a frontend developer from India with a deep passion for
                        building beautiful, performant web experiences. I love turning ideas into
                        pixel-perfect interfaces that are as functional as they are visually refined.
                    </p>
                    <p style={{ fontSize: 13.5, lineHeight: 1.85, color: muted }}>
                        Right now I'm growing from focused frontend development into full stack engineering,
                        working with{' '}
                        <span style={{ color: accent, fontWeight: 600 }}>React</span>,{' '}
                        <span style={{ color: accent, fontWeight: 600 }}>Next.js</span>, and{' '}
                        <span style={{ color: accent, fontWeight: 600 }}>Tailwind CSS</span>{' '}
                        while expanding into backend and databases.
                    </p>
                </NmCard>

                {/* ══ ROW 2: Profile + Currently side by side ══ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Profile photo */}
                    <NmCard darkMode={d} className="relative overflow-hidden" style={{ minHeight: 260 }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 260 }}>
                            <Image
                                src="/profile.jpg"
                                alt="Anuj Chahar"
                                fill
                                style={{ objectFit: 'cover', objectPosition: 'center top' }}
                            />
                            {/* Fallback */}
                            <div style={{
                                position: 'absolute', inset: 0, zIndex: -1,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center', gap: 12,
                                background: `linear-gradient(135deg, ${d ? '#1a1040' : '#ddddf5'}, ${pageBg})`,
                            }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: '50%',
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 26, fontWeight: 900, color: '#fff',
                                    boxShadow: `0 8px 24px ${accent}55`,
                                }}>AC</div>
                                <p style={{ fontSize: 10, color: muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                                    Add profile.jpg
                                </p>
                            </div>
                        </div>
                        <div style={{
                            position: 'absolute', bottom: 0, left: 0, right: 0,
                            padding: '28px 16px 14px',
                            background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%)',
                        }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Anuj Chahar</p>
                            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>Frontend Developer</p>
                        </div>
                    </NmCard>

                    {/* Currently */}
                    <NmCard darkMode={d} className="p-6 flex flex-col">
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 16 }}>
                            Currently
                        </p>
                        <div className="flex flex-col gap-2.5 flex-1">
                            {currently.map(({ emoji, line }) => (
                                <motion.div
                                    key={line}
                                    whileHover={{ x: 4 }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: 10,
                                        padding: '9px 12px', borderRadius: 12,
                                        boxShadow: insetShadow, background: pageBg,
                                        fontSize: 12.5, fontWeight: 500, color: muted,
                                        cursor: 'default',
                                    }}
                                >
                                    <span style={{ fontSize: 15 }}>{emoji}</span>
                                    <span>{line}</span>
                                </motion.div>
                            ))}
                        </div>
                        <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${divClr}` }}>
                            <motion.button
                                whileHover={{ y: -2, boxShadow: `0 6px 22px ${accent}55` }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                                style={{
                                    width: '100%', padding: '11px 0', borderRadius: 12,
                                    border: 'none', cursor: 'pointer',
                                    background: `linear-gradient(135deg, ${accent}, #a78bfa)`,
                                    boxShadow: `0 4px 16px ${accent}45`,
                                    color: '#fff', fontSize: 13, fontWeight: 700,
                                }}
                            >
                                Let's work together →
                            </motion.button>
                        </div>
                    </NmCard>
                </div>

                {/* ══ ROW 3: Stats — full width ══ */}
                <NmCard darkMode={d} className="w-full p-6">
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: lbl, marginBottom: 16 }}>
                        By the numbers
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {stats.map(({ number, label: slbl, icon }) => (
                            <motion.div
                                key={slbl}
                                variants={cardVariants}
                                whileHover={{ y: -2 }}
                                style={{
                                    background: pageBg, boxShadow: insetShadow,
                                    borderRadius: 14, padding: '16px 12px', textAlign: 'center',
                                }}
                            >
                                <p style={{ fontSize: 20, marginBottom: 4 }}>{icon}</p>
                                <p style={{ fontSize: 26, fontWeight: 900, color: accent, lineHeight: 1 }}>{number}</p>
                                <p style={{ fontSize: 11, color: muted, marginTop: 5, fontWeight: 500 }}>{slbl}</p>
                            </motion.div>
                        ))}
                    </div>
                </NmCard>

                {/* ══ ROW 4: Tech Stack Marquee ══ */}
                <NmCard darkMode={d} className="w-full p-6" noHover>
                    <p style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.18em',
                        textTransform: 'uppercase', color: lbl, marginBottom: 16,
                    }}>
                        Tech Stack
                    </p>

                    {/* Outer clip container — py-2 gives vertical room for pill shadows */}
                    <div style={{ position: 'relative', overflow: 'hidden', width: '100%', padding: '8px 0' }}>

                        {/* Left edge fade */}
                        <div style={{
                            position: 'absolute', left: 0, top: 0, bottom: 0, width: 64, zIndex: 2,
                            background: `linear-gradient(to right, ${pageBg} 0%, transparent 100%)`,
                            pointerEvents: 'none',
                        }} />
                        {/* Right edge fade */}
                        <div style={{
                            position: 'absolute', right: 0, top: 0, bottom: 0, width: 64, zIndex: 2,
                            background: `linear-gradient(to left, ${pageBg} 0%, transparent 100%)`,
                            pointerEvents: 'none',
                        }} />

                        {/* Scrolling track */}
                        <div
                            style={{
                                display: 'flex',
                                width: 'max-content',
                                gap: 10,
                                paddingBottom: 4,
                                animationName: 'nm-marquee',
                                animationDuration: '35s',
                                animationTimingFunction: 'linear',
                                animationIterationCount: 'infinite',
                                animationPlayState: 'running',
                            }}
                            onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
                            onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
                        >
                            {[...stack, ...stack].map(({ name, color }, i) => (
                                <span
                                    key={i}
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: 8,
                                        padding: '7px 18px', borderRadius: 100, flexShrink: 0,
                                        background: pageBg, boxShadow: raised,
                                        fontSize: 12.5, fontWeight: 600, color: muted,
                                        cursor: 'default',
                                        transition: 'color 0.2s ease, box-shadow 0.2s ease',
                                        userSelect: 'none',
                                        whiteSpace: 'nowrap',
                                    }}
                                    onMouseEnter={e => {
                                        e.currentTarget.style.color = color
                                        e.currentTarget.style.boxShadow = d
                                            ? `8px 8px 18px #07071099, -8px -8px 18px #131324, 0 0 8px ${color}28`
                                            : `8px 8px 18px #c8c8d0, -8px -8px 18px #ffffff, 0 0 8px ${color}22`
                                    }}
                                    onMouseLeave={e => {
                                        e.currentTarget.style.color = muted
                                        e.currentTarget.style.boxShadow = raised
                                    }}
                                >
                                    <span style={{
                                        width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                                        background: color, boxShadow: `0 0 4px ${color}70`,
                                    }} />
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                </NmCard>

            </motion.div>
        </SectionWrapper>
    )
}