import Link from 'next/link'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export type LegalSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type LegalPageProps = {
  kicker: string
  title: string
  updated: string
  intro: string
  sections: LegalSection[]
}

export function LegalPage({ kicker, title, updated, intro, sections }: LegalPageProps) {
  return (
    <>
      <SiteHeader variant="page" />
      <main>
        <section className="border-b border-hairline bg-green-soft">
          <div className="wrap max-w-3xl py-14 md:py-20">
            <p className="kicker">{kicker}</p>
            <h1 className="mt-4 text-balance text-4xl sm:text-5xl">{title}</h1>
            <p className="mt-4 text-sm font-bold uppercase tracking-wide text-ink/55">
              Cập nhật lần cuối: {updated}
            </p>
            <p className="mt-5 text-pretty text-lg text-ink/75">{intro}</p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="wrap max-w-3xl">
            <div className="space-y-10">
              {sections.map((section, index) => (
                <div key={section.heading}>
                  <h2 className="flex items-baseline gap-3 text-2xl sm:text-3xl">
                    <span className="font-display text-lg font-bold text-coral">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-balance">{section.heading}</span>
                  </h2>
                  <div className="mt-4 space-y-4 text-lg text-ink/75">
                    {section.paragraphs.map((p) => (
                      <p key={p} className="text-pretty">
                        {p}
                      </p>
                    ))}
                    {section.bullets ? (
                      <ul className="ml-1 space-y-2">
                        {section.bullets.map((b) => (
                          <li key={b} className="flex gap-3 text-pretty">
                            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-14 rounded-2xl border border-hairline bg-white p-6 sm:p-7">
              <p className="text-pretty text-ink/75">
                Có câu hỏi về nội dung này? Hãy{' '}
                <Link href="/lien-he" className="font-bold text-blue hover:underline">
                  liên hệ với chúng tôi
                </Link>
                , đội ngũ Mầm Sáng Tạo luôn sẵn sàng hỗ trợ.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
