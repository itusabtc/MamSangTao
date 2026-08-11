'use client'

import { ChevronLeft, ChevronRight, Download, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type Props = { idea: string; character: string; setting: string; tone: string; onReset: () => void }
type Page = { id: number; text: string; emoji: string; color: string }

const PAGE_LOOKS = [
  { emoji: '🌤️', color: '#eaf3ff' },
  { emoji: '🧭', color: '#fff0dc' },
  { emoji: '✨', color: '#f1eafa' },
  { emoji: '🌈', color: '#e9f0e8' },
]

function initialPages(idea: string, character: string, setting: string, tone: string): Page[] {
  const texts = [
    `Ngày nọ ở ${setting}, ${character} ấp ủ một ý tưởng thật đặc biệt: ${idea}.`,
    `${character} bắt đầu lên đường. Mỗi bước đi lại mở ra một manh mối mới và một người bạn đáng mến.`,
    `Bỗng một thử thách xuất hiện! ${character} hít một hơi thật sâu, nhớ tới điều mình muốn làm và thử một cách hoàn toàn mới.`,
    `Cuối cùng, ý tưởng đã thành hình. ${character} hiểu rằng lòng tò mò và sự kiên trì có thể biến điều tưởng tượng thành một câu chuyện ${tone}.`,
  ]
  return texts.map((text, index) => ({ id: index + 1, text, ...PAGE_LOOKS[index] }))
}

export function StoryStudio({ idea, character, setting, tone, onReset }: Props) {
  const [title, setTitle] = useState(`Chuyện của ${character}`)
  const [pages, setPages] = useState(() => initialPages(idea, character, setting, tone))
  const [current, setCurrent] = useState(0)
  const page = pages[current]
  const wordCount = useMemo(() => pages.reduce((total, item) => total + item.text.trim().split(/\s+/).filter(Boolean).length, 0), [pages])

  function updatePage(text: string) {
    setPages((items) => items.map((item, index) => index === current ? { ...item, text } : item))
  }

  function addPage() {
    const id = Math.max(0, ...pages.map((item) => item.id)) + 1
    setPages((items) => [...items, { id, text: 'Bé hãy viết tiếp câu chuyện ở đây…', ...PAGE_LOOKS[items.length % PAGE_LOOKS.length] }])
    setCurrent(pages.length)
  }

  function removePage() {
    if (pages.length === 1) return
    setPages((items) => items.filter((_, index) => index !== current))
    setCurrent((index) => Math.max(0, index - 1))
  }

  function download() {
    const content = `${title}\n\n${pages.map((item, index) => `Trang ${index + 1}\n${item.text}`).join('\n\n')}`
    const link = document.createElement('a')
    link.download = 'truyen-cua-be.txt'
    link.href = URL.createObjectURL(new Blob([content], { type: 'text/plain;charset=utf-8' }))
    link.click(); URL.revokeObjectURL(link.href)
  }

  return (
    <section className="mt-7" aria-labelledby="story-studio-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="kicker">Xưởng kể chuyện</p><h3 id="story-studio-title" className="mt-2 text-2xl">Viết từng trang, kể theo cách của bé</h3><p className="mt-1 text-sm text-ink/60">Bản nháp được tạo cục bộ, chưa dùng AI và chưa tải lên mạng.</p></div>
        <span className="self-start rounded-full bg-green-soft px-3 py-2 text-xs font-extrabold">{pages.length} trang · {wordCount} từ</span>
      </div>

      <label className="mt-5 block text-sm font-extrabold">Tên truyện<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} className="field mt-2" /></label>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
        <article className="overflow-hidden rounded-3xl border-2 border-hairline" style={{ backgroundColor: page.color }}>
          <div className="grid min-h-72 place-items-center p-6 text-center sm:min-h-80">
            <div><div className="text-7xl" aria-hidden>{page.emoji}</div><p className="mt-4 text-sm font-extrabold text-blue">Trang {current + 1}</p><textarea value={page.text} onChange={(event) => updatePage(event.target.value)} rows={6} aria-label={`Nội dung trang ${current + 1}`} className="mt-3 w-full min-w-0 resize-none rounded-2xl border border-white/70 bg-white/80 p-4 text-center text-lg font-semibold leading-relaxed text-ink outline-none focus:border-blue sm:min-w-[32rem]" /></div>
          </div>
        </article>

        <aside className="rounded-2xl bg-cream p-3" aria-label="Danh sách trang">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">{pages.map((item, index) => <button key={item.id} type="button" onClick={() => setCurrent(index)} aria-current={current === index ? 'page' : undefined} className={`min-h-11 rounded-xl px-3 text-left text-sm font-extrabold ${current === index ? 'bg-blue text-white' : 'bg-white text-ink'}`}><span aria-hidden>{item.emoji}</span> Trang {index + 1}</button>)}</div>
          <button type="button" onClick={addPage} className="btn mt-3 w-full justify-center bg-white px-3"><Plus className="h-4 w-4" />Thêm trang</button>
          <button type="button" onClick={removePage} disabled={pages.length === 1} className="btn mt-2 w-full justify-center bg-white px-3 disabled:opacity-40"><Trash2 className="h-4 w-4" />Xóa trang</button>
        </aside>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="button" disabled={current === 0} onClick={() => setCurrent((index) => index - 1)} className="btn justify-center border border-hairline bg-white disabled:opacity-40"><ChevronLeft className="h-4 w-4" />Trang trước</button>
        <button type="button" disabled={current === pages.length - 1} onClick={() => setCurrent((index) => index + 1)} className="btn justify-center border border-hairline bg-white disabled:opacity-40">Trang sau<ChevronRight className="h-4 w-4" /></button>
        <button type="button" onClick={download} className="btn btn-primary justify-center sm:ml-auto"><Download className="h-4 w-4" />Tải truyện TXT</button>
        <button type="button" onClick={onReset} className="btn justify-center text-ink/70"><RotateCcw className="h-4 w-4" />Ý tưởng khác</button>
      </div>
    </section>
  )
}
