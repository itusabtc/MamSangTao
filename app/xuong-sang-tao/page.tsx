import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { StudioDemo } from '@/app/studio-demo'

export const metadata: Metadata = { title: 'Xưởng sáng tạo cho bé', description: 'Xưởng sáng tạo tương tác gồm vẽ tranh, kể chuyện, lập trình game, âm nhạc và hoạt hình dành cho trẻ em.', alternates: { canonical: '/xuong-sang-tao' } }

export default function CreativeStudioPage() {
  return <><SiteHeader variant="page"/><main className="bg-green-soft/60"><section className="wrap py-14 text-center sm:py-20"><p className="kicker justify-center">Năm góc sáng tạo</p><h1 className="mx-auto mt-4 max-w-4xl text-4xl sm:text-6xl">Một ý tưởng, thật nhiều cách để bé tạo nên điều mới</h1><p className="mx-auto mt-5 max-w-2xl text-lg text-ink/70">Bé có thể vẽ, viết truyện, làm game, phối nhạc hoặc tạo hoạt hình ngay trong trình duyệt.</p><StudioDemo /></section></main><SiteFooter/></>
}
