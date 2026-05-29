'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { timeline, typeBadge } from '../../data/experience'
import { useNmTheme } from '../ui/useNmTheme'
import SectionWrapper from '../ui/SectionWrapper'
import SectionHeader from '../ui/SectionHeader'


function TimelineItem({ item, index, darkMode, pageBg, raised, insetShadow, text, muted, isLast }) {
    const itemRef = useRef(null)
    const itemInView = useInView(itemRef, { once: true, margin: '-40px' })
    const d = darkMode
    const badge = typeBadge[item.type]
    const divClr = d ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,46,0.06)'

    return (
        <div ref={itemRef} className="relative flex gap-3 sm:gap-5">

            {/* ── Timeline spine (hidden on mobile, shown sm+) ── */}
            <div className="hidden sm:flex flex-col items-center flex-shrink-0" style={{ width: 44 }}>
                <motion.div
                    className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={itemInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                        boxShadow: `${raised}, 0 0 0 2px ${item.color}30`,
                    }}
                >
                    {item.emoji}
                </motion.div>
                {!isLast && (
                    <div className="w-px flex-1 mt-2" style={{
                        minHeight: 40,
                        background: `linear-gradient(to bottom, ${item.color}40, transparent)`,
                    }} />
                )}
            </div>

            {/* ── Card ── */}
            <motion.div
                className="flex-1 mb-6 sm:mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={itemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
                <div style={{
                    background: pageBg, boxShadow: raised,
                    borderRadius: 18, overflow: 'hidden',
                }}>

                    {/* ── Card header ── */}
                    <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 sm:pb-4"
                        style={{ borderBottom: `1px solid ${divClr}` }}
                    >
                        {/* Mobile: emoji inline with badges */}
                        <div className="flex items-start gap-3 mb-3">
                            {/* Emoji — visible only on mobile */}
                            <div
                                className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center text-base flex-shrink-0"
                                style={{
                                    background: `linear-gradient(135deg, ${item.color}25, ${item.color}08)`,
                                    boxShadow: raised,
                                }}
                            >
                                {item.emoji}
                            </div>

                            {/* Badges + title block */}
                            <div className="flex-1 min-w-0">
                                {/* Badge row */}
                                <div className="flex flex-wrap items-center gap-1.5 mb-2">
                                    <span
                                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase"
                                        style={{
                                            background: `${badge.color}15`,
                                            color: badge.color,
                                            border: `1px solid ${badge.color}30`,
                                        }}
                                    >
                                        {badge.label}
                                    </span>
                                    {item.type === 'achievement' && (
                                        <span
                                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.2))',
                                                color: '#f97316',
                                                border: '1px solid rgba(249,115,22,0.35)',
                                            }}
                                        >
                                            ✦ Highlight
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h3
                                    className="font-black leading-tight text-sm sm:text-base"
                                    style={{ color: text }}
                                >
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold mt-0.5" style={{ color: item.color }}>
                                    {item.org}
                                </p>
                            </div>
                        </div>

                        {/* Period + location — stacked on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mt-1">
                            <div
                                className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg text-[11px] font-semibold"
                                style={{ background: pageBg, boxShadow: insetShadow, color: muted }}
                            >
                                🗓 {item.period}
                            </div>
                            <div
                                className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-lg text-[11px] font-medium"
                                style={{ background: pageBg, boxShadow: insetShadow, color: muted }}
                            >
                                📍 {item.location}
                            </div>
                        </div>
                    </div>

                    {/* ── Bullet points ── */}
                    <div className="px-4 sm:px-5 py-3 sm:py-4">
                        <ul className="flex flex-col gap-2.5 sm:gap-3">
                            {item.points.map((pt, i) => (
                                <li key={i}
                                    className="flex items-start gap-2.5 text-xs sm:text-sm"
                                    style={{ color: muted, lineHeight: 1.75 }}
                                >
                                    <span
                                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                                        style={{ background: item.color, boxShadow: `0 0 4px ${item.color}80` }}
                                    />
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Tags footer ── */}
                    <div
                        className="px-4 sm:px-5 py-2.5 sm:py-3 flex flex-wrap gap-1.5"
                        style={{ borderTop: `1px solid ${divClr}` }}
                    >
                        {item.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                                style={{
                                    background: `${item.color}10`,
                                    color: item.color,
                                    border: `1px solid ${item.color}25`,
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default function Experience({ darkMode }) {
    const sectionRef = useRef(null)
    const inView = useInView(sectionRef, { once: true, margin: '-80px' })
    const d = darkMode

    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, insetShadow } = useNmTheme(darkMode)

    const counts = {
        work: timeline.filter(t => t.type === 'work').length,
        education: timeline.filter(t => t.type === 'education').length,
        achievement: timeline.filter(t => t.type === 'achievement').length,
    }

    return (
        <SectionWrapper id="experience" darkMode={darkMode} sectionRef={sectionRef}>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="mb-10 sm:mb-14"
            >
                <SectionHeader
                    number="04 — Experience"
                    title="My Journey"
                    subtitle="A timeline of my work, education and achievements."
                    inView={inView}
                    lbl={lbl}
                    muted={muted}
                />
                {/* Summary chips */}
                <div className="flex flex-wrap items-center gap-2.5 mt-5">
                    {[
                        { label: `${counts.work} Work`, color: '#6c63ff', emoji: '💼' },
                        { label: `${counts.education} Education`, color: '#06b6d4', emoji: '🎓' },
                        { label: `${counts.achievement} Achievements`, color: '#f59e0b', emoji: '🏆' },
                    ].map(({ label, color, emoji }) => (
                        <div
                            key={label}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                            style={{ background: pageBg, boxShadow: raised, color: muted }}
                        >
                            <span>{emoji}</span>
                            <span style={{ color }}>{label}</span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Timeline */}
            <div>
                {timeline.map((item, i) => (
                    <TimelineItem
                        key={i}
                        item={item}
                        index={i}
                        darkMode={d}
                        pageBg={pageBg}
                        raised={raised}
                        insetShadow={insetShadow}
                        text={text}
                        muted={muted}
                        isLast={i === timeline.length - 1}
                    />
                ))}
            </div>

            {/* Bottom cap */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col items-center gap-2 mt-2"
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ background: pageBg, boxShadow: raised }}
                >
                    🌱
                </div>
                <p style={{ fontSize: 12, color: muted, textAlign: 'center' }}>
                    The journey continues — always learning, always building.
                </p>
            </motion.div>
        </SectionWrapper>
    )
}