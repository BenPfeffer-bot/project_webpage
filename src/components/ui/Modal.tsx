'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ReactNode } from 'react'
import { theme } from '@/styles/theme'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: ReactNode
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ backgroundColor: theme.colors.overlay.dark }}
                    />

                    {/* Modal */}
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    >
                        <motion.div
                            className="bg-white/90 backdrop-blur-md rounded-2xl w-full max-w-lg p-8 relative overflow-hidden"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={e => e.stopPropagation()}
                            style={{ boxShadow: theme.shadows.lg }}
                        >
                            {/* Close Button */}
                            <motion.button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full"
                                initial={{ backgroundColor: theme.colors.overlay.light }}
                                whileHover={{ backgroundColor: theme.colors.navy.lightest }}
                                style={{ color: theme.colors.text.primary }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </motion.button>

                            {children}
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
} 