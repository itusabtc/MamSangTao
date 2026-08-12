'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, Circle, Lightbulb, ListChecks, RotateCcw, Target, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Lesson } from '@/lib/courses'
import { LessonActivity } from '@/components/lesson-activity'

export function CourseProgress({ lessons, courseSlug, courseIcon }: { lessons: readonly Lesson[]; courseSlug: string; courseIcon: string }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const percent = Math.round((completed.length / lessons.length) * 100)
  const active = selected === null ? null : lessons[selected]
  const done = selected !== null && completed.includes(selected)

  useEffect(() => {
    if (selected === null) return
    const oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.addEventListener('keydown', onKey); requestAnimationFrame(() => closeRef.current?.focus())
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKey) }
  }, [selected])

  function toggleCompleted() { if(selected===null)return; setCompleted((items) => done ? items.filter((item) => item !== selected) : [...items, selected]) }

  return <section className="rounded-3xl border border-hairline bg-white p-5 shadow-sm sm:p-7" aria-labelledby="lesson-title">
    <div className="flex items-center justify-between gap-4"><div><p className="kicker">Lộ trình học</p><h2 id="lesson-title" className="mt-2 text-2xl">Bài học của bé</h2></div><strong className="rounded-full bg-green-soft px-4 py-2 text-sm text-blue">{percent}% hoàn thành</strong></div>
    <div className="mt-4 h-3 overflow-hidden rounded-full bg-cream"><div className="h-full rounded-full bg-green transition-all" style={{ width: `${percent}%` }} /></div>
    <p className="mt-4 rounded-2xl bg-blue/5 px-4 py-3 text-sm font-bold text-blue">Chọn một bài để mở phòng học toàn màn hình có hướng dẫn và thực hành tương tác.</p>
    <ol className="mt-5 space-y-3">{lessons.map((lesson, index) => { const itemDone = completed.includes(index); return <li key={lesson.title}><button type="button" onClick={() => setSelected(index)} className={`flex min-h-16 w-full items-center gap-3 rounded-2xl border p-3 text-left font-extrabold transition ${itemDone ? 'border-green bg-green-soft text-blue' : 'border-hairline bg-cream/50 hover:border-blue hover:bg-blue/5'}`}>{itemDone ? <CheckCircle2 className="h-6 w-6 shrink-0 text-green" /> : <Circle className="h-6 w-6 shrink-0 text-ink/30" />}<span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-sm">{index + 1}</span><span className="flex-1">{lesson.title}</span><ChevronRight className="h-5 w-5 shrink-0" /></button></li> })}</ol>
    {completed.length ? <button type="button" onClick={() => setCompleted([])} className="btn mt-5"><RotateCcw className="h-4 w-4" />Đặt lại tiến độ</button> : null}
    <p className="mt-4 text-xs text-ink/55">Tiến độ hiện chỉ lưu trong phiên đang mở trên thiết bị này.</p>

    {active && selected !== null ? <div className="fixed inset-0 z-[110] bg-[#eef5ef]" role="dialog" aria-modal="true" aria-labelledby="lesson-dialog-title">
      <div className="grid h-dvh w-full grid-rows-[auto_minmax(0,1fr)] bg-white">
        <header className="z-20 flex items-center gap-2 border-b border-hairline bg-white px-3 py-2.5 sm:gap-3 sm:px-6 sm:py-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blue text-2xl">{courseIcon}</span><div className="min-w-0 flex-1"><p className="text-xs font-extrabold uppercase tracking-wider text-coral">Bài {selected+1}/{lessons.length}</p><h2 id="lesson-dialog-title" className="truncate text-lg sm:text-2xl">{active.title}</h2></div><nav aria-label="Chuyển bài học" className="flex shrink-0 items-center gap-1.5 sm:gap-2"><button type="button" disabled={selected===0} onClick={()=>setSelected(value=>value===null?0:Math.max(0,value-1))} aria-label="Bài trước" className="btn min-h-10 border border-hairline bg-white px-3 disabled:opacity-35"><ArrowLeft className="h-4 w-4"/><span className="hidden xl:inline">Bài trước</span></button><div className="hidden items-center gap-2 lg:flex"><span className="text-sm font-extrabold text-ink/55">{selected+1}/{lessons.length}</span><div className="h-2 w-20 overflow-hidden rounded-full bg-cream xl:w-28"><div className="h-full bg-blue" style={{width:`${((selected+1)/lessons.length)*100}%`}}/></div></div><button type="button" disabled={selected===lessons.length-1} onClick={()=>setSelected(value=>value===null?0:Math.min(lessons.length-1,value+1))} aria-label="Bài tiếp" className="btn btn-primary min-h-10 px-3"><span className="hidden xl:inline">Bài tiếp</span><ArrowRight className="h-4 w-4"/></button></nav><div className="hidden rounded-full bg-green-soft px-4 py-2 text-sm font-extrabold text-blue md:block">{done?'✓ Đã hoàn thành':'Đang học'}</div><button ref={closeRef} type="button" onClick={() => setSelected(null)} aria-label="Đóng bài học" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-hairline bg-white"><X className="h-6 w-6"/></button></header>
        <div className="min-h-0 overflow-y-auto lg:grid lg:grid-cols-[minmax(0,1.12fr)_minmax(380px,.88fr)] lg:overflow-hidden">
          <div className="min-h-0 bg-cream/60 p-3 sm:p-5 lg:overflow-y-auto"><div className="mx-auto flex h-full max-w-3xl min-h-[520px] flex-col"><div className="mb-2 flex items-center justify-between"><p className="text-sm font-extrabold text-blue">Thực hành tương tác</p><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-ink/55">Bấm trực tiếp để thử</span></div><div className="min-h-0 flex-1"><LessonActivity courseSlug={courseSlug} lessonIndex={selected}/></div></div></div>
          <aside className="min-h-0 border-l border-hairline bg-white p-4 sm:p-5 lg:overflow-y-auto"><div className="mx-auto max-w-2xl"><div className="rounded-2xl bg-blue/5 p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><Target className="h-5 w-5"/>Mục tiêu</p><p className="mt-2 text-sm text-ink/70">{active.goal}</p></div><div className="mt-3 rounded-2xl border border-hairline p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><ListChecks className="h-5 w-5"/>Ba bước cùng học</p><ol className="mt-3 space-y-3">{active.steps.map((step,index)=><li key={step} className="flex gap-3 text-sm leading-relaxed text-ink/75"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow/30 font-black">{index+1}</span>{step}</li>)}</ol></div><div className="mt-3 grid gap-3 xl:grid-cols-2"><div className="rounded-2xl bg-green-soft p-4"><p className="font-extrabold text-blue">🎯 Bé thử nhé</p><p className="mt-2 text-sm text-ink/70">{active.practice}</p></div><div className="rounded-2xl bg-yellow/15 p-4"><p className="flex items-center gap-2 font-extrabold text-blue"><Lightbulb className="h-5 w-5"/>Mẹo phụ huynh</p><p className="mt-2 text-sm text-ink/70">{active.parentTip}</p></div></div><button type="button" onClick={toggleCompleted} className={`btn mt-4 w-full justify-center ${done?'border border-green bg-white text-blue':'btn-primary'}`}>{done?<CheckCircle2 className="h-5 w-5 text-green"/>:<Circle className="h-5 w-5"/>}{done?'Đã hoàn thành — bấm để bỏ đánh dấu':'Đánh dấu bài đã hoàn thành'}</button></div></aside>
        </div>
      </div>
    </div> : null}
  </section>
}
