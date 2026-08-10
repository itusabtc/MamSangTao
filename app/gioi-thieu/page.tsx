import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, ShieldCheck, Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Giới thiệu — Mầm Sáng Tạo',
  description:
    'Mầm Sáng Tạo là không gian an toàn giúp trẻ 6–12 tuổi biến trí tưởng tượng thành tranh, truyện và dự án lập trình.',
}

const VALUES = [
  {
    Icon: Sparkles,
    color: 'text-coral',
    bg: 'bg-coral/10',
    title: 'Sáng tạo là trung tâm',
    desc: 'Mọi công cụ đều bắt đầu từ ý tưởng của bé, không phải một khuôn mẫu có sẵn.',
  },
  {
    Icon: ShieldCheck,
    color: 'text-blue',
    bg: 'bg-blue/10',
    title: 'An toàn cho trẻ',
    desc: 'Không quảng cáo, không theo dõi. Phụ huynh luôn nắm quyền kiểm soát dữ liệu.',
  },
  {
    Icon: Heart,
    color: 'text-green',
    bg: 'bg-green/12',
    title: 'Học qua niềm vui',
    desc: 'Bé học quan sát, kể chuyện và tư duy logic bằng cách chơi và thử nghiệm.',
  },
]

const STATS = [
  { value: '6–12', label: 'Độ tuổi phù hợp' },
  { value: '3', label: 'Công cụ sáng tạo' },
  { value: '0', label: 'Quảng cáo hiển thị' },
]

export default function AboutPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main>
        <section className="border-b border-hairline bg-green-soft">
          <div className="wrap py-16 text-center md:py-24">
            <p className="kicker justify-center">Về chúng tôi</p>
            <h1 className="mx-auto mt-4 max-w-3xl text-balance text-4xl sm:text-5xl md:text-6xl">
              Nuôi dưỡng trí tưởng tượng của mỗi đứa trẻ
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-ink/75">
              Mầm Sáng Tạo ra đời từ một niềm tin đơn giản: mỗi đứa trẻ đều là một nghệ sĩ, một
              người kể chuyện và một nhà phát minh. Nhiệm vụ của chúng tôi là trao cho bé những công
              cụ an toàn để ý tưởng được nở hoa.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="wrap grid gap-8 sm:grid-cols-3">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-hairline bg-white p-8 text-center"
              >
                <p className="font-display text-4xl font-bold text-blue sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-wide text-ink/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-hairline bg-cream">
          <div className="wrap py-16 md:py-24">
            <div className="max-w-2xl">
              <p className="kicker">Giá trị của chúng tôi</p>
              <h2 className="mt-3 text-balance text-3xl sm:text-4xl">
                Ba điều chúng tôi không bao giờ đánh đổi
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {VALUES.map(({ Icon, color, bg, title, desc }) => (
                <div key={title} className="rounded-2xl border border-hairline bg-white p-7">
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl ${bg} ${color}`}>
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-pretty text-ink/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="wrap max-w-3xl">
            <h2 className="text-balance text-3xl sm:text-4xl">Câu chuyện của chúng tôi</h2>
            <div className="mt-6 space-y-5 text-lg text-ink/75">
              <p className="text-pretty">
                Chúng tôi bắt đầu khi nhìn thấy các con dành hàng giờ trước màn hình nhưng chỉ để
                xem, chứ không phải để tạo ra. Chúng tôi muốn đảo ngược điều đó — biến thời gian bên
                công nghệ thành thời gian sáng tạo có ý nghĩa.
              </p>
              <p className="text-pretty">
                Mỗi công cụ trên Mầm Sáng Tạo được thiết kế cùng phụ huynh và giáo viên, đặt sự an
                toàn và niềm vui học tập của trẻ lên trên hết. Không có câu trả lời đúng hay sai —
                chỉ có những ý tưởng đang lớn lên mỗi ngày.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/dang-ky" className="btn btn-primary">
                Bắt đầu miễn phí →
              </Link>
              <Link href="/lien-he" className="btn btn-coral">
                Liên hệ với chúng tôi
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
