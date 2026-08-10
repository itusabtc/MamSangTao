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
    <footer className="border-t border-hairline bg-cream">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="max-w-sm">
          <BrandLogo size={44} />
          <p className="mt-3 text-pretty text-ink/70">
            Nuôi dưỡng trí tưởng tượng, từng ý tưởng một.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading}>
            <h2 className="font-display text-sm font-bold uppercase tracking-wide text-ink/55">
              {col.heading}
            </h2>
            <ul className="mt-4 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-bold text-ink/80 hover:text-blue">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-hairline py-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink/55">© 2026 Mầm Sáng Tạo. Bảo lưu mọi quyền.</p>
        <a
          href="mailto:hello@mamsangtao.vn"
          className="text-sm font-bold text-ink/70 hover:text-blue"
        >
          hello@mamsangtao.vn
        </a>
      </div>
    </footer>
  )
}
