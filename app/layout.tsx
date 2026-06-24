import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Fredoka, Nunito } from 'next/font/google'
import './globals.css'

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Free Instagram Comment Picker & Giveaway Tool | CommentPickers',
  description:
    'CommentPickers picks a random winner from Instagram comments in seconds. Built for giveaways, contests, raffles and sweepstakes.',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '48x48',
        type: 'image/x-icon',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon.png',
        sizes: '96x96',
        type: 'image/png',
      },
    ],
    apple: {
      url: '/apple-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ff4d9d',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
