import Link from 'next/link'
import { LogIn, Star } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { SiteSearch } from '@/components/site-search'
import { ThemeToggle } from '@/components/theme-toggle'

type SiteHeaderProps = {
  /** 'home' shows homepage anchor nav; 'page' shows cross-page links for inner pages. */
  variant?: 'home' | 'page'
}

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-sm">
      <div className="wrap flex h-[86px] items-center justify-between gap-4">
        <BrandLogo size={44} />

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

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/danh-gia"
            className="hidden items-center gap-1.5 rounded-full px-2.5 py-2 text-sm font-bold text-ink/80 transition-colors hover:text-blue sm:inline-flex"
          >
            <Star className="h-[18px] w-[18px] fill-yellow text-yellow" />
            Đánh giá
          </Link>
          <SiteSearch />
          <ThemeToggle />
          <Link href="/dang-nhap" className="btn btn-primary ml-1">
            <LogIn className="h-[18px] w-[18px]" />
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  )
}
