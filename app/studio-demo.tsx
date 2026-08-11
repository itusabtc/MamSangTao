'use client'

import { Check, Download, Paintbrush, RefreshCcw, RotateCcw, Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, type FormEvent } from 'react'
import { DrawingCanvas } from '@/components/drawing-canvas'

type Mode = 'tranh' | 'truyen' | 'laptrinh'
type Phase = 'form' | 'loading' | 'results' | 'editor' | 'simple-result'

const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: 'tranh', label: 'Tranh', icon: '🎨' },
  { id: 'truyen', label: 'Truyện', icon: '📖' },
  { id: 'laptrinh', label: 'Lập trình', icon: '🧩' },
]

const STYLES = ['Hoạt hình', 'Màu nước', 'Giấy cắt', 'Tranh tô màu'] as const
const LOADING_MESSAGES = ['Đang gom những ý tưởng lấp lánh…', 'Đang pha màu…', 'Sắp hoàn thành rồi!']
const CARD_COLORS = [
  ['#eaf3ff', '#f47d61', '#64aa82'],
  ['#fff0dc', '#8a73c9', '#f5c34d'],
  ['#e9f0e8', '#294d9b', '#f47d61'],
  ['#f1eafa', '#64aa82', '#294d9b'],
] as const

const SIMPLE_RESULTS: Record<Exclude<Mode, 'tranh'>, (idea: string) => { title: string; body: string; emoji: string }> = {
  truyen: (idea) => ({
    emoji: '📖',
    title: 'Trang truyện đầu tiên đang mở ra!',
    body: `Từ ý tưởng “${idea}”, bé sẽ chọn nhân vật chính, nơi câu chuyện diễn ra và một điều bất ngờ ở cuối. Tính năng tạo truyện đầy đủ sẽ có trong giai đoạn tiếp theo.`,
  }),
  laptrinh: (idea) => ({
    emoji: '🧩',
    title: 'Bảng xếp khối lệnh đã bày ra!',
    body: `Để thực hiện “${idea}”, bé sẽ kéo thả các khối lệnh cho nhân vật di chuyển và phản ứng. Blockly thật sẽ được kết nối trong giai đoạn tiếp theo.`,
  }),
}

export function StudioDemo() {
  const params = useSearchParams()
  const [mode, setMode] = useState<Mode>('tranh')
  const [idea, setIdea] = useState('')
  const [style, setStyle] = useState<(typeof STYLES)[number]>('Hoạt hình')
  const [phase, setPhase] = useState<Phase>('form')
  const [loadingStep, setLoadingStep] = useState(0)
  const [selected, setSelected] = useState(0)
  const [simpleResult, setSimpleResult] = useState<{ title: string; body: string; emoji: string } | null>(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    const fromUrl = params.get('idea')
    if (!fromUrl) return
    const update = window.setTimeout(() => {
      setIdea(fromUrl)
      setPhase('form')
      document.getElementById('idea-input')?.focus()
    }, 0)
    return () => window.clearTimeout(update)
  }, [params])

  useEffect(() => {
    if (phase !== 'loading') return
    const stepOne = window.setTimeout(() => setLoadingStep(1), 650)
    const stepTwo = window.setTimeout(() => setLoadingStep(2), 1300)
    const finish = window.setTimeout(() => setPhase('results'), 1950)
    return () => [stepOne, stepTwo, finish].forEach(window.clearTimeout)
  }, [phase])

  function startProject(event: FormEvent) {
    event.preventDefault()
    const trimmed = idea.trim()
    if (!trimmed) return
    setNotice('')
    if (mode === 'tranh') {
      setLoadingStep(0)
      setSelected(0)
      setPhase('loading')
    } else {
      setSimpleResult(SIMPLE_RESULTS[mode](trimmed))
      setPhase('simple-result')
    }
  }

  function reset() {
    setPhase('form')
    setNotice('')
  }

  function downloadPrototype() {
    const canvas = document.createElement('canvas')
    canvas.width = 1200
    canvas.height = 800
    const context = canvas.getContext('2d')
    if (!context) return
    const colors = CARD_COLORS[selected]
    context.fillStyle = colors[0]
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#f5c34d'
    context.beginPath(); context.arc(980, 140, 75, 0, Math.PI * 2); context.fill()
    context.fillStyle = colors[1]
    context.beginPath(); context.arc(280, 740, 420, Math.PI, 0); context.fill()
    context.fillStyle = colors[2]
    context.beginPath(); context.arc(850, 760, 500, Math.PI, 0); context.fill()
    context.fillStyle = '#1d3150'
    context.font = '700 42px Arial'
    context.fillText(idea.slice(0, 42), 80, 110)
    context.font = '28px Arial'
    context.fillText(`${style} · Bản mẫu Mầm Sáng Tạo`, 80, 165)
    const link = document.createElement('a')
    link.download = 'mam-sang-tao-ban-mau.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
    setNotice('Đã tải bản mẫu về máy. Ảnh AI thật sẽ được bổ sung ở giai đoạn tiếp theo.')
  }

  return (
    <div className="mx-auto mt-10 max-w-4xl rounded-3xl border border-hairline bg-white p-5 text-left shadow-[0_16px_40px_rgba(29,49,80,0.10)] sm:p-7">
      <div role="tablist" aria-label="Chọn loại dự án" className="flex flex-wrap gap-2">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === mode}
            onClick={() => { setMode(item.id); setPhase('form'); setNotice('') }}
            className={`min-h-11 rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${item.id === mode ? 'bg-blue text-white' : 'bg-cream text-ink/70 hover:text-blue'}`}
          >
            <span aria-hidden>{item.icon}</span> {item.label}
          </button>
        ))}
      </div>

      {phase === 'loading' ? (
        <div className="grid min-h-72 place-items-center py-10 text-center" role="status" aria-live="polite">
          <div>
            <div className="mx-auto grid h-20 w-20 animate-pulse place-items-center rounded-[35%] bg-yellow/30 text-4xl">✨</div>
            <h3 className="mt-6 text-2xl">{LOADING_MESSAGES[loadingStep]}</h3>
            <div className="mx-auto mt-5 flex w-52 gap-2">{LOADING_MESSAGES.map((_, index) => <span key={index} className={`h-2 flex-1 rounded-full ${index <= loadingStep ? 'bg-coral' : 'bg-hairline'}`} />)}</div>
            <p className="mt-5 text-sm text-ink/60">Đây là mô phỏng trải nghiệm; website chưa gọi API tạo ảnh thật.</p>
          </div>
        </div>
      ) : phase === 'editor' ? (
        <DrawingCanvas idea={idea} style={style} colors={CARD_COLORS[selected]} subject={['🚀', '🐋', '🏰', '🐱'][selected]} onClose={() => setPhase('results')} />
      ) : phase === 'results' ? (
        <div className="mt-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="kicker">Bốn cách kể bằng hình ảnh</p><h3 className="mt-2 text-2xl">Chọn bức bé thích nhất</h3><p className="mt-1 text-sm text-ink/60">Phong cách: {style} · Prototype chưa dùng AI thật</p></div>
            <button type="button" onClick={() => { setLoadingStep(0); setPhase('loading') }} className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-hairline px-4 text-sm font-extrabold hover:border-blue hover:text-blue"><RefreshCcw className="h-4 w-4" />Tạo lại</button>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {CARD_COLORS.map((colors, index) => (
              <button key={index} type="button" onClick={() => { setSelected(index); setNotice('') }} aria-pressed={selected === index} className={`group overflow-hidden rounded-2xl border-2 bg-surface text-left transition-all hover:-translate-y-1 ${selected === index ? 'border-blue shadow-lg' : 'border-hairline'}`}>
                <span className="relative block aspect-[4/3] overflow-hidden" style={{ backgroundColor: colors[0] }}>
                  <span className="absolute right-[12%] top-[12%] h-12 w-12 rounded-full bg-yellow" />
                  <span className="absolute -bottom-[28%] -left-[15%] h-[70%] w-[75%] rounded-[50%]" style={{ backgroundColor: colors[1] }} />
                  <span className="absolute -bottom-[30%] right-[-15%] h-[72%] w-[85%] rounded-[50%]" style={{ backgroundColor: colors[2] }} />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl">{['🚀','🐋','🏰','🐱'][index]}</span>
                  {selected === index ? <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue px-3 py-1 text-xs font-extrabold text-white"><Check className="h-3.5 w-3.5" />Đã chọn</span> : null}
                </span>
                <span className="block px-4 py-3 text-sm font-extrabold">Phương án {index + 1}: {idea}</span>
              </button>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">{STYLES.map((item) => <button key={item} type="button" onClick={() => setStyle(item)} className={`min-h-11 rounded-full px-4 text-sm font-bold ${style === item ? 'bg-violet text-white' : 'bg-cream text-ink/70'}`}>{item}</button>)}</div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => setPhase('editor')} className="btn btn-primary justify-center"><Paintbrush className="h-4 w-4" />Mở bàn vẽ</button>
            <button type="button" onClick={downloadPrototype} className="btn justify-center border border-hairline bg-surface text-ink"><Download className="h-4 w-4" />Tải bản mẫu</button>
            <button type="button" onClick={reset} className="btn justify-center text-ink/70"><RotateCcw className="h-4 w-4" />Ý tưởng khác</button>
          </div>
          {notice ? <p className="mt-4 rounded-xl bg-green-soft px-4 py-3 text-sm font-bold text-ink" role="status">{notice}</p> : null}
        </div>
      ) : phase === 'simple-result' && simpleResult ? (
        <div className="mt-6 rounded-2xl bg-green-soft p-6"><div className="text-4xl">{simpleResult.emoji}</div><h3 className="mt-3 text-xl">{simpleResult.title}</h3><p className="mt-2 text-ink/75">{simpleResult.body}</p><button type="button" onClick={reset} className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full border border-ink/20 bg-white px-4 text-sm font-extrabold"><RotateCcw className="h-4 w-4" />Làm lại</button></div>
      ) : (
        <form onSubmit={startProject} className="mt-5">
          <label htmlFor="idea-input" className="mb-2 block text-sm font-extrabold">Ý tưởng của bé</label>
          <textarea id="idea-input" value={idea} onChange={(event) => setIdea(event.target.value)} rows={3} required placeholder="Ví dụ: một chú cá voi bay giữa những vì sao…" className="field resize-none" />
          {mode === 'tranh' ? <fieldset className="mt-5"><legend className="text-sm font-extrabold">Chọn phong cách</legend><div className="mt-2 flex flex-wrap gap-2">{STYLES.map((item) => <button key={item} type="button" onClick={() => setStyle(item)} aria-pressed={style === item} className={`min-h-11 rounded-full px-4 text-sm font-bold ${style === item ? 'bg-violet text-white' : 'bg-cream text-ink/70 hover:text-blue'}`}>{item}</button>)}</div></fieldset> : null}
          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="text-sm text-ink/55">Mô tả nhân vật, màu sắc hoặc nơi câu chuyện diễn ra.</p><button type="submit" className="btn btn-coral w-full justify-center sm:w-auto">{mode === 'tranh' ? 'Tạo 4 tranh mẫu' : 'Tạo dự án'}<Sparkles className="h-4 w-4" /></button></div>
        </form>
      )}
    </div>
  )
}
