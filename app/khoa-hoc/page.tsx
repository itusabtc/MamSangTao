import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CourseDiscovery } from '@/components/course-discovery'

export const metadata: Metadata = { title: 'Khóa học sáng tạo cho trẻ em', description: 'Các khóa học ngắn, dễ hiểu cho trẻ: cờ vua, âm nhạc, vẽ hoạt hình, kể chuyện và lập trình game.', alternates: { canonical: '/khoa-hoc' } }

export default function CoursesPage() {
  return <><SiteHeader variant="page"/><CourseDiscovery/><SiteFooter/></>
}
