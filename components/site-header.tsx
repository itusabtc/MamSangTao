import Link from 'next/link'
import { Sparkles } from 'lucide-react'

type SiteHeaderProps = {
  /** 'home' shows homepage anchor nav; 'page' shows cross-page links for inner pages. */
  variant?: 'home' | 'page'
}

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-sm">
      <div className="wrap flex h-[86px] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2" aria-label="Mầm Sáng Tạo — về trang chủ">
          <Sparkles aria-hidden className="h-6 w-6 text-coral" strokeWidth={2.5} />
          <span className="font-display text-xl font-bold text-blue">Mầm Sáng Tạo</span>
        </Link>

        <nav
          aria-label="Điều hướng chính"
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 min-[901px]:flex"
        >
          {variant === 'home' ? (
            <>
              <a href="#cong-cu" className="text-sm font-bold text-ink/80 hover:text-blue">
                Công cụ
              </a>
              <a href="#cach-hoat-dong" className="text-sm font-bold text-ink/80 hover:text-blue">
                Cách hoạt động
              </a>
            </>
          ) : (
            <Link href="/#cong-cu" className="text-sm font-bold text-ink/80 hover:text-blue">
              Công cụ
            </Link>
          )}
          <Link href="/gioi-thieu" className="text-sm font-bold text-ink/80 hover:text-blue">
            Giới thiệu
          </Link>
          <Link href="/lien-he" className="text-sm font-bold text-ink/80 hover:text-blue">
            Liên hệ
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/dang-nhap"
            className="hidden text-sm font-bold text-ink/80 hover:text-blue sm:inline"
          >
            Đăng nhập
          </Link>
          <Link href="/dang-ky" className="btn btn-primary">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  )
}
