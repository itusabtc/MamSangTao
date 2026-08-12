import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

const routes = [
  { path: '', frequency: 'daily' as const, priority: 1 },
  { path: '/cong-cu/ve-tranh-tu-y-tuong', frequency: 'weekly' as const, priority: 0.9 },
  { path: '/cong-cu/tao-truyen-cho-be', frequency: 'weekly' as const, priority: 0.9 },
  { path: '/cong-cu/lap-trinh-cho-tre-em', frequency: 'weekly' as const, priority: 0.9 },
  { path: '/xuong-sang-tao', frequency: 'weekly' as const, priority: 0.95 },
  { path: '/khoa-hoc', frequency: 'weekly' as const, priority: 0.9 },
  { path: '/khoa-hoc/co-vua-cho-be', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/khoa-hoc/am-nhac-vui-nhon', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/khoa-hoc/ve-nhan-vat-hoat-hinh', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/khoa-hoc/ke-chuyen-tu-tin', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/khoa-hoc/lap-trinh-game-dau-tien', frequency: 'monthly' as const, priority: 0.8 },
  { path: '/gioi-thieu', frequency: 'monthly' as const, priority: 0.7 },
  { path: '/danh-gia', frequency: 'monthly' as const, priority: 0.7 },
  { path: '/lien-he', frequency: 'yearly' as const, priority: 0.5 },
  { path: '/thuong-hieu', frequency: 'monthly' as const, priority: 0.5 },
  { path: '/chinh-sach', frequency: 'yearly' as const, priority: 0.3 },
  { path: '/dieu-khoan', frequency: 'yearly' as const, priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, frequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: frequency,
    priority,
  }))
}
