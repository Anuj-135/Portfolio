'use client'

import { useEffect, useRef, useState } from 'react'
import { projects, statusColors } from '../../data/projects'
import { useNmTheme } from '../ui/useNmTheme'
import NmCard from '../ui/NmCard'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'

const allTags = ['All', ...Array.from(new Set(projects.flatMap(p => p.tags)))]

function useInView(threshold = 0.08) {
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

// ── Featured card ──────────────────────────────────────────
function FeaturedCard({ project, darkMode, raised, insetShadow, pageBg, text, muted, lbl, inView }) {
    const d = darkMode
    const s = statusColors[project.status]

    const reveal = (delay = 0) => ({
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
    })

    return (
        <div
            style={{ ...reveal(100), background: pageBg, boxShadow: raised, borderRadius: 24, overflow: 'hidden' }}
            className="grid grid-cols-1 lg:grid-cols-2"
        >
            {/* Visual panel */}
            <div
                className="relative flex items-center justify-center min-h-[220px] lg:min-h-[320px]"
                style={{ background: `linear-gradient(135deg, ${project.color}22, ${project.color}08)` }}
            >
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                        backgroundSize: '32px 32px',
                    }}
                />
                {/* Big emoji */}
                <div className="relative z-10 flex flex-col items-center gap-4">
                    <div
                        className="text-6xl sm:text-7xl"
                        style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.15))' }}
                    >
                        {project.emoji}
                    </div>
                    {/* Glow ring */}
                    <div
                        className="absolute w-32 h-32 rounded-full blur-3xl opacity-30"
                        style={{ background: project.color }}
                    />
                </div>
                {/* Featured badge */}
                <div
                    className="absolute top-4 left-4 text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase"
                    style={{ background: `${project.color}25`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                    ★ Featured
                </div>
                {/* Status */}
                <div
                    className="absolute top-4 right-4 flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ background: s.bg, color: s.color }}
                >
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: s.dot }} />
                    {project.status}
                </div>
            </div>

            {/* Content panel */}
            <div className="flex flex-col justify-between p-6 sm:p-8">
                <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: project.color, marginBottom: 10 }}>
                        Featured Project
                    </p>
                    <h3 style={{ fontSize: 'clamp(1.4rem,2.5vw,1.9rem)', fontWeight: 900, letterSpacing: '-0.02em', color: text, marginBottom: 12 }}>
                        {project.title}
                    </h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.8, color: muted, marginBottom: 16 }}>
                        {project.longDesc || project.desc}
                    </p>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map(tag => (
                            <span key={tag}
                                className="text-[11px] font-semibold px-3 py-1 rounded-full"
                                style={{ background: `${project.color}15`, color: project.color, border: `1px solid ${project.color}30` }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {/* CTA row */}
                <div className="flex items-center gap-3 flex-wrap">
                    <a
                        href={project.live}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-200 active:scale-95 hover:opacity-90"
                        style={{ background: project.color, boxShadow: `0 4px 18px ${project.color}50` }}
                    >
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                    </a>
                    <a
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95"
                        style={{ background: pageBg, boxShadow: raised, color: muted }}
                    >
                        <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}

// ── Project card ───────────────────────────────────────────
function ProjectCard({ project, darkMode, raised, pageBg, text, muted, inView, delay }) {
    const s = statusColors[project.status]
    const reveal = {
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
    }

    return (
        <div
            style={{ ...reveal, background: pageBg, boxShadow: raised, borderRadius: 18, overflow: 'hidden' }}
            className="flex flex-col group"
        >
            {/* Top color strip */}
            <div
                className="relative h-24 flex items-center justify-center flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}08)` }}
            >
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                        backgroundSize: '24px 24px',
                    }}
                />
                <span className="text-4xl relative z-10">{project.emoji}</span>
                {/* Status badge */}
                <div
                    className="absolute top-3 right-3 flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{ background: s.bg, color: s.color }}
                >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.dot }} />
                    {project.status}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <h3 className="font-bold text-sm mb-2" style={{ color: text }}>{project.title}</h3>
                <p className="text-xs leading-relaxed flex-1 mb-4" style={{ color: muted, lineHeight: 1.7 }}>
                    {project.desc}
                </p>
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag}
                            className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full"
                            style={{ background: `${project.color}12`, color: project.color, border: `1px solid ${project.color}25` }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                {/* Links */}
                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(26,26,46,0.07)' }}>
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                        style={{ color: project.color }}
                    >
                        <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200"
                        style={{ color: muted }}
                    >
                        <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                        </svg>
                        GitHub
                    </a>
                </div>
            </div>
        </div>
    )
}

// ── Main section ───────────────────────────────────────────
export default function Projects({ darkMode }) {
    const [sectionRef, inView] = useInView()
    const [activeFilter, setActiveFilter] = useState('All')
    const d = darkMode

    const reveal = (delay = 0) => ({
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(24px)',
    })

    // AFTER — single import
    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, divClr, insetShadow } = useNmTheme(darkMode)

    const featured = projects.find(p => p.featured)
    const filteredGrid = projects
        .filter(p => !p.featured)
        .filter(p => activeFilter === 'All' || p.tags.includes(activeFilter))

    return (
        <SectionWrapper id="projects" darkMode={darkMode} sectionRef={sectionRef}>
            {/* Header */}
            <SectionHeader
                number="03 — Projects"
                title="Things I've Built"
                subtitle="A mix of personal projects, learning experiments and real-world builds.
                    All source code is available on GitHub."
                inView={inView}
                lbl={lbl}
                muted={muted}
            />

            {/* Featured card */}
            {featured && (
                <div className="mb-8">
                    <FeaturedCard
                        project={featured}
                        darkMode={d}
                        raised={raised}
                        insetShadow={insetShadow}
                        pageBg={pageBg}
                        text={text}
                        muted={muted}
                        lbl={lbl}
                        inView={inView}
                    />
                </div>
            )}

            {/* Filter pills */}
            <div style={reveal(300)} className="mb-7">

                {/* Mobile: horizontal scroll — hidden scrollbar */}
                <div className="sm:hidden" style={{ position: 'relative' }}>
                    {/* Right fade hint */}
                    <div style={{
                        position: 'absolute', right: 0, top: 0, bottom: 0, width: 40, zIndex: 2,
                        background: `linear-gradient(to left, ${pageBg}, transparent)`,
                        pointerEvents: 'none', borderRadius: '0 16px 16px 0',
                    }} />
                    <div
                        style={{
                            display: 'flex', gap: 8,
                            padding: '8px 10px',
                            borderRadius: 18,
                            background: pageBg, boxShadow: insetShadow,
                            overflowX: 'auto', overflowY: 'hidden',
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                        }}
                    >
                        {allTags.map(tag => {
                            const isActive = activeFilter === tag
                            return (
                                <button
                                    key={tag}
                                    onClick={() => setActiveFilter(tag)}
                                    style={{
                                        flexShrink: 0,
                                        padding: '6px 14px',
                                        borderRadius: 100,
                                        fontSize: 11.5, fontWeight: 600,
                                        border: 'none', cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.18s ease',
                                        color: isActive ? '#fff' : muted,
                                        backgroundColor: isActive ? '#6c63ff' : 'transparent',
                                        boxShadow: isActive
                                            ? '0 3px 12px rgba(108,99,255,0.45)'
                                            : raised,
                                    }}
                                >
                                    {tag}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Tablet/Desktop: wrapped layout */}
                <div
                    className="hidden sm:flex flex-wrap gap-2 p-2 rounded-2xl w-fit"
                    style={{ background: pageBg, boxShadow: insetShadow }}
                >
                    {allTags.map(tag => {
                        const isActive = activeFilter === tag
                        return (
                            <button
                                key={tag}
                                onClick={() => setActiveFilter(tag)}
                                className="px-4 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 active:scale-95"
                                style={{
                                    border: 'none', cursor: 'pointer',
                                    color: isActive ? '#fff' : muted,
                                    backgroundColor: isActive ? '#6c63ff' : 'transparent',
                                    boxShadow: isActive
                                        ? '0 4px 14px rgba(108,99,255,0.45)'
                                        : raised,
                                }}
                            >
                                {tag}
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Project grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGrid.length > 0
                    ? filteredGrid.map((p, i) => (
                        <ProjectCard
                            key={p.id}
                            project={p}
                            darkMode={d}
                            raised={raised}
                            pageBg={pageBg}
                            text={text}
                            muted={muted}
                            inView={inView}
                            delay={400 + i * 80}
                        />
                    ))
                    : (
                        <div className="col-span-full py-16 flex flex-col items-center gap-3" style={{ color: muted }}>
                            <span className="text-4xl">🔍</span>
                            <p className="text-sm font-medium">No projects with <strong>{activeFilter}</strong> tag yet.</p>
                        </div>
                    )
                }
            </div>
        </SectionWrapper>
    )
}