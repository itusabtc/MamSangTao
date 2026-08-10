import Link from 'next/link'
import { Sparkles } from 'lucide-react'

type SiteHeaderProps = {
  /** When true, shows homepage anchor nav. When false (tool pages), shows a single "back to tools" CTA. */
  variant?: 'home' | 'tool'
}

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-sm">
      <div className="wrap flex h-[86px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Mầm Sáng Tạo — về trang chủ">
          <Sparkles aria-hidden className="h-6 w-6 text-coral" strokeWidth={2.5} />

          <span className="font-display text-xl font-bold text-blue">
            Mầm Sáng Tạo
          </span>
        </Link>

        {variant === 'home' ? (
          <nav
            aria-label="Điều hướng chính"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 min-[851px]:flex"
          >
            <a href="#cong-cu" className="text-sm font-bold text-ink/80 hover:text-blue">
              Công cụ
            </a>
            <a href="#cach-hoat-dong" className="text-sm font-bold text-ink/80 hover:text-blue">
              Cách hoạt động
            </a>
            <a href="#phu-huynh" className="text-sm font-bold text-ink/80 hover:text-blue">
              Cho phụ huynh
            </a>
          </nav>
        ) : null}

        {variant === 'home' ? (
          <a href="#thu-ngay" className="btn btn-primary max-[519px]:hidden">
            Bắt đầu sáng tạo →
          </a>
        ) : (
          <Link href="/#cong-cu" className="btn btn-primary">
            Xem mọi công cụ →
          </Link>
        )}
      </div>
    </header>
  )
}
