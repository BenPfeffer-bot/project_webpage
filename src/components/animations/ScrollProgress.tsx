'use client'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-50"
            style={{ scaleX: useSpring(useScroll().scrollYProgress) }}
        />
    )
} 