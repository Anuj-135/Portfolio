'use client'

import { useEffect, useRef, useState } from 'react'

const timeline = [
    {
        type: 'work',
        title: 'Frontend Developer Intern',
        org: 'Tech Startup',
        period: 'Jun 2024 — Present',
        location: 'Remote',
        color: '#6c63ff',
        emoji: '💼',
        points: [
            'Built and maintained reusable React components used across 3 products',
            'Improved page load performance by 35% through code splitting and lazy loading',
            'Collaborated with designers to implement pixel-perfect UI from Figma mockups',
            'Integrated REST APIs and handled complex state management with Context API',
        ],
        tags: ['React', 'Tailwind CSS', 'REST APIs', 'Figma'],
    },
    {
        type: 'achievement',
        title: 'Hackathon Winner — HackIndia 2024',
        org: 'HackIndia',
        period: 'Oct 2024',
        location: 'Delhi, India',
        color: '#f59e0b',
        emoji: '🏆',
        points: [
            'Won 1st place out of 200+ teams in a 36-hour national hackathon',
            'Built a real-time collaborative coding platform using React and WebSockets',
            'Presented the product to a panel of judges from top tech companies',
            'Received a cash prize of ₹50,000 and mentorship opportunity',
        ],
        tags: ['React', 'WebSockets', 'Node.js', 'Hackathon'],
    },
    {
        type: 'education',
        title: 'B.Tech in Computer Science',
        org: 'University / College Name',
        period: '2022 — 2026',
        location: 'India',
        color: '#06b6d4',
        emoji: '🎓',
        points: [
            'Pursuing a full degree in Computer Science with focus on web technologies',
            'Relevant coursework: Data Structures, Algorithms, DBMS, Operating Systems',
            'Active member of the college coding club and tech fest organiser',
            'Maintaining a strong academic record while working on personal projects',
        ],
        tags: ['DSA', 'DBMS', 'OS', 'Networking'],
    },
    {
        type: 'achievement',
        title: 'LeetCode — 500+ Problems Solved',
        org: 'LeetCode / Competitive Programming',
        period: '2023 — Present',
        location: 'Online',
        color: '#f97316',
        emoji: '⚡',
        points: [
            'Solved 500+ problems on LeetCode across Easy, Medium and Hard categories',
            'Achieved a LeetCode rating of 1800+ (Top 10% globally)',
            'Consistent participant in LeetCode Weekly and Biweekly contests',
            'Strong command over Arrays, Trees, Graphs, DP and Sliding Window patterns',
        ],
        tags: ['DSA', 'C++', 'LeetCode', 'Problem Solving'],
    },
    {
        type: 'work',
        title: 'Freelance Web Developer',
        org: 'Self-employed',
        period: 'Jan 2024 — May 2024',
        location: 'Remote',
        color: '#10b981',
        emoji: '🚀',
        points: [
            'Designed and developed 3 client websites from scratch using Next.js',
            'Built responsive landing pages with modern animations using Framer Motion',
            'Handled client communication, requirements gathering and delivery',
            'Deployed projects on Vercel with custom domain configuration',
        ],
        tags: ['Next.js', 'JavaScript', 'Vercel', 'Framer Motion'],
    },
    {
        type: 'education',
        title: 'Higher Secondary (12th Grade)',
        org: 'School Name',
        period: '2020 — 2022',
        location: 'India',
        color: '#a78bfa',
        emoji: '📚',
        points: [
            'Completed 12th grade with Computer Science as a major subject',
            'Scored 90%+ in boards with distinction in Computer Science',
            'First exposure to programming through C++ and basic web development',
            'Participated in inter-school science and tech exhibitions',
        ],
        tags: ['C++', 'HTML', 'CSS', 'Academics'],
    },
]

// Badge config per type
const typeBadge = {
    work: { label: '💼 Work', color: '#6c63ff' },
    education: { label: '🎓 Education', color: '#06b6d4' },
    achievement: { label: '🏆 Achievement', color: '#f59e0b' },
}

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

function TimelineItem({ item, index, darkMode, pageBg, raised, insetShadow, text, muted, isLast }) {
    const [itemRef, itemInView] = useInView(0.1)
    const d = darkMode
    const badge = typeBadge[item.type]

    return (
        <div ref={itemRef} className="relative flex gap-4 sm:gap-6">

            {/* Icon + line */}
            <div className="flex flex-col items-center flex-shrink-0" style={{ width: 44 }}>
                <div
                    className="relative z-10 w-11 h-11 rounded-2xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{
                        background: `linear-gradient(135deg, ${item.color}30, ${item.color}10)`,
                        boxShadow: `${raised}, 0 0 0 2px ${item.color}30`,
                        transition: 'opacity 0.6s ease, transform 0.6s ease',
                        opacity: itemInView ? 1 : 0,
                        transform: itemInView ? 'scale(1)' : 'scale(0.6)',
                    }}
                >
                    {item.emoji}
                </div>
                {!isLast && (
                    <div className="w-px flex-1 mt-2" style={{
                        minHeight: 40,
                        background: `linear-gradient(to bottom, ${item.color}40, transparent)`,
                    }} />
                )}
            </div>

            {/* Card */}
            <div
                className="flex-1 mb-8"
                style={{
                    transition: `opacity 0.7s ease ${index * 120}ms, transform 0.7s ease ${index * 120}ms`,
                    opacity: itemInView ? 1 : 0,
                    transform: itemInView ? 'translateX(0)' : 'translateX(20px)',
                }}
            >
                <div style={{ background: pageBg, boxShadow: raised, borderRadius: 18, overflow: 'hidden' }}>

                    {/* Header */}
                    <div
                        className="px-5 pt-5 pb-4"
                        style={{ borderBottom: `1px solid ${d ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,46,0.06)'}` }}
                    >
                        <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex-1 min-w-0">

                                {/* Badge row — type + optional achievement star */}
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    {/* Primary type badge */}
                                    <span
                                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
                                        style={{
                                            background: `${badge.color}15`,
                                            color: badge.color,
                                            border: `1px solid ${badge.color}30`,
                                        }}
                                    >
                                        {badge.label}
                                    </span>

                                    {/* Achievement highlight badge */}
                                    {item.type === 'achievement' && (
                                        <span
                                            className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-wider uppercase"
                                            style={{
                                                background: 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(249,115,22,0.2))',
                                                color: '#f97316',
                                                border: '1px solid rgba(249,115,22,0.35)',
                                                boxShadow: '0 0 8px rgba(249,115,22,0.2)',
                                            }}
                                        >
                                            ✦ Highlight
                                        </span>
                                    )}
                                </div>

                                <h3 className="font-black text-base sm:text-lg leading-tight" style={{ color: text }}>
                                    {item.title}
                                </h3>
                                <p className="text-sm font-semibold mt-0.5" style={{ color: item.color }}>
                                    {item.org}
                                </p>
                            </div>

                            {/* Period + location */}
                            <div className="text-right flex-shrink-0">
                                <div
                                    className="text-[11px] font-semibold px-3 py-1.5 rounded-xl"
                                    style={{ background: pageBg, boxShadow: insetShadow, color: muted }}
                                >
                                    {item.period}
                                </div>
                                <p className="text-[11px] mt-1.5 text-center" style={{ color: muted }}>
                                    📍 {item.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Bullet points */}
                    <div className="px-5 py-4">
                        <ul className="flex flex-col gap-2.5">
                            {item.points.map((pt, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm" style={{ color: muted, lineHeight: 1.7 }}>
                                    <span
                                        className="w-1.5 h-1.5 rounded-full mt-[7px] flex-shrink-0"
                                        style={{ background: item.color, boxShadow: `0 0 4px ${item.color}80` }}
                                    />
                                    {pt}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tags */}
                    <div
                        className="px-5 py-3 flex flex-wrap gap-1.5"
                        style={{ borderTop: `1px solid ${d ? 'rgba(255,255,255,0.05)' : 'rgba(26,26,46,0.06)'}` }}
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
            </div>
        </div>
    )
}

export default function Experience({ darkMode }) {
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

    const counts = {
        work: timeline.filter(t => t.type === 'work').length,
        education: timeline.filter(t => t.type === 'education').length,
        achievement: timeline.filter(t => t.type === 'achievement').length,
    }

    const summaryChips = [
        { label: `${counts.work} Work`, color: '#6c63ff', emoji: '💼' },
        { label: `${counts.education} Education`, color: '#06b6d4', emoji: '🎓' },
        { label: `${counts.achievement} Achievement${counts.achievement > 1 ? 's' : ''}`, color: '#f59e0b', emoji: '🏆' },
    ]

    return (
        <section
            id="experience"
            ref={sectionRef}
            style={{ background: pageBg, transition: 'background 0.4s ease' }}
            className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8"
        >
            <div style={{
                position: 'absolute', top: '40%', left: '15%',
                width: 400, height: 400, borderRadius: '50%',
                background: d ? 'rgba(6,182,212,0.05)' : 'rgba(6,182,212,0.04)',
                filter: 'blur(100px)', pointerEvents: 'none',
            }} />

            <div className="relative z-10 max-w-3xl mx-auto">

                {/* Header */}
                <div style={reveal(0)} className="mb-10 sm:mb-14">
                    <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: lbl }}>
                        04 — Experience
                    </span>
                    <h2 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: text, marginTop: 8 }}>
                        My Journey<span style={{ color: '#6c63ff' }}>.</span>
                    </h2>
                    <p style={{ fontSize: 14, color: muted, marginTop: 10, lineHeight: 1.7 }}>
                        A timeline of my work, education and achievements — where I've been and what I've won.
                    </p>

                    {/* Summary chips */}
                    <div className="flex items-center gap-3 mt-5 flex-wrap">
                        {summaryChips.map(({ label, color, emoji }) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold"
                                style={{ background: pageBg, boxShadow: raised, color: muted }}
                            >
                                <span>{emoji}</span>
                                <span style={{ color }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

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
                <div style={reveal(600)} className="flex flex-col items-center gap-2 mt-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                        style={{ background: pageBg, boxShadow: raised }}
                    >
                        🌱
                    </div>
                    <p style={{ fontSize: 12, color: muted, textAlign: 'center' }}>
                        The journey continues — always learning, always building.
                    </p>
                </div>

            </div>
        </section>
    )
}