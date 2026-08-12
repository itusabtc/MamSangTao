import type { Metadata } from 'next'
import { SeedShop } from '@/components/seed-shop'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
export const metadata:Metadata={title:'Cửa hàng Mầm',description:'Đổi Hạt Mầm lấy sticker, nhân vật, nền truyện và vật phẩm sáng tạo an toàn cho bé.',alternates:{canonical:'/cua-hang-mam'}}
export default function SeedShopPage(){return <><SiteHeader variant="page"/><SeedShop/><SiteFooter/></>}
