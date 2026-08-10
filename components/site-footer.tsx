import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-cream">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles aria-hidden className="h-6 w-6 text-coral" strokeWidth={2.5} />

            <span className="font-display text-xl font-bold text-blue">
              Mầm Sáng Tạo
            </span>
          </Link>
          <p className="mt-3 text-pretty text-ink/70">
            Nuôi dưỡng trí tưởng tượng, từng ý tưởng một.
          </p>
        </div>

        <nav aria-label="Liên kết chân trang" className="flex gap-8">
          <a href="#cong-cu" className="text-sm font-bold text-ink/80 hover:text-blue">
            Công cụ
          </a>
          <a href="#phu-huynh" className="text-sm font-bold text-ink/80 hover:text-blue">
            An toàn
          </a>
          <a
            href="mailto:hello@mamsangtao.vn"
            className="text-sm font-bold text-ink/80 hover:text-blue"
          >
            Liên hệ
          </a>
        </nav>
      </div>
      <div className="wrap border-t border-hairline py-5">
        <p className="text-sm text-ink/55">© 2026 Mầm Sáng Tạo</p>
      </div>
    </footer>
  )
}
