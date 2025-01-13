'use client'
import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, useInView, useMotionValue, animate, useTransform } from 'framer-motion'
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

const faqCategories = ['Tous', 'Travaux', 'Devis', 'Assurance', 'Délais']

const faqs = [
    {
        icon: '🕒',
        question: 'Combien de temps durent généralement les travaux ?',
        answer: 'La durée des travaux varie selon l\'ampleur du projet. Une rénovation complète peut prendre de 2 à 6 mois, tandis que des travaux spécifiques peuvent être réalisés en quelques semaines. Nous établissons un planning détaillé lors du devis.',
        category: 'Délais'
    },
    {
        icon: '🛡️',
        question: 'Êtes-vous assurés pour tous les travaux ?',
        answer: 'Oui, nous disposons de toutes les assurances nécessaires, notamment la garantie décennale. Chaque projet est couvert par nos assurances professionnelles pour votre tranquillité.',
        category: 'Assurance'
    },
    {
        icon: '🏗️',
        question: 'Comment se déroule un projet de rénovation ?',
        answer: 'Nous commençons par une consultation gratuite pour comprendre vos besoins. Ensuite, nous établissons un devis détaillé, planifions les travaux, et assurons un suivi régulier tout au long du projet jusqu\'à la réception finale.',
        category: 'Travaux'
    },
    {
        icon: '💰',
        question: 'Comment sont établis vos devis ?',
        answer: 'Nos devis sont gratuits et détaillés. Après une visite sur site et l\'évaluation précise de vos besoins, nous vous fournissons un devis transparent qui inclut tous les aspects du projet, sans frais cachés.',
        category: 'Devis'
    },
    {
        icon: '📋',
        question: 'Quels types de garanties proposez-vous ?',
        answer: 'Nous offrons plusieurs garanties selon le type de travaux : garantie décennale pour les travaux structurels, garantie biennale pour les équipements, et garantie de parfait achèvement d\'un an pour l\'ensemble des travaux.',
        category: 'Assurance'
    },
    {
        icon: '⏱️',
        question: 'Quel est le délai moyen pour obtenir un devis ?',
        answer: 'Après la visite technique, vous recevez votre devis détaillé sous 48 à 72 heures. Pour les projets complexes nécessitant des études spécifiques, le délai peut être de 5 à 7 jours ouvrés.',
        category: 'Devis'
    }
]

const engagements = [
    {
        icon: SparklesIcon,
        title: 'Éco-responsabilité',
        description: 'Notre engagement envers l\'environnement',
        features: [
            'Utilisation de matériaux écologiques',
            'Gestion responsable des déchets',
            'Solutions d\'isolation performantes'
        ],
        color: 'from-emerald-500 to-emerald-600',
        bgPattern: 'bg-[radial-gradient(#22c55e_1px,transparent_1px)] bg-[length:16px_16px]',
        // stats: { value: '80%', label: 'Matériaux écologiques' }
    },
    {
        icon: ShieldCheckIcon,
        title: 'Qualité & Sécurité',
        description: 'L\'excellence dans chaque détail',
        features: [
            'Matériaux haut de gamme certifiés',
            'Personnel hautement qualifié',
            'Respect des normes de sécurité'
        ],
        color: 'from-[#B5A642] to-[#9A8A38]',
        bgPattern: 'bg-[radial-gradient(#B5A642_1px,transparent_1px)] bg-[length:16px_16px]',
        // stats: { value: '100%', label: 'Satisfaction client' }
    },
    {
        icon: UserGroupIcon,
        title: 'Service Client',
        description: 'Votre satisfaction, notre priorité',
        features: [
            'Suivi personnalisé des projets',
            'Respect des délais',
            'Service après-vente réactif'
        ],
        color: 'from-indigo-500 to-indigo-600',
        bgPattern: 'bg-[radial-gradient(#6366f1_1px,transparent_1px)] bg-[length:16px_16px]',
        // stats: { value: '24/7', label: 'Support client' }
    }
]

// Enhanced FAQ Accordion component
const FAQAccordion = ({ faq, isOpen, onToggle, index }: {
    faq: typeof faqs[0],
    isOpen: boolean,
    onToggle: () => void,
    index: number
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-all duration-300 group-hover:shadow-xl"
                animate={{
                    scale: isOpen ? 1.02 : 1,
                    backgroundColor: isOpen ? "rgb(249, 250, 251)" : "white"
                }}
            >
                <motion.button
                    className="w-full px-6 py-4 flex items-center justify-between gap-4 transition-colors duration-300"
                    onClick={onToggle}
                    whileHover={{ scale: 1.005 }}
                    whileTap={{ scale: 0.995 }}
                >
                    <div className="flex items-center gap-4">
                        <motion.span
                            className="text-2xl"
                            animate={{
                                scale: isOpen ? 1.2 : 1,
                                rotate: isOpen ? 360 : 0
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            {faq.icon}
                        </motion.span>
                        <div>
                            <h3 className="text-lg font-medium text-left">{faq.question}</h3>
                            <span className="text-sm text-[#B5A642]">{faq.category}</span>
                        </div>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg
                            className={`w-6 h-6 transition-colors duration-300 ${isOpen ? 'text-[#B5A642]' : 'text-gray-500'}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </motion.div>
                </motion.button>
                <motion.div
                    initial={false}
                    animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0
                    }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                    className="overflow-hidden"
                >
                    <motion.div
                        className="px-6 pb-4 text-gray-600"
                        initial={{ y: -20, opacity: 0 }}
                        animate={isOpen ? { y: 0, opacity: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        {faq.answer}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

// Add SearchBar component
const SearchBar = ({ value, onChange }: { value: string, onChange: (value: string) => void }) => {
    return (
        <motion.div
            className="relative max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Rechercher une question..."
                className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-200 focus:border-[#B5A642] focus:ring-2 focus:ring-[#B5A642]/20 outline-none transition-all duration-300"
            />
            <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </motion.div>
    )
}

// Add ServiceCard component for reusability
const ServiceCard = ({
    service,
    index,
    onQuoteRequest,
    className = ""
}: {
    service: typeof services[0],
    index: number,
    onQuoteRequest: (title: string) => void,
    className?: string
}) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden group border border-gray-100">
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
                        onClick={() => onQuoteRequest(service.title)}
                        className="w-full"
                    >
                        Demander un devis
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default function Services() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedService, setSelectedService] = useState('')
    const servicesRef = useRef(null)
    const isServicesInView = useInView(servicesRef, { once: true, margin: "-100px" })
    const [openFAQ, setOpenFAQ] = useState<number | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFAQCategory, setSelectedFAQCategory] = useState('Tous')

    const filteredServices = selectedCategory === 'all'
        ? services
        : services.filter(service => service.category === selectedCategory)

    const [width, setWidth] = useState(0)
    const motionValue = useMotionValue(0)

    useEffect(() => {
        const calculateWidth = () => {
            const serviceWidth = 400 // width of each service card
            const gap = 32 // gap between cards
            const totalWidth = (serviceWidth + gap) * filteredServices.length
            setWidth(totalWidth)
        }

        calculateWidth()
        window.addEventListener('resize', calculateWidth)
        return () => window.removeEventListener('resize', calculateWidth)
    }, [filteredServices])

    const filteredFAQs = faqs.filter(faq => {
        const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = selectedFAQCategory === 'Tous' || faq.category === selectedFAQCategory
        return matchesSearch && matchesCategory
    })

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
                        className="text-4xl md:text-6xl lg:text-7xl text-white font-bold mb-6 tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Nos Services
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-xl text-white/90 max-w-2xl"
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
                                className={`flex-shrink-0 px-6 py-3 rounded-full text-lg transition-all duration-300 flex items-center space-x-2 ${selectedCategory === category.id
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
            <section ref={servicesRef} className="max-w-7xl mx-auto px-4 mb-24 overflow-hidden">
                {selectedCategory === 'all' ? (
                    // Sliding view for "Tous les Services"
                    <div className="relative">
                        <motion.div
                            className="flex gap-8"
                            animate={{
                                x: [-width / 2, 0],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    duration: 50,
                                    ease: "linear",
                                }
                            }}
                            onHoverStart={() => {
                                const controls = animate(motionValue, 0, {
                                    duration: 0.5,
                                });
                                return () => controls.stop();
                            }}
                            onHoverEnd={() => {
                                const controls = animate(motionValue, -width / 2, {
                                    duration: 50,
                                    ease: "linear",
                                });
                                return () => controls.stop();
                            }}
                        >
                            {/* First set of services */}
                            {filteredServices.map((service, index) => (
                                <ServiceCard
                                    key={`first-${service.title}`}
                                    service={service}
                                    index={index}
                                    onQuoteRequest={handleQuoteRequest}
                                    className="flex-shrink-0 w-[400px]"
                                />
                            ))}
                            {/* Second set of services for seamless loop */}
                            {filteredServices.map((service, index) => (
                                <ServiceCard
                                    key={`second-${service.title}`}
                                    service={service}
                                    index={index}
                                    onQuoteRequest={handleQuoteRequest}
                                    className="flex-shrink-0 w-[400px]"
                                />
                            ))}
                        </motion.div>
                    </div>
                ) : (
                    // Fixed grid for specific categories
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredServices.map((service, index) => (
                            <ServiceCard
                                key={service.title}
                                service={service}
                                index={index}
                                onQuoteRequest={handleQuoteRequest}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* Nos Engagements Section */}
            <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[#B5A642]/5 pattern-grid-lg opacity-30" />
                <div className="max-w-7xl mx-auto px-4 relative">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <motion.span
                                className="inline-block text-sm md:text-base text-[#B5A642] font-medium px-4 py-2 rounded-full bg-[#B5A642]/10 mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                Notre Philosophie
                            </motion.span>
                            <motion.h2
                                className="text-3xl md:text-5xl lg:text-6xl font-extralight mb-6 text-[#1B1B3A] tracking-wide"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Nos Engagements
                            </motion.h2>
                            <motion.p
                                className="text-base sm:text-xl text-[#1B1B3A]/80 max-w-2xl mx-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                L'excellence au service de votre projet
                            </motion.p>
                        </div>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                        {engagements.map((engagement, index) => (
                            <motion.div
                                key={engagement.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative group perspective"
                            >
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 rounded-2xl transform transition-all duration-500 group-hover:scale-105"
                                    style={{
                                        transformStyle: "preserve-3d",
                                        transform: "rotateX(0deg) rotateY(0deg)"
                                    }}
                                    whileHover={{
                                        rotateX: 5,
                                        rotateY: 5
                                    }}
                                />
                                <div className={`absolute inset-0 ${engagement.bgPattern} opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 rounded-2xl`} />
                                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8 h-full transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r opacity-50 group-hover:opacity-100 transition-opacity duration-500 rounded-t-2xl" style={{ backgroundImage: `linear-gradient(to right, ${engagement.color.split(' ')[1]}, ${engagement.color.split(' ')[2]})` }} />

                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${engagement.color} flex items-center justify-center transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg`}>
                                            <engagement.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-[#1B1B3A]">
                                                {/* {engagement.stats.value} */}
                                            </span>
                                            <span className="text-sm text-[#1B1B3A]/60">
                                                {/* {engagement.stats.label} */}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl md:text-2xl font-light mb-3 text-[#1B1B3A] tracking-wide group-hover:text-[#B5A642] transition-colors duration-300">
                                        {engagement.title}
                                    </h3>
                                    <p className="text-[#1B1B3A]/70 mb-6">
                                        {engagement.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {engagement.features.map((feature, featureIndex) => (
                                            <motion.li
                                                key={feature}
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.1 + featureIndex * 0.1 }}
                                                viewport={{ once: true }}
                                                className="flex items-start gap-3 group/item"
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.2, rotate: 180 }}
                                                    transition={{ duration: 0.3 }}
                                                    className={`w-6 h-6 flex-shrink-0 rounded-full bg-gradient-to-br ${engagement.color} flex items-center justify-center shadow-sm group-hover/item:shadow-md transition-shadow duration-300`}
                                                >
                                                    <CheckCircleIcon className="w-4 h-4 text-white" />
                                                </motion.div>
                                                <span className="text-sm md:text-base text-[#1B1B3A]/80 group-hover/item:text-[#1B1B3A] transition-colors duration-300">
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Questions Fréquentes Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <FadeIn>
                        <div className="text-center mb-16">
                            <motion.h2
                                className="text-3xl md:text-5xl lg:text-6xl font-extralight mb-6 text-[#1B1B3A] tracking-wide"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8 }}
                            >
                                Questions Fréquentes
                            </motion.h2>
                            <motion.p
                                className="text-base sm:text-xl text-[#1B1B3A]/80 max-w-2xl mx-auto"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.8 }}
                            >
                                Tout ce que vous devez savoir sur nos services
                            </motion.p>
                        </div>
                    </FadeIn>

                    <SearchBar value={searchQuery} onChange={setSearchQuery} />

                    <div className="flex justify-center gap-2 mb-8 overflow-x-auto pb-2">
                        {faqCategories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedFAQCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 whitespace-nowrap ${selectedFAQCategory === category
                                    ? 'bg-[#B5A642] text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
                            </motion.button>
                        ))}
                    </div>

                    <motion.div
                        className="max-w-3xl mx-auto space-y-4"
                        layout
                    >
                        {filteredFAQs.length > 0 ? (
                            filteredFAQs.map((faq, index) => (
                                <FAQAccordion
                                    key={index}
                                    faq={faq}
                                    isOpen={openFAQ === index}
                                    onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    index={index}
                                />
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-8 text-gray-500"
                            >
                                Aucune question ne correspond à votre recherche
                            </motion.div>
                        )}
                    </motion.div>
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