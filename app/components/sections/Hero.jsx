'use client'

import { useEffect, useState } from 'react'

const roles = [
    'Frontend Developer',
    'React Enthusiast',
    'Full Stack Learner',
    'UI Craftsman',
]

const socials = [
    {
        label: 'GitHub',
        href: 'https://github.com/',
        icon: (
            <svg width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        label: 'LinkedIn',
        href: 'https://linkedin.com/',
        icon: (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        label: 'Twitter',
        href: 'https://twitter.com/',
        icon: (
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
    },
]

export default function Hero({ darkMode }) {
    const [roleIndex, setRoleIndex] = useState(0)
    const [displayed, setDisplayed] = useState('')
    const [deleting, setDeleting] = useState(false)
    const [visible, setVisible] = useState(false)
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

    // Entrance animation — only after mount
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), 80)
        return () => clearTimeout(t)
    }, [])

    // Typewriter
    useEffect(() => {
        const current = roles[roleIndex]
        let timeout
        if (!deleting && displayed.length < current.length) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 75)
        } else if (!deleting && displayed.length === current.length) {
            timeout = setTimeout(() => setDeleting(true), 2000)
        } else if (deleting && displayed.length > 0) {
            timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40)
        } else {
            setDeleting(false)
            setRoleIndex((i) => (i + 1) % roles.length)
        }
        return () => clearTimeout(timeout)
    }, [displayed, deleting, roleIndex])

    // Mouse parallax — only client side
    useEffect(() => {
        const handler = (e) => setMousePos({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100,
        })
        window.addEventListener('mousemove', handler, { passive: true })
        return () => window.removeEventListener('mousemove', handler)
    }, [])

    const scrollTo = (id) =>
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })

    const reveal = (delay) => `
    transition-all duration-[900ms] ease-out
    ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
  `

    return (
        <section
            id="hero"
            className={`relative min-h-screen flex items-center justify-center overflow-hidden px-6
        ${darkMode ? 'bg-[#0d0d1a]' : 'bg-[#f0f0f8]'}`}
        >

            {/* ── Background ── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Radial base */}
                <div className={`absolute inset-0 transition-colors duration-500
          ${darkMode
                        ? 'bg-[radial-gradient(ellipse_at_top,_#1a1040_0%,_#0d0d1a_60%)]'
                        : 'bg-[radial-gradient(ellipse_at_top,_#ede9ff_0%,_#f0f0f8_60%)]'
                    }`}
                />
                {/* Parallax orb 1 */}
                <div
                    className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] transition-all duration-[2000ms] ease-out
            ${darkMode ? 'bg-[#6c63ff]/20' : 'bg-[#6c63ff]/10'}`}
                    style={{ left: `calc(${mousePos.x}% - 250px)`, top: `calc(${mousePos.y}% - 250px)` }}
                />
                {/* Parallax orb 2 */}
                <div
                    className={`absolute w-[400px] h-[400px] rounded-full blur-[100px] transition-all duration-[3000ms] ease-out
            ${darkMode ? 'bg-[#a78bfa]/15' : 'bg-[#a78bfa]/10'}`}
                    style={{ left: `calc(${100 - mousePos.x}% - 200px)`, top: `calc(${100 - mousePos.y}% - 200px)` }}
                />
                {/* Bottom glow */}
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] rounded-full blur-[90px]
          ${darkMode ? 'bg-[#312e81]/25' : 'bg-[#c4b5fd]/18'}`}
                />
                {/* Grid */}
                <div
                    className={`absolute inset-0 ${darkMode ? 'opacity-[0.025]' : 'opacity-[0.035]'}`}
                    style={{
                        backgroundImage: `linear-gradient(${darkMode ? '#fff' : '#6c63ff'} 1px, transparent 1px),
                              linear-gradient(90deg, ${darkMode ? '#fff' : '#6c63ff'} 1px, transparent 1px)`,
                        backgroundSize: '72px 72px',
                    }}
                />
            </div>

            {/* ── Content ── */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-3xl w-full mx-auto gap-6 pt-20">

                {/* Badge */}
                <div className={`${reveal(0)}`} style={{ transitionDelay: visible ? '0ms' : '0ms' }}>
                    <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest uppercase
            ${darkMode
                            ? 'bg-white/5 border border-white/10 text-white/50'
                            : 'bg-[#6c63ff]/8 border border-[#6c63ff]/20 text-[#6c63ff]/75'
                        }`}
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
                        Open to work
                    </span>
                </div>

                {/* Heading — reduced size */}
                <div style={{ transitionDelay: '150ms' }} className={reveal(150)}>
                    <h1 className={`text-[clamp(2.4rem,5.5vw,4.2rem)] font-black leading-[1.0] tracking-[-0.035em]
            ${darkMode ? 'text-white' : 'text-[#0d0d1a]'}`}
                    >
                        Hi, I'm{' '}
                        <span className="relative inline-block">
                            <span className="bg-gradient-to-r from-[#6c63ff] via-[#a78bfa] to-[#818cf8] bg-clip-text text-transparent">
                                Anuj
                            </span>
                            <span className="absolute -bottom-0.5 left-0 right-0 h-[2.5px] rounded-full bg-gradient-to-r from-[#6c63ff] to-[#a78bfa] opacity-50" />
                        </span>
                        {' '}Chahar
                    </h1>
                </div>

                {/* Typewriter */}
                <div style={{ transitionDelay: '300ms' }} className={`${reveal(300)} h-9 flex items-center`}>
                    <p className={`text-lg sm:text-xl font-medium tracking-tight
            ${darkMode ? 'text-white/45' : 'text-[#0d0d1a]/40'}`}
                    >
                        <span className="text-[#6c63ff] font-bold">&lt;</span>
                        <span className={`mx-2 font-semibold ${darkMode ? 'text-white/65' : 'text-[#0d0d1a]/65'}`}>
                            {displayed}
                        </span>
                        <span className="inline-block w-[2px] h-[18px] bg-[#6c63ff] align-middle"
                            style={{ animation: 'blink 1s step-end infinite' }}
                        />
                        <span className="text-[#6c63ff] font-bold ml-0.5">/&gt;</span>
                    </p>
                </div>

                {/* Bio */}
                <div style={{ transitionDelay: '450ms' }} className={reveal(450)}>
                    <p className={`text-sm sm:text-base leading-relaxed max-w-xl font-light
            ${darkMode ? 'text-white/40' : 'text-[#0d0d1a]/50'}`}
                    >
                        I build fast, accessible, and visually refined web experiences.
                        Passionate about turning complex problems into clean, elegant interfaces —
                        currently levelling up from{' '}
                        <span className={`font-semibold ${darkMode ? 'text-white/65' : 'text-[#0d0d1a]/70'}`}>frontend</span>
                        {' '}to{' '}
                        <span className="font-semibold text-[#6c63ff]">full stack</span>.
                    </p>
                </div>

                {/* CTA buttons */}
                <div style={{ transitionDelay: '580ms' }} className={`${reveal(580)} flex flex-wrap items-center justify-center gap-3`}>
                    <button
                        onClick={() => scrollTo('#projects')}
                        className="group relative px-7 py-3 rounded-full text-sm font-semibold text-white overflow-hidden
              transition-all duration-200 active:scale-95 hover:scale-[1.03]
              bg-gradient-to-r from-[#6c63ff] to-[#818cf8]
              shadow-[0_4px_20px_rgba(108,99,255,0.45)] hover:shadow-[0_6px_28px_rgba(108,99,255,0.65)]"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
              -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center gap-2">
                            View My Work
                            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>

                    <button
                        onClick={() => scrollTo('#contact')}
                        className={`px-7 py-3 rounded-full text-sm font-semibold transition-all duration-200 active:scale-95 hover:scale-[1.03] border
              ${darkMode
                                ? 'border-white/15 text-white/65 hover:text-white hover:border-white/30 hover:bg-white/5'
                                : 'border-[#6c63ff]/30 text-[#6c63ff]/80 hover:text-[#6c63ff] hover:border-[#6c63ff]/60 hover:bg-[#6c63ff]/5'
                            }`}
                    >
                        Get In Touch
                    </button>

                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-7 py-3 rounded-full text-sm font-semibold flex items-center gap-2
              transition-all duration-200 active:scale-95 hover:scale-[1.03]
              ${darkMode
                                ? 'bg-white/5 border border-white/10 text-white/55 hover:bg-white/10 hover:text-white'
                                : 'bg-white border border-black/10 text-[#0d0d1a]/55 hover:bg-white hover:text-[#0d0d1a] shadow-[0_2px_8px_rgba(0,0,0,0.06)]'
                            }`}
                    >
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
                        </svg>
                        Resume
                    </a>
                </div>

                {/* Divider + socials */}
                <div style={{ transitionDelay: '720ms' }} className={`${reveal(720)} flex items-center gap-5`}>
                    <div className={`w-12 h-px ${darkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                    <div className="flex items-center gap-3">
                        {socials.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className={`w-10 h-10 rounded-full flex items-center justify-center
                  transition-all duration-200 active:scale-90 hover:scale-110
                  ${darkMode
                                        ? 'bg-white/6 border border-white/10 text-white/40 hover:text-[#6c63ff] hover:border-[#6c63ff]/40 hover:bg-[#6c63ff]/10'
                                        : 'bg-white border border-black/8 text-[#0d0d1a]/40 hover:text-[#6c63ff] hover:border-[#6c63ff]/30 hover:bg-[#6c63ff]/5 shadow-[2px_2px_8px_rgba(0,0,0,0.06),-1px_-1px_4px_rgba(255,255,255,0.8)]'
                                    }`}
                            >
                                {icon}
                            </a>
                        ))}
                    </div>
                    <div className={`w-12 h-px ${darkMode ? 'bg-white/10' : 'bg-black/10'}`} />
                </div>

                {/* Tech chips */}
                <div style={{ transitionDelay: '860ms' }} className={`${reveal(860)} flex flex-wrap justify-center gap-2`}>
                    {['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'Node.js'].map((tech) => (
                        <span key={tech}
                            className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide transition-colors duration-200 cursor-default
                ${darkMode
                                    ? 'bg-white/5 border border-white/8 text-white/38 hover:text-white/65 hover:border-white/18'
                                    : 'bg-white border border-black/8 text-[#0d0d1a]/40 hover:text-[#6c63ff] hover:border-[#6c63ff]/25 shadow-[1px_1px_4px_rgba(0,0,0,0.04)]'
                                }`}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
        transition-all duration-1000 delay-[1100ms] ${visible ? 'opacity-100' : 'opacity-0'}`}
            >
                <span className={`text-[9px] uppercase tracking-[0.3em] font-semibold ${darkMode ? 'text-white/25' : 'text-black/22'}`}>
                    Scroll
                </span>
                <div className={`w-[18px] h-7 rounded-full border flex items-start justify-center pt-1.5
          ${darkMode ? 'border-white/20' : 'border-black/15'}`}
                >
                    <div className={`w-1 h-1.5 rounded-full animate-bounce ${darkMode ? 'bg-white/40' : 'bg-black/30'}`} />
                </div>
            </div>

            <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
        </section>
    )
}
