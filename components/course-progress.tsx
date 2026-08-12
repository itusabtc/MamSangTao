'use client'

import { CheckCircle2, Circle, RotateCcw } from 'lucide-react'
import { useState } from 'react'

export function CourseProgress({ lessons }: { lessons: readonly string[] }) {
  const [completed, setCompleted] = useState<number[]>([])
  const percent = Math.round((completed.length / lessons.length) * 100)
  return <section className="rounded-3xl border border-hairline bg-white p-5 shadow-sm sm:p-7" aria-labelledby="lesson-title">
    <div className="flex items-center justify-between gap-4"><div><p className="kicker">Lộ trình học</p><h2 id="lesson-title" className="mt-2 text-2xl">Bài học của bé</h2></div><strong className="rounded-full bg-green-soft px-4 py-2 text-sm text-blue">{percent}% hoàn thành</strong></div>
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-cream"><div className="h-full rounded-full bg-green transition-all" style={{ width: `${percent}%` }} /></div>
    <ol className="mt-5 space-y-3">{lessons.map((lesson, index) => { const done = completed.includes(index); return <li key={lesson}><button type="button" onClick={() => setCompleted((items) => done ? items.filter((item) => item !== index) : [...items, index])} className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border p-3 text-left font-extrabold transition ${done ? 'border-green bg-green-soft text-blue' : 'border-hairline bg-cream/50 hover:border-blue'}`}>{done ? <CheckCircle2 className="h-6 w-6 text-green" /> : <Circle className="h-6 w-6 text-ink/30" />}<span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm">{index + 1}</span><span>{lesson}</span></button></li> })}</ol>
    {completed.length ? <button type="button" onClick={() => setCompleted([])} className="btn mt-5"><RotateCcw className="h-4 w-4" />Học lại từ đầu</button> : null}
    <p className="mt-4 text-xs text-ink/55">Tiến độ hiện chỉ lưu trong phiên đang mở trên thiết bị này.</p>
  </section>
}
