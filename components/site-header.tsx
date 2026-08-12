'use client'

import Link from 'next/link'
import { LogIn, Menu, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/brand-logo'
import { SiteSearch } from '@/components/site-search'
import { ThemeToggle } from '@/components/theme-toggle'

type SiteHeaderProps = { variant?: 'home' | 'page' }
type NavItem = { label: string; href: string }

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const prefix = variant === 'home' ? '' : '/'
  const navItems: NavItem[] = [
    { label: 'Xưởng sáng tạo', href: '/xuong-sang-tao' },
    { label: 'Khóa học', href: '/khoa-hoc' },
    { label: 'Cách hoạt động', href: `${prefix}#cach-hoat-dong` },
    { label: 'Giới thiệu', href: '/gioi-thieu' },
    { label: 'Liên hệ', href: '/lien-he' },
  ]

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-[88px] items-center gap-3 sm:gap-6">
        <div className="flex shrink-0 items-center"><BrandLogo size={46} /></div>

        <nav aria-label="Điều hướng chính" className="hidden flex-1 items-center justify-center gap-1 min-[901px]:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="group relative rounded-lg px-3.5 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue">
              {item.label}
              <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-blue transition-transform duration-200 group-hover:scale-x-100" />
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1 min-[901px]:ml-0 sm:gap-1.5">
          <Link href="/danh-gia" className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue lg:inline-flex">
            <Star className="h-[18px] w-[18px] fill-yellow text-yellow" />Đánh giá
          </Link>
          <SiteSearch />
          <ThemeToggle />
          <Link href="/dang-nhap" className="btn btn-primary ml-1.5 hidden text-[15px] sm:inline-flex" aria-label="Đăng nhập">
            <LogIn className="h-[18px] w-[18px]" /><span>Đăng nhập</span>
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'}
            className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 min-[901px]:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <nav id="mobile-navigation" aria-label="Điều hướng trên điện thoại" className="border-t border-hairline bg-surface px-5 py-4 shadow-lg min-[901px]:hidden">
          <div className="mx-auto grid max-w-lg gap-2">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-extrabold text-ink hover:bg-cream hover:text-blue">
                {item.label}
              </Link>
            ))}
            <Link href="/danh-gia" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-extrabold text-ink hover:bg-cream hover:text-blue">Đánh giá</Link>
            <Link href="/dang-nhap" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-2 justify-center sm:hidden"><LogIn className="h-5 w-5" />Đăng nhập</Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
