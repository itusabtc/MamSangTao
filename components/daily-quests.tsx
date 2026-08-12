'use client'
/* eslint-disable react-hooks/set-state-in-effect */
import { CalendarDays, CheckCircle2, Flame, Gift, Trophy } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { playLearningSound, speakVietnamese } from '@/lib/learning-audio'
import { readProgress, type LearningProgress, writeProgress } from '@/lib/learning-progress'

export function DailyQuests({ courseSlug, completedCount }: { courseSlug: string; completedCount: number }) {
  void courseSlug
  const [progress, setProgress] = useState<LearningProgress>(() => readProgress())
  const [claimed, setClaimed] = useState<string[]>([])
  useEffect(() => {
    setProgress(readProgress())
    const onProgress = () => setProgress(readProgress())
    window.addEventListener('mam-progress', onProgress)
    setClaimed(JSON.parse(localStorage.getItem('mam-quest-claims') || '[]') as string[])
    return () => window.removeEventListener('mam-progress', onProgress)
  }, [])
  const totalCompleted = useMemo(() => Object.values(progress.completedLessons).reduce((sum, items) => sum + items.length, 0), [progress])
  const quests = [
    { id: 'lesson', icon: '🎯', title: 'Hoàn thành 1 bài học', value: Math.min(completedCount, 1), goal: 1, xp: 20, seeds: 5 },
    { id: 'perfect', icon: '⭐', title: 'Hoàn thành 1 bài hoàn hảo', value: Math.min(progress.perfectLessons, 1), goal: 1, xp: 30, seeds: 8 },
    { id: 'minutes', icon: '⏱️', title: 'Học trong 10 phút', value: Math.min(progress.studyMinutes, 10), goal: 10, xp: 40, seeds: 10 },
  ]
  function claim(id: string) {
    const quest = quests.find(item => item.id === id); if (!quest || claimed.includes(id)) return
    const next = [...claimed, id]; setClaimed(next); localStorage.setItem('mam-quest-claims', JSON.stringify(next))
    const updated = readProgress(); updated.xp += quest.xp; updated.seeds += quest.seeds; writeProgress(updated)
    playLearningSound('reward'); speakVietnamese(`Bé nhận được ${quest.xp} điểm kinh nghiệm và ${quest.seeds} Hạt Mầm.`)
  }
  const monthlyGoal = 20
  return <section className="mt-8 overflow-hidden rounded-[28px] border border-hairline bg-white shadow-sm">
    <header className="flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-blue to-violet p-5 text-white"><div><p className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-yellow"><CalendarDays className="h-4 w-4"/>Nhiệm vụ hôm nay</p><h3 className="mt-1 text-2xl text-white">Mỗi ngày một bước sáng tạo</h3></div><div className="flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-2 font-black"><Flame className="h-6 w-6 text-yellow"/>{progress.streak} ngày liên tiếp</div></header>
    <div className="grid gap-3 p-4 sm:p-5">{quests.map(q => { const done = q.value >= q.goal, got = claimed.includes(q.id); return <article key={q.id} className="grid items-center gap-3 rounded-2xl bg-cream/70 p-4 sm:grid-cols-[auto_1fr_auto]"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-2xl shadow-sm">{q.icon}</span><div><div className="flex items-center justify-between gap-3"><strong>{q.title}</strong><span className="text-xs font-black text-blue">+{q.xp} XP · +{q.seeds} 🌱</span></div><div className="mt-2 h-3 overflow-hidden rounded-full bg-white"><div className={`h-full rounded-full ${done ? 'bg-green' : 'bg-blue'}`} style={{ width: `${Math.min(100, q.value / q.goal * 100)}%` }}/></div><p className="mt-1 text-xs text-ink/55">{q.value}/{q.goal} hoàn thành</p></div><button type="button" disabled={!done || got} onClick={() => claim(q.id)} className={`btn min-h-11 justify-center ${got ? 'border border-green bg-green-soft text-green' : done ? 'btn-primary' : 'border border-hairline bg-white opacity-45'}`}>{got ? <><CheckCircle2 className="h-4 w-4"/>Đã nhận</> : <><Gift className="h-4 w-4"/>Nhận thưởng</>}</button></article> })}</div>
    <footer className="border-t border-hairline bg-yellow/10 px-5 py-4"><div className="flex items-center gap-3"><Trophy className="h-8 w-8 text-yellow"/><div className="flex-1"><strong>Huy hiệu tháng: hoàn thành {monthlyGoal} bài</strong><p className="text-sm text-ink/60">Còn {Math.max(0, monthlyGoal - totalCompleted)} bài để nhận huy hiệu Nhà sáng tạo tháng.</p></div><span className="rounded-full bg-white px-3 py-1 text-sm font-black text-blue">{Math.min(totalCompleted, monthlyGoal)}/{monthlyGoal}</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-white"><div className="h-full rounded-full bg-yellow" style={{ width: `${Math.min(100, totalCompleted / monthlyGoal * 100)}%` }}/></div></footer>
  </section>
}
