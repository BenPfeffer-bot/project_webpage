'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import FadeIn from '@/components/animations/FadeIn'
import ParallaxScroll from '@/components/animations/ParallaxScroll'
import ContactBanner from '@/components/layout/ContactBanner'
import { theme } from '@/styles/theme'

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

export default function QuiSommesNous() {
    const timelineRef = useRef(null)
    const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" })

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
                        alt="Pour L'intérieur"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
                <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center items-center text-center">
                    <motion.span
                        className="text-[#B5A642] text-base sm:text-xl md:text-2xl mb-4 font-light tracking-wider"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Notre Histoire
                    </motion.span>
                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-bold tracking-wide"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Qui Sommes-Nous
                    </motion.h1>
                </div>
            </section>

            {/* Company Description Section */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <FadeIn>
                    <div className="prose prose-lg max-w-none">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-gray-800 tracking-wide">POUR L'INTÉRIEUR</h2>
                        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-12">
                            <div>
                                <p className="text-base sm:text-xl leading-relaxed mb-8 text-gray-700">
                                    Bienvenue chez POUR L'INTÉRIEUR, entreprise spécialisée dans les travaux d'aménagement et de rénovation partielle ou totale d'appartements, de pavillons, de commerces et de bureaux.
                                </p>
                                <p className="text-base sm:text-xl leading-relaxed mb-8 text-gray-700">
                                    Nous vous proposons des solutions et des offres adaptées et sur mesure qui présentent de nombreux avantages :
                                </p>
                                <ul className="list-none space-y-6 mb-8">
                                    <li className="flex items-start space-x-4">
                                        <span className="text-[#B5A642] text-xl sm:text-2xl mt-1">•</span>
                                        <span className="text-sm sm:text-lg text-gray-700">Un interlocuteur unique, tant pour l'aspect technique que conceptuel</span>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <span className="text-[#B5A642] text-xl sm:text-2xl mt-1">•</span>
                                        <span className="text-sm sm:text-lg text-gray-700">Une écoute attentive et conseils personnalisés en fonction du lieu, de vos besoins, de vos goûts et de vos envies</span>
                                    </li>
                                    <li className="flex items-start space-x-4">
                                        <span className="text-[#B5A642] text-xl sm:text-2xl mt-1">•</span>
                                        <span className="text-sm sm:text-lg text-gray-700">Une expertise dans l'agencement d'intérieur et dans l'optimisation des espaces, des volumes et des surfaces, pour une meilleure circulation et un plus grand confort</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 p-8 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-xl sm:text-2xl font-light mb-6 text-gray-800">Nos Services</h3>
                                <div className="space-y-4">
                                    <p className="text-sm sm:text-lg text-gray-700 border-l-2 border-[#B5A642] pl-4">
                                        Nous assurons le conseil, la conception, la réalisation des plans, le suivi et le pilotage de vos travaux.
                                    </p>
                                    <p className="text-sm sm:text-lg text-gray-700 border-l-2 border-[#B5A642] pl-4">
                                        Nous vous proposons du Home Staging, pour faciliter la vente de vos biens immobiliers.
                                    </p>
                                    <p className="text-sm sm:text-lg text-gray-700 border-l-2 border-[#B5A642] pl-4">
                                        Nous intervenons sur Paris, l'Ile de France et à l'étranger pour les particuliers et les professionnels.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* Founder Section */}
            <section className="max-w-7xl mx-auto px-4 mb-24">
                <FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                        <div className="relative aspect-[3/4] w-full">
                            <Image
                                src="/Portrait Samson.JPG"
                                alt="Samson Attia"
                                fill
                                className="object-cover rounded-xl shadow-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-xl" />
                        </div>
                        <div className="prose prose-lg max-w-none">
                            <h2 className="text-3xl sm:text-4xl font-extralight mb-8 text-gray-800 tracking-wide">Samson Attia</h2>
                            <div className="space-y-8">
                                <p className="text-base sm:text-xl leading-relaxed text-gray-700">
                                    Samson Attia est un professionnel expérimenté dans la gestion de projets techniques et le développement commercial, avec une expertise particulière dans les domaines des courants forts et faibles, ainsi que dans l'urbanisation de Data Centers.
                                </p>
                                <p className="text-base sm:text-xl leading-relaxed text-gray-700">
                                    Avec plus de 30 ans d'expérience, il a développé une expertise pointue en prospection de nouvelles affaires, en réponse aux appels d'offres et en soutenance de propositions. Au fil de sa carrière, Samson a su organiser et gérer des équipes de techniciens et d'ingénieurs, tout en pilotant des projets multi-techniques de grande envergure.
                                </p>
                                <p className="text-base sm:text-xl leading-relaxed text-gray-700">
                                    Il a également mis en place des procédures administratives et qualitatives, assurant ainsi un suivi rigoureux des projets et de la politique commerciale en cohérence avec la stratégie des entreprises pour lesquelles il a travaillé. Il incarne l'esprit entrepreneurial, alliant une solide expérience technique à une vision stratégique, pour mener à bien des projets de rénovation ambitieux.
                                </p>
                                <p className="text-base sm:text-xl leading-relaxed text-gray-700">
                                    Après avoir occupé plusieurs postes de direction au sein de grandes entreprises, Samson a décidé de donner une nouvelle orientation à sa carrière en se lançant dans l'entrepreneuriat. Fort de son expérience, il a fondé sa propre entreprise, POUR L'INTÉRIEUR, où il met à profit ses compétences pour offrir des services de rénovation globale. Dans ce rôle, il s'occupe non seulement de la gestion des projets, mais aussi de l'ensemble des aspects techniques, administratifs et financiers, garantissant la qualité et la satisfaction de ses clients.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Statistics Boxes */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1.2 }}
                            >
                                <span className="text-white text-2xl font-light">30+</span>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-light mb-3 text-gray-800">Années d'Expérience</h3>
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Dans la gestion de projets techniques</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1.2 }}
                            >
                                <span className="text-white text-2xl font-light">100+</span>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-light mb-3 text-gray-800">Projets Réalisés</h3>
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Rénovations et aménagements</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1.2 }}
                            >
                                <span className="text-white text-3xl">★</span>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-light mb-3 text-gray-800">Excellence</h3>
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Qualité et satisfaction client</p>
                        </motion.div>

                        <motion.div
                            className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100 relative overflow-hidden group"
                            whileHover={{
                                scale: 1.03,
                                boxShadow: "0 25px 35px -5px rgba(0, 0, 0, 0.1), 0 10px 15px -5px rgba(0, 0, 0, 0.05)"
                            }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#B5A642] to-[#B5A642]/60" />
                            <motion.div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-[#B5A642] to-[#B5A642]/80 group-hover:shadow-lg transform group-hover:-translate-y-1 transition-all duration-300"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 1.2 }}
                            >
                                <span className="text-white text-3xl">∞</span>
                            </motion.div>
                            <h3 className="text-xl sm:text-2xl font-light mb-3 text-gray-800">Vision</h3>
                            <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Innovation continue</p>
                        </motion.div>
                    </div>
                </FadeIn>
            </section>

            <ContactBanner />
        </motion.main>
    )
}