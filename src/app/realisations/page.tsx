'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import ContactBanner from '@/components/layout/ContactBanner'
import { theme } from '@/styles/theme'
import Button from '@/components/ui/Button'
import Modal from '@/components/ui/Modal'
import QuoteRequestForm from '@/components/forms/QuoteRequestForm'

const categories = ['Tous', 'Rénovation', 'Peinture', 'Maçonnerie', 'Plâtrerie']

const projects = [
    {
        title: 'Rénovation Complète',
        location: 'Paris 11ème',
        year: '2023',
        category: 'Rénovation',
        description: 'Rénovation intégrale d\'un appartement haussmannien.',
        image: '/project_1.jpg',
        tags: ['Peinture', 'Plâtrerie', 'Rénovation'],
        fullDescription: 'Rénovation complète d\'un appartement haussmannien avec une attention particulière portée aux détails d\'époque. Les travaux ont inclus la restauration des moulures, la réfection des parquets et la modernisation des installations.'
    },
    {
        title: 'Travaux de Peinture',
        location: 'Paris 12ème',
        year: '2023',
        category: 'Peinture',
        description: 'Travaux de peinture et finitions soignées.',
        image: '/project_2.jpg',
        tags: ['Peinture', 'Finition'],
        fullDescription: 'Application de peintures haut de gamme avec des finitions minutieuses. Utilisation de techniques spéciales pour créer des effets décoratifs uniques et durables.'
    },
    {
        title: 'Rénovation Plafond',
        location: 'Paris 8ème',
        year: '2023',
        category: 'Plâtrerie',
        description: 'Rénovation complète du plafond avec isolation.',
        image: '/project_3.jpg',
        tags: ['Plâtrerie', 'Isolation'],
        fullDescription: 'Rénovation complète d\'un plafond historique incluant l\'isolation thermique et acoustique. Restauration des ornements d\'origine et création de nouvelles moulures sur mesure.'
    },
    {
        title: 'Chantier de Rénovation',
        location: 'Saint-Germain-en-Laye',
        year: '2023',
        category: 'Rénovation',
        description: 'Rénovation d\'un appartement avec travaux de maçonnerie.',
        image: '/project_4.jpg',
        tags: ['Maçonnerie', 'Rénovation'],
        fullDescription: 'Transformation complète d\'un appartement incluant des travaux de maçonnerie importants. Création de nouvelles ouvertures et modification de la structure pour un espace plus moderne.'
    },
    {
        title: 'Travaux de Finition',
        location: 'Paris 16ème',
        year: '2023',
        category: 'Peinture',
        description: 'Travaux de peinture et finitions haut de gamme.',
        image: '/project_5.jpg',
        tags: ['Peinture', 'Finition'],
        fullDescription: 'Réalisation de finitions haut de gamme avec des matériaux nobles. Application de techniques spéciales de peinture pour créer une ambiance unique et raffinée.'
    },
    {
        title: 'Rénovation Structurelle',
        location: 'Neuilly-sur-Seine',
        year: '2023',
        category: 'Maçonnerie',
        description: 'Travaux de maçonnerie et restructuration.',
        image: '/project_6.jpg',
        tags: ['Maçonnerie', 'Structure'],
        fullDescription: 'Travaux de restructuration majeure incluant le renforcement des structures porteuses et la création de nouveaux espaces. Intervention technique complexe réalisée dans les règles de l\'art.'
    }
]

const statistics = [
    { number: '150+', label: 'Projets Réalisés' },
    { number: '12', label: 'Années d\'Expérience' },
    { number: '98%', label: 'Clients Satisfaits' },
    { number: '45', label: 'Experts Qualifiés' }
]

const processSteps = [
    {
        title: 'Consultation',
        description: 'Évaluation détaillée de vos besoins et objectifs',
        image: '/renov_1.jpeg',
        icon: '🤝'
    },
    {
        title: 'Planification',
        description: 'Élaboration d\'un plan d\'action précis',
        image: '/renov_2.jpeg',
        icon: '📋'
    },
    {
        title: 'Réalisation',
        description: 'Exécution experte des travaux',
        image: '/renov_3.JPG',
        icon: '🏗️'
    },
    {
        title: 'Finition',
        description: 'Attention méticuleuse aux détails',
        image: '/renov_4.JPG',
        icon: '✨'
    }
]

const testimonials = [
    {
        name: 'Sophie Martin',
        role: 'Propriétaire',
        location: 'Paris 16ème',
        content: 'Une équipe exceptionnelle qui a su transformer notre appartement tout en respectant son caractère haussmannien. Le résultat dépasse nos attentes.',
        image: '/testimonial_1.jpg'
    },
    {
        name: 'Pierre Dubois',
        role: 'Architecte',
        location: 'Neuilly-sur-Seine',
        content: 'Collaboration professionnelle remarquable. Leur expertise technique et leur souci du détail sont impressionnants.',
        image: '/testimonial_2.jpg'
    },
    {
        name: 'Marie Laurent',
        role: 'Propriétaire',
        location: 'Saint-Germain-en-Laye',
        content: 'Un travail de grande qualité, réalisé dans les délais. La communication était excellente tout au long du projet.',
        image: '/testimonial_3.jpg'
    }
]

export default function Realisations() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [selectedProject, setSelectedProject] = useState<number | null>(null)
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
    const [selectedQuoteProject, setSelectedQuoteProject] = useState<typeof projects[0] | null>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(projectsRef, { once: true, margin: "-10%" })

    const statsRef = useRef<HTMLDivElement>(null)
    const processRef = useRef<HTMLDivElement>(null)
    const testimonialsRef = useRef<HTMLDivElement>(null)

    const isStatsInView = useInView(statsRef, { once: true, margin: "-10%" })
    const isProcessInView = useInView(processRef, { once: true, margin: "-10%" })
    const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-10%" })

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

    const filteredProjects = selectedCategory === 'Tous'
        ? projects
        : projects.filter(project => project.category === selectedCategory)

    const handleQuoteRequest = (project: typeof projects[0]) => {
        setSelectedQuoteProject(project)
        setIsQuoteModalOpen(true)
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
                        src="/project_1.jpg"
                        alt="Nos Réalisations"
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
                            Nos Réalisations
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto">
                            Découvrez nos projets d'aménagement et de rénovation
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Statistics Section */}
            <section
                ref={statsRef}
                className="py-20 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isStatsInView ? "visible" : "hidden"}
                    >
                        {statistics.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <h3 className="text-4xl sm:text-5xl font-light mb-2" style={{ color: theme.colors.text.primary }}>
                                    {stat.number}
                                </h3>
                                <p className="text-sm sm:text-base" style={{ color: theme.colors.text.secondary }}>
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Category Filter */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
                <div className="flex flex-wrap justify-center gap-4">
                    {categories.map((category) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm sm:text-base transition-all duration-300 ${selectedCategory === category
                                ? 'bg-navy-dark text-white'
                                : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Projects Grid */}
            <section
                ref={projectsRef}
                className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8"
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            variants={itemVariants}
                            className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                        >
                            <div className="relative h-80">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    quality={85}
                                />
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-2xl font-light">{project.title}</h3>
                                        <span className="text-sm">{project.year}</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-3">
                                        <span>{project.location}</span>
                                        <span>{project.category}</span>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {selectedProject === index && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="p-6"
                                    >
                                        <p className="text-base mb-4" style={{ color: theme.colors.text.secondary }}>
                                            {project.fullDescription}
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                                                    style={{ color: theme.colors.text.secondary }}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-auto">
                                            <Button
                                                onClick={() => handleQuoteRequest(project)}
                                                variant="outline"
                                                className="w-full group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform duration-200">
                                                    Demander un devis similaire
                                                </span>
                                            </Button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Process Section */}
            <section
                ref={processRef}
                className="py-20 bg-white"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Notre Processus
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Une approche méthodique pour des résultats exceptionnels
                        </p>
                    </FadeIn>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isProcessInView ? "visible" : "hidden"}
                    >
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                variants={itemVariants}
                                className="relative"
                            >
                                <div className="relative h-64 rounded-lg overflow-hidden mb-6">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="absolute top-4 left-4 w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-light mb-2" style={{ color: theme.colors.text.primary }}>
                                    {step.title}
                                </h3>
                                <p className="text-base" style={{ color: theme.colors.text.secondary }}>
                                    {step.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                ref={testimonialsRef}
                className="py-20 bg-gray-50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                    <FadeIn>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-4">
                            Témoignages Clients
                        </h2>
                        <p className="text-center text-lg mb-16" style={{ color: theme.colors.text.secondary }}>
                            Ce que nos clients disent de nous
                        </p>
                    </FadeIn>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12"
                        variants={containerVariants}
                        initial="hidden"
                        animate={isTestimonialsInView ? "visible" : "hidden"}
                    >
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={testimonial.name}
                                variants={itemVariants}
                                className="bg-white p-6 rounded-xl shadow-lg"
                            >
                                <div className="flex items-center mb-6">
                                    <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                                        <Image
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-light" style={{ color: theme.colors.text.primary }}>
                                            {testimonial.name}
                                        </h3>
                                        <p className="text-sm" style={{ color: theme.colors.text.secondary }}>
                                            {testimonial.role} - {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base italic" style={{ color: theme.colors.text.secondary }}>
                                    "{testimonial.content}"
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Contact Banner */}
            <div className="mt-20">
                <ContactBanner />
            </div>

            {/* Quote Request Modal */}
            <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
                <div className="p-6">
                    <h2 className="text-2xl font-light mb-6">Demande de devis - {selectedQuoteProject?.title}</h2>
                    <p className="mb-6 text-gray-600">
                        Vous êtes intéressé par un projet similaire à notre réalisation "{selectedQuoteProject?.title}" à {selectedQuoteProject?.location}.
                        Décrivez-nous vos besoins et nous vous contacterons rapidement avec une proposition détaillée.
                    </p>
                    <QuoteRequestForm
                        service={selectedQuoteProject?.category}
                        onClose={() => setIsQuoteModalOpen(false)}
                    />
                </div>
            </Modal>
        </motion.main>
    )
} 