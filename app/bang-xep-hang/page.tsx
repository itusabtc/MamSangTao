import type { Metadata } from 'next'
import { LeaderboardBoard } from '@/components/leaderboard-board'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { leaderboardProfiles, type Profile } from '@/lib/community-db'

export const metadata: Metadata = { title: 'Bảng xếp hạng Mầm Sáng Tạo', description: 'Bảng xếp hạng học tập và sáng tạo dành cho các thành viên Mầm Sáng Tạo.' }
export const dynamic = 'force-dynamic'

const fallbackPeople: Profile[] = Array.from({ length: 20 }, (_, index) => ({ user_id: `mam-${index}`, email: '', display_name: ['Mầm Nắng','Bảo An','Minh Khuê','Gia Hân','Đức Minh','Khánh Linh','Tuệ Lâm','Nhật Nam','An Nhiên','Hoàng Anh','Mai Chi','Bình Minh','Hải Đăng','Phương Thảo','Thiên Ân','Ngọc Hà','Anh Khoa','Quỳnh Anh','Bảo Ngọc','Minh Anh'][index], username: `mam${index + 1}`, avatar: ['🌻','🦊','🐼','🐰','🦁','🌸','🐳','🚀','🦄','🐯','🦋','☀️','🐧','🌈','🐸','🍀','🐨','⭐','🐱','🌙'][index], bio: '', xp: 3260 - index * 113, seeds: 300, streak: 30 - index, joined_at: '' }))

export default async function LeaderboardPage() {
  let people = fallbackPeople
  try { const saved = await leaderboardProfiles(20); if (saved.length >= 3) people = saved } catch { /* D1 is optional in local preview. */ }
  return <><SiteHeader variant="page" /><main className="bg-surface py-10 sm:py-14"><div className="wrap"><LeaderboardBoard people={people} /></div></main><SiteFooter /></>
}
