'use client'

import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X } from 'lucide-react'

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]

export default function Navbar({ darkMode, setDarkMode }) {
    const [scrolled, setScrolled] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('')

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
            let current = ''
            navLinks.forEach(({ href }) => {
                const el = document.getElementById(href.replace('#', ''))
                if (el && el.getBoundingClientRect().top <= 80) current = href
            })
            setActiveSection(current)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const handleResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        return () => { document.body.style.overflow = '' }
    }, [menuOpen])

    const handleNavClick = (e, href) => {
        e.preventDefault()
        setMenuOpen(false)
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    const d = darkMode

    // Neumorphic tokens
    const pageBg = d ? '#0d0d1a' : '#e8e8f0'
    const raised = d
        ? '5px 5px 12px #07071099, -5px -5px 12px #131324'
        : '5px 5px 12px #c8c8d0, -5px -5px 12px #ffffff'
    const inset = d
        ? 'inset 4px 4px 10px #07071099, inset -4px -4px 10px #13132480'
        : 'inset 4px 4px 10px #c0c0c8, inset -4px -4px 10px #ffffff'
    const textColor = d ? '#f0ede8' : '#1a1a2e'
    const mutedColor = d ? 'rgba(240,237,232,0.42)' : 'rgba(26,26,46,0.42)'
    const accent = '#6c63ff'

    return (
        <>
            {/* ── Header ── */}
            <header style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                background: pageBg,
                transition: 'all 0.4s ease',
                boxShadow: scrolled ? (d ? '0 4px 24px rgba(0,0,0,0.4)' : '0 4px 24px rgba(0,0,0,0.07)') : 'none',
                borderBottom: scrolled ? (d ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(0,0,0,0.04)') : '1px solid transparent',
            }}>
                <nav style={{
                    maxWidth: 1152,
                    margin: '0 auto',
                    // Responsive padding via inline — px-4 on mobile, px-8 on desktop
                    padding: '0 16px',
                    height: 64,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 8,
                }}>

                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        style={{
                            fontSize: 18, fontWeight: 900, letterSpacing: '-0.03em',
                            color: textColor, textDecoration: 'none',
                            userSelect: 'none', flexShrink: 0,
                        }}
                    >
                        AC<span style={{ color: accent }}>.</span>
                    </a>

                    {/* Desktop pill nav */}
                    <div
                        className="hidden md:flex"
                        style={{
                            alignItems: 'center', gap: 6,
                            padding: '6px 10px', borderRadius: 999,
                            background: pageBg, boxShadow: inset,
                        }}
                    >
                        {navLinks.map(({ label, href }) => {
                            const isActive = activeSection === href
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    style={{
                                        padding: '7px 20px', borderRadius: 999,
                                        fontSize: 13, fontWeight: 600,
                                        textDecoration: 'none', whiteSpace: 'nowrap',
                                        userSelect: 'none', cursor: 'pointer',
                                        transition: 'all 0.18s ease',
                                        color: isActive ? '#fff' : mutedColor,
                                        backgroundColor: isActive ? accent : 'transparent',
                                        boxShadow: isActive
                                            ? `0 0 12px ${accent}80, inset 2px 2px 4px rgba(0,0,0,0.2)`
                                            : raised,
                                    }}
                                >
                                    {label}
                                </a>
                            )
                        })}
                    </div>

                    {/* Right actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>

                        {/* Theme toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle dark mode"
                            style={{
                                width: 38, height: 38, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: 'none', cursor: 'pointer',
                                background: pageBg,
                                color: d ? '#f6c90e' : accent,
                                boxShadow: raised,
                                transition: 'all 0.18s ease',
                                flexShrink: 0,
                            }}
                            onMouseDown={e => e.currentTarget.style.boxShadow = inset}
                            onMouseUp={e => e.currentTarget.style.boxShadow = raised}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = raised}
                        >
                            {d ? <Sun size={14} strokeWidth={2.5} /> : <Moon size={14} strokeWidth={2.5} />}
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            style={{
                                width: 38, height: 38, borderRadius: '50%',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: 'none', cursor: 'pointer',
                                background: pageBg,
                                color: textColor,
                                boxShadow: raised,
                                transition: 'all 0.18s ease',
                                flexShrink: 0,
                            }}
                            className="md:hidden"
                            onMouseDown={e => e.currentTarget.style.boxShadow = inset}
                            onMouseUp={e => e.currentTarget.style.boxShadow = raised}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = raised}
                        >
                            {menuOpen
                                ? <X size={15} strokeWidth={2} />
                                : <Menu size={15} strokeWidth={2} />
                            }
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Full-screen mobile overlay ── */}
            <div
                className="md:hidden"
                style={{
                    position: 'fixed', inset: 0, zIndex: 40,
                    background: pageBg,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    opacity: menuOpen ? 1 : 0,
                    transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
                    pointerEvents: menuOpen ? 'all' : 'none',
                }}
            >
                <nav style={{
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', gap: 14,
                    width: '100%', padding: '0 32px',
                }}>
                    {navLinks.map(({ label, href }, i) => {
                        const isActive = activeSection === href
                        return (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                style={{
                                    display: 'block',
                                    width: '100%', maxWidth: 300,
                                    padding: '14px 0',
                                    borderRadius: 16,
                                    fontSize: 17, fontWeight: 700,
                                    textAlign: 'center', textDecoration: 'none',
                                    transition: 'all 0.2s ease',
                                    transitionDelay: menuOpen ? `${i * 50}ms` : '0ms',
                                    color: isActive ? '#fff' : mutedColor,
                                    backgroundColor: isActive ? accent : 'transparent',
                                    boxShadow: isActive
                                        ? `0 0 16px ${accent}50`
                                        : raised,
                                }}
                            >
                                {label}
                            </a>
                        )
                    })}
                </nav>
            </div>

            {/* Padding pushed content below fixed nav */}
            <style>{`
        @media (max-width: 767px) {
          nav .md\\:hidden { display: flex !important; }
        }
        /* Prevent content from hiding under navbar */
        #hero { padding-top: 64px; }
      `}</style>
        </>
    )
}