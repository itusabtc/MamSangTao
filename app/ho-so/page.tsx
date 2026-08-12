import type { Metadata } from 'next'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import { Flame, Leaf, LogOut, Medal, Swords, UserPlus, Users } from 'lucide-react'
import { requireChatGPTUser, chatGPTSignOutPath } from '@/app/chatgpt-auth'
import { profileData } from '@/lib/community-db'
import { ProfileCommunity } from '@/components/profile-community'
import { ProfileShowcase } from '@/components/profile-showcase'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = { title: 'Hồ sơ của bé — Mầm Sáng Tạo', description: 'Thành tích, tác phẩm, bạn bè và lời thách đấu của bé.' }

export default async function ProfilePage() {
  const user = await requireChatGPTUser('/ho-so')
  const data = await profileData(user)
  const profile = data.profile!
  return <><SiteHeader variant="page"/><main className="wrap py-8">
    <section className="overflow-hidden rounded-[32px] border border-hairline bg-white shadow-sm">
      <div className="bg-gradient-to-r from-sky-200 via-green-soft to-yellow/30 p-7 sm:p-10"><div className="flex flex-wrap items-center gap-5"><span className="grid h-28 w-28 place-items-center rounded-[32px] bg-white text-6xl shadow-lg">{profile.avatar}</span><div className="flex-1"><p className="kicker">Hồ sơ Mầm</p><h1 className="mt-2 text-4xl">{profile.display_name}</h1><p className="mt-1 font-bold text-ink/55">@{profile.username}</p><p className="mt-3 text-ink/70">{profile.bio}</p></div><Link href={chatGPTSignOutPath('/')} className="btn border border-hairline bg-white"><LogOut className="h-4 w-4"/>Đăng xuất</Link></div></div>
      <div className="grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4"><Stat icon={<Flame/>} value={profile.streak} label="Ngày liên tiếp"/><Stat icon={<Medal/>} value={profile.xp} label="Tổng XP"/><Stat icon={<Leaf/>} value={profile.seeds} label="Hạt Mầm"/><Stat icon={<Users/>} value={data.followers} label="Người theo dõi"/></div>
    </section>
    <ProfileShowcase/>
    <div className="mt-7 grid gap-7 lg:grid-cols-[1.1fr_.9fr]"><ProfileCommunity/><aside className="space-y-5">
      <section className="rounded-[28px] border border-hairline bg-white p-5"><h2 className="flex items-center gap-2 text-2xl"><UserPlus className="text-blue"/>Đang theo dõi</h2><div className="mt-4 space-y-2">{data.following.map(person=><div key={person.user_id} className="flex items-center gap-3 rounded-2xl bg-cream/70 p-3"><span className="text-2xl">{person.avatar}</span><strong className="flex-1">{person.display_name}</strong><span className="text-sm font-bold text-blue">{person.xp} XP</span></div>)}{!data.following.length?<p className="text-sm text-ink/55">Tìm một người bạn đầu tiên để học vui hơn nhé.</p>:null}</div></section>
      <section className="rounded-[28px] bg-blue p-5 text-white"><h2 className="flex items-center gap-2 text-2xl text-white"><Swords/>Lời thách đấu</h2><div className="mt-4 space-y-2">{data.challenges.map((item:any)=><div key={item.id} className="rounded-2xl bg-white/15 p-3"><strong>{item.avatar} {item.display_name}</strong><p className="text-sm text-white/75">Mời bé thi đấu cờ vua · {item.status}</p></div>)}{!data.challenges.length?<p className="text-sm text-white/75">Chưa có lời thách đấu mới.</p>:null}</div></section>
    </aside></div>
  </main><SiteFooter/></>
}
function Stat({icon,value,label}:{icon:React.ReactNode;value:number;label:string}){return <div className="flex items-center gap-3 rounded-2xl bg-cream/70 p-4"><span className="text-blue">{icon}</span><div><strong className="text-2xl text-blue">{value}</strong><p className="text-sm text-ink/55">{label}</p></div></div>}
