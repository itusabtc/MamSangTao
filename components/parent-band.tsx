import { Check } from 'lucide-react'

const CHECKS = [
  'Không quảng cáo và liên kết gây xao nhãng',
  'Nội dung phù hợp với độ tuổi',
  'Không trò chuyện với người lạ',
]

export function ParentBand() {
  return (
    <section id="phu-huynh" className="scroll-mt-24 bg-blue text-white">
      <div className="wrap grid gap-10 py-16 md:grid-cols-[1fr_1fr] md:py-24">
        <div>
          <p className="kicker" style={{ color: 'var(--yellow)' }}>
            Yên tâm để con khám phá
          </p>
          <h2 className="mt-3 text-balance text-3xl text-white sm:text-4xl">
            Một không gian số lành mạnh, được thiết kế cùng phụ huynh.
          </h2>
        </div>

        <ul className="flex flex-col justify-center gap-4">
          {CHECKS.map((check) => (
            <li key={check} className="flex items-start gap-3 text-lg">
              <span
                aria-hidden
                className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white/10 text-yellow"
              >
                <Check className="h-4 w-4" strokeWidth={3} />
              </span>
              <span className="text-white/90">{check}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
