'use client'

import { RotateCcw, Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type Mode = 'tranh' | 'truyen' | 'laptrinh'

const MODES: { id: Mode; label: string; icon: string }[] = [
  { id: 'tranh', label: 'Tranh', icon: '🎨' },
  { id: 'truyen', label: 'Truyện', icon: '📖' },
  { id: 'laptrinh', label: 'Lập trình', icon: '🧩' },
]

const RESULTS: Record<Mode, (idea: string) => { title: string; body: string; emoji: string }> = {
  tranh: (idea) => ({
    emoji: '🎨',
    title: 'Bản phác thảo của bé đã sẵn sàng!',
    body: `Xưởng sẽ dựng một khung tranh cho ý tưởng “${idea}”. Bé có thể chọn màu nền, thêm nhân vật và tô những chi tiết mình thích nhất.`,
  }),
  truyen: (idea) => ({
    emoji: '📖',
    title: 'Trang truyện đầu tiên đang mở ra!',
    body: `Từ ý tưởng “${idea}”, bé sẽ chọn nhân vật chính, nơi câu chuyện diễn ra và một điều bất ngờ ở cuối. Mỗi lựa chọn tạo nên một câu chuyện thật riêng.`,
  }),
  laptrinh: (idea) => ({
    emoji: '🧩',
    title: 'Bảng xếp khối lệnh đã bày ra!',
    body: `Để thực hiện “${idea}”, bé sẽ kéo thả các khối lệnh cho nhân vật di chuyển, phát âm thanh và phản ứng — không cần gõ một dòng mã nào.`,
  }),
}

export function StudioDemo() {
  const params = useSearchParams()
  const [mode, setMode] = useState<Mode>('tranh')
  const [idea, setIdea] = useState('')
  const [result, setResult] = useState<{ title: string; body: string; emoji: string } | null>(null)

  // Prefill from ?idea=
  useEffect(() => {
    const fromUrl = params.get('idea')
    if (fromUrl) setIdea(fromUrl)
  }, [params])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = idea.trim()
    if (!trimmed) return
    setResult(RESULTS[mode](trimmed))
  }

  return (
    <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-hairline bg-white p-5 shadow-[0_16px_40px_rgba(29,49,80,0.10)] sm:p-7">
      {/* Mode tabs */}
      <div
        role="tablist"
        aria-label="Chọn loại dự án"
        className="flex flex-wrap gap-2"
      >
        {MODES.map((m) => {
          const active = m.id === mode
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                setMode(m.id)
                setResult(null)
              }}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition-colors ${
                active
                  ? 'bg-blue text-white'
                  : 'bg-cream text-ink/70 hover:text-blue'
              }`}
            >
              <span aria-hidden>{m.icon}</span>
              {m.label}
            </button>
          )
        })}
      </div>

      {result ? (
        <div className="mt-6 rounded-2xl bg-green-soft p-6 text-left">
          <div className="text-4xl" aria-hidden>
            {result.emoji}
          </div>
          <h3 className="mt-3 text-xl">{result.title}</h3>
          <p className="mt-2 text-ink/75">{result.body}</p>
          <button
            type="button"
            onClick={() => setResult(null)}
            className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-extrabold text-ink hover:border-blue hover:text-blue"
          >
            <RotateCcw className="h-4 w-4" />
            Làm lại
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5">
          <label htmlFor="idea-input" className="sr-only">
            Mô tả ý tưởng của bé
          </label>
          <textarea
            id="idea-input"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing &&
                e.keyCode !== 229
              ) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
            rows={3}
            placeholder="Ví dụ: một chú cá voi bay giữa những vì sao..."
            className="w-full resize-none rounded-2xl border border-hairline bg-cream px-4 py-3 text-ink outline-none transition-colors placeholder:text-ink/45 focus:border-blue"
          />
          <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-sm text-ink/55">
              Gợi ý: hãy mô tả nhân vật, màu sắc hoặc nơi câu chuyện diễn ra.
            </p>
            <button
              type="submit"
              className="btn btn-coral w-full justify-center sm:w-auto"
            >
              Tạo dự án
              <Sparkles className="h-4 w-4" />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
