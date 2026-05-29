'use client'

import { useEffect, useRef, useState } from 'react'
import { categories, levelLabel } from '../../data/skills'
import { useNmTheme } from '../ui/useNmTheme'
import NmCard from '../ui/NmCard'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'

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

function SkillBar({ level, color, inView, delay }) {
    const [width, setWidth] = useState(0)
    useEffect(() => {
        if (!inView) return
        const t = setTimeout(() => setWidth(level), delay)
        return () => clearTimeout(t)
    }, [inView, level, delay])

    return (
        <div className="relative h-1.5 rounded-full overflow-hidden"
            style={{ background: 'rgba(128,128,128,0.12)' }}
        >
            <div
                className="absolute left-0 top-0 h-full rounded-full"
                style={{
                    width: `${width}%`,
                    background: `linear-gradient(90deg, ${color}, ${color}99)`,
                    boxShadow: `0 0 8px ${color}60`,
                    transition: 'width 1s cubic-bezier(0.4,0,0.2,1)',
                }}
            />
        </div>
    )
}

export default function Skills({ darkMode }) {
    const [sectionRef, inView] = useInView()
    const [activeTab, setActiveTab] = useState('frontend')
    const d = darkMode

    const reveal = (delay = 0) => ({
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
    })

    // AFTER — single import
    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, insetShadow } = useNmTheme(darkMode)

    const activeCategory = categories.find(c => c.id === activeTab)

    return (
        <SectionWrapper id="skills" darkMode={darkMode} sectionRef={sectionRef}>
            {/* Header */}
            <SectionHeader
                number="02 — Skills"
                title="What I Work With"
                subtitle="A breakdown of my technical skills across frontend, backend, and tools —
                        with honest proficiency levels."
                inView={inView}
                lbl={lbl}
                muted={muted}
            />

            {/* ── Tab switcher ── */}
            <div style={reveal(120)} className="mb-8">
                <div
                    className="inline-flex items-center gap-2 p-1.5 rounded-2xl flex-wrap"
                    style={{ background: pageBg, boxShadow: insetShadow }}
                >
                    {categories.map(({ id, label, emoji, color }) => {
                        const isActive = activeTab === id
                        return (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale-95"
                                style={{
                                    border: 'none', cursor: 'pointer',
                                    color: isActive ? '#fff' : muted,
                                    backgroundColor: isActive ? color : 'transparent',
                                    boxShadow: isActive
                                        ? `0 4px 16px ${color}50, inset 1px 1px 3px rgba(0,0,0,0.15)`
                                        : raised,
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <span>{emoji}</span>
                                <span>{label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* ── Skills grid ── */}
            <div
                key={activeTab}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
                {activeCategory.skills.map(({ name, level, desc }, i) => (
                    <div
                        key={name}
                        style={{
                            background: pageBg,
                            boxShadow: raised,
                            borderRadius: 16,
                            padding: '1.25rem 1.4rem',
                            transition: 'box-shadow 0.25s ease',
                            ...reveal(i * 80),
                        }}
                    >
                        {/* Top row */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm truncate" style={{ color: text }}>{name}</p>
                                <p className="text-xs mt-0.5 truncate" style={{ color: muted }}>{desc}</p>
                            </div>
                            {/* Level badge */}
                            <span
                                className="text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0"
                                style={{
                                    background: `${activeCategory.color}18`,
                                    color: activeCategory.color,
                                    border: `1px solid ${activeCategory.color}30`,
                                }}
                            >
                                {levelLabel(level)}
                            </span>
                        </div>

                        {/* Progress bar */}
                        <SkillBar
                            level={level}
                            color={activeCategory.color}
                            inView={inView}
                            delay={300 + i * 80}
                        />

                        {/* Percentage */}
                        <div className="flex justify-end mt-1.5">
                            <span className="text-[10px] font-semibold" style={{ color: activeCategory.color }}>
                                {level}%
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Summary strip ── */}
            <div style={{ ...reveal(600), marginTop: 32 }}>
                <div
                    className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 rounded-2xl"
                    style={{ background: pageBg, boxShadow: raised }}
                >
                    {categories.map(({ label, emoji, color, skills }) => {
                        const avg = Math.round(skills.reduce((s, sk) => s + sk.level, 0) / skills.length)
                        return (
                            <div key={label} className="flex items-center gap-3">
                                <div
                                    className="w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                                    style={{ background: `${color}18`, boxShadow: insetShadow }}
                                >
                                    {emoji}
                                </div>
                                <div>
                                    <p className="text-xs font-bold" style={{ color: text }}>{label}</p>
                                    <p className="text-[10px]" style={{ color: muted }}>Avg. {avg}% proficiency</p>
                                </div>
                                {/* Mini bar */}
                                <div className="w-20 h-1.5 rounded-full overflow-hidden hidden sm:block"
                                    style={{ background: 'rgba(128,128,128,0.12)' }}
                                >
                                    <div
                                        className="h-full rounded-full"
                                        style={{
                                            width: inView ? `${avg}%` : '0%',
                                            background: color,
                                            transition: 'width 1.2s ease 800ms',
                                        }}
                                    />
                                </div>
                            </div>
                        )
                    })}

                    <p className="text-xs font-medium hidden lg:block" style={{ color: muted }}>
                        Honest self-assessment · Always improving 🚀
                    </p>
                </div>
            </div>
        </SectionWrapper >
    )
}