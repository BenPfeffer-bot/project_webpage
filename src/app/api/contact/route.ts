import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { name, email, phone, location, request: message, type } = body

        // Validate required fields
        if (!email || !message) {
            return NextResponse.json(
                { error: 'Email and message are required' },
                { status: 400 }
            )
        }

        // Create email content
        const mailOptions = {
            from: process.env.SMTP_USER,
            to: process.env.CONTACT_EMAIL || 'contact@pourlinterieur.fr',
            subject: `Nouvelle demande de contact${type ? ` - ${type}` : ''}`,
            html: `
                <h2>Nouvelle demande de contact</h2>
                <p><strong>Nom:</strong> ${name || 'Non spécifié'}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Téléphone:</strong> ${phone || 'Non spécifié'}</p>
                <p><strong>Localisation:</strong> ${location || 'Non spécifiée'}</p>
                ${type ? `<p><strong>Type de demande:</strong> ${type}</p>` : ''}
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        }

        // Send email
        await transporter.sendMail(mailOptions)

        return NextResponse.json(
            { message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
} 