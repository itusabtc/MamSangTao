import { Pencil, Play, Sparkles, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="wrap grid items-center gap-10 py-14 md:py-20 min-[851px]:grid-cols-[1.05fr_1fr]">
        {/* Left copy */}
        <div>
          <p className="kicker">
            <span aria-hidden className="text-green">
              ●
            </span>
            Xưởng sáng tạo an toàn cho trẻ
          </p>

          <h1 className="mt-5 text-balance text-4xl sm:text-5xl min-[851px]:text-[3.4rem]">
            Mọi ý tưởng nhỏ
            <br />
            đều có thể <span className="ink-underline">nở hoa.</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-lg text-ink/75">
            Nơi trẻ vẽ tranh, kể chuyện và làm quen với lập trình — bằng trí
            tưởng tượng của chính mình.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#thu-ngay" className="btn btn-primary">
              Khám phá ngay →
            </a>
            <a
              href="#cach-hoat-dong"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-ink hover:text-blue"
            >
              <span
                aria-hidden
                className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink/25"
              >
                <Play className="h-3 w-3 fill-current" />
              </span>
              Xem cách hoạt động
            </a>
          </div>

          <div className="mt-9 flex items-center gap-3">
            <span aria-hidden className="text-2xl">
              🧒🏻👧🏽🧑🏾
            </span>
            <p className="text-sm leading-snug text-ink/65">
              <span className="font-bold text-ink/80">
                Được tạo cho trẻ 6–12 tuổi
              </span>
              <br />
              Không quảng cáo · Không mạng xã hội
            </p>
          </div>
        </div>

        {/* Right visual — full-bleed creative desk */}
        <HeroScene />
      </div>
    </section>
  )
}

function HeroScene() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] min-[851px]:max-w-none">
      {/* back tilted sheets */}
      <div
        className="absolute inset-x-6 top-10 bottom-2 rounded-3xl bg-yellow shadow-[0_18px_40px_rgba(29,49,80,0.12)]"
        style={{ transform: 'rotate(-6deg)' }}
      />
      <div
        className="absolute inset-x-4 top-6 bottom-4 rounded-3xl bg-[#f3ede0]"
        style={{ transform: 'rotate(3deg)' }}
      />

      {/* main paper */}
      <div className="anim-sway absolute inset-x-2 top-2 bottom-6 overflow-hidden rounded-3xl bg-white shadow-[0_24px_50px_rgba(29,49,80,0.16)]">
        {/* sky */}
        <div className="relative h-3/5 bg-[#eaf3ff]">
          <span className="absolute right-6 top-6 h-14 w-14 rounded-full bg-yellow shadow-[0_0_0_10px_rgba(245,195,77,0.25)]" />
          <span className="absolute left-8 top-10 h-6 w-16 rounded-full bg-white" />
          <span className="absolute left-16 top-14 h-5 w-12 rounded-full bg-white" />
          <span
            aria-hidden
            className="anim-float absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl"
            style={{ ['--r' as string]: '-8deg' }}
          >
            🚀
          </span>
        </div>
        {/* hills */}
        <div className="relative h-2/5">
          <div className="absolute -left-6 -top-8 h-28 w-40 rounded-[50%] bg-green" />
          <div className="absolute right-0 -top-6 h-24 w-44 rounded-[50%] bg-blue/85" />
          <div className="absolute -right-8 top-2 h-20 w-32 rounded-[50%] bg-green/80" />
        </div>

        {/* label chip */}
        <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-extrabold text-ink shadow-md ring-1 ring-ink/10">
          <Pencil className="h-3.5 w-3.5 text-coral" />
          Ý tưởng của tớ!
        </span>
      </div>

      {/* floating accents */}
      <span
        aria-hidden
        className="anim-float absolute -left-2 top-1/3 grid h-12 w-12 place-items-center rounded-2xl bg-coral text-white shadow-lg"
        style={{ ['--r' as string]: '12deg', animationDelay: '0.6s' }}
      >
        <Pencil className="h-6 w-6" />
      </span>
      <span
        aria-hidden
        className="anim-float absolute -right-3 top-6 grid h-14 w-14 place-items-center rounded-2xl bg-violet text-white shadow-lg"
        style={{ ['--r' as string]: '-10deg', animationDelay: '1.1s' }}
      >
        <Star className="h-6 w-6 fill-current" />
      </span>
      <Sparkles
        aria-hidden
        className="anim-float absolute -bottom-1 right-10 h-6 w-6 text-coral"
        style={{ animationDelay: '0.3s' }}
      />
      <Sparkles
        aria-hidden
        className="anim-float absolute bottom-6 -left-1 h-5 w-5 text-green"
        style={{ animationDelay: '1.4s' }}
      />
      <Sparkles
        aria-hidden
        className="anim-float absolute right-1/3 -top-2 h-5 w-5 text-yellow"
        style={{ animationDelay: '0.9s' }}
      />
    </div>
  )
}
