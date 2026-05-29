/**
 * SectionWrapper — consistent section padding, background, and ambient glow.
 *
 * USAGE in a section component:
 *
 *   const sectionRef = useRef(null)
 *   const inView = useInView(sectionRef, { once: true, margin: '-80px' })
 *
 *   return (
 *     <SectionWrapper id="about" darkMode={darkMode} sectionRef={sectionRef}>
 *       ...content (no extra wrapping div needed)...
 *     </SectionWrapper>
 *   )
 *
 * WHAT IT REPLACES in every section:
 *   - <section id=... style=... className=...>
 *   - The ambient glow <div>
 *   - <div className="relative z-10 max-w-6xl mx-auto">
 *
 * NOTE: Remove those three elements from the section file when adopting this.
 */
'use client'

export default function SectionWrapper({
    id,
    darkMode,
    children,
    sectionRef,       // pass your useRef() here so useInView still works
    glowColor,
    maxWidth = '72rem', // matches max-w-6xl = 72rem
    className = '',
}) {
    const pageBg = darkMode ? '#0d0d1a' : '#e8e8f0'
    const glow = glowColor || (darkMode ? 'rgba(108,99,255,0.07)' : 'rgba(108,99,255,0.05)')

    return (
        <section
            id={id}
            ref={sectionRef}
            style={{ background: pageBg, transition: 'background 0.4s ease' }}
            className={`relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${className}`}
        >
            {/* Ambient glow orb */}
            <div
                aria-hidden="true"
                style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 500, height: 500, borderRadius: '50%',
                    background: glow, filter: 'blur(120px)', pointerEvents: 'none',
                }}
            />

            {/* Content container */}
            <div
                className="relative z-10 mx-auto w-full"
                style={{ maxWidth }}
            >
                {children}
            </div>
        </section>
    )
}