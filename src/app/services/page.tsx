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
import { CheckCircleIcon, ShieldCheckIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/outline'

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
        image: '/renov_2.jpg',
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

const advantages = [
    {
        title: 'Expertise Reconnue',
        description: 'Notre équipe d\'experts qualifiés possède une expérience approfondie dans tous les aspects de la rénovation.',
        icon: <ShieldCheckIcon className="w-8 h-8" />
    },
    {
        title: 'Qualité Premium',
        description: 'Nous utilisons exclusivement des matériaux haut de gamme et appliquons les meilleures pratiques du secteur.',
        icon: <SparklesIcon className="w-8 h-8" />
    },
    {
        title: 'Service Personnalisé',
        description: 'Chaque projet est unique et reçoit une attention particulière adaptée à vos besoins spécifiques.',
        icon: <UserGroupIcon className="w-8 h-8" />
    }
]

const bestPractices = [
    {
        title: 'Éco-responsabilité',
        points: [
            'Utilisation de matériaux écologiques',
            'Gestion responsable des déchets',
            'Solutions d\'isolation performantes',
            'Respect des normes environnementales'
        ]
    },
    {
        title: 'Sécurité',
        points: [
            'Équipements de protection conformes',
            'Personnel formé aux normes de sécurité',
            'Sécurisation des zones de travail',
            'Respect des protocoles sanitaires'
        ]
    },
    {
        title: 'Qualité',
        points: [
            'Contrôle qualité rigoureux',
            'Matériaux certifiés',
            'Suivi détaillé des travaux',
            'Garantie sur nos prestations'
        ]
    }
]

const guarantees = [
    {
        title: 'Garantie Décennale',
        description: 'Tous nos travaux sont couverts par une garantie décennale pour votre tranquillité.'
    },
    {
        title: 'Devis Détaillé',
        description: 'Nous fournissons des devis transparents et détaillés sans frais cachés.'
    },
    {
        title: 'Respect des Délais',
        description: 'Nous nous engageons à respecter les délais convenus pour votre projet.'
    },
    {
        title: 'Service Après-Vente',
        description: 'Notre équipe reste à votre disposition après la fin des travaux.'
    }
]

export default function Services() {
    const [selectedService, setSelectedService] = useState<string | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState('all')
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
                staggerChildren: 0.15
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

    const categories = ['all', 'design', 'construction', 'finition']
    const getServiceCategory = (index: number) => {
        if (index < 3) return 'design'
        if (index < 5) return 'finition'
        return 'construction'
    }

    const filteredServices = services.filter(
        (_, index) => activeCategory === 'all' || getServiceCategory(index) === activeCategory
    )

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

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${activeCategory === category
                                ? 'bg-navy-dark text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Advantages Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Pourquoi Nous Choisir
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Des services d'excellence pour vos projets de rénovation
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {advantages.map((advantage) => (
                            <div
                                key={advantage.title}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-navy-dark/10 mb-6">
                                    {advantage.icon}
                                </div>
                                <h3 className="text-xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                    {advantage.title}
                                </h3>
                                <p style={{ color: theme.colors.text.secondary }}>
                                    {advantage.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section
                ref={servicesRef}
                className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.title}
                            variants={itemVariants}
                            className="flex flex-col bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            style={{ minHeight: '550px' }}
                        >
                            <div className="relative h-64">
                                <Image
                                    src={service.image}
                                    alt={`${service.title} - Pour L'intérieur`}
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={85}
                                />
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: `linear-gradient(to top, ${theme.colors.overlay.dark}, transparent)`
                                    }}
                                />
                            </div>

                            <div className="flex-1 p-6 sm:p-7 flex flex-col">
                                <h2 className="text-2xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                    {service.title}
                                </h2>
                                <p className="text-base mb-6" style={{ color: theme.colors.text.secondary }}>
                                    {service.description}
                                </p>

                                <div className="space-y-3 mb-6">
                                    {service.features.map((feature, idx) => (
                                        <div key={idx} className="flex items-center gap-3">
                                            <span
                                                className="w-1.5 h-1.5 rounded-full"
                                                style={{ backgroundColor: theme.colors.navy.dark }}
                                            />
                                            <span className="text-sm" style={{ color: theme.colors.text.secondary }}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <Button
                                        onClick={() => handleQuoteRequest(service.title)}
                                        variant="outline"
                                        className="w-full group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                                            Demander un devis
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Best Practices Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Nos Engagements
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Les meilleures pratiques au service de votre projet
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {bestPractices.map((practice) => (
                            <div
                                key={practice.title}
                                className="bg-white p-8 rounded-xl shadow-lg"
                            >
                                <h3 className="text-xl font-light mb-6" style={{ color: theme.colors.text.primary }}>
                                    {practice.title}
                                </h3>
                                <ul className="space-y-4">
                                    {practice.points.map((point, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-navy-dark" />
                                            <span style={{ color: theme.colors.text.secondary }}>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Guarantees Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Nos Garanties
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Des engagements solides pour votre tranquillité
                        </p>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {guarantees.map((guarantee) => (
                            <motion.div
                                key={guarantee.title}
                                className="bg-gray-50 p-6 rounded-xl text-center"
                                whileHover={{ y: -5 }}
                                transition={{ duration: 0.2 }}
                            >
                                <h3 className="text-xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                    {guarantee.title}
                                </h3>
                                <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                                    {guarantee.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Questions Fréquentes
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Tout ce que vous devez savoir sur nos services
                        </p>
                    </FadeIn>

                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                Combien de temps durent généralement les travaux ?
                            </h3>
                            <p style={{ color: theme.colors.text.secondary }}>
                                La durée des travaux varie selon l'ampleur du projet. Une rénovation complète peut prendre de 2 à 6 mois, tandis que des travaux spécifiques peuvent être réalisés en quelques semaines. Nous établissons un planning détaillé lors du devis.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                Êtes-vous assurés pour tous les travaux ?
                            </h3>
                            <p style={{ color: theme.colors.text.secondary }}>
                                Oui, nous disposons de toutes les assurances nécessaires, notamment la garantie décennale. Chaque projet est couvert par nos assurances professionnelles pour votre tranquillité.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg">
                            <h3 className="text-xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                Comment se déroule un projet de rénovation ?
                            </h3>
                            <p style={{ color: theme.colors.text.secondary }}>
                                Nous commençons par une consultation gratuite pour comprendre vos besoins. Ensuite, nous établissons un devis détaillé, planifions les travaux, et assurons un suivi régulier tout au long du projet jusqu'à la réception finale.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Banner */}
            <div className="mt-20">
                <ContactBanner />
            </div>

            {/* Quote Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <QuoteRequestForm service={selectedService || undefined} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </motion.main>
    )
} 