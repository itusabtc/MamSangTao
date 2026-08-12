'use client'

import { Flame, Medal, Sprout, Sparkles, Trophy } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { Profile } from '@/lib/community-db'

type Metric = 'xp' | 'streak'

export function LeaderboardBoard({ people }: { people: Profile[] }) {
  const [metric, setMetric] = useState<Metric>('xp')
  const ranked = useMemo(() => [...people].sort((a, b) => b[metric] - a[metric]), [metric, people])
  const top = ranked.slice(0, 3)

  return <div className="grid gap-6 lg:grid-cols-[1fr_330px]">
    <section className="overflow-hidden rounded-[32px] border border-hairline bg-white shadow-xl shadow-blue/5">
      <div className="bg-gradient-to-br from-blue to-[#5277db] px-5 py-7 text-white sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><p className="text-xs font-black uppercase tracking-[.2em] text-yellow">Giải Mầm Xanh</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">Bảng xếp hạng tuần</h1><p className="mt-2 text-white/75">Cùng học, sáng tạo và cổ vũ bạn bè tiến bộ mỗi ngày.</p></div>
          <div className="grid h-20 w-20 place-items-center rounded-3xl bg-white/15"><Trophy className="h-11 w-11 text-yellow" /></div>
        </div>
        <div className="mt-6 inline-flex rounded-2xl bg-black/10 p-1">
          <button type="button" onClick={() => setMetric('xp')} className={`rounded-xl px-4 py-2 text-sm font-extrabold ${metric === 'xp' ? 'bg-white text-blue shadow' : 'text-white'}`}><Sparkles className="mr-1.5 inline h-4 w-4" />Điểm KN</button>
          <button type="button" onClick={() => setMetric('streak')} className={`rounded-xl px-4 py-2 text-sm font-extrabold ${metric === 'streak' ? 'bg-white text-blue shadow' : 'text-white'}`}><Flame className="mr-1.5 inline h-4 w-4" />Chuỗi ngày</button>
        </div>
      </div>

      <div className="grid grid-cols-3 items-end gap-2 bg-cream px-3 pb-7 pt-9 sm:gap-4 sm:px-8">
        {[top[1], top[0], top[2]].map((person, podiumIndex) => person ? <div key={person.user_id} className={`text-center ${podiumIndex === 1 ? '-translate-y-5' : ''}`}>
          <div className={`relative mx-auto grid place-items-center rounded-full border-4 bg-white shadow-lg ${podiumIndex === 1 ? 'h-24 w-24 border-yellow text-5xl' : 'h-20 w-20 border-white text-4xl'}`}>{person.avatar}<span className={`absolute -bottom-2 grid h-7 w-7 place-items-center rounded-full text-xs font-black text-white ${podiumIndex === 1 ? 'bg-yellow text-ink' : podiumIndex === 0 ? 'bg-slate-400' : 'bg-orange-500'}`}>{podiumIndex === 1 ? 1 : podiumIndex === 0 ? 2 : 3}</span></div>
          <strong className="mt-4 block truncate text-sm text-ink sm:text-base">{person.display_name}</strong><span className="text-xs font-extrabold text-blue">{person[metric].toLocaleString('vi-VN')} {metric === 'xp' ? 'KN' : 'ngày'}</span>
        </div> : null)}
      </div>

      <ol className="divide-y divide-hairline px-4 sm:px-7">{ranked.slice(3).map((person, index) => <li key={person.user_id} className="flex min-h-20 items-center gap-3 py-3">
        <span className="w-7 text-center text-sm font-black text-ink/50">{index + 4}</span><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-cream text-2xl">{person.avatar}</span><span className="min-w-0 flex-1"><strong className="block truncate text-ink">{person.display_name}</strong><small className="text-ink/50">@{person.username} · 🔥 {person.streak} ngày</small></span><strong className="whitespace-nowrap text-blue">{person[metric].toLocaleString('vi-VN')} <small>{metric === 'xp' ? 'KN' : 'ngày'}</small></strong>
      </li>)}</ol>
    </section>

    <aside className="space-y-4">
      <div className="rounded-[28px] border border-hairline bg-white p-6"><div className="flex items-center gap-3"><Medal className="h-8 w-8 text-yellow" /><div><strong className="block text-lg text-ink">Cách thăng hạng</strong><span className="text-sm text-ink/55">Top 10 lên giải tiếp theo</span></div></div><div className="mt-5 h-3 overflow-hidden rounded-full bg-cream"><div className="h-full w-3/5 rounded-full bg-green" /></div><p className="mt-3 text-sm leading-6 text-ink/65">Hoàn thành bài học, nhiệm vụ và dự án trong Xưởng để nhận điểm KN.</p></div>
      <div className="rounded-[28px] bg-[#eaf5ed] p-6"><Sprout className="h-9 w-9 text-green" /><h2 className="mt-3 text-xl font-black text-ink">Thi đua lành mạnh</h2><p className="mt-2 text-sm leading-6 text-ink/65">Không so sánh áp lực. Mỗi tuần là một khởi đầu mới để bé tự vượt qua chính mình.</p></div>
    </aside>
  </div>
}
