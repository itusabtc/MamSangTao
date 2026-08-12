import type { Metadata, Viewport } from 'next'
import { Nunito, Quicksand } from 'next/font/google'
import { ScrollToTop } from '@/components/scroll-to-top'
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site'
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mầm Sáng Tạo — Vẽ, kể chuyện và học lập trình cho trẻ',
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: ['vẽ tranh cho trẻ em', 'tạo truyện cho bé', 'lập trình trẻ em', 'khóa học cờ vua cho bé', 'khóa học âm nhạc trẻ em', 'hoạt động sáng tạo cho bé'],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  openGraph: {
    title: 'Mầm Sáng Tạo — Mọi ý tưởng nhỏ đều có thể nở hoa',
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: SITE_NAME,
    images: [{ url: '/og.png', width: 1792, height: 896, alt: 'Mầm Sáng Tạo — Mọi ý tưởng nhỏ đều có thể nở hoa' }],
  },
  twitter: { card: 'summary_large_image', title: SITE_NAME, description: SITE_DESCRIPTION, images: ['/og.png'] },
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
      </body>
    </html>
  )
}
