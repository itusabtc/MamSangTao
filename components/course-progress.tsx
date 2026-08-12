'use client'
/* eslint-disable react-hooks/set-state-in-effect */

import { ArrowRight, CheckCircle2, Flame, Heart, LockKeyhole, Map, Sparkles, Star, Target, Volume2, VolumeX, X } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson } from '@/lib/courses'
import { LessonActivity } from '@/components/lesson-activity'
import { CourseArena } from '@/components/course-arena'
import { DailyQuests } from '@/components/daily-quests'
import { playLearningSound, setAudioEnabled, speakVietnamese } from '@/lib/learning-audio'
import { readProgress, recordStudy } from '@/lib/learning-progress'

type Stage = 'guide' | 'practice' | 'check' | 'result'

export function CourseProgress({ lessons, courseSlug, courseIcon, autoOpenFirst = false }: { lessons: readonly Lesson[]; courseSlug: string; courseIcon: string; autoOpenFirst?: boolean }) {
  const [completed, setCompleted] = useState<number[]>([])
  const [selected, setSelected] = useState<number | null>(autoOpenFirst ? 0 : null)
  const [stage, setStage] = useState<Stage>('guide')
  const [hearts, setHearts] = useState(5)
  const [answer, setAnswer] = useState<number | null>(null)
  const [mistakes, setMistakes] = useState(0)
  const [reward, setReward] = useState({ xp: 0, seeds: 0 })
  const [soundOn, setSoundOn] = useState(true)
  const closeRef = useRef<HTMLButtonElement>(null)
  const active = selected === null ? null : lessons[selected]
  const percent = Math.round((completed.length / lessons.length) * 100)

  useEffect(() => { setCompleted(readProgress().completedLessons[courseSlug] || []) }, [courseSlug])
  useEffect(() => {
    if (selected === null) return
    const oldOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') closeLesson() }
    document.addEventListener('keydown', onKey); requestAnimationFrame(() => closeRef.current?.focus())
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKey) }
  }, [selected])

  const choices = useMemo(() => active ? [
    active.goal,
    'Làm thật nhanh và bỏ qua bước thử lại.',
    'Chỉ xem hướng dẫn, không cần tự thực hành.',
  ] : [], [active])

  function openLesson(index: number) {
    if (index > completed.length) { playLearningSound('wrong'); speakVietnamese('Bé hãy hoàn thành bài trước để mở khóa nhé.'); return }
    setSelected(index); setStage('guide'); setHearts(5); setMistakes(0); setAnswer(null); setReward({ xp: 0, seeds: 0 })
  }
  function closeLesson() { setSelected(null); setStage('guide'); setAnswer(null) }
  function nextStage() {
    playLearningSound('move')
    if (stage === 'guide') setStage('practice')
    else if (stage === 'practice') { setStage('check'); setAnswer(null); speakVietnamese('Chọn mục tiêu đúng nhất của bài học này.') }
  }
  function choose(index: number) {
    if (answer !== null) return
    setAnswer(index)
    if (index === 0) { playLearningSound('correct'); speakVietnamese('Chính xác! Bé đã hiểu mục tiêu của bài.') }
    else { setHearts(value => Math.max(0, value - 1)); setMistakes(value => value + 1); playLearningSound('wrong'); speakVietnamese('Chưa chính xác. Đáp án màu xanh giúp bé hiểu lại nhé.') }
  }
  function finishLesson() {
    if (selected === null) return
    const result = recordStudy(courseSlug, selected, mistakes === 0)
    setReward({ xp: result.xp, seeds: result.seeds })
    setCompleted(result.progress.completedLessons[courseSlug] || [])
    setStage('result'); playLearningSound('complete')
    speakVietnamese(`Chúc mừng! Bé nhận ${result.xp} điểm kinh nghiệm và ${result.seeds} Hạt Mầm.`)
  }
  function continueAfterResult() {
    if (selected === null) return
    const next = selected + 1
    if (next < lessons.length) openLesson(next); else closeLesson()
  }
  function toggleSound() { const next = !soundOn; setSoundOn(next); setAudioEnabled(next); if (next) playLearningSound('correct') }

  return <section className="rounded-[32px] border border-hairline bg-white p-5 shadow-sm sm:p-7" aria-labelledby="lesson-title">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><p className="kicker">Bản đồ học tập</p><h2 id="lesson-title" className="mt-2 text-3xl">Hành trình của bé</h2></div><div className="flex items-center gap-2"><strong className="rounded-full bg-green-soft px-4 py-2 text-sm text-blue">{percent}% hoàn thành</strong><button type="button" onClick={toggleSound} className="grid h-11 w-11 place-items-center rounded-full border border-hairline" aria-label={soundOn ? 'Tắt âm thanh' : 'Bật âm thanh'}>{soundOn ? <Volume2 className="h-5 w-5"/> : <VolumeX className="h-5 w-5"/>}</button></div></div>
    <div className="mt-5 h-3 overflow-hidden rounded-full bg-cream"><div className="h-full rounded-full bg-green transition-all" style={{ width: `${percent}%` }}/></div>
    <div className="mt-7 overflow-hidden rounded-[28px] bg-gradient-to-b from-sky-100 to-green-soft/60 p-5 sm:p-8">
      <div className="mb-6 flex items-center justify-between"><p className="flex items-center gap-2 font-extrabold text-blue"><Map className="h-5 w-5"/>Phần 1 · Khám phá nền tảng</p><span className="rounded-full bg-white px-3 py-1 text-sm font-black text-blue">⭐ {completed.length * 3}</span></div>
      <ol className="mx-auto flex max-w-2xl flex-col items-center gap-5">{lessons.map((lesson, index) => {
        const done = completed.includes(index), unlocked = index <= completed.length, offset = index % 4 === 1 ? 'sm:translate-x-24' : index % 4 === 3 ? 'sm:-translate-x-24' : ''
        return <li key={lesson.title} className={`relative flex w-full items-center gap-4 ${offset} ${index % 2 ? 'flex-row-reverse text-right' : ''}`}>
          {index < lessons.length - 1 ? <span className="absolute left-1/2 top-20 h-10 w-1 -translate-x-1/2 rounded-full bg-white/80"/> : null}
          <button type="button" onClick={() => openLesson(index)} aria-label={`${unlocked ? 'Mở' : 'Khóa'} bài ${index + 1}: ${lesson.title}`} className={`relative grid h-20 w-20 shrink-0 place-items-center rounded-full border-b-[7px] text-2xl font-black transition active:translate-y-1 active:border-b-2 ${done ? 'border-green/70 bg-green text-white' : unlocked ? 'border-blue/75 bg-blue text-white shadow-xl' : 'border-slate-300 bg-slate-200 text-slate-400'}`}>
            {done ? <CheckCircle2 className="h-9 w-9"/> : unlocked ? index + 1 : <LockKeyhole className="h-7 w-7"/>}
          </button>
          <div className={`min-w-0 flex-1 rounded-2xl border border-white/80 bg-white/85 p-4 shadow-sm ${!unlocked ? 'opacity-55' : ''}`}><p className="text-xs font-black uppercase tracking-wider text-coral">{done ? '3 sao · Hoàn thành' : unlocked ? 'Bài kế tiếp' : 'Chưa mở khóa'}</p><strong className="mt-1 block text-blue">{lesson.title}</strong><p className="mt-1 line-clamp-2 text-sm text-ink/60">{lesson.goal}</p></div>
        </li>
      })}</ol>
      <div className="mx-auto mt-8 max-w-md rounded-3xl border-2 border-dashed border-yellow bg-white p-5 text-center"><span className="text-4xl">🎁</span><h3 className="mt-2">Rương cuối phần</h3><p className="mt-1 text-sm text-ink/60">Hoàn thành mọi bài để nhận 100 Hạt Mầm và huy hiệu.</p></div>
    </div>
    <DailyQuests courseSlug={courseSlug} completedCount={completed.length}/>
    <div className="mt-8"><CourseArena courseTitle="Cuối khóa" courseIcon={courseIcon} lessons={lessons}/></div>

    {active && selected !== null ? <div className="fixed inset-0 z-[110] bg-white" role="dialog" aria-modal="true" aria-labelledby="lesson-dialog-title">
      <div className="grid h-dvh grid-rows-[auto_minmax(0,1fr)_auto]">
        <header className="flex items-center gap-3 border-b border-hairline px-4 py-3 sm:px-8"><button ref={closeRef} type="button" onClick={closeLesson} aria-label="Đóng bài học" className="grid h-11 w-11 place-items-center rounded-full hover:bg-cream"><X className="h-6 w-6"/></button><div className="h-4 flex-1 overflow-hidden rounded-full bg-slate-200"><div className="h-full rounded-full bg-green transition-all" style={{ width: stage === 'guide' ? '20%' : stage === 'practice' ? '55%' : stage === 'check' ? '82%' : '100%' }}/></div><div className="flex items-center gap-1 font-black text-coral"><Heart className="h-7 w-7 fill-current"/>{hearts}</div></header>
        <main className="min-h-0 overflow-y-auto p-4 sm:p-7">
          {stage === 'guide' ? <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center"><p className="kicker">Bài {selected + 1}/{lessons.length}</p><h2 id="lesson-dialog-title" className="mt-3 text-4xl sm:text-5xl">{active.title}</h2><div className="mt-7 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-start"><span className="grid h-24 w-24 place-items-center rounded-[28px] bg-violet/10 text-5xl">🦉</span><div className="rounded-[28px] border border-hairline p-5"><h3 className="flex items-center gap-2 text-blue"><Target className="h-6 w-6"/>Mục tiêu</h3><p className="mt-3 text-lg text-ink/70">{active.goal}</p><button type="button" onClick={() => speakVietnamese(`${active.title}. ${active.goal}. ${active.steps.join('. ')}`)} className="btn mt-4 border border-violet/30 bg-violet/5 text-violet"><Volume2 className="h-5 w-5"/>Nghe Trợ giảng Mầm</button></div></div><div className="mt-6 grid gap-3 sm:grid-cols-3">{active.steps.map((step, index) => <div key={step} className="rounded-2xl bg-cream p-4"><span className="grid h-8 w-8 place-items-center rounded-full bg-yellow/30 font-black">{index + 1}</span><p className="mt-3 text-sm leading-relaxed">{step}</p></div>)}</div></div> : null}
          {stage === 'practice' ? <div className="mx-auto h-full min-h-[560px] max-w-6xl"><div className="mb-3 flex items-center justify-between"><div><p className="kicker">Thử thách thực hành</p><h2 className="mt-1 text-2xl">{active.practice}</h2></div><button type="button" onClick={() => speakVietnamese(active.practice)} className="grid h-12 w-12 place-items-center rounded-full bg-violet text-white" aria-label="Nghe yêu cầu"><Volume2/></button></div><div className="h-[calc(100%-76px)] min-h-[500px] overflow-hidden rounded-[28px] border border-hairline bg-cream/50"><LessonActivity courseSlug={courseSlug} lessonIndex={selected}/></div></div> : null}
          {stage === 'check' ? <div className="mx-auto flex min-h-full max-w-3xl flex-col justify-center"><p className="kicker">Kiểm tra nhanh</p><h2 className="mt-3 text-3xl">Mục tiêu đúng nhất của “{active.title}” là gì?</h2><div className="mt-7 grid gap-3">{choices.map((choice, index) => <button key={choice} type="button" onClick={() => choose(index)} className={`min-h-20 rounded-2xl border-2 p-4 text-left font-bold transition ${answer === null ? 'border-hairline hover:border-blue' : index === 0 ? 'border-green bg-green-soft' : answer === index ? 'border-coral bg-coral/10' : 'border-hairline opacity-45'}`}><span className="mr-3 inline-grid h-9 w-9 place-items-center rounded-xl bg-white shadow-sm">{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div>{answer !== null ? <div className={`mt-5 rounded-2xl p-4 font-bold ${answer === 0 ? 'bg-green-soft text-green' : 'bg-coral/10 text-coral'}`}>{answer === 0 ? '✓ Chính xác! Bé đã sẵn sàng hoàn thành bài.' : 'Chưa đúng — đáp án màu xanh giải thích mục tiêu của bài. Bé vẫn có thể tiếp tục.'}</div> : null}</div> : null}
          {stage === 'result' ? <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center text-center"><div className="grid h-32 w-32 place-items-center rounded-full bg-yellow/25 text-7xl shadow-lg">🏆</div><p className="kicker mt-7">Hoàn thành bài học</p><h2 className="mt-2 text-4xl">Tuyệt vời, nhà sáng tạo nhí!</h2><div className="mt-7 grid w-full gap-3 sm:grid-cols-3"><Result icon={<Star/>} value={mistakes === 0 ? '100%' : `${Math.max(60, 100 - mistakes * 20)}%`} label="Chính xác"/><Result icon={<Sparkles/>} value={`+${reward.xp}`} label="Điểm XP"/><Result icon={<span className="text-2xl">🌱</span>} value={`+${reward.seeds}`} label="Hạt Mầm"/></div><p className="mt-5 flex items-center gap-2 rounded-full bg-green-soft px-5 py-3 font-bold text-blue"><Flame className="text-coral"/>Chuỗi học hôm nay đã được ghi nhận</p></div> : null}
        </main>
        <footer className={`border-t px-4 py-3 sm:px-8 ${answer !== null && stage === 'check' ? answer === 0 ? 'bg-green-soft' : 'bg-coral/10' : 'bg-white'}`}><div className="mx-auto flex max-w-6xl items-center justify-between gap-3"><p className="hidden font-bold text-ink/60 sm:block">{stage === 'guide' ? 'Đọc hướng dẫn rồi bắt đầu.' : stage === 'practice' ? 'Thử trực tiếp, sai cũng không sao.' : stage === 'check' ? (answer === null ? 'Chọn một đáp án để kiểm tra.' : 'Xem phản hồi rồi tiếp tục.') : 'Phần thưởng đã vào hồ sơ của bé.'}</p>{stage === 'guide' || stage === 'practice' ? <button type="button" onClick={nextStage} className="btn btn-primary ml-auto min-h-14 px-8">{stage === 'guide' ? 'Bắt đầu thực hành' : 'Kiểm tra'}<ArrowRight className="h-5 w-5"/></button> : stage === 'check' ? <button type="button" disabled={answer === null} onClick={finishLesson} className="btn btn-primary ml-auto min-h-14 px-8 disabled:opacity-40">Hoàn thành bài<CheckCircle2 className="h-5 w-5"/></button> : <button type="button" onClick={continueAfterResult} className="btn btn-primary ml-auto min-h-14 px-8">{selected < lessons.length - 1 ? 'Bài tiếp theo' : 'Về bản đồ'}<ArrowRight className="h-5 w-5"/></button>}</div></footer>
      </div>
    </div> : null}
  </section>
}

function Result({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return <div className="rounded-2xl border border-hairline bg-white p-4 shadow-sm"><span className="mx-auto grid h-10 w-10 place-items-center text-yellow">{icon}</span><strong className="mt-2 block text-2xl text-blue">{value}</strong><p className="text-sm text-ink/55">{label}</p></div>
}
