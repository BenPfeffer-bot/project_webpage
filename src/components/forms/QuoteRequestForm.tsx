'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { theme } from '@/styles/theme'
import Button from '@/components/ui/Button'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface QuoteRequestFormProps {
    onClose: () => void
    service?: string
}

export default function QuoteRequestForm({ onClose, service }: QuoteRequestFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string | null;
    }>({ type: null, message: null })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormStatus({ type: null, message: null })

        const formData = new FormData(e.currentTarget)
        const data = {
            name: `${formData.get('firstName')} ${formData.get('lastName')}`,
            email: formData.get('email'),
            phone: formData.get('phone'),
            location: formData.get('location'),
            request: formData.get('request'),
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
            setTimeout(onClose, 2000) // Close after showing success message
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
        <div className="max-w-3xl mx-auto w-full p-6 sm:p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-light">
                    Demande de devis{service ? ` - ${service}` : ''}
                </h2>
            </div>

            {formStatus.type && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-8 p-4 rounded-lg ${formStatus.type === 'success'
                        ? 'bg-green-50 text-green-600'
                        : 'bg-red-50 text-red-600'
                        }`}
                >
                    {formStatus.message}
                </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <motion.input
                        type="text"
                        name="firstName"
                        placeholder="Prénom"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                        whileFocus={{ scale: 1.01 }}
                        disabled={isSubmitting}
                    />
                    <motion.input
                        type="text"
                        name="lastName"
                        placeholder="Nom"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                        whileFocus={{ scale: 1.01 }}
                        disabled={isSubmitting}
                    />
                </div>
                <motion.input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    whileFocus={{ scale: 1.01 }}
                    disabled={isSubmitting}
                />
                <motion.input
                    type="tel"
                    name="phone"
                    placeholder="Téléphone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    whileFocus={{ scale: 1.01 }}
                    disabled={isSubmitting}
                />
                <motion.input
                    type="text"
                    name="location"
                    placeholder="Localisation"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100"
                    whileFocus={{ scale: 1.01 }}
                    disabled={isSubmitting}
                />
                <motion.textarea
                    name="request"
                    placeholder="Décrivez votre projet"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent disabled:bg-gray-100 resize-none"
                    whileFocus={{ scale: 1.01 }}
                    disabled={isSubmitting}
                    defaultValue={service ? `Je souhaite un devis pour ${service}` : ''}
                />
                <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="w-full sm:w-auto order-2 sm:order-1"
                    >
                        Annuler
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto order-1 sm:order-2 hover:bg-[#B5A642] hover:border-[#B5A642] transition-colors duration-300"
                    >
                        {isSubmitting ? 'Envoi en cours...' : 'Envoyer'}
                    </Button>
                </div>
            </form>
        </div>
    )
} 