import React from 'react'
import { theme } from '@/styles/theme'

export default function Loading() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 mb-4" style={{ borderColor: theme.colors.navy.dark }}></div>
                <p
                    className="text-lg font-light"
                    style={{ color: theme.colors.text.primary }}
                >
                    Chargement...
                </p>
            </div>
        </div>
    )
} 