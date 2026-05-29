/**
 * NmCard — base neumorphic card wrapper with optional hover lift.
 * Use noHover for cards containing interactive children (e.g. marquee, canvas).
 */
'use client'

import { motion } from 'framer-motion'

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export default function NmCard({
    children,
    darkMode,
    className = '',
    style = {},
    noHover = false,
    animate = true,
}) {
    const raised = darkMode
        ? '6px 6px 16px #07071099, -6px -6px 16px #131324'
        : '6px 6px 16px #c8c8d0, -6px -6px 16px #ffffff'

    const hoverShadow = darkMode
        ? '8px 8px 20px #07071099, -8px -8px 20px #131324'
        : '8px 8px 20px #c8c8d0, -8px -8px 20px #ffffff'

    const pageBg = darkMode ? '#0d0d1a' : '#e8e8f0'

    return (
        <motion.div
            variants={animate ? cardVariants : undefined}
            whileHover={noHover ? {} : { y: -3, boxShadow: hoverShadow }}
            transition={{ duration: 0.2 }}
            style={{ background: pageBg, boxShadow: raised, borderRadius: 20, ...style }}
            className={className}
        >
            {children}
        </motion.div>
    )
}