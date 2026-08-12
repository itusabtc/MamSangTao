import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Clock3 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CourseProgress } from '@/components/course-progress'
import { COURSES } from '@/lib/courses'

export function generateStaticParams() { return COURSES.map(({ slug }) => ({ slug })) }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const { slug } = await params; const course = COURSES.find((item) => item.slug === slug); return course ? { title: course.title, description: course.description, alternates: { canonical: `/khoa-hoc/${course.slug}` } } : {} }

export default async function CoursePage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ trial?: string }> }) {
  const { slug } = await params; const course = COURSES.find((item) => item.slug === slug); if (!course) notFound()
  const { trial } = await searchParams
  return <><SiteHeader variant="page"/><main><section className={`${course.color} border-b border-hairline`}><div className="wrap py-14 sm:py-20"><Link href="/khoa-hoc" className="inline-flex items-center gap-2 text-sm font-extrabold text-blue"><ArrowLeft className="h-4 w-4"/>Tất cả khóa học</Link><div className="mt-8 grid gap-7 md:grid-cols-[1fr_auto] md:items-center"><div><p className="kicker">{course.age}</p><h1 className="mt-3 text-4xl sm:text-6xl">{course.title}</h1><p className="mt-5 max-w-2xl text-lg text-ink/70">{course.description}</p><p className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold"><Clock3 className="h-4 w-4"/>{course.duration}</p></div><div className="grid h-36 w-36 place-items-center rounded-[36px] bg-white text-7xl shadow-lg">{course.icon}</div></div></div></section><section className="wrap grid gap-7 py-14 lg:grid-cols-[1fr_300px]"><CourseProgress lessons={course.lessons} courseSlug={course.slug} courseIcon={course.icon} autoOpenFirst={trial === '1'}/><aside className="h-fit rounded-3xl bg-blue p-6 text-white"><p className="text-sm font-extrabold text-yellow">Dành cho phụ huynh</p><h2 className="mt-2 text-2xl text-white">Học cùng bé</h2><p className="mt-3 text-white/80">Mỗi bài nên hoàn thành trong một lần ngắn. Hãy hỏi bé điều gì thú vị nhất thay vì chỉ hỏi đúng hay sai.</p><Link href="/xuong-sang-tao" className="btn mt-5 justify-center bg-white text-blue">Thực hành trong xưởng</Link></aside></section></main><SiteFooter/></>
}
