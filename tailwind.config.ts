import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            colors: {
                'primary': '#000000',
                'secondary': '#4A4A4A',
                'accent': '#D4AF37',
            },
            screens: {
                '2xl': '1536px',
                '3xl': '1920px',
                '4xl': '2560px',
                'ultrawide': '3440px',
            },
            maxWidth: {
                '8xl': '88rem',
                '9xl': '96rem',
                '10xl': '104rem',
            },
        },
    },
    plugins: [],
}

export default config 