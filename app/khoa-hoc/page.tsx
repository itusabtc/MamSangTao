import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock3, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { COURSES } from '@/lib/courses'

export const metadata: Metadata = { title: 'Khóa học sáng tạo cho trẻ em', description: 'Các khóa học ngắn, dễ hiểu cho trẻ: cờ vua, âm nhạc, vẽ hoạt hình, kể chuyện và lập trình game.', alternates: { canonical: '/khoa-hoc' } }

export default function CoursesPage() {
  return <><SiteHeader variant="page"/><main><section className="border-b border-hairline bg-violet/10"><div className="wrap py-16 text-center sm:py-24"><p className="kicker justify-center">Học từng chút, vui mỗi ngày</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl sm:text-6xl">Khóa học ngắn để bé tự tin khám phá</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">Mỗi bài chỉ 10–15 phút, có nhiệm vụ nhỏ và tiến độ trực quan để bé học mà không bị áp lực.</p><div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold"><ShieldCheck className="h-5 w-5 text-green"/>Nội dung phù hợp trẻ 6–12 tuổi</div></div></section><section className="wrap py-14 sm:py-20"><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{COURSES.map((course) => <article key={course.slug} className="flex flex-col rounded-3xl border border-hairline bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className={`grid h-16 w-16 place-items-center rounded-2xl text-4xl ${course.color}`}>{course.icon}</div><p className="mt-5 text-sm font-extrabold text-coral">{course.age}</p><h2 className="mt-1 text-2xl">{course.title}</h2><p className="mt-3 flex-1 text-ink/65">{course.description}</p><p className="mt-5 flex items-center gap-2 text-sm font-bold text-ink/60"><Clock3 className="h-4 w-4"/>{course.duration}</p><Link href={`/khoa-hoc/${course.slug}`} className="btn btn-primary mt-5 justify-center">Xem khóa học<ArrowRight className="h-4 w-4"/></Link></article>)}</div></section></main><SiteFooter/></>
}
