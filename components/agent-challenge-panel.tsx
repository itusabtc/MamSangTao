'use client'

import Link from 'next/link'
import { Bot, Swords, Wifi } from 'lucide-react'
import { CHALLENGE_AGENTS } from '@/lib/challenge-agents'
import { playLearningSound } from '@/lib/learning-audio'

export function AgentChallengePanel() {
  return <section className="rounded-[28px] border border-hairline bg-white p-5 shadow-sm">
    <div className="flex items-start gap-3"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-green-soft text-green"><Bot/></span><div><h2 className="text-2xl">Đối thủ máy đang online</h2><p className="mt-1 text-sm text-ink/60">Luôn có người chơi cùng. Chọn Agent vừa sức rồi vào đấu trường.</p></div></div>
    <div className="mt-4 grid gap-3 sm:grid-cols-2">{CHALLENGE_AGENTS.map(agent => <article key={agent.id} className={`rounded-2xl p-4 ${agent.color}`}>
      <div className="flex items-center gap-3"><span className="text-3xl">{agent.avatar}</span><div className="min-w-0 flex-1"><strong>{agent.name}</strong><p className="text-xs text-ink/55">{agent.elo} ELO · {agent.level}</p></div><span className="flex items-center gap-1 text-xs font-black text-green"><Wifi className="h-3.5 w-3.5"/>Online</span></div>
      <Link href={`/khoa-hoc/co-vua-cho-be?agent=${agent.id}#dau-truong`} onClick={() => playLearningSound('tap')} className="btn mt-3 w-full border border-hairline bg-white"><Swords className="h-4 w-4"/>Thách đấu</Link>
    </article>)}</div>
    <details className="mt-4 rounded-2xl bg-cream/70 p-4"><summary className="cursor-pointer font-black text-blue">Cách tính điểm xếp hạng</summary><ul className="mt-3 space-y-1 text-sm text-ink/65"><li>Thắng: cộng 6–32 ELO; thắng đối thủ mạnh được nhiều hơn.</li><li>Thua: trừ 4–24 ELO; thua đối thủ mạnh bị trừ ít hơn.</li><li>10 trận đầu điều chỉnh nhanh để tìm đúng trình độ. Bé vẫn nhận 8 XP và 2 Hạt Mầm khi đã cố gắng hoàn thành.</li></ul></details>
  </section>
}
