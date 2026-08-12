'use client'

import Link from 'next/link'
import { ChevronDown, GraduationCap, LogIn, Menu, Star, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { BrandLogo } from '@/components/brand-logo'
import { SiteSearch } from '@/components/site-search'
import { ThemeToggle } from '@/components/theme-toggle'
import { COURSES } from '@/lib/courses'

type SiteHeaderProps = { variant?: 'home' | 'page' }
type NavItem = { label: string; href: string }

export function SiteHeader({ variant = 'home' }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [courseMenuOpen, setCourseMenuOpen] = useState(false)
  const [courseMenuDismissed, setCourseMenuDismissed] = useState(false)
  const navItems: NavItem[] = [
    { label: 'Xưởng sáng tạo', href: '/xuong-sang-tao' },
    { label: 'Cửa hàng Mầm', href: '/cua-hang-mam' },
    { label: 'Bảng xếp hạng', href: '/bang-xep-hang' },
  ]

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenuOpen(false); setCourseMenuOpen(false); setCourseMenuDismissed(true) }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [])

  function closeCourseMenu() {
    setCourseMenuOpen(false)
    setCourseMenuDismissed(true)
  }

  return (
    <header data-variant={variant} className="sticky top-0 z-50 border-b border-hairline bg-cream/90 backdrop-blur-md">
      <div className="wrap flex h-[88px] items-center gap-3 sm:gap-6">
        <div className="flex shrink-0 items-center"><BrandLogo size={46} /></div>

        <nav aria-label="Điều hướng chính" className="hidden flex-1 items-center justify-center gap-1 min-[901px]:flex">
          <Link href={navItems[0].href} className="group relative whitespace-nowrap rounded-lg px-3.5 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue">
            {navItems[0].label}<span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-blue transition-transform duration-200 group-hover:scale-x-100" />
          </Link>
          <div className="relative" onMouseEnter={() => { if (!courseMenuDismissed) setCourseMenuOpen(true) }} onMouseLeave={() => { setCourseMenuOpen(false); setCourseMenuDismissed(false) }} onFocusCapture={() => { if (!courseMenuDismissed) setCourseMenuOpen(true) }} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) { setCourseMenuOpen(false); setCourseMenuDismissed(false) } }}>
            <Link href="/khoa-hoc" onClick={closeCourseMenu} aria-expanded={courseMenuOpen} className="inline-flex whitespace-nowrap items-center gap-1 rounded-lg px-3.5 py-2 text-[16px] font-bold text-ink/85 transition-colors hover:text-blue focus:text-blue">
              Khóa học<ChevronDown className={`h-4 w-4 transition-transform ${courseMenuOpen ? 'rotate-180' : ''}`} />
            </Link>
            <div className={`absolute left-1/2 top-full w-[620px] -translate-x-1/2 pt-3 transition-all ${courseMenuOpen ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0'}`}>
              <div className="rounded-3xl border border-hairline bg-white p-4 shadow-2xl">
                <div className="grid grid-cols-2 gap-2">{COURSES.map((course) => <Link key={course.slug} href={`/khoa-hoc/${course.slug}`} onClick={closeCourseMenu} className="flex items-center gap-3 rounded-2xl p-3 transition hover:bg-cream focus:bg-cream"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl text-2xl ${course.color}`}>{course.icon}</span><span><strong className="block text-sm text-ink">{course.title}</strong><small className="text-xs text-ink/55">{course.age}</small></span></Link>)}</div>
                <Link href="/khoa-hoc" onClick={closeCourseMenu} className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue px-4 text-sm font-extrabold text-white"><GraduationCap className="h-4 w-4" />Xem tất cả khóa học</Link>
              </div>
            </div>
          </div>
          {navItems.slice(1).map((item) => (
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
          <Link href="/ho-so" className="btn btn-primary ml-1.5 hidden text-[15px] sm:inline-flex" aria-label="Mở hồ sơ hoặc đăng nhập">
            <LogIn className="h-[18px] w-[18px]" /><span>Hồ sơ</span>
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
            <Link href={navItems[0].href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-extrabold text-ink hover:bg-cream hover:text-blue">{navItems[0].label}</Link>
            <div className="rounded-2xl bg-cream p-2"><Link href="/khoa-hoc" onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center gap-2 rounded-xl px-3 text-base font-extrabold text-blue"><GraduationCap className="h-5 w-5" />Khóa học</Link><div className="grid gap-1 sm:grid-cols-2">{COURSES.map((course) => <Link key={course.slug} href={`/khoa-hoc/${course.slug}`} onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-2 rounded-xl bg-white px-3 text-sm font-bold text-ink"><span>{course.icon}</span>{course.title}</Link>)}</div></div>
            {navItems.slice(1).map(item=><Link key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-extrabold text-ink hover:bg-cream hover:text-blue">{item.label}</Link>)}
            <Link href="/danh-gia" onClick={() => setMenuOpen(false)} className="rounded-xl px-4 py-3 text-base font-extrabold text-ink hover:bg-cream hover:text-blue">Đánh giá</Link>
            <Link href="/ho-so" onClick={() => setMenuOpen(false)} className="btn btn-primary mt-2 justify-center sm:hidden"><LogIn className="h-5 w-5" />Hồ sơ / Đăng nhập</Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
