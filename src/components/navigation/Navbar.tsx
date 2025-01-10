'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { theme } from '@/styles/theme'

const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Qui sommes-nous', href: '/qui-sommes-nous' },
    { name: 'Nos Services', href: '/services' },
    { name: 'Nos Réalisations', href: '/realisations' },
    { name: 'Contact', href: '/#contact' }
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const pathname = usePathname()

    // Handle scroll with debounce
    useEffect(() => {
        let timeoutId: NodeJS.Timeout
        const handleScroll = () => {
            if (timeoutId) clearTimeout(timeoutId)
            timeoutId = setTimeout(() => {
                setIsScrolled(window.scrollY > 20)
            }, 50)
        }

        // Set initial scroll state
        setIsScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            if (timeoutId) clearTimeout(timeoutId)
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <header
                className="fixed w-full z-50"
                role="banner"
            >
                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isScrolled ? 1 : 0,
                        backgroundColor: isScrolled ? theme.colors.background.primary : 'transparent'
                    }}
                    transition={{ duration: 0.3 }}
                />

                <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: isScrolled ? 0.1 : 0,
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                    transition={{ duration: 0.3 }}
                />

                <nav
                    className="relative mx-auto px-4 sm:px-6 lg:px-8"
                    role="navigation"
                    aria-label="Navigation principale"
                >
                    <div className="max-w-7xl mx-auto">
                        <div className="flex justify-between items-center h-20">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="text-2xl font-light relative z-10"
                                aria-label="Pour L'intérieur - Retour à l'accueil"
                            >
                                <motion.span
                                    className="transition-colors duration-300"
                                    style={{
                                        color: isScrolled ? theme.colors.text.primary : theme.colors.text.light
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    Pour L'intérieur
                                </motion.span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div
                                className="hidden md:flex items-center space-x-8"
                                role="menubar"
                            >
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="relative group py-2"
                                        role="menuitem"
                                        aria-current={pathname === item.href ? 'page' : undefined}
                                    >
                                        <motion.span
                                            className="text-sm transition-colors duration-300 relative z-10"
                                            style={{
                                                color: isScrolled ? theme.colors.text.primary : theme.colors.text.light
                                            }}
                                            whileHover={{ y: -2 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {item.name}
                                        </motion.span>
                                        {pathname === item.href && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5"
                                                style={{ backgroundColor: isScrolled ? theme.colors.navy.dark : theme.colors.text.light }}
                                                layoutId="navbar-underline"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 500,
                                                    damping: 30
                                                }}
                                            />
                                        )}
                                    </Link>
                                ))}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                className="md:hidden p-2 relative z-10"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                            >
                                <div className="w-6 h-5 relative flex flex-col justify-between">
                                    <motion.span
                                        className="w-full h-0.5 transform origin-center transition-all duration-300"
                                        style={{
                                            backgroundColor: isScrolled ? theme.colors.text.primary : theme.colors.text.light
                                        }}
                                        animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    />
                                    <motion.span
                                        className="w-full h-0.5 transition-all duration-300"
                                        style={{
                                            backgroundColor: isScrolled ? theme.colors.text.primary : theme.colors.text.light
                                        }}
                                        animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
                                    />
                                    <motion.span
                                        className="w-full h-0.5 transform origin-center transition-all duration-300"
                                        style={{
                                            backgroundColor: isScrolled ? theme.colors.text.primary : theme.colors.text.light
                                        }}
                                        animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                id="mobile-menu"
                                className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut"
                                }}
                                style={{ backgroundColor: theme.colors.background.primary }}
                            >
                                <nav
                                    className="px-4 py-6 space-y-4"
                                    role="menu"
                                    aria-label="Menu mobile"
                                >
                                    {navItems.map((item) => (
                                        <motion.div
                                            key={item.name}
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="block text-lg font-light transition-colors duration-300"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                role="menuitem"
                                                aria-current={pathname === item.href ? 'page' : undefined}
                                                style={{
                                                    color: pathname === item.href
                                                        ? theme.colors.navy.dark
                                                        : theme.colors.text.primary
                                                }}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </nav>
            </header>

            {/* Overlay for mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-hidden="true"
                    />
                )}
            </AnimatePresence>
        </>
    )
} 