import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ruleta de Recuerdos - H 💍 R',
  description: 'Interactive wedding raffle app - Una ruleta especial para nuestra boda',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="font-poppins">
      <body className="min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
