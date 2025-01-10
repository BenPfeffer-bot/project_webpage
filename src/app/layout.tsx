import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navigation/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Pour L\'Intérieur - Rénovation et Architecture d\'Intérieur',
    description: 'Experts en rénovation, architecture d\'intérieur et décoration à Paris. Transformez votre espace avec notre équipe de professionnels qualifiés.',
    keywords: ['rénovation', 'architecture d\'intérieur', 'décoration', 'Paris', 'plâtrerie', 'peinture', 'maçonnerie'],
    authors: [{ name: 'Samson Attia' }],
    creator: 'Pour L\'Intérieur',
    publisher: 'Pour L\'Intérieur',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/icon.png', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-icon.png' },
        ],
    },
    manifest: '/manifest.json',
    themeColor: '#ffffff',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'Pour L\'Intérieur',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={inter.className}>
                <Navbar />
                {children}
            </body>
        </html>
    )
} 