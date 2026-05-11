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

    return (
        <>
            {/* ── Header bar ── */}
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#e8e8f0]'}
        ${scrolled
                    ? darkMode
                        ? 'border-b border-white/5 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
                        : 'border-b border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.07)]'
                    : 'border-b border-transparent'
                }`}
            >
                <nav className="max-w-6xl mx-auto px-8 h-[68px] flex items-center justify-between">

                    {/* Logo */}
                    <a
                        href="#hero"
                        onClick={(e) => handleNavClick(e, '#hero')}
                        className={`text-xl font-black tracking-tight select-none
              ${darkMode ? 'text-white' : 'text-[#1a1a2e]'}`}
                    >
                        AC<span className="text-[#6c63ff]">.</span>
                    </a>

                    {/* ── Desktop pill nav ── */}
                    <div className={`hidden md:flex items-center gap-2.5 px-3 py-2 rounded-full
            ${darkMode
                            ? 'shadow-[inset_4px_4px_10px_#10101f,inset_-4px_-4px_10px_#24243d]'
                            : 'shadow-[inset_4px_4px_10px_#c8c8d0,inset_-4px_-4px_10px_#ffffff]'
                        }`}
                    >
                        {navLinks.map(({ label, href }) => {
                            const isActive = activeSection === href
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    className={`px-6 py-2 rounded-full text-[13.5px] font-semibold
                    whitespace-nowrap select-none transition-all duration-200
                    active:scale-95
                    ${isActive
                                            ? 'bg-[#6c63ff] text-white shadow-[0_0_12px_rgba(108,99,255,0.5),inset_2px_2px_4px_rgba(0,0,0,0.2)]'
                                            : darkMode
                                                ? 'text-white/45 hover:text-white shadow-[6px_6px_14px_#10101f,-6px_-6px_14px_#24243d] hover:shadow-[3px_3px_8px_#10101f,-3px_-3px_8px_#24243d]'
                                                : 'text-[#1a1a2e]/45 hover:text-[#1a1a2e] shadow-[6px_6px_14px_#c8c8d0,-6px_-6px_14px_#ffffff] hover:shadow-[3px_3px_8px_#c8c8d0,-3px_-3px_8px_#ffffff]'
                                        }`}
                                >
                                    {label}
                                </a>
                            )
                        })}
                    </div>

                    {/* ── Right actions ── */}
                    <div className="flex items-center gap-3">

                        {/* Theme toggle */}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            aria-label="Toggle dark mode"
                            className={`w-10 h-10 rounded-full flex items-center justify-center
                border-none cursor-pointer transition-all duration-200 active:scale-95
                ${darkMode
                                    ? 'text-yellow-300 shadow-[6px_6px_14px_#10101f,-6px_-6px_14px_#24243d] active:shadow-[inset_4px_4px_10px_#10101f,inset_-4px_-4px_10px_#24243d]'
                                    : 'text-[#6c63ff] shadow-[6px_6px_14px_#c8c8d0,-6px_-6px_14px_#ffffff] active:shadow-[inset_4px_4px_10px_#c8c8d0,inset_-4px_-4px_10px_#ffffff]'
                                }`}
                        >
                            {darkMode ? <Sun size={15} strokeWidth={2.5} /> : <Moon size={15} strokeWidth={2.5} />}
                        </button>

                        {/* Hamburger — mobile only */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={menuOpen}
                            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center
                border-none cursor-pointer transition-all duration-200 active:scale-95
                ${darkMode
                                    ? 'text-white shadow-[6px_6px_14px_#10101f,-6px_-6px_14px_#24243d] active:shadow-[inset_4px_4px_10px_#10101f,inset_-4px_-4px_10px_#24243d]'
                                    : 'text-[#1a1a2e] shadow-[6px_6px_14px_#c8c8d0,-6px_-6px_14px_#ffffff] active:shadow-[inset_4px_4px_10px_#c8c8d0,inset_-4px_-4px_10px_#ffffff]'
                                }`}
                        >
                            {menuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
                        </button>
                    </div>
                </nav>
            </header>

            {/* ── Full-screen mobile overlay ── */}
            <div className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center
        transition-all duration-350
        ${darkMode ? 'bg-[#1a1a2e]' : 'bg-[#e8e8f0]'}
        ${menuOpen
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}
            >
                <nav className="flex flex-col items-center gap-5 w-full px-10">
                    {navLinks.map(({ label, href }) => {
                        const isActive = activeSection === href
                        return (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                className={`w-full max-w-xs py-4 rounded-2xl text-lg font-bold
                  text-center transition-all duration-200 active:scale-95
                  ${isActive
                                        ? 'bg-[#6c63ff] text-white shadow-[0_0_16px_rgba(108,99,255,0.45)]'
                                        : darkMode
                                            ? 'text-white/50 shadow-[6px_6px_14px_#10101f,-6px_-6px_14px_#24243d] hover:text-white'
                                            : 'text-[#1a1a2e]/50 shadow-[6px_6px_14px_#c8c8d0,-6px_-6px_14px_#ffffff] hover:text-[#1a1a2e]'
                                    }`}
                            >
                                {label}
                            </a>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}