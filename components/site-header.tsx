import Link from 'next/link'
import { LogIn, Star } from 'lucide-react'
import { BrandLogo } from '@/components/brand-logo'
import { SiteSearch } from '@/components/site-search'
import { ThemeToggle } from '@/components/theme-toggle'

type SiteHeaderProps = {
  /** 'home' shows homepage anchor nav; 'page' shows cross-page links for inner pages. */
  variant?: 'home' | 'page'
}

type NavItem = { label: string; href: string }

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const navItems: NavItem[] =
    variant === 'home'
      ? [
          { label: 'Công cụ', href: '#cong-cu' },
          { label: 'Cách hoạt động', href: '#cach-hoat-dong' },
          { label: 'Giới thiệu', href: '/gioi-thieu' },
          { label: 'Liên hệ', href: '/lien-he' },
        ]
      : [
          { label: 'Công cụ', href: '/#cong-cu' },
          { label: 'Cách hoạt động', href: '/#cach-hoat-dong' },
          { label: 'Giới thiệu', href: '/gioi-thieu' },
          { label: 'Liên hệ', href: '/lien-he' },
        ]

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-[88px] items-center gap-3 sm:gap-6">
        {/* Left: brand */}
        <div className="flex shrink-0 items-center">
          <BrandLogo size={46} />
        </div>

        {/* Center: primary navigation */}
        <nav
          aria-label="Điều hướng chính"
          className="hidden flex-1 items-center justify-center gap-1 min-[901px]:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative rounded-lg px-3.5 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue"
            >
              {item.label}
              <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-blue transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="ml-auto flex shrink-0 items-center gap-1 min-[901px]:ml-0 sm:gap-1.5">
          <Link
            href="/danh-gia"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue lg:inline-flex"
          >
            <Star className="h-[18px] w-[18px] fill-yellow text-yellow" />
            Đánh giá
          </Link>
          <SiteSearch />
          <ThemeToggle />
          <Link
            href="/dang-nhap"
            className="btn btn-primary ml-1.5 text-[15px]"
            aria-label="Đăng nhập"
          >
            <LogIn className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">Đăng nhập</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
