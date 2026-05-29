'use client'
import { socials } from '../../data/socials'
import { useNmTheme } from '../ui/useNmTheme'
import SocialIcons from '../ui/SocialIcons'
const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
]


export default function Footer({ darkMode }) {
    const d = darkMode
    const { pageBg, raised, inset, raisedSm, text, muted, lbl, divider, accent, divClr, insetShadow } = useNmTheme(darkMode)

    const handleNavClick = (e, href) => {
        e.preventDefault()
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <footer
            style={{ background: pageBg, borderTop: `1px solid ${divClr}`, transition: 'background 0.4s ease' }}
            className="px-4 sm:px-6 lg:px-8 py-10"
        >
            <div className="max-w-6xl mx-auto">

                {/* Main row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">

                    {/* Logo + tagline */}
                    <div className="flex flex-col items-center sm:items-start gap-1">
                        <a
                            href="#hero"
                            onClick={(e) => handleNavClick(e, '#hero')}
                            style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', color: text, textDecoration: 'none' }}
                        >
                            AC<span style={{ color: accent }}>.</span>
                        </a>
                        <p style={{ fontSize: 11, color: muted, fontWeight: 500 }}>
                            Frontend Dev · Full Stack Learner
                        </p>
                    </div>

                    {/* Nav links */}
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                        {navLinks.map(({ label, href }) => (
                            <a
                                key={href}
                                href={href}
                                onClick={(e) => handleNavClick(e, href)}
                                style={{ fontSize: 12, fontWeight: 600, color: muted, textDecoration: 'none', transition: 'color 0.2s' }}
                                onMouseEnter={e => e.currentTarget.style.color = text}
                                onMouseLeave={e => e.currentTarget.style.color = muted}
                            >
                                {label}
                            </a>
                        ))}
                    </nav>

                    {/* Social icons */}
                    <div className="flex items-center gap-2.5">
                        <SocialIcons socials={socials} raised={raised} pageBg={pageBg} muted={muted} accent={accent} />
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: divClr, marginBottom: 20 }} />

                {/* Bottom row */}
                {/* <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p style={{ fontSize: 11, color: muted, textAlign: 'center' }}>
                        © {new Date().getFullYear()} Anuj Chahar. All rights reserved.
                    </p>
                    <p style={{ fontSize: 11, color: muted, textAlign: 'center' }}>
                        Built with{' '}
                        <span style={{ color: accent, fontWeight: 600 }}>Next.js</span>
                        {' '}+{' '}
                        <span style={{ color: accent, fontWeight: 600 }}>Tailwind CSS</span>
                    </p>
                </div> */}

            </div>
        </footer>
    )
}