import React from 'react'
import Link from 'next/link'
import { theme } from '@/styles/theme'
import Button from '@/components/ui/Button'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <h1
                    className="text-6xl sm:text-7xl font-light mb-4"
                    style={{ color: theme.colors.text.primary }}
                >
                    404
                </h1>
                <h2
                    className="text-2xl sm:text-3xl font-light mb-6"
                    style={{ color: theme.colors.text.primary }}
                >
                    Page Non Trouvée
                </h2>
                <p
                    className="text-lg mb-8 max-w-md mx-auto"
                    style={{ color: theme.colors.text.secondary }}
                >
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link href="/">
                    <Button variant="primary">
                        Retour à l'accueil
                    </Button>
                </Link>
            </div>
        </div>
    )
} 