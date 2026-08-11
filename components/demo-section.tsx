import { Suspense } from 'react'
import { StudioDemo } from '@/app/studio-demo'

export function DemoSection() {
  return (
    <section id="thu-ngay" className="scroll-mt-24 bg-green-soft">
      <div className="wrap py-16 text-center md:py-24">
        <p className="kicker justify-center">Thử ngay một ý tưởng</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl sm:text-4xl">
          Bé đang tưởng tượng điều gì?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-ink/70">
          Viết một câu đơn giản. Xưởng sẽ giúp bé biến nó thành một dự án sáng
          tạo.
        </p>

        <Suspense fallback={null}>
          <StudioDemo />
        </Suspense>
      </div>
    </section>
  )
}
