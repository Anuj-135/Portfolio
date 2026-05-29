/**
 * SectionHeader — consistent section number + title + optional subtitle
 * Used by every section for uniform typography hierarchy.
 */
'use client'

import { motion } from 'framer-motion'

export default function SectionHeader({ number, title, subtitle, inView, accent = '#6c63ff', lbl, muted }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-10 sm:mb-14"
        >
            <span style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.22em',
                textTransform: 'uppercase', color: lbl,
            }}>
                {number}
            </span>
            <h2 style={{
                fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 900,
                letterSpacing: '-0.03em', marginTop: 8,
            }}>
                {title}<span style={{ color: accent }}>.</span>
            </h2>
            {subtitle && (
                <p style={{ fontSize: 14, color: muted, marginTop: 10, maxWidth: 480, lineHeight: 1.7 }}>
                    {subtitle}
                </p>
            )}
        </motion.div>
    )
}