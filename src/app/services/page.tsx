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

const categories = [
    { id: 'all', name: 'Tous les Services' },
    { id: 'renovation', name: 'Rénovation', icon: SparklesIcon },
    { id: 'architecture', name: 'Architecture', icon: ShieldCheckIcon },
    { id: 'decoration', name: 'Décoration', icon: CheckCircleIcon },
    { id: 'technique', name: 'Technique', icon: UserGroupIcon },
    { id: 'exterieur', name: 'Extérieur', icon: SparklesIcon },
]

const services = [
    {
        title: 'Rénovation Complète',
        description: 'Transformation totale de votre espace avec une attention particulière aux détails et à la qualité.',
        image: '/renov_1.jpeg',
        features: ['Démolition', 'Reconstruction', 'Finitions', 'Décoration'],
        category: 'renovation',
        longDescription: 'Notre service de rénovation complète prend en charge l\'intégralité de votre projet, de la conception à la réalisation. Nous coordonnons tous les corps de métier nécessaires pour transformer votre espace selon vos souhaits, tout en respectant les normes en vigueur et en garantissant une finition impeccable.'
    },
    {
        title: 'Architecture d\'Intérieur',
        description: 'Conception et optimisation de vos espaces pour un agencement parfait et fonctionnel.',
        image: '/renov_2.jpg',
        features: ['Plans 3D', 'Études techniques', 'Conseils matériaux', 'Suivi de projet'],
        category: 'architecture',
        longDescription: 'Notre expertise en architecture d\'intérieur vous permet de repenser intégralement vos espaces. Nous créons des plans détaillés et des visualisations 3D pour vous aider à projeter votre futur intérieur, tout en optimisant chaque mètre carré pour un résultat à la fois esthétique et fonctionnel.'
    },
    {
        title: 'Décoration',
        description: 'Mise en valeur de vos espaces avec une sélection pointue de matériaux et de mobilier.',
        image: '/renov_3.JPG',
        features: ['Conseil couleurs', 'Mobilier', 'Éclairage', 'Accessoires'],
        category: 'decoration',
        longDescription: 'Notre service de décoration sublime vos espaces en créant une ambiance unique qui vous ressemble. De la sélection des couleurs au choix du mobilier, en passant par l\'éclairage et les accessoires, nous vous accompagnons dans chaque décision pour créer un intérieur harmonieux.'
    },
    {
        title: 'Plâtrerie',
        description: 'Travaux de plâtrerie traditionnelle et moderne pour des finitions impeccables.',
        image: '/renov_4.JPG',
        features: ['Moulures', 'Corniches', 'Plafonds', 'Enduits'],
        category: 'technique',
        longDescription: 'Nos artisans plâtriers allient techniques traditionnelles et modernes pour réaliser vos projets de plâtrerie. Qu\'il s\'agisse de créer des moulures sur mesure, de restaurer des corniches anciennes ou d\'appliquer des enduits décoratifs, nous garantissons un travail de haute qualité.'
    },
    {
        title: 'Peinture',
        description: 'Application experte de peintures et revêtements pour sublimer vos murs.',
        image: '/renov_5.jpeg',
        features: ['Peinture décorative', 'Enduits', 'Papiers peints', 'Patines'],
        category: 'technique',
        longDescription: 'Notre équipe de peintres qualifiés maîtrise toutes les techniques de peinture et de revêtements muraux. Des peintures décoratives aux papiers peints haut de gamme, en passant par les patines et les enduits, nous sublimerons vos murs avec précision et professionnalisme.'
    },
    {
        title: 'Maçonnerie',
        description: 'Travaux de maçonnerie pour modifier la structure de votre espace.',
        image: '/renov_6.jpeg',
        features: ['Ouverture murs', 'Création cloisons', 'Carrelage', 'Isolation'],
        category: 'technique',
        longDescription: 'Notre équipe de maçons expérimentés réalise tous types de travaux structurels. De l\'ouverture de murs à la création de nouvelles cloisons, en passant par la pose de carrelage et l\'isolation, nous garantissons des travaux de qualité dans le respect des normes de construction.'
    },
    {
        title: 'Aménagement Extérieur',
        description: 'Création et rénovation d\'espaces extérieurs pour profiter pleinement de votre extérieur.',
        image: '/renov_7.jpg',
        features: ['Terrasses', 'Balcons', 'Jardins', 'Éclairage'],
        category: 'exterieur',
        longDescription: 'Nous concevons et réalisons vos projets d\'aménagement extérieur pour créer des espaces de vie agréables et fonctionnels. De la création de terrasses à l\'aménagement de jardins, nous vous proposons des solutions sur mesure qui s\'intègrent parfaitement à votre environnement.'
    }
]

export default function Services() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState('')
    const servicesRef = useRef(null)
    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })

    const filteredServices = selectedCategory === 'all' 
        ? services 
        : services.filter(service => service.category === selectedCategory)

    const handleQuoteRequest = (serviceName: string) => {
        setSelectedService(serviceName)
        setIsModalOpen(true)
    }

    return (
        <motion.main
            className="pt-24 pb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            {/* Hero Section */}
            <section className="relative h-[50vh] mb-16">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/renov_8.jpg"
                        alt="Nos Services"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </motion.div>
                <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Nos Services
                    </motion.h1>
                    <motion.p
                        className="text-xl text-white/90 max-w-2xl"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Des solutions sur mesure pour tous vos projets d'aménagement et de rénovation
                    </motion.p>
                </div>
            </section>

            {/* Categories Filter */}
            <section className="max-w-7xl mx-auto px-4 mb-16">
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center gap-3 sm:gap-4 hide-scrollbar">
                        {categories.map((category) => (
                            <motion.button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`flex-shrink-0 px-6 py-3 rounded-full text-lg transition-all duration-300 flex items-center space-x-2 ${
                                    selectedCategory === category.id
                                        ? 'bg-[#B5A642] text-white shadow-lg'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.icon && (
                                    <category.icon className="w-5 h-5" />
                                )}
                                <span>{category.name}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section ref={servicesRef} className="max-w-7xl mx-auto px-4 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => (
                        <motion.div
                            key={service.title}
                            className="bg-white rounded-xl shadow-lg overflow-hidden group"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isServicesInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="relative h-64">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-2xl text-white font-light tracking-wide">
                                    {service.title}
                                </h3>
                            </div>
                            <div className="p-6">
                                <p className="text-gray-600 mb-4">{service.description}</p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                                <Button
                                    onClick={() => handleQuoteRequest(service.title)}
                                    className="w-full"
                                >
                                    Demander un devis
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Nos Engagements Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <motion.h2 
                                className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-6 text-[#1B1B3A] tracking-wide"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Nos Engagements
                            </motion.h2>
                            <motion.p 
                                className="text-xl text-[#1B1B3A]/80 max-w-2xl mx-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                L'excellence au service de votre projet
                            </motion.p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 flex items-center justify-center mb-6">
                                <SparklesIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-[#1B1B3A]">Éco-responsabilité</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Utilisation de matériaux écologiques</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Gestion responsable des déchets</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Solutions d'isolation performantes</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 flex items-center justify-center mb-6">
                                <ShieldCheckIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-[#1B1B3A]">Qualité & Sécurité</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Matériaux haut de gamme certifiés</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Personnel hautement qualifié</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Respect des normes de sécurité</span>
                                </li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 flex items-center justify-center mb-6">
                                <UserGroupIcon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-light mb-4 text-[#1B1B3A]">Service Client</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Suivi personnalisé des projets</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Respect des délais</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircleIcon className="w-6 h-6 flex-shrink-0 text-[#B5A642]" />
                                    <span className="text-[#1B1B3A]/80">Service après-vente réactif</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Questions Fréquentes Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <motion.h2 
                                className="text-4xl md:text-5xl lg:text-6xl font-extralight mb-6 text-[#1B1B3A] tracking-wide"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Questions Fréquentes
                            </motion.h2>
                            <motion.p 
                                className="text-xl text-[#1B1B3A]/80 max-w-2xl mx-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Tout ce que vous devez savoir sur nos services 😊
                            </motion.p>
                        </div>
                    </FadeIn>

                    <div className="max-w-4xl mx-auto space-y-6">
                        <motion.div
                            className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">🕒</span>
                                <div>
                                    <h3 className="text-xl font-light mb-3 text-[#1B1B3A]">
                                        Combien de temps durent généralement les travaux ?
                                    </h3>
                                    <p className="text-[#1B1B3A]/80 leading-relaxed">
                                        La durée des travaux varie selon l'ampleur du projet. Une rénovation complète peut prendre de 2 à 6 mois, tandis que des travaux spécifiques peuvent être réalisés en quelques semaines. Nous établissons un planning détaillé lors du devis.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">🛡️</span>
                                <div>
                                    <h3 className="text-xl font-light mb-3 text-[#1B1B3A]">
                                        Êtes-vous assurés pour tous les travaux ?
                                    </h3>
                                    <p className="text-[#1B1B3A]/80 leading-relaxed">
                                        Oui, nous disposons de toutes les assurances nécessaires, notamment la garantie décennale. Chaque projet est couvert par nos assurances professionnelles pour votre tranquillité.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">🏗️</span>
                                <div>
                                    <h3 className="text-xl font-light mb-3 text-[#1B1B3A]">
                                        Comment se déroule un projet de rénovation ?
                                    </h3>
                                    <p className="text-[#1B1B3A]/80 leading-relaxed">
                                        Nous commençons par une consultation gratuite pour comprendre vos besoins. Ensuite, nous établissons un devis détaillé, planifions les travaux, et assurons un suivi régulier tout au long du projet jusqu'à la réception finale.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-2xl">💰</span>
                                <div>
                                    <h3 className="text-xl font-light mb-3 text-[#1B1B3A]">
                                        Comment sont établis vos devis ?
                                    </h3>
                                    <p className="text-[#1B1B3A]/80 leading-relaxed">
                                        Nos devis sont gratuits et détaillés. Après une visite sur site et l'évaluation précise de vos besoins, nous vous fournissons un devis transparent qui inclut tous les aspects du projet, sans frais cachés.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <QuoteRequestForm
                    onClose={() => setIsModalOpen(false)}
                    service={selectedService}
                />
            </Modal>

            <ContactBanner />
        </motion.main>
    )
} 