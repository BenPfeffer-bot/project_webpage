'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'
import ContactBanner from '@/components/layout/ContactBanner'
import { theme } from '@/styles/theme'

const services = [
    {
        title: 'Rénovation Complète',
        description: 'Transformation totale de votre espace avec une attention particulière aux détails et à la qualité.',
        image: '/renov_1.jpeg',
        features: ['Démolition', 'Reconstruction', 'Finitions', 'Décoration'],
        longDescription: 'Notre service de rénovation complète prend en charge l\'intégralité de votre projet, de la conception à la réalisation. Nous coordonnons tous les corps de métier nécessaires pour transformer votre espace selon vos souhaits, tout en respectant les normes en vigueur et en garantissant une finition impeccable.'
    },
    {
        title: 'Architecture d\'Intérieur',
        description: 'Conception et optimisation de vos espaces pour un agencement parfait et fonctionnel.',
        image: '/renov_2.jpeg',
        features: ['Plans 3D', 'Études techniques', 'Conseils matériaux', 'Suivi de projet'],
        longDescription: 'Notre expertise en architecture d\'intérieur vous permet de repenser intégralement vos espaces. Nous créons des plans détaillés et des visualisations 3D pour vous aider à projeter votre futur intérieur, tout en optimisant chaque mètre carré pour un résultat à la fois esthétique et fonctionnel.'
    },
    {
        title: 'Décoration',
        description: 'Mise en valeur de vos espaces avec une sélection pointue de matériaux et de mobilier.',
        image: '/renov_3.JPG',
        features: ['Conseil couleurs', 'Mobilier', 'Éclairage', 'Accessoires'],
        longDescription: 'Notre service de décoration sublime vos espaces en créant une ambiance unique qui vous ressemble. De la sélection des couleurs au choix du mobilier, en passant par l\'éclairage et les accessoires, nous vous accompagnons dans chaque décision pour créer un intérieur harmonieux.'
    },
    {
        title: 'Plâtrerie',
        description: 'Travaux de plâtrerie traditionnelle et moderne pour des finitions impeccables.',
        image: '/renov_4.JPG',
        features: ['Moulures', 'Corniches', 'Plafonds', 'Enduits'],
        longDescription: 'Nos artisans plâtriers allient techniques traditionnelles et modernes pour réaliser vos projets de plâtrerie. Qu\'il s\'agisse de créer des moulures sur mesure, de restaurer des corniches anciennes ou d\'appliquer des enduits décoratifs, nous garantissons un travail de haute qualité.'
    },
    {
        title: 'Peinture',
        description: 'Application experte de peintures et revêtements pour sublimer vos murs.',
        image: '/renov_5.jpeg',
        features: ['Peinture décorative', 'Enduits', 'Papiers peints', 'Patines'],
        longDescription: 'Notre équipe de peintres qualifiés maîtrise toutes les techniques de peinture et de revêtements muraux. Des peintures décoratives aux papiers peints haut de gamme, en passant par les patines et les enduits, nous sublimerons vos murs avec précision et professionnalisme.'
    },
    {
        title: 'Maçonnerie',
        description: 'Travaux de structure et de maçonnerie pour transformer vos espaces.',
        image: '/renov_6.jpeg',
        features: ['Ouvertures', 'Cloisons', 'Reprises', 'Consolidation'],
        longDescription: 'Nos maçons expérimentés réalisent tous types de travaux structurels dans le respect des règles de l\'art. De la création d\'ouvertures à la construction de cloisons, en passant par la reprise en sous-œuvre, nous assurons la solidité et la pérennité de vos aménagements.'
    }
]

export default function Services() {
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const servicesRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(servicesRef, { once: true, margin: "-10%" })

    const handleQuoteRequest = (serviceName: string) => {
        setSelectedService(serviceName)
        setIsModalOpen(true)
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    }

    return (
        <motion.main
            className="pt-24 pb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Hero Section */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mb-12 sm:mb-16 md:mb-20">
                <div className="absolute inset-0">
                    <Image
                        src="/renov_1.jpeg"
                        alt="Nos Services de Rénovation"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="100vw"
                        quality={90}
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, ${theme.colors.overlay.dark} 0%, rgba(0,0,0,0.4) 100%)`
                        }}
                    />
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light mb-4 sm:mb-5 md:mb-6 text-center">
                            Nos Services
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                            Une expertise complète pour tous vos projets de rénovation et d'aménagement
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Services Grid */}
            <section
                ref={servicesRef}
                className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
            >
                <motion.div
                    className="grid grid-cols-1 gap-12 sm:gap-16 md:gap-20"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}
                        >
                            <div className="relative group">
                                <motion.div
                                    className="relative h-[300px] sm:h-[350px] md:h-[400px] rounded-lg overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ boxShadow: theme.shadows.md }}
                                >
                                    <Image
                                        src={service.image}
                                        alt={`${service.title} - Pour L'intérieur`}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        quality={85}
                                    />
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ opacity: 0.6 }}
                                        whileHover={{ opacity: 0.3 }}
                                        transition={{ duration: 0.3 }}
                                        style={{
                                            background: `linear-gradient(to top, ${theme.colors.overlay.dark}, transparent)`
                                        }}
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 md:p-8">
                                        <motion.h2
                                            className="text-2xl sm:text-2xl md:text-3xl font-light text-white mb-2"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {service.title}
                                        </motion.h2>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <h2
                                        className="text-2xl sm:text-2xl md:text-3xl font-light"
                                        style={{ color: theme.colors.text.primary }}
                                    >
                                        {service.title}
                                    </h2>
                                    <p
                                        className="text-base sm:text-lg md:text-xl mt-4"
                                        style={{ color: theme.colors.text.secondary }}
                                    >
                                        {service.longDescription}
                                    </p>
                                </motion.div>

                                <motion.div
                                    className="space-y-3 sm:space-y-4"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    {service.features.map((feature, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center gap-3"
                                        >
                                            <motion.span
                                                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
                                                style={{ backgroundColor: theme.colors.navy.dark }}
                                                whileHover={{ scale: 1.5 }}
                                                transition={{ duration: 0.2 }}
                                            />
                                            <span
                                                className="text-sm sm:text-base md:text-lg"
                                                style={{ color: theme.colors.text.secondary }}
                                            >
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </motion.div>

                                <motion.div
                                    className="pt-4 sm:pt-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    viewport={{ once: true }}
                                >
                                    <Button
                                        onClick={() => handleQuoteRequest(service.title)}
                                        variant="outline"
                                        className="group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            Demander un devis
                                        </span>
                                        <motion.span
                                            className="ml-2 inline-block"
                                            whileHover={{ x: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            →
                                        </motion.span>
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Contact CTA */}
            <section className="mt-32 py-20" style={{ backgroundColor: theme.colors.background.secondary }}>
                <div className="max-w-4xl mx-auto px-4 2xl:max-w-5xl 3xl:max-w-6xl text-center">
                    <FadeIn>
                        <h2 className="text-4xl font-light mb-6" style={{ color: theme.colors.text.primary }}>Prêt à Commencer ?</h2>
                        <p className="text-xl mb-12" style={{ color: theme.colors.text.secondary }}>
                            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
                        </p>
                        <Button
                            onClick={() => {
                                setSelectedService('general')
                                setIsModalOpen(true)
                            }}
                            variant="primary">
                            Nous Contacter
                        </Button>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Banner */}
            <ContactBanner />

            {/* Quote Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <QuoteRequestForm onClose={() => setIsModalOpen(false)} service={selectedService || undefined} />
            </Modal>
        </motion.main>
    )
} 