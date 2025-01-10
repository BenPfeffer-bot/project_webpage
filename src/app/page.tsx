'use client'
import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import FadeIn from '@/components/animations/FadeIn'
import ParallaxScroll from '@/components/animations/ParallaxScroll'
import Button from '@/components/ui/Button'
import ContactBanner from '@/components/layout/ContactBanner'
import { SpeedInsights } from "@vercel/speed-insights/next"
const services = [
    {
        title: 'Rénovation Complète',
        description: 'Transformation totale de votre espace avec une attention particulière aux détails et à la qualité.',
        image: '/renov_1.jpeg',
        features: ['Démolition', 'Reconstruction', 'Finitions', 'Décoration']
    },
    {
        title: 'Architecture d\'Intérieur',
        description: 'Conception et optimisation de vos espaces pour un agencement parfait et fonctionnel.',
        image: '/renov_2.jpeg',
        features: ['Plans 3D', 'Études techniques', 'Conseils matériaux', 'Suivi de projet']
    },
    {
        title: 'Décoration',
        description: 'Mise en valeur de vos espaces avec une sélection pointue de matériaux et de mobilier.',
        image: '/renov_3.JPG',
        features: ['Conseil couleurs', 'Mobilier', 'Éclairage', 'Accessoires']
    },
    {
        title: 'Plâtrerie',
        description: 'Travaux de plâtrerie traditionnelle et moderne pour des finitions impeccables.',
        image: '/renov_4.JPG',
        features: ['Moulures', 'Corniches', 'Plafonds', 'Enduits']
    },
    {
        title: 'Peinture',
        description: 'Application experte de peintures et revêtements pour sublimer vos murs.',
        image: '/renov_5.jpeg',
        features: ['Peinture décorative', 'Enduits', 'Papiers peints', 'Patines']
    },
    {
        title: 'Maçonnerie',
        description: 'Travaux de structure et de maçonnerie pour transformer vos espaces.',
        image: '/renov_6.jpeg',
        features: ['Ouvertures', 'Cloisons', 'Reprises', 'Consolidation']
    }
]

const processSteps = [
    {
        number: '01',
        title: 'Premier Contact',
        description: 'Discussion initiale pour comprendre vos besoins et vos envies.'
    },
    {
        number: '02',
        title: 'Visite & Devis',
        description: 'Visite sur place et établissement d\'un devis détaillé.'
    },
    {
        number: '03',
        title: 'Conception',
        description: 'Élaboration des plans et visualisations 3D de votre projet.'
    },
    {
        number: '04',
        title: 'Réalisation',
        description: 'Exécution des travaux avec un suivi rigoureux.'
    }
]

export default function Home() {
    const [width, setWidth] = React.useState(0)
    const [isDragging, setIsDragging] = React.useState(false)
    const carousel = useRef<HTMLDivElement>(null)
    const [showLanding, setShowLanding] = useState(true)
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null })

    useEffect(() => {
        if (carousel.current) {
            setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth)
        }
    }, [])

    const handleServiceClick = (service: string) => {
        router.push(`/services?type=${encodeURIComponent(service)}`)
    }

    // Auto-scroll animation
    const [position, setPosition] = React.useState(0)

    useEffect(() => {
        let interval: NodeJS.Timeout

        if (!isDragging) {
            interval = setInterval(() => {
                setPosition((prev) => {
                    const newPosition = prev - 1
                    // Reset position when reaching the end
                    if (-newPosition >= width) {
                        return 0
                    }
                    return newPosition
                })
            }, 30) // Adjust speed here (lower number = faster)
        }

        return () => clearInterval(interval)
    }, [width, isDragging])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormStatus({ type: null, message: null })

        const formData = new FormData(e.currentTarget)
        const data = {
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email'),
            phone: formData.get('phone'),
            request: formData.get('message'),
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const responseData = await response.json()

            if (!response.ok) {
                throw new Error(responseData.error || 'Une erreur est survenue')
            }

            // Clear form
            e.currentTarget.reset()
            setFormStatus({
                type: 'success',
                message: 'Message envoyé avec succès !'
            })
        } catch (error) {
            setFormStatus({
                type: 'error',
                message: error instanceof Error ? error.message : 'Une erreur est survenue. Veuillez réessayer.'
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <>
            <main className="min-h-screen">
                {/* Hero Section */}
                <section className="relative h-screen">
                    <div className="absolute inset-0">
                        <Image
                            src="/building.JPG"
                            alt="Interior Design"
                            fill
                            className="object-cover"
                            priority
                        />
                        <motion.div
                            className="absolute inset-0 bg-black/40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5 }}
                        />
                    </div>
                    <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
                        <FadeIn>
                            <h1 className="text-5xl sm:text-6xl md:text-7xl font-light mb-6 text-center">
                                Pour L'Intérieur
                            </h1>
                            <p className="text-xl sm:text-2xl md:text-3xl mb-12 text-center max-w-3xl mx-auto">
                                Experts en rénovation et architecture d'intérieur à Paris
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Button
                                    onClick={() => router.push('/services')}
                                    variant="primary"
                                >
                                    Découvrir nos services
                                </Button>
                                <Button
                                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                                    variant="outline"
                                >
                                    Nous contacter
                                </Button>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Introduction Section */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <FadeIn>
                                <div>
                                    <h2 className="text-4xl font-light mb-6">Une Expertise Reconnue</h2>
                                    <p className="text-xl text-gray-600 mb-8">
                                        Spécialistes de la rénovation et de l'aménagement d'intérieur à Paris
                                        et en Île-de-France, nous transformons vos espaces en lieux de vie exceptionnels.
                                    </p>
                                    <Button href="/qui-sommes-nous" variant="outline">
                                        En savoir plus
                                        <span className="ml-2">→</span>
                                    </Button>
                                </div>
                            </FadeIn>
                            <div className="grid grid-cols-2 gap-4">
                                <ParallaxScroll offset={20}>
                                    <div className="relative h-[300px]">
                                        <Image
                                            src="/moulure.jpeg"
                                            alt="Interior Design"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </ParallaxScroll>
                                <ParallaxScroll offset={40}>
                                    <div className="relative h-[300px] mt-8">
                                        <Image
                                            src="/peinture.jpeg"
                                            alt="Interior Design"
                                            fill
                                            className="object-cover rounded-lg"
                                        />
                                    </div>
                                </ParallaxScroll>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="py-20 bg-gray-50 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4">
                        <FadeIn>
                            <h2 className="text-4xl font-light mb-16 text-center">Nos Services</h2>
                        </FadeIn>

                        {/* Services Slider */}
                        <div className="relative" ref={carousel}>
                            <motion.div
                                className="flex gap-8 cursor-grab active:cursor-grabbing"
                                drag="x"
                                dragConstraints={{ left: -width, right: 0 }}
                                dragElastic={0.1}
                                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                                style={{ x: position }}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={() => {
                                    setIsDragging(false)
                                    // Reset position if dragged too far
                                    if (-position >= width) {
                                        setPosition(0)
                                    }
                                }}
                            >
                                {/* First set of services */}
                                {services.map((service, index) => (
                                    <motion.div
                                        key={`first-${index}`}
                                        className="relative flex-shrink-0 w-[400px]"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="bg-white p-8 rounded-lg shadow-sm h-full">
                                            <motion.div
                                                className="relative h-64 mb-6 rounded-lg overflow-hidden"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <h3 className="text-2xl font-light text-white">{service.title}</h3>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <p className="text-gray-600 mb-6">{service.description}</p>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                                {/* Second set of services for infinite scroll */}
                                {services.map((service, index) => (
                                    <motion.div
                                        key={`second-${index}`}
                                        className="relative flex-shrink-0 w-[400px]"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="bg-white p-8 rounded-lg shadow-sm h-full">
                                            <motion.div
                                                className="relative h-64 mb-6 rounded-lg overflow-hidden"
                                                whileHover={{ scale: 1.05 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <Image
                                                    src={service.image}
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <h3 className="text-2xl font-light text-white">{service.title}</h3>
                                                    </div>
                                                </div>
                                            </motion.div>
                                            <p className="text-gray-600 mb-6">{service.description}</p>
                                            <ul className="space-y-2">
                                                {service.features.map((feature, idx) => (
                                                    <li key={idx} className="flex items-center gap-2 text-gray-600">
                                                        <span className="w-1.5 h-1.5 bg-black rounded-full"></span>
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Progress Indicator */}
                            <div className="absolute left-0 right-0 bottom-0 flex justify-center gap-2 mt-8">
                                <motion.div
                                    className="w-16 h-1 bg-black/10 rounded-full overflow-hidden"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <motion.div
                                        className="w-full h-full bg-black"
                                        style={{
                                            scaleX: -position / width,
                                            transformOrigin: "left"
                                        }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section with Team Image */}
                <section className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="mb-20">
                            <FadeIn>
                                <div className="relative h-[400px] rounded-lg overflow-hidden">
                                    <Image
                                        src="/samson_team .jpeg"
                                        alt="Notre équipe"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                        <FadeIn>
                            <h2 className="text-4xl font-light mb-16 text-center">Notre Processus</h2>
                        </FadeIn>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step, index) => (
                                <FadeIn key={index} delay={index * 0.2}>
                                    <div className="relative">
                                        <motion.div
                                            className="text-6xl font-light text-gray-200 mb-4"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.2 }}
                                        >
                                            {step.number}
                                        </motion.div>
                                        <h3 className="text-2xl font-light mb-4">{step.title}</h3>
                                        <p className="text-gray-600">{step.description}</p>
                                        {index < processSteps.length - 1 && (
                                            <div className="hidden lg:block absolute top-8 right-0 w-full h-0.5 bg-gray-200 -z-10"></div>
                                        )}
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recent Projects Preview */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
                            <FadeIn>
                                <div>
                                    <h2 className="text-4xl font-light mb-4">Projets Récents</h2>
                                    <p className="text-xl text-gray-600">Découvrez nos dernières réalisations</p>
                                </div>
                            </FadeIn>
                            <FadeIn direction="left">
                                <Button href="/realisations" variant="outline" className="whitespace-nowrap">
                                    Voir tous les projets
                                    <span className="ml-2">→</span>
                                </Button>
                            </FadeIn>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <FadeIn delay={0.1}>
                                <motion.div
                                    className="relative h-[400px] group"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src="/renov_7.jpg"
                                        alt="Project 1"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                        <Button
                                            onClick={() => handleServiceClick(services[0].title)}
                                            variant="primary"
                                        >
                                            En savoir plus
                                        </Button>
                                    </div>
                                </motion.div>
                            </FadeIn>
                            <FadeIn delay={0.2}>
                                <motion.div
                                    className="relative h-[400px] group"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src="/renov_8.jpg"
                                        alt="Project 2"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                        <Button
                                            onClick={() => handleServiceClick(services[1].title)}
                                            variant="primary"
                                        >
                                            En savoir plus
                                        </Button>
                                    </div>
                                </motion.div>
                            </FadeIn>
                            <FadeIn delay={0.3}>
                                <motion.div
                                    className="relative h-[400px] group"
                                    whileHover={{ y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Image
                                        src="/ladder_renov.JPG"
                                        alt="Project 3"
                                        fill
                                        className="object-cover rounded-lg"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                                        <Button
                                            onClick={() => handleServiceClick(services[5].title)}
                                            variant="primary"
                                        >
                                            En savoir plus
                                        </Button>
                                    </div>
                                </motion.div>
                            </FadeIn>
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" className="py-20 bg-white">
                    <div className="max-w-4xl mx-auto px-4">
                        <FadeIn>
                            <h2 className="text-4xl font-light mb-6 text-center">Contactez-nous</h2>
                            <p className="text-xl text-gray-600 mb-12 text-center">
                                Parlons de votre projet et transformons vos idées en réalité
                            </p>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            {formStatus.type && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`mb-6 p-4 rounded-lg ${formStatus.type === 'success'
                                        ? 'bg-green-50 text-green-600'
                                        : 'bg-red-50 text-red-600'
                                        }`}
                                >
                                    {formStatus.message}
                                </motion.div>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <motion.input
                                        type="text"
                                        name="firstName"
                                        placeholder="Prénom"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                                        whileFocus={{ scale: 1.01 }}
                                        disabled={isSubmitting}
                                    />
                                    <motion.input
                                        type="text"
                                        name="lastName"
                                        placeholder="Nom"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                                        whileFocus={{ scale: 1.01 }}
                                        disabled={isSubmitting}
                                    />
                                </div>
                                <motion.input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                                    whileFocus={{ scale: 1.01 }}
                                    disabled={isSubmitting}
                                />
                                <motion.input
                                    type="tel"
                                    name="phone"
                                    placeholder="Téléphone"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                                    whileFocus={{ scale: 1.01 }}
                                    disabled={isSubmitting}
                                />
                                <motion.textarea
                                    name="message"
                                    placeholder="Votre message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black disabled:bg-gray-100"
                                    whileFocus={{ scale: 1.01 }}
                                    disabled={isSubmitting}
                                />
                                <Button
                                    type="submit"
                                    variant="primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                                </Button>
                            </form>
                        </FadeIn>
                    </div>
                </section>

                {/* Contact Banner */}
                <ContactBanner />
            </main>
        </>
    )
} 