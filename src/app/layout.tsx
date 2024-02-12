import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import 'remixicon/fonts/remixicon.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'League of Memory',
    description: 'Memory game on the theme of league of legends',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
