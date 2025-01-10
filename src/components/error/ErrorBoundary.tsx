'use client'
import React from 'react'
import { theme } from '@/styles/theme'
import Button from '@/components/ui/Button'

export default function ErrorBoundary({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h2
                    className="text-3xl sm:text-4xl font-light mb-4"
                    style={{ color: theme.colors.text.primary }}
                >
                    Une erreur est survenue
                </h2>
                <p
                    className="text-lg mb-8"
                    style={{ color: theme.colors.text.secondary }}
                >
                    Nous nous excusons pour ce désagrément. Veuillez réessayer.
                </p>
                <Button
                    onClick={reset}
                    variant="primary"
                >
                    Réessayer
                </Button>
            </div>
        </div>
    )
} 