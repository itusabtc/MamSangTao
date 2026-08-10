const STEPS = [
  {
    n: 1,
    title: 'Nói ra ý tưởng',
    desc: 'Bé viết hoặc chọn một gợi ý có sẵn.',
  },
  {
    n: 2,
    title: 'Tự do sáng tạo',
    desc: 'Vẽ, thêm chi tiết, sắp xếp khối lệnh.',
  },
  {
    n: 3,
    title: 'Khoe tác phẩm',
    desc: 'Lưu về máy hoặc in ra cho cả nhà xem.',
  },
]

export function StepsSection() {
  return (
    <section id="cach-hoat-dong" className="scroll-mt-24 py-16 md:py-24">
      <div className="wrap text-center">
        <p className="kicker justify-center">Nhỏ mà có võ</p>
        <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl sm:text-4xl">
          Ba bước để một ý tưởng thành hình
        </h2>

        <ol className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-3">
          {STEPS.map((step) => (
            <li key={step.n} className="flex flex-col items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-yellow font-display text-2xl font-bold text-ink shadow-[0_5px_0_rgba(29,49,80,0.15)]">
                {step.n}
              </span>
              <h3 className="mt-6 text-xl">{step.title}</h3>
              <p className="mt-2 max-w-xs text-pretty text-ink/70">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
