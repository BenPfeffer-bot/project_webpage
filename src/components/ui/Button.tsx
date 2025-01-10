'use client'
import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    href?: string
    variant?: 'primary' | 'outline'
    type?: 'button' | 'submit'
    disabled?: boolean
    className?: string
}

export default function Button({
    children,
    onClick,
    href,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className = ''
}: ButtonProps) {
    const baseClasses = 'px-6 py-3 rounded-lg text-sm font-light transition-colors'
    const variantClasses = {
        primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed',
        outline: 'border border-black text-black hover:bg-black/5 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed'
    }

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        )
    }

    return (
        <motion.button
            whileHover={!disabled ? { scale: 1.02 } : undefined}
            whileTap={!disabled ? { scale: 0.98 } : undefined}
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classes}
        >
            {children}
        </motion.button>
    )
} 