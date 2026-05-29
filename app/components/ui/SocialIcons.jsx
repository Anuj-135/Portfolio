/**
 * SocialIcons — shared social link buttons used in Hero, Contact, Footer.
 * Accepts the socials array from data/socials.js.
 * Inline SVGs kept here so the data file stays JSON-serialisable.
 */
'use client'

import { motion } from 'framer-motion'

export default function SocialIcons({ socials, raised, pageBg, muted, accent, size = 38 }) {
    return (
        <div className="flex items-center gap-3">
            {socials.map(({ label, href, color, icon }) => (
                <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ y: -3, color: accent }}
                    whileTap={{ scale: 0.9 }}
                    style={{
                        width: size, height: size, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: pageBg, boxShadow: raised,
                        color: muted, textDecoration: 'none',
                        transition: 'color 0.2s',
                    }}
                >
                    {icon}
                </motion.a>
            ))}
        </div>
    )
}