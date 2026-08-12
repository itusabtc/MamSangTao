'use client'

import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useRef, useState } from 'react'

type SearchItem = {
  title: string
  desc: string
  href: string
  group: string
}

const ITEMS: SearchItem[] = [
  { title: 'Xưởng sáng tạo', desc: 'Vẽ, kể chuyện, làm game, phối nhạc và hoạt hình.', href: '/xuong-sang-tao', group: 'Khám phá' },
  { title: 'Khóa học cho bé', desc: 'Cờ vua, âm nhạc, vẽ, kể chuyện và lập trình.', href: '/khoa-hoc', group: 'Khóa học' },
  {
    title: 'Vẽ tranh từ ý tưởng',
    desc: 'Biến một câu mô tả thành tranh minh hoạ đầy màu sắc.',
    href: '/cong-cu/ve-tranh-tu-y-tuong',
    group: 'Công cụ',
  },
  {
    title: 'Tạo truyện cho bé',
    desc: 'Chọn nhân vật, bối cảnh và một kết thúc thật riêng.',
    href: '/cong-cu/tao-truyen-cho-be',
    group: 'Công cụ',
  },
  {
    title: 'Lập trình bằng khối',
    desc: 'Xếp các khối lệnh để nhân vật chuyển động và kể chuyện.',
    href: '/cong-cu/lap-trinh-cho-tre-em',
    group: 'Công cụ',
  },
  { title: 'Đánh giá', desc: 'Cảm nhận của phụ huynh và giáo viên.', href: '/danh-gia', group: 'Trang' },
  { title: 'Giới thiệu', desc: 'Câu chuyện và giá trị của Mầm Sáng Tạo.', href: '/gioi-thieu', group: 'Trang' },
  { title: 'Liên hệ', desc: 'Gửi lời nhắn cho đội ngũ.', href: '/lien-he', group: 'Trang' },
  { title: 'Điều khoản sử dụng', desc: 'Quy định khi dùng nền tảng.', href: '/dieu-khoan', group: 'Trang' },
  { title: 'Chính sách quyền riêng tư', desc: 'Cách chúng tôi bảo vệ dữ liệu.', href: '/chinh-sach', group: 'Trang' },
]

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
}

export function SiteSearch() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function closeSearch() {
    setOpen(false)
    setQuery('')
  }

  const results = useMemo(() => {
    const q = normalize(query.trim())
    if (!q) return ITEMS
    return ITEMS.filter(
      (item) => normalize(item.title).includes(q) || normalize(item.desc).includes(q),
    )
  }, [query])

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30)
      return () => window.clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') closeSearch()
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function go(href: string) {
    closeSearch()
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Tìm kiếm"
        title="Tìm kiếm"
        className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-blue"
      >
        <Search className="h-[22px] w-[22px]" />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Tìm kiếm trên Mầm Sáng Tạo"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-24 sm:pt-28"
        >
          <button
            type="button"
            aria-label="Đóng tìm kiếm"
            onClick={closeSearch}
            className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-hairline bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.25)]">
            <div className="flex items-center gap-3 border-b border-hairline px-4">
              <Search className="h-5 w-5 shrink-0 text-ink/50" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tìm công cụ, trang..."
                className="w-full bg-transparent py-4 text-base text-ink outline-none placeholder:text-ink/45"
              />
              <button
                type="button"
                onClick={closeSearch}
                aria-label="Đóng"
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink/50 hover:bg-ink/5 hover:text-ink"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-ink/60">
                  Không tìm thấy kết quả cho &ldquo;{query}&rdquo;.
                </p>
              ) : (
                <ul className="space-y-1">
                  {results.map((item) => (
                    <li key={item.href}>
                      <button
                        type="button"
                        onClick={() => go(item.href)}
                        className="flex w-full flex-col items-start gap-0.5 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-ink/5"
                      >
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-extrabold text-ink">{item.title}</span>
                          <span className="rounded-full bg-ink/5 px-2 py-0.5 text-[11px] font-bold text-ink/55">
                            {item.group}
                          </span>
                        </span>
                        <span className="text-sm text-ink/65">{item.desc}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
