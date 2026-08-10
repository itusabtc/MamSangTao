const IDEAS = [
  'Vẽ chú mèo phi hành gia',
  'Kể chuyện về lòng dũng cảm',
  'Làm thiệp tặng ông bà',
  'Tạo trò chơi mê cung',
]

export function IdeasStrip() {
  return (
    <section className="border-y border-hairline bg-white">
      <div className="wrap flex flex-wrap items-center gap-x-6 gap-y-4 py-6">
        <p className="kicker shrink-0">Bé có thể bắt đầu với</p>
        <ul className="flex flex-wrap gap-2.5">
          {IDEAS.map((idea) => (
            <li key={idea}>
              <a
                href="#thu-ngay"
                className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-cream px-4 py-2 text-sm font-bold text-ink transition-colors hover:border-coral hover:text-blue"
              >
                {idea}
                <span aria-hidden className="text-coral">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
