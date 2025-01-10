import React from 'react'
import { theme } from '@/styles/theme'
import { motion } from 'framer-motion'

export default function ContactBanner() {
    return (
        <motion.section
            className="bg-white py-12 border-t"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ backgroundColor: theme.colors.background.secondary }}
        >
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <motion.div
                        className="space-y-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-2xl font-light mb-4" style={{ color: theme.colors.text.primary }}>Contact</h3>
                        <div className="space-y-2" style={{ color: theme.colors.text.secondary }}>
                            <p className="hover:text-blue-600 transition-colors">
                                <a href="tel:+33612345678">+33 6 12 34 56 78</a>
                            </p>
                            <p className="hover:text-blue-600 transition-colors">
                                <a href="mailto:contact@pourlinterieur.fr">contact@pourlinterieur.fr</a>
                            </p>
                            <p>123 Avenue des Champs-Élysées</p>
                            <p>75008 Paris, France</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="space-y-4"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className="text-2xl font-light mb-4" style={{ color: theme.colors.text.primary }}>Horaires</h3>
                        <div className="space-y-2" style={{ color: theme.colors.text.secondary }}>
                            <p>Lundi - Vendredi: 9h - 18h</p>
                            <p>Samedi: Sur rendez-vous</p>
                            <p>Dimanche: Fermé</p>
                        </div>
                    </motion.div>
                    <motion.div
                        className="relative h-[200px] rounded-lg overflow-hidden shadow-lg"
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2159245650715!2d2.295140776751612!3d48.87241030702132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4f8eec9cf%3A0x9b1c8a567d65faec!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sfr!4v1709055144317!5m2!1sen!2sfr"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </div>
            </div>
        </motion.section>
    )
} 