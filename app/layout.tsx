import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito, Quicksand } from 'next/font/google'
import { ScrollToTop } from '@/components/scroll-to-top'
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
  openGraph: {
    title: 'Mầm Sáng Tạo — Xưởng sáng tạo an toàn cho trẻ 6–12 tuổi',
    description:
      'Nơi trẻ vẽ tranh, kể chuyện và làm quen với lập trình — bằng trí tưởng tượng của chính mình.',
    type: 'website',
    locale: 'vi_VN',
    images: [{ url: '/brand/banner.png', width: 1024, height: 1024, alt: 'Mầm Sáng Tạo' }],
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fbf7ef' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1521' },
  ],
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
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased font-body">
        {children}
        <ScrollToTop />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
