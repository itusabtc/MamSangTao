'use client'

export type LearningProgress = {
  xp: number
  seeds: number
  streak: number
  lastStudyDate: string
  completedLessons: Record<string, number[]>
  perfectLessons: number
  studyMinutes: number
  matches: number
  wins: number
  elo: number
  trophies: string[]
  creations: Array<{ type: 'Tranh' | 'Truyện' | 'Game'; title: string; icon: string }>
}

export const PROGRESS_KEY = 'mam-learning-progress-v2'

export const DEFAULT_PROGRESS: LearningProgress = {
  xp: 120,
  seeds: 80,
  streak: 1,
  lastStudyDate: '',
  completedLessons: {},
  perfectLessons: 0,
  studyMinutes: 0,
  matches: 0,
  wins: 0,
  elo: 800,
  trophies: ['🌱 Mầm đầu tiên'],
  creations: [
    { type: 'Tranh', title: 'Chuyến bay ngoài vũ trụ', icon: '🎨' },
    { type: 'Truyện', title: 'Chú mèo Mít dũng cảm', icon: '📖' },
    { type: 'Game', title: 'Khu rừng kỳ thú', icon: '🎮' },
  ],
}

function dateKey(date = new Date()) { return date.toISOString().slice(0, 10) }

export function readProgress(): LearningProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}') as Partial<LearningProgress>
    return { ...DEFAULT_PROGRESS, ...saved, completedLessons: saved.completedLessons || {}, trophies: saved.trophies || DEFAULT_PROGRESS.trophies, creations: saved.creations || DEFAULT_PROGRESS.creations }
  } catch { return DEFAULT_PROGRESS }
}

export function writeProgress(progress: LearningProgress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
  window.dispatchEvent(new CustomEvent('mam-progress', { detail: progress }))
}

export function recordStudy(courseSlug: string, lessonIndex: number, perfect: boolean) {
  const progress = readProgress()
  const today = dateKey()
  if (progress.lastStudyDate !== today) {
    const yesterday = dateKey(new Date(Date.now() - 86400000))
    progress.streak = progress.lastStudyDate === yesterday ? progress.streak + 1 : 1
  }
  progress.lastStudyDate = today
  const lessons = progress.completedLessons[courseSlug] || []
  const firstCompletion = !lessons.includes(lessonIndex)
  progress.completedLessons[courseSlug] = firstCompletion ? [...lessons, lessonIndex] : lessons
  if (firstCompletion) {
    progress.xp += perfect ? 60 : 40
    progress.seeds += perfect ? 20 : 12
    progress.studyMinutes += 5
    if (perfect) progress.perfectLessons += 1
  }
  const total = Object.values(progress.completedLessons).reduce((sum, items) => sum + items.length, 0)
  if (total >= 3 && !progress.trophies.includes('⭐ Học giả nhí')) progress.trophies.push('⭐ Học giả nhí')
  if (progress.streak >= 3 && !progress.trophies.includes('🔥 Chuỗi 3 ngày')) progress.trophies.push('🔥 Chuỗi 3 ngày')
  writeProgress(progress)
  return { progress, firstCompletion, xp: firstCompletion ? (perfect ? 60 : 40) : 0, seeds: firstCompletion ? (perfect ? 20 : 12) : 0 }
}

export function recordMatch(won: boolean) {
  const progress = readProgress()
  progress.matches += 1
  if (won) { progress.wins += 1; progress.elo += 24; progress.xp += 30; progress.seeds += 10 }
  else progress.elo = Math.max(100, progress.elo - 8)
  if (progress.wins >= 1 && !progress.trophies.includes('🏆 Chiến thắng đầu tiên')) progress.trophies.push('🏆 Chiến thắng đầu tiên')
  writeProgress(progress)
  return progress
}
