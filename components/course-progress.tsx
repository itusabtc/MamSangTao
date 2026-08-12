'use client'

import { CheckCircle2, ChevronRight, Circle, Lightbulb, ListChecks, RotateCcw, Target } from 'lucide-react'
import { useState } from 'react'
import type { Lesson } from '@/lib/courses'

export function CourseProgress({ lessons }: { lessons: readonly Lesson[] }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [selected, setSelected] = useState(0)
  const percent = Math.round((completed.length / lessons.length) * 100)
  const active = lessons[selected]
  const done = completed.includes(selected)

  function toggleCompleted() {
    setCompleted((items) => done ? items.filter((item) => item !== selected) : [...items, selected])
  }

  return <section className="rounded-3xl border border-hairline bg-white p-5 shadow-sm sm:p-7" aria-labelledby="lesson-title">
    <div className="flex items-center justify-between gap-4"><div><p className="kicker">Lộ trình học</p><h2 id="lesson-title" className="mt-2 text-2xl">Bài học của bé</h2></div><strong className="rounded-full bg-green-soft px-4 py-2 text-sm text-blue">{percent}% hoàn thành</strong></div>
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-cream"><div className="h-full rounded-full bg-green transition-all" style={{ width: `${percent}%` }} /></div>

    <div className="mt-6 rounded-3xl border-2 border-blue/15 bg-blue/5 p-4 sm:p-6" aria-live="polite">
      <div className="flex items-start gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue font-black text-white">{selected + 1}</span><div><p className="text-xs font-extrabold uppercase tracking-wider text-coral">Hướng dẫn bài học</p><h3 className="mt-1 text-2xl">{active.title}</h3></div></div>
      <div className="mt-5 rounded-2xl bg-white p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><Target className="h-5 w-5" />Mục tiêu</p><p className="mt-2 text-ink/70">{active.goal}</p></div>
      <div className="mt-3 rounded-2xl bg-white p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><ListChecks className="h-5 w-5" />Ba bước cùng học</p><ol className="mt-3 space-y-3">{active.steps.map((step, index) => <li key={step} className="flex gap-3 text-ink/75"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow/30 text-sm font-black">{index + 1}</span><span>{step}</span></li>)}</ol></div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-green-soft p-4"><p className="font-extrabold text-blue">🎯 Bé thử nhé</p><p className="mt-2 text-sm text-ink/70">{active.practice}</p></div><div className="rounded-2xl bg-yellow/15 p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><Lightbulb className="h-5 w-5" />Mẹo cho phụ huynh</p><p className="mt-2 text-sm text-ink/70">{active.parentTip}</p></div></div>
      <button type="button" onClick={toggleCompleted} className={`btn mt-4 justify-center ${done ? 'border border-green bg-white text-blue' : 'btn-primary'}`}>{done ? <CheckCircle2 className="h-5 w-5 text-green" /> : <Circle className="h-5 w-5" />}{done ? 'Đã hoàn thành — bấm để bỏ đánh dấu' : 'Đánh dấu bài đã hoàn thành'}</button>
    </div>

    <ol className="mt-6 space-y-3">{lessons.map((lesson, index) => { const itemDone = completed.includes(index); const isActive = selected === index; return <li key={lesson.title}><button type="button" onClick={() => { setSelected(index); document.getElementById('lesson-title')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }} aria-current={isActive ? 'step' : undefined} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border p-3 text-left font-extrabold transition ${isActive ? 'border-blue bg-blue/5 text-blue ring-2 ring-blue/10' : itemDone ? 'border-green bg-green-soft text-blue' : 'border-hairline bg-cream/50 hover:border-blue'}`}>{itemDone ? <CheckCircle2 className="h-6 w-6 shrink-0 text-green" /> : <Circle className="h-6 w-6 shrink-0 text-ink/30" />}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm">{index + 1}</span><span className="flex-1">{lesson.title}</span><ChevronRight className="h-5 w-5 shrink-0" /></button></li> })}</ol>
    {completed.length ? <button type="button" onClick={() => setCompleted([])} className="btn mt-5"><RotateCcw className="h-4 w-4" />Đặt lại tiến độ</button> : null}
    <p className="mt-4 text-xs text-ink/55">Chọn tên bài để xem hướng dẫn. Tiến độ hiện chỉ lưu trong phiên đang mở trên thiết bị này.</p>
  </section>
}
