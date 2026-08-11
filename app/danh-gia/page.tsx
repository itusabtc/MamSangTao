import type { Metadata } from 'next'
import { Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Đánh giá — Mầm Sáng Tạo',
  description:
    'Cảm nhận của phụ huynh và giáo viên khi cho trẻ dùng Mầm Sáng Tạo để vẽ, kể chuyện và làm quen lập trình.',
}

type Review = {
  name: string
  role: string
  stars: number
  quote: string
  color: 'coral' | 'violet' | 'green' | 'blue'
}

const REVIEWS: Review[] = [
  {
    name: 'Chị Thu Hà',
    role: 'Phụ huynh bé 8 tuổi',
    stars: 5,
    quote:
      'Con mình mê nhất công cụ vẽ tranh. Bé tự nghĩ ra câu chuyện rồi tả lại, sản phẩm hiện ra làm bé thích thú lắm. Quan trọng là không có quảng cáo.',
    color: 'coral',
  },
  {
    name: 'Thầy Minh Quân',
    role: 'Giáo viên tiểu học',
    stars: 5,
    quote:
      'Mình dùng phần lập trình bằng khối trong tiết học. Các em xếp khối lệnh rất tự nhiên và hiểu được tư duy tuần tự mà không thấy khô khan.',
    color: 'blue',
  },
  {
    name: 'Anh Đức Long',
    role: 'Phụ huynh bé 6 tuổi',
    stars: 5,
    quote:
      'Giao diện thân thiện, bé tự dùng được mà không cần bố kèm nhiều. Mình yên tâm vì không có mạng xã hội hay liên kết lạ.',
    color: 'green',
  },
  {
    name: 'Chị Phương Anh',
    role: 'Phụ huynh 2 bé',
    stars: 4,
    quote:
      'Hai bé nhà mình tranh nhau tạo truyện mỗi tối. Mong có thêm nhiều nhân vật và bối cảnh hơn nữa trong thời gian tới.',
    color: 'violet',
  },
  {
    name: 'Cô Bích Ngọc',
    role: 'Giáo viên mầm non',
    stars: 5,
    quote:
      'Màu sắc dễ thương, chữ to rõ ràng, phù hợp với các bé mới tập đọc. Các con chủ động sáng tạo thay vì chỉ xem.',
    color: 'coral',
  },
  {
    name: 'Anh Hoàng Nam',
    role: 'Phụ huynh bé 10 tuổi',
    stars: 5,
    quote:
      'Con dần chuyển từ xem video sang tự tạo ra thứ của riêng mình. Đây đúng là điều mình tìm kiếm cho con.',
    color: 'blue',
  },
]

const COLOR: Record<Review['color'], string> = {
  coral: 'bg-coral/15 text-coral',
  violet: 'bg-violet/15 text-violet',
  green: 'bg-green/15 text-green',
  blue: 'bg-blue/15 text-blue',
}

export default function DanhGiaPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main>
        <section className="border-b border-hairline bg-cream">
          <div className="wrap py-14 text-center sm:py-20">
            <span className="kicker justify-center">
              <Star className="h-4 w-4 fill-yellow text-yellow" />
              Đánh giá
            </span>
            <h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl sm:text-5xl">
              Phụ huynh &amp; giáo viên nói gì về{' '}
              <span className="text-blue">Mầm Sáng Tạo</span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-ink/70">
              Những cảm nhận thật khi trẻ được tự do sáng tạo trong một không gian an toàn.
            </p>

            <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-hairline bg-surface px-5 py-3 shadow-sm">
              <span className="flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow text-yellow" />
                ))}
              </span>
              <span className="text-sm font-extrabold text-ink">
                4,9/5 <span className="font-bold text-ink/60">từ hơn 1.200 gia đình</span>
              </span>
            </div>
          </div>
        </section>

        <section className="bg-cream">
          <div className="wrap py-14 sm:py-20">
            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {REVIEWS.map((r) => (
                <li
                  key={r.name}
                  className="flex flex-col rounded-2xl border border-hairline bg-surface p-6 shadow-[0_10px_30px_rgba(29,49,80,0.06)]"
                >
                  <span className="flex" aria-label={`${r.stars} trên 5 sao`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={
                          i < r.stars
                            ? 'h-4 w-4 fill-yellow text-yellow'
                            : 'h-4 w-4 text-hairline'
                        }
                      />
                    ))}
                  </span>
                  <p className="mt-4 flex-1 text-pretty text-ink/80">{`\u201C${r.quote}\u201D`}</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-extrabold ${COLOR[r.color]}`}
                      aria-hidden
                    >
                      {r.name.split(' ').slice(-1)[0].charAt(0)}
                    </span>
                    <span className="leading-tight">
                      <span className="block text-sm font-extrabold text-ink">{r.name}</span>
                      <span className="block text-sm text-ink/60">{r.role}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
