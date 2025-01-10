'use client'
import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
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
        tags: ['Peinture', 'Plâtrerie', 'Rénovation']
    },
    {
        title: 'Travaux de Peinture',
        location: 'Paris 12ème',
        year: '2023',
        category: 'Peinture',
        description: 'Travaux de peinture et finitions soignées.',
        image: '/project_2.jpg',
        tags: ['Peinture', 'Finition']
    },
    {
        title: 'Rénovation Plafond',
        location: 'Paris 8ème',
        year: '2023',
        category: 'Plâtrerie',
        description: 'Rénovation complète du plafond avec isolation.',
        image: '/project_3.jpg',
        tags: ['Plâtrerie', 'Isolation']
    },
    {
        title: 'Chantier de Rénovation',
        location: 'Saint-Germain-en-Laye',
        year: '2023',
        category: 'Rénovation',
        description: 'Rénovation d\'un appartement avec travaux de maçonnerie.',
        image: '/project_4.jpg',
        tags: ['Maçonnerie', 'Rénovation']
    },
    {
        title: 'Travaux de Finition',
        location: 'Paris 16ème',
        year: '2023',
        category: 'Peinture',
        description: 'Travaux de peinture et finitions haut de gamme.',
        image: '/project_5.jpg',
        tags: ['Peinture', 'Finition']
    },
    {
        title: 'Rénovation Structurelle',
        location: 'Neuilly-sur-Seine',
        year: '2023',
        category: 'Maçonnerie',
        description: 'Travaux de maçonnerie et restructuration.',
        image: '/project_6.jpg',
        tags: ['Maçonnerie', 'Structure']
    }
]

export default function Realisations() {
    const [selectedCategory, setSelectedCategory] = useState('Tous')
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const { scrollYProgress } = useScroll({
        container: containerRef
    })

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    const filteredProjects = selectedCategory === 'Tous'
        ? projects
        : projects.filter(project => project.category === selectedCategory)

    const handleQuoteRequest = (projectType: string) => {
        router.push(`/contact?type=${projectType}`);
    };

    return (
        <main className="pt-24 pb-0">
            <div className="max-w-7xl mx-auto px-4 2xl:max-w-8xl 3xl:max-w-9xl 4xl:max-w-10xl ultrawide:px-8">
                <FadeIn>
                    <h1 className="text-5xl font-light mb-4 3xl:text-6xl 4xl:text-7xl">Nos Réalisations</h1>
                    <p className="text-xl text-gray-600 mb-12 3xl:text-2xl 4xl:text-3xl">
                        Découvrez nos projets d'aménagement et de rénovation
                    </p>
                </FadeIn>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {categories.map((category, index) => (
                        <motion.button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-6 py-2 rounded-full text-sm transition-colors ${selectedCategory === category
                                ? 'bg-black text-white'
                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            {category}
                        </motion.button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="relative">
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-8 2xl:gap-12 mb-20"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <FadeIn key={project.title} delay={index * 0.1}>
                                    <motion.div
                                        className="group relative cursor-pointer"
                                        onHoverStart={() => setHoveredIndex(index)}
                                        onHoverEnd={() => setHoveredIndex(null)}
                                        layout
                                    >
                                        <div className="relative h-[500px] 2xl:h-[600px] 3xl:h-[700px] 4xl:h-[800px] rounded-lg overflow-hidden shadow-lg">
                                            <Image
                                                src={project.image}
                                                alt={project.title}
                                                fill
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            {/* Sliding Information Bar */}
                                            <motion.div
                                                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={false}
                                            >
                                                <motion.div
                                                    className="p-8"
                                                    initial={{ y: 100, opacity: 0 }}
                                                    animate={hoveredIndex === index ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.div
                                                        initial={{ y: 20, opacity: 0 }}
                                                        whileHover={{ y: 0, opacity: 1 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >
                                                        <div className="flex justify-between items-center mb-4">
                                                            <h3 className="text-3xl font-light text-white">{project.title}</h3>
                                                            <span className="text-white/80">{project.year}</span>
                                                        </div>
                                                        <div className="flex justify-between mb-4">
                                                            <span className="text-white/80">{project.location}</span>
                                                            <span className="text-white/80">{project.category}</span>
                                                        </div>
                                                        <p className="text-white/90 mb-4 line-clamp-3">
                                                            {project.description} Nous avons réalisé une transformation complète
                                                            de l'espace en respectant l'architecture existante tout en apportant
                                                            une touche de modernité.
                                                        </p>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/90"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <motion.button
                                                            className="mt-4 text-white/90 text-sm font-light flex items-center gap-2 hover:text-white"
                                                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                                                            whileHover={{ x: 5 }}
                                                            transition={{ duration: 0.2 }}
                                                        >
                                                            En savoir plus
                                                            <span className="text-lg">→</span>
                                                        </motion.button>
                                                    </motion.div>
                                                </motion.div>
                                            </motion.div>
                                        </div>

                                        {/* Expanded Project Details */}
                                        <AnimatePresence>
                                            {expandedIndex === index && (
                                                <motion.div
                                                    className="mt-6 bg-white rounded-lg p-8 shadow-lg"
                                                    style={{
                                                        backgroundColor: theme.colors.background.secondary,
                                                        boxShadow: theme.shadows.lg
                                                    }}
                                                    initial={{ opacity: 0, y: -20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <div className="prose max-w-none">
                                                        <h3 className="text-2xl font-light mb-4" style={{ color: theme.colors.text.primary }}>
                                                            Détails du Projet
                                                        </h3>
                                                        <p className="mb-6" style={{ color: theme.colors.text.secondary }}>
                                                            {project.description} Nous avons réalisé une transformation complète
                                                            de l'espace en respectant l'architecture existante tout en apportant
                                                            une touche de modernité. Les travaux ont inclus la rénovation des sols,
                                                            des murs, des plafonds ainsi que la mise aux normes des installations
                                                            électriques et de plomberie.
                                                        </p>
                                                        <div className="grid grid-cols-2 gap-8 mb-6">
                                                            <div>
                                                                <h4 className="text-lg font-light mb-2" style={{ color: theme.colors.text.primary }}>
                                                                    Localisation
                                                                </h4>
                                                                <p style={{ color: theme.colors.text.secondary }}>{project.location}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="text-lg font-light mb-2" style={{ color: theme.colors.text.primary }}>
                                                                    Type de Projet
                                                                </h4>
                                                                <p style={{ color: theme.colors.text.secondary }}>{project.category}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="px-3 py-1 rounded-full text-sm"
                                                                    style={{
                                                                        backgroundColor: theme.colors.background.primary,
                                                                        color: theme.colors.text.secondary
                                                                    }}
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <motion.button
                                                            className="mt-6 flex items-center gap-2 text-sm font-light"
                                                            onClick={() => setExpandedIndex(null)}
                                                            style={{ color: theme.colors.text.primary }}
                                                            whileHover={{ x: 5 }}
                                                        >
                                                            Voir moins
                                                            <span className="text-lg">↑</span>
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </FadeIn>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Process Showcase */}
                <div className="mt-32 mb-32">
                    <FadeIn>
                        <h2 className="text-4xl font-light mb-12 text-center 3xl:text-5xl 4xl:text-6xl">Notre Processus de Travail</h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-8 2xl:gap-12">
                        <FadeIn delay={0.1}>
                            <div className="relative h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src="/renov_1.jpeg"
                                    alt="Préparation"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                                    <div className="text-white">
                                        <h3 className="text-2xl font-light mb-2">Préparation</h3>
                                        <p className="text-gray-200">Protection et préparation minutieuse des surfaces</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <div className="relative h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src="/renov_3.JPG"
                                    alt="Exécution"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                                    <div className="text-white">
                                        <h3 className="text-2xl font-light mb-2">Exécution</h3>
                                        <p className="text-gray-200">Réalisation des travaux avec expertise</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                        <FadeIn delay={0.3}>
                            <div className="relative h-[400px] rounded-lg overflow-hidden">
                                <Image
                                    src="/renov_6.jpeg"
                                    alt="Finition"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-end p-6">
                                    <div className="text-white">
                                        <h3 className="text-2xl font-light mb-2">Finition</h3>
                                        <p className="text-gray-200">Attention particulière aux détails</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Contact CTA */}
            <section className="mt-32 py-20" style={{ backgroundColor: theme.colors.background.secondary }}>
                <div className="max-w-4xl mx-auto px-4 2xl:max-w-5xl 3xl:max-w-6xl text-center">
                    <FadeIn>
                        <h2 className="text-4xl font-light mb-6" style={{ color: theme.colors.text.primary }}>Prêt à Commencer ?</h2>
                        <p className="text-xl mb-12" style={{ color: theme.colors.text.secondary }}>
                            Contactez-nous pour discuter de votre projet et obtenir un devis personnalisé
                        </p>
                        <Button
                            onClick={() => handleQuoteRequest('general')}
                            variant="primary">
                            Nous Contacter
                        </Button>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Banner */}
            <ContactBanner />
        </main >
    )
} 