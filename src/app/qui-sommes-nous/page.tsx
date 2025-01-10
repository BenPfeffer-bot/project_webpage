'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import ParallaxScroll from '@/components/animations/ParallaxScroll'
import ContactBanner from '@/components/layout/ContactBanner'
import { theme } from '@/styles/theme'

export default function QuiSommesNous() {
    return (
        <motion.main
            className="pt-24 pb-0"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {/* Hero Section */}
            <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] mb-12 sm:mb-16 md:mb-20">
                <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image
                        src="/team.JPG"
                        alt="Notre équipe"
                        fill
                        className="object-cover object-center"
                        priority
                        sizes="(max-width: 640px) 100vw,
                               (max-width: 768px) 100vw,
                               100vw"
                        quality={90}
                    />
                    <div className="absolute inset-0" style={{ backgroundColor: theme.colors.overlay.dark }} />
                </motion.div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6 md:px-8">
                    <motion.h1
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight tracking-wide mb-4 sm:mb-6 md:mb-8 text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                    >
                        Notre Histoire
                    </motion.h1>
                    <motion.p
                        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light tracking-wide mb-4 sm:mb-6 md:mb-8 text-center max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                    >
                        Une passion pour l'excellence dans la rénovation
                    </motion.p>
                </div>
            </section>

            {/* Director Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-20 sm:mb-24 md:mb-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start">
                    <FadeIn>
                        <motion.div
                            className="sticky top-32 w-full"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative h-[500px] sm:h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-lg" style={{ boxShadow: theme.shadows.lg }}>
                                <Image
                                    src="/Portrait Samson.JPG"
                                    alt="Portrait de Samson"
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 640px) 100vw,
                                           (max-width: 1024px) 100vw,
                                           50vw"
                                    quality={90}
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 0.6 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        background: `linear-gradient(to top, ${theme.colors.overlay.dark}, transparent 50%)`
                                    }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.h2
                                            className="text-3xl font-light text-white mb-2"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Samson Attia
                                        </motion.h2>
                                        <motion.p
                                            className="text-xl text-white/90"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            Fondateur & Directeur
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </FadeIn>
                    <div className="space-y-8">
                        <FadeIn delay={0.2}>
                            <div className="space-y-6">
                                <motion.h2
                                    className="text-4xl font-light"
                                    style={{ color: theme.colors.text.primary }}
                                    whileHover={{ x: 10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Notre Vision
                                </motion.h2>
                                <motion.div
                                    className="space-y-6 text-lg leading-relaxed"
                                    style={{ color: theme.colors.text.secondary }}
                                >
                                    <p>
                                        Samson Attia est un professionnel expérimenté dans la gestion de projets techniques et le développement commercial, avec une expertise particulière dans les domaines des courants forts et faibles, ainsi que dans l'urbanisation de Data Centers.
                                    </p>
                                    <p>
                                        Son parcours professionnel s'étend sur plus de trois décennies, au cours desquelles il a occupé des postes de direction et de gestion dans plusieurs entreprises renommées. Avec plus de 30 ans d'expérience, il a développé une expertise pointue en prospection de nouvelles affaires, en réponse aux appels d'offres et en soutenance de propositions.
                                    </p>
                                    <p>
                                        Au fil de sa carrière, Samson a su organiser et gérer des équipes de techniciens et d'ingénieurs, tout en pilotant des projets multi-techniques de grande envergure. Il a également mis en place des procédures administratives et qualitatives, assurant ainsi un suivi rigoureux des projets et de la politique commerciale en cohérence avec la stratégie des entreprises pour lesquelles il a travaillé.
                                    </p>
                                    <p>
                                        Après avoir occupé plusieurs postes de direction au sein de grandes entreprises, Samson a décidé de donner une nouvelle orientation à sa carrière en se lançant dans l'entrepreneuriat. Fort de son expérience, il a fondé sa propre entreprise, POUR L'INTERIEUR, où il met à profit ses compétences pour offrir des services de rénovation globale.
                                    </p>
                                    <p>
                                        Dans ce rôle, il s'occupe non seulement de la gestion des projets, mais aussi de l'ensemble des aspects techniques, administratifs et financiers, garantissant la qualité et la satisfaction de ses clients.
                                    </p>
                                </motion.div>
                            </div>
                            <div className="grid grid-cols-2 gap-8 mt-12">
                                <motion.div
                                    className="bg-white p-6 rounded-lg"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        boxShadow: theme.shadows.sm,
                                        backgroundColor: theme.colors.background.secondary
                                    }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.8 }}
                                        style={{ backgroundColor: theme.colors.navy.darkest }}
                                    >
                                        <span className="text-white text-xl">30</span>
                                    </motion.div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: theme.colors.text.primary }}>Années d'Expérience</h3>
                                    <p style={{ color: theme.colors.text.secondary }}>Dans la gestion de projets techniques</p>
                                </motion.div>
                                <motion.div
                                    className="bg-white p-6 rounded-lg"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        boxShadow: theme.shadows.sm,
                                        backgroundColor: theme.colors.background.secondary
                                    }}
                                >
                                    <motion.div
                                        className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                                        whileHover={{ rotate: 360 }}
                                        transition={{ duration: 0.8 }}
                                        style={{ backgroundColor: theme.colors.navy.darkest }}
                                    >
                                        <span className="text-white text-xl">∞</span>
                                    </motion.div>
                                    <h3 className="text-xl font-light mb-2" style={{ color: theme.colors.text.primary }}>Vision</h3>
                                    <p style={{ color: theme.colors.text.secondary }}>Excellence et innovation continue</p>
                                </motion.div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="bg-gray-50 py-20" style={{ backgroundColor: theme.colors.background.secondary }}>
                <div className="max-w-7xl mx-auto px-4">
                    <FadeIn>
                        <motion.h2
                            className="text-4xl font-light mb-16 text-center"
                            style={{ color: theme.colors.text.primary }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            Notre Équipe
                        </motion.h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                        <FadeIn>
                            <motion.div
                                className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.5 }}
                                style={{ boxShadow: theme.shadows.lg }}
                            >
                                <Image
                                    src="/renov_4.JPG"
                                    alt="L'équipe au travail"
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 100vw,
                                           50vw"
                                    quality={85}
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 0.6 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        background: `linear-gradient(to top, ${theme.colors.overlay.dark}, transparent 50%)`
                                    }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.h3
                                            className="text-2xl font-light text-white mb-2"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Expertise
                                        </motion.h3>
                                        <motion.p
                                            className="text-white/90"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            Une équipe qualifiée à votre service
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <motion.div
                                className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
                                whileHover={{ scale: 1.03 }}
                                transition={{ duration: 0.5 }}
                                style={{ boxShadow: theme.shadows.lg }}
                            >
                                <Image
                                    src="/renov_5.jpeg"
                                    alt="L'équipe en action"
                                    fill
                                    className="object-cover object-center"
                                    sizes="(max-width: 1024px) 100vw,
                                           50vw"
                                    quality={85}
                                />
                                <motion.div
                                    className="absolute inset-0"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 0.6 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        background: `linear-gradient(to top, ${theme.colors.overlay.dark}, transparent 50%)`
                                    }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <motion.h3
                                            className="text-2xl font-light text-white mb-2"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            Passion
                                        </motion.h3>
                                        <motion.p
                                            className="text-white/90"
                                            whileHover={{ x: 10 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                        >
                                            Un engagement quotidien pour l'excellence
                                        </motion.p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </FadeIn>
                    </div>
                    <FadeIn>
                        <motion.div
                            className="text-center max-w-3xl mx-auto"
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-xl leading-relaxed" style={{ color: theme.colors.text.secondary }}>
                                Notre équipe de professionnels qualifiés partage la même passion pour l'excellence
                                et le souci du détail. Ensemble, nous mettons notre expertise au service de vos projets
                                pour créer des espaces qui vous ressemblent.
                            </p>
                        </motion.div>
                    </FadeIn>
                </div>
            </section>

            {/* Contact Banner */}
            <ContactBanner />
        </motion.main>
    )
} 