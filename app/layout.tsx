import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito, Quicksand } from 'next/font/google'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '600', '700', '800', '900'],
  variable: '--font-body',
  display: 'swap',
})

const quicksand = Quicksand({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mầm Sáng Tạo — Xưởng sáng tạo an toàn cho trẻ 6–12 tuổi',
  description:
    'Nơi trẻ vẽ tranh, kể chuyện và làm quen với lập trình — bằng trí tưởng tượng của chính mình. Không quảng cáo, không mạng xã hội.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#fbf7ef',
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="vi"
      className={`${nunito.variable} ${quicksand.variable} bg-cream`}
    >
      <body className="antialiased font-body">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
