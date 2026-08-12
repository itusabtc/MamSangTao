'use client'

import { BookOpen, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Plus, RefreshCcw, RotateCcw, Sparkles, Trash2 } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { StorySketch } from '@/components/story-sketch'
import Link from 'next/link'
import { useInventory } from '@/lib/inventory'

type Props = { idea: string; character: string; setting: string; tone: string; onReset: () => void }
type Page = { id: number; text: string; emoji: string; color: string; drawing?: string }

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

function pageSuggestions(character: string, setting: string, tone: string, pageNumber: number, round = 0) {
  const pool = [
    { label: 'Gặp bạn mới', text: `Ở ${setting}, ${character} gặp một người bạn mới đang cần giúp đỡ. Cả hai quyết định đồng hành và chia sẻ những điều mình biết.` },
    { label: 'Thử thách bất ngờ', text: `Ngay lúc ấy, một thử thách bất ngờ chặn đường. ${character} quan sát thật kỹ, thử nhiều cách và không bỏ cuộc.` },
    { label: 'Phát hiện bí mật', text: `${character} phát hiện một dấu hiệu bí mật chưa ai để ý. Manh mối ấy dẫn tới một nơi kỳ diệu nằm sâu trong ${setting}.` },
    { label: pageNumber > 4 ? 'Đi tới kết thúc' : 'Một cú ngoặt', text: `Điều tưởng là khó khăn lại trở thành cơ hội. ${character} nảy ra một ý tưởng ${tone}, giúp mọi người cùng tiến gần hơn tới kết thúc đẹp.` },
    { label: 'Một món đồ lạ', text: `${character} tìm thấy một món đồ kỳ lạ ở ${setting}. Khi chạm vào, món đồ phát ra ánh sáng và hé lộ một lời nhắn bí mật.` },
    { label: 'Đổi vai cho nhau', text: `Để hiểu nhau hơn, ${character} và người bạn thử đổi nhiệm vụ. Cả hai bật cười và học được một cách nhìn hoàn toàn mới.` },
    { label: 'Cuộc đua với thời gian', text: `Mặt trời sắp lặn, ${character} chỉ còn ít thời gian để hoàn thành việc quan trọng. Một kế hoạch ${tone} nhanh chóng được vạch ra.` },
    { label: 'Lựa chọn khó', text: `${character} đứng trước hai con đường. Sau khi lắng nghe trái tim và hỏi ý kiến bạn bè, một lựa chọn dũng cảm được đưa ra.` },
  ]
  return Array.from({ length: 4 }, (_, index) => pool[(round * 3 + index) % pool.length])
}

export function StoryStudio({ idea, character, setting, tone, onReset }: Props) {
  const owned = useInventory()
  const sectionRef = useRef<HTMLElement>(null)
  const [title, setTitle] = useState(`Chuyện của ${character}`)
  const [pages, setPages] = useState(() => initialPages(idea, character, setting, tone))
  const [current, setCurrent] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)
  const [comicMode, setComicMode] = useState(false)
  const [suggestionRound, setSuggestionRound] = useState(0)
  const page = pages[current]
  const wordCount = useMemo(() => pages.reduce((total, item) => total + item.text.trim().split(/\s+/).filter(Boolean).length, 0), [pages])
  const suggestions = useMemo(() => pageSuggestions(character, setting, tone, current + 1, suggestionRound), [character, current, setting, suggestionRound, tone])

  useEffect(() => {
    if (!fullscreen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollTo({ top: 0 })
      document.getElementById('story-studio-title')?.focus({ preventScroll: true })
    })
    return () => { document.body.style.overflow = previousOverflow; window.cancelAnimationFrame(frame) }
  }, [fullscreen])

  function updatePage(text: string) {
    setPages((items) => items.map((item, index) => index === current ? { ...item, text } : item))
  }

  function updateDrawing(drawing: string) {
    setPages((items) => items.map((item, index) => index === current ? { ...item, drawing } : item))
  }

  function addPage() {
    const id = Math.max(0, ...pages.map((item) => item.id)) + 1
    const starter = pageSuggestions(character, setting, tone, pages.length + 1, suggestionRound)[0].text
    setPages((items) => [...items, { id, text: starter, ...PAGE_LOOKS[items.length % PAGE_LOOKS.length] }])
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
    <section ref={sectionRef} className={fullscreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-[#eef5ef] p-3 sm:p-6' : 'mt-7 scroll-mt-24'} aria-labelledby="story-studio-title" aria-modal={fullscreen || undefined} role={fullscreen ? 'dialog' : undefined}>
      <div className={fullscreen ? 'mx-auto max-w-6xl rounded-3xl border border-hairline bg-white p-4 shadow-2xl sm:p-6' : ''}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="kicker">Xưởng kể chuyện</p><h3 id="story-studio-title" tabIndex={-1} className="mt-2 text-2xl outline-none">Viết từng trang, kể theo cách của bé</h3><p className="mt-1 text-sm text-ink/60">Bản nháp được tạo cục bộ, chưa dùng AI và chưa tải lên mạng.</p></div>
        <div className="flex flex-wrap gap-2"><span className="rounded-full bg-green-soft px-3 py-2 text-xs font-extrabold">{pages.length} trang · {wordCount} từ</span><button type="button" onClick={() => setComicMode((value) => !value)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-white px-3 text-sm font-extrabold"><BookOpen className="h-4 w-4" />{comicMode ? 'Truyện chữ' : 'Truyện tranh'}</button><button type="button" onClick={() => setFullscreen((value) => !value)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline bg-white px-3 text-sm font-extrabold">{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}{fullscreen ? 'Thu nhỏ' : 'Phóng to'}</button></div>
      </div>

      <label className="mt-5 block text-sm font-extrabold">Tên truyện<input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={80} className="field mt-2" /></label>
      <div className="mt-4 rounded-2xl bg-cream p-3"><p className="text-sm font-extrabold">Nền truyện từ Kho đồ</p>{owned.includes('story-ocean')?<div className="mt-2 flex flex-wrap gap-2">{[['🐳','#bde9ff'],['🐠','#d8f5ff'],['🏝️','#fff0c8'],['🐚','#e8ddff']].map(([emoji,color])=><button key={emoji} type="button" onClick={()=>setPages(items=>items.map((item,index)=>index===current?{...item,emoji,color}:item))} className="grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl" aria-label={`Dùng nền ${emoji}`}>{emoji}</button>)}</div>:<Link href="/cua-hang-mam" className="mt-2 block text-xs font-bold text-blue hover:underline">🔒 Mở bộ nền Đại dương</Link>}</div>

      <div className="mt-5 grid gap-4 md:grid-cols-[1fr_220px]">
        <article className="overflow-hidden rounded-3xl border-2 border-hairline" style={{ backgroundColor: page.color }}>
          <div className="grid min-h-72 place-items-center p-6 text-center sm:min-h-80">
            <div className="w-full"><div className="text-7xl" aria-hidden>{page.emoji}</div><p className="mt-4 text-sm font-extrabold text-blue">Trang {current + 1}</p>{comicMode ? <StorySketch value={page.drawing} onChange={updateDrawing} prompt={`Vẽ ${character} trong ${setting}: ${page.text.slice(0, 90)}`} /> : null}<textarea value={page.text} onChange={(event) => updatePage(event.target.value)} rows={comicMode ? 4 : 6} aria-label={`Nội dung trang ${current + 1}`} className="mt-3 w-full min-w-0 resize-none rounded-2xl border border-white/70 bg-white/80 p-4 text-center text-lg font-semibold leading-relaxed text-ink outline-none focus:border-blue sm:min-w-[32rem]" /></div>
          </div>
        </article>

        <div className="md:col-start-1">
          <div className="flex items-center justify-between gap-3"><p className="text-sm font-extrabold"><Sparkles className="mr-1 inline h-4 w-4 text-coral" />Gợi ý viết tiếp</p><button type="button" onClick={() => setSuggestionRound((value) => value + 1)} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-hairline px-3 text-xs font-extrabold"><RefreshCcw className="h-3.5 w-3.5" />Gợi ý ngẫu nhiên</button></div>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">{suggestions.map((item) => <button key={item.label} type="button" onClick={() => updatePage(item.text)} className="min-h-11 rounded-xl border border-hairline bg-white px-3 py-2 text-left text-sm font-bold hover:border-blue hover:text-blue"><span className="block font-extrabold">{item.label}</span><span className="mt-1 line-clamp-2 text-xs font-normal text-ink/60">{item.text}</span></button>)}</div>
        </div>

        <aside className="rounded-2xl bg-cream p-3 md:col-start-2 md:row-span-2 md:row-start-1" aria-label="Danh sách trang">
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
      </div>
    </section>
  )
}
