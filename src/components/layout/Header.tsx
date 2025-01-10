'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
        { href: '/#services', label: 'Services' },
        { href: '/realisations', label: 'Réalisations' },
        { href: '/#contact', label: 'Contact' }
    ]

    return (
        <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'
            }`}>
            <nav className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <motion.span
                            className={`text-2xl font-light ${isScrolled ? 'text-black' : 'text-white'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Pour L'intérieur
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-8">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className={`hover-underline ${isScrolled ? 'text-black' : 'text-white'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className="md:hidden"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'
                            } ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'
                            } ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-black' : 'bg-white'
                            } ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden mt-4"
                        >
                            <div className="flex flex-col space-y-4 py-4">
                                {navLinks.map((link, index) => (
                                    <motion.div
                                        key={link.href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            href={link.href}
                                            className={`block ${isScrolled ? 'text-black' : 'text-white'
                                                }`}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.label}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </header>
    )
} 