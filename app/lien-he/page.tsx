import type { Metadata } from 'next'
import { Clock, Mail, MessageCircle } from 'lucide-react'
import { ContactForm } from '@/components/contact-form'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Liên hệ — Mầm Sáng Tạo',
  description:
    'Gửi câu hỏi, góp ý hoặc đề nghị hợp tác tới đội ngũ Mầm Sáng Tạo. Chúng tôi luôn sẵn sàng lắng nghe.',
}

const INFO = [
  {
    Icon: Mail,
    title: 'Email',
    lines: ['hello@mamsangtao.vn'],
  },
  {
    Icon: MessageCircle,
    title: 'Hỗ trợ phụ huynh',
    lines: ['Giải đáp về an toàn và quyền riêng tư của bé'],
  },
  {
    Icon: Clock,
    title: 'Thời gian phản hồi',
    lines: ['Trong vòng 1–2 ngày làm việc'],
  },
]

export default function ContactPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main>
        <section className="border-b border-hairline bg-green-soft">
          <div className="wrap py-14 text-center md:py-20">
            <p className="kicker justify-center">Kết nối với chúng tôi</p>
            <h1 className="mx-auto mt-4 max-w-2xl text-balance text-4xl sm:text-5xl">
              Chúng tôi luôn sẵn sàng lắng nghe
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink/75">
              Dù là một câu hỏi nhỏ hay một ý tưởng lớn cho lớp học, hãy nhắn cho đội ngũ Mầm Sáng
              Tạo.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="wrap grid gap-12 md:grid-cols-[1fr_1.3fr]">
            <div className="space-y-6">
              {INFO.map(({ Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-blue/10 text-blue">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
                    {lines.map((line) => (
                      <p key={line} className="text-pretty text-ink/70">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <ContactForm />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
