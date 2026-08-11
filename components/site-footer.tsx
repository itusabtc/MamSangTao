import Link from 'next/link'
import { BrandLogo } from '@/components/brand-logo'

const COLUMNS: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: 'Khám phá',
    links: [
      { label: 'Công cụ', href: '/#cong-cu' },
      { label: 'Cách hoạt động', href: '/#cach-hoat-dong' },
      { label: 'Đánh giá', href: '/danh-gia' },
    ],
  },
  {
    heading: 'Công ty',
    links: [
      { label: 'Giới thiệu', href: '/gioi-thieu' },
      { label: 'Thương hiệu', href: '/thuong-hieu' },
      { label: 'Liên hệ', href: '/lien-he' },
      { label: 'Đăng nhập', href: '/dang-nhap' },
    ],
  },
  {
    heading: 'Pháp lý',
    links: [
      { label: 'Điều khoản sử dụng', href: '/dieu-khoan' },
      { label: 'Chính sách quyền riêng tư', href: '/chinh-sach' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer
      className="relative isolate overflow-hidden bg-[#1d3150] text-white"
      style={{
        backgroundImage: 'url(/brand/footer-bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
      }}
    >
      {/* Readability veil: darker at the top where the columns sit,
          fading to transparent so the hills and sprouts show through. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#1d3150]/95 via-[#1d3150]/75 to-[#1d3150]/25"
      />

      <div className="wrap grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <BrandLogo size={44} wordmarkClassName="text-white" />
          <p className="mt-3 text-pretty text-white/70">
            Nuôi dưỡng trí tưởng tượng, từng ý tưởng một.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-yellow">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-white/80 transition-colors hover:text-yellow"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-white/15 py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/60">© 2026 Mầm Sáng Tạo. Bảo lưu mọi quyền.</p>
        <a
          href="mailto:hello@mamsangtao.vn"
          className="text-sm font-bold text-white/75 transition-colors hover:text-yellow"
        >
          hello@mamsangtao.vn
        </a>
      </div>
    </footer>
  )
}
