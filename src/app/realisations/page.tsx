'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import ContactBanner from '@/components/layout/ContactBanner'
import { theme } from '@/styles/theme'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

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

export default function Realisations() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [selectedProject, setSelectedProject] = useState<number | null>(null)
    const projectsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(projectsRef, { once: true, margin: "-10%" })
    const router = useRouter()

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

    const handleQuoteRequest = (projectType: string) => {
        router.push(`/contact?type=${projectType}`)
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
                                                onClick={() => handleQuoteRequest(project.category)}
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

            {/* Contact Banner */}
            <div className="mt-20">
                <ContactBanner />
            </div>
        </motion.main>
    )
} 