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
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

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
        image: '/renov_2.jpg',
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

const awards = [
    {
        title: 'Excellence en Rénovation',
        year: '2023',
        organization: 'Fédération Française du Bâtiment',
        icon: '🏆'
    },
    {
        title: 'Prix de l\'Innovation',
        year: '2022',
        organization: 'Salon de l\'Habitat',
        icon: '🌟'
    },
    {
        title: 'Certification Qualibat',
        year: '2023',
        organization: 'Qualibat',
        icon: '✓'
    },
    {
        title: 'Label RGE',
        year: '2023',
        organization: 'ADEME',
        icon: '🌿'
    }
]

const timeline = [
    {
        year: '2010',
        title: 'Création de l\'entreprise',
        description: 'Début de notre aventure dans la rénovation de luxe'
    },
    {
        year: '2015',
        title: 'Expansion des services',
        description: 'Intégration de nouveaux corps de métiers'
    },
    {
        year: '2018',
        title: 'Certification Qualibat',
        description: 'Reconnaissance de notre expertise'
    },
    {
        year: '2020',
        title: '100ème projet',
        description: 'Une étape importante dans notre croissance'
    },
    {
        year: '2023',
        title: 'Innovation durable',
        description: 'Adoption de pratiques éco-responsables'
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
    const timelineRef = useRef<HTMLDivElement>(null)
    const awardsRef = useRef<HTMLDivElement>(null)

    const isStatsInView = useInView(statsRef, { once: true, margin: "-10%" })
    const isProcessInView = useInView(processRef, { once: true, margin: "-10%" })
    const isTestimonialsInView = useInView(testimonialsRef, { once: true, margin: "-10%" })
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-10%" })
    const isAwardsInView = useInView(awardsRef, { once: true, margin: "-10%" })

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
            <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] mb-8 sm:mb-12 md:mb-16">
                <div className="absolute inset-0">
                    <Image
                        src="/project_1.jpg"
                        alt="Nos Réalisations"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
                        quality={90}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30" />
                </div>
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 sm:px-6 lg:px-8">
                    <FadeIn>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 sm:mb-4 md:mb-6 text-center">
                            Nos Réalisations
                        </h1>
                        <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-center max-w-[90%] sm:max-w-[80%] md:max-w-2xl lg:max-w-3xl mx-auto text-white/90">
                            Découvrez nos projets d'aménagement et de rénovation
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[#B5A642]/5 pattern-grid-lg opacity-30" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                    <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12 hide-scrollbar pb-4 sm:pb-0">
                        {statistics.map((stat) => (
                            <motion.div
                                key={stat.label}
                                className="relative bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300 flex-shrink-0 w-[280px] sm:w-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight mb-3 sm:mb-4 text-[#1B1B3A] tracking-wide">
                                    {stat.number}
                                </h3>
                                <p className="text-base sm:text-lg text-[#1B1B3A]/70">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Category Filter */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12 md:mb-16">
                <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100">
                    <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap sm:justify-center gap-3 sm:gap-4 hide-scrollbar">
                        {categories.map((category) => (
                            <motion.button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex-shrink-0 px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-xl text-base sm:text-lg transition-all duration-300 flex items-center space-x-2 ${selectedCategory === category
                                    ? 'bg-[#B5A642] text-white shadow-lg'
                                    : 'bg-gray-50 text-[#1B1B3A]/70 hover:bg-gray-100'
                                    }`}
                                whileHover={{ scale: selectedCategory === category ? 1.05 : 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {category === 'Tous' && <span className="text-lg sm:text-xl">🏠</span>}
                                {category === 'Rénovation' && <span className="text-lg sm:text-xl">🔨</span>}
                                {category === 'Peinture' && <span className="text-lg sm:text-xl">🎨</span>}
                                {category === 'Maçonnerie' && <span className="text-lg sm:text-xl">🧱</span>}
                                {category === 'Plâtrerie' && <span className="text-lg sm:text-xl">✨</span>}
                                <span>{category}</span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 md:mb-20 lg:mb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.title}
                            className="group relative bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="relative h-64 sm:h-72 md:h-80">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 p-4 sm:p-6 flex flex-col justify-end text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-light mb-2">{project.title}</h3>
                                    <p className="text-xs sm:text-sm md:text-base text-white/90 mb-3 sm:mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 sm:px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-xs sm:text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-xs sm:text-sm text-white/80">{project.location}</p>
                                            <p className="text-xs sm:text-sm text-white/60">{project.year}</p>
                                        </div>
                                        <Button
                                            onClick={() => handleQuoteRequest(project)}
                                            className="text-sm sm:text-base bg-[#B5A642] hover:bg-[#B5A642]/90 text-white"
                                        >
                                            En savoir plus
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Process Section */}
            <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 sm:mb-12 md:mb-16">
                        <motion.h2
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight mb-4 sm:mb-6 text-[#1B1B3A] tracking-wide"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            Notre Processus
                        </motion.h2>
                        <motion.p
                            className="text-base sm:text-lg md:text-xl text-[#1B1B3A]/70 max-w-xl sm:max-w-2xl mx-auto"
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            Une approche méthodique pour des résultats exceptionnels
                        </motion.p>
                    </div>

                    <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 hide-scrollbar pb-4 lg:pb-0">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.title}
                                className="relative bg-white rounded-xl shadow-lg overflow-hidden group border border-gray-100 flex-shrink-0 w-[300px] lg:w-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                                <div className="relative h-40 sm:h-48">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 25vw"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute top-4 left-4 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl flex items-center justify-center text-xl sm:text-2xl shadow-lg">
                                        {step.icon}
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <span className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs sm:text-sm text-white">
                                            Étape {index + 1}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4 sm:p-6">
                                    <h3 className="text-base sm:text-lg md:text-xl font-light mb-2 sm:mb-3 text-[#1B1B3A]">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm md:text-base text-[#1B1B3A]/70">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Modal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)}>
                <div className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-2xl sm:text-3xl font-light mb-4 sm:mb-6 text-[#1B1B3A]">
                        Demande de devis - {selectedQuoteProject?.title}
                    </h2>
                    <p className="text-base sm:text-lg text-[#1B1B3A]/70 mb-6">
                        Vous êtes intéressé par un projet similaire à notre réalisation "{selectedQuoteProject?.title}" à {selectedQuoteProject?.location}.
                        Décrivez-nous vos besoins et nous vous contacterons rapidement avec une proposition détaillée.
                    </p>
                    <QuoteRequestForm
                        service={selectedQuoteProject?.category}
                        onClose={() => setIsQuoteModalOpen(false)}
                    />
                </div>
            </Modal>

            <ContactBanner />
        </motion.main>
    )
}