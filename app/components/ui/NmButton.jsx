/**
 * NmButton — neumorphic button with raised, inset, and gradient variants.
 */
'use client'

import { motion } from 'framer-motion'

export default function NmButton({
    children,
    onClick,
    href,
    variant = 'raised',   // 'raised' | 'gradient' | 'inset'
    darkMode,
    className = '',
    style = {},
    ...props
}) {
    const pageBg = darkMode ? '#0d0d1a' : '#e8e8f0'
    const raised = darkMode
        ? '6px 6px 16px #07071099, -6px -6px 16px #131324'
        : '6px 6px 16px #c8c8d0, -6px -6px 16px #ffffff'
    const inset = darkMode
        ? 'inset 4px 4px 10px #07071099, inset -4px -4px 10px #13132480'
        : 'inset 4px 4px 10px #c0c0c8, inset -4px -4px 10px #ffffff'
    const muted = darkMode ? 'rgba(240,237,232,0.45)' : 'rgba(26,26,46,0.48)'

    const variants = {
        raised: { background: pageBg, boxShadow: raised, color: muted },
        inset: { background: pageBg, boxShadow: inset, color: muted },
        gradient: {
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            boxShadow: '0 4px 20px rgba(108,99,255,0.5)', color: '#fff',
        },
    }

    const baseStyle = {
        padding: '10px 26px', borderRadius: 100,
        border: 'none', cursor: 'pointer',
        fontSize: 14, fontWeight: 600,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        textDecoration: 'none',
        ...variants[variant],
        ...style,
    }

    const Tag = href ? 'a' : 'button'

    return (
        <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{ display: 'inline-flex' }}
        >
            <Tag
                href={href}
                onClick={onClick}
                style={baseStyle}
                className={className}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                {...props}
            >
                {children}
            </Tag>
        </motion.div>
    )
}