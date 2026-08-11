import { Download } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import { BrandLogo } from '@/components/brand-logo'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export const metadata: Metadata = {
  title: 'Bộ nhận diện thương hiệu — Mầm Sáng Tạo',
  description:
    'Logo, favicon, bảng màu, kiểu chữ, banner và các mẫu quảng cáo chính thức của Mầm Sáng Tạo.',
}

const PALETTE: { name: string; hex: string; token: string; dark?: boolean }[] = [
  { name: 'Navy (Ink)', hex: '#1D3150', token: '--ink', dark: true },
  { name: 'Xanh dương', hex: '#294D9B', token: '--blue', dark: true },
  { name: 'Coral', hex: '#F47D61', token: '--coral' },
  { name: 'Vàng nắng', hex: '#F5C34D', token: '--yellow' },
  { name: 'Xanh lá', hex: '#64AA82', token: '--green' },
  { name: 'Tím', hex: '#8A73C9', token: '--violet', dark: true },
  { name: 'Kem', hex: '#FBF7EF', token: '--cream' },
]

const DOWNLOADS: {
  src: string
  label: string
  size: string
  ratio: string
  bg: string
}[] = [
  {
    src: '/brand/ad-facebook-link.png',
    label: 'Facebook Link Ad',
    size: '1200 × 628',
    ratio: '1.91 / 1',
    bg: 'bg-cream',
  },
  {
    src: '/brand/ad-square.png',
    label: 'Facebook / IG vuông',
    size: '1080 × 1080',
    ratio: '1 / 1',
    bg: 'bg-cream',
  },
  {
    src: '/brand/ad-google-leaderboard.png',
    label: 'Google Leaderboard',
    size: '728 × 90',
    ratio: '728 / 90',
    bg: 'bg-blue',
  },
  {
    src: '/brand/ad-rectangle.png',
    label: 'Google Medium Rectangle',
    size: '300 × 250',
    ratio: '300 / 250',
    bg: 'bg-cream',
  },
]

function DownloadCard({
  src,
  label,
  size,
  ratio,
  bg,
  fileName,
}: {
  src: string
  label: string
  size: string
  ratio: string
  bg: string
  fileName: string
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface">
      <div className={`grid place-items-center p-4 ${bg}`} style={{ aspectRatio: ratio }}>
        <Image
          src={src || '/placeholder.svg'}
          alt={label}
          width={1200}
          height={1200}
          className="max-h-full w-full object-contain"
        />
      </div>
      <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-ink">{label}</p>
          <p className="font-mono text-xs text-ink/55">{size} px</p>
        </div>
        <a
          href={src}
          download={fileName}
          className="inline-flex items-center gap-1.5 rounded-full bg-blue px-3 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-dark"
        >
          <Download className="h-4 w-4" />
          Tải
        </a>
      </figcaption>
    </figure>
  )
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="wrap border-t border-hairline py-14">
      <p className="font-display text-sm font-bold uppercase tracking-wider text-coral">{eyebrow}</p>
      <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function BrandPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main>
        {/* Hero */}
        <section className="wrap py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center rounded-full bg-green-soft px-4 py-1.5 font-display text-sm font-bold text-green">
              Brand Kit
            </span>
            <h1 className="mt-5 text-balance font-display text-4xl font-bold text-ink sm:text-5xl">
              Bộ nhận diện thương hiệu
            </h1>
            <p className="mt-4 text-pretty text-lg text-ink/70">
              Mọi thành tố hình ảnh của Mầm Sáng Tạo — linh vật chồi non đội tia sáng, bảng màu tươi
              vui và các mẫu quảng cáo sẵn sàng sử dụng.
            </p>
          </div>
        </section>

        {/* Logo */}
        <Section id="logo" eyebrow="Logo" title="Logo & biểu tượng">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-hairline bg-surface p-8">
              <BrandLogo size={56} />
              <span className="text-sm font-bold text-ink/55">Logo ngang (dùng chính)</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-hairline bg-ink p-8">
              <BrandLogo size={56} hideWordmark />
              <span className="text-sm font-bold text-white/60">Badge trên nền tối</span>
            </div>
            <div
              className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-hairline p-8"
              style={{
                backgroundColor: '#f4f1ea',
                backgroundImage:
                  'linear-gradient(45deg,#e2ddd2 25%,transparent 25%),linear-gradient(-45deg,#e2ddd2 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e2ddd2 75%),linear-gradient(-45deg,transparent 75%,#e2ddd2 75%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0,0 10px,10px -10px,-10px 0',
              }}
            >
              <Image
                src="/brand/logo-mark-transparent.png"
                alt="Biểu tượng chồi non nền trong suốt"
                width={160}
                height={160}
                className="h-32 w-32 object-contain"
              />
              <a
                href="/brand/logo-mark-transparent.png"
                download="mam-sang-tao-logo.png"
                className="inline-flex items-center gap-1.5 rounded-full bg-blue px-3 py-2 text-xs font-extrabold text-white transition-colors hover:bg-blue-dark"
              >
                <Download className="h-4 w-4" />
                PNG trong suốt
              </a>
            </div>
          </div>
        </Section>

        {/* Favicon */}
        <Section id="favicon" eyebrow="Favicon" title="Favicon & app icon">
          <div className="flex flex-wrap items-end gap-8">
            {[64, 48, 32, 16].map((s) => (
              <div key={s} className="flex flex-col items-center gap-3">
                <Image
                  src="/brand/favicon-source.png"
                  alt={`Favicon ${s}px`}
                  width={s}
                  height={s}
                  className="rounded-[28%] shadow-sm ring-1 ring-ink/10"
                  style={{ width: s, height: s }}
                />
                <span className="text-xs font-bold text-ink/55">
                  {s}
                  {'\u00d7'}
                  {s}
                </span>
              </div>
            ))}
          </div>
        </Section>

        {/* Colors */}
        <Section id="mau-sac" eyebrow="Màu sắc" title="Bảng màu thương hiệu">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {PALETTE.map((c) => (
              <div key={c.token} className="overflow-hidden rounded-2xl border border-hairline">
                <div
                  className="flex h-24 items-end p-3"
                  style={{ backgroundColor: c.hex }}
                >
                  <span
                    className={`font-mono text-xs font-bold ${c.dark ? 'text-white/90' : 'text-ink/80'}`}
                  >
                    {c.hex}
                  </span>
                </div>
                <div className="bg-surface p-3">
                  <p className="text-sm font-bold text-ink">{c.name}</p>
                  <p className="font-mono text-xs text-ink/55">{c.token}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Typography */}
        <Section id="typography" eyebrow="Kiểu chữ" title="Hệ thống chữ">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-hairline bg-surface p-8">
              <p className="text-sm font-bold text-ink/55">Tiêu đề — Quicksand</p>
              <p className="mt-3 font-display text-5xl font-bold text-ink">Aa</p>
              <p className="mt-2 font-display text-2xl font-bold text-ink">Mầm Sáng Tạo</p>
              <p className="mt-1 font-display text-ink/70">Vui tươi, tròn trịa, thân thiện</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-surface p-8">
              <p className="text-sm font-bold text-ink/55">Nội dung — Nunito</p>
              <p className="mt-3 text-5xl font-extrabold text-ink">Aa</p>
              <p className="mt-2 text-2xl font-bold text-ink">Nuôi dưỡng trí tưởng tượng</p>
              <p className="mt-1 leading-relaxed text-ink/70">
                Dễ đọc, ấm áp, phù hợp cho cả trẻ em và phụ huynh.
              </p>
            </div>
          </div>
        </Section>

        {/* Banner + mascot */}
        <Section id="banner" eyebrow="Ấn phẩm" title="Banner & linh vật">
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <figure className="overflow-hidden rounded-2xl border border-hairline">
              <Image
                src="/brand/banner.png"
                alt="Banner thương hiệu Mầm Sáng Tạo"
                width={1024}
                height={1024}
                className="w-full object-cover"
              />
              <figcaption className="bg-surface px-4 py-3 text-sm font-bold text-ink/55">
                Banner phủ (cover) — mạng xã hội & website
              </figcaption>
            </figure>
            <figure className="flex flex-col overflow-hidden rounded-2xl border border-hairline">
              <div className="grid flex-1 place-items-center bg-cream p-6">
                <Image
                  src="/brand/mascot.png"
                  alt="Linh vật chồi non Mầm Sáng Tạo"
                  width={280}
                  height={280}
                  className="max-h-64 w-auto object-contain"
                />
              </div>
              <figcaption className="bg-surface px-4 py-3 text-sm font-bold text-ink/55">
                Linh vật &ldquo;Bé Mầm&rdquo;
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* Ads */}
        <Section id="quang-cao" eyebrow="Quảng cáo" title="Mẫu quảng cáo">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Facebook ad */}
            <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface">
              <div className="relative">
                <Image
                  src="/brand/ad-facebook.png"
                  alt="Mẫu quảng cáo Facebook Mầm Sáng Tạo"
                  width={1024}
                  height={1024}
                  className="w-full"
                />
                <div className="absolute inset-x-0 bottom-0 p-[7%] text-center">
                  <p className="text-balance font-display text-[clamp(1rem,3.2vw,1.6rem)] font-bold leading-tight text-white drop-shadow">
                    Cho bé một xưởng sáng tạo an toàn
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-white px-4 py-1.5 text-xs font-extrabold text-coral sm:text-sm">
                    Dùng thử miễn phí
                  </span>
                </div>
              </div>
              <figcaption className="px-4 py-3 text-sm font-bold text-ink/55">
                Facebook / Instagram — tỉ lệ 1:1
              </figcaption>
            </figure>

            {/* Google ad */}
            <figure className="overflow-hidden rounded-2xl border border-hairline bg-surface">
              <div className="relative">
                <Image
                  src="/brand/ad-google.png"
                  alt="Mẫu quảng cáo hiển thị Google Mầm Sáng Tạo"
                  width={1024}
                  height={1024}
                  className="w-full"
                />
                <div className="absolute right-[4%] top-1/2 w-[46%] -translate-y-1/2 text-center">
                  <p className="text-balance font-display text-[clamp(0.85rem,2.4vw,1.35rem)] font-bold leading-tight text-ink">
                    Học mà chơi cùng Mầm Sáng Tạo
                  </p>
                  <span className="mt-[6%] inline-block rounded-full bg-coral px-4 py-1.5 text-xs font-extrabold text-white sm:text-sm">
                    Khám phá ngay
                  </span>
                </div>
              </div>
              <figcaption className="px-4 py-3 text-sm font-bold text-ink/55">
                Google Display — banner ngang
              </figcaption>
            </figure>
          </div>
        </Section>

        {/* Downloads */}
        <Section id="tai-ve" eyebrow="Tải về" title="Bộ ảnh kích thước chuẩn">
          <p className="-mt-4 mb-8 max-w-2xl text-pretty text-ink/70">
            Các mẫu quảng cáo đã cắt theo tỉ lệ chuẩn của Facebook và Google, chừa sẵn vùng trống để
            bạn thêm tiêu đề và nút kêu gọi. Nhấn &ldquo;Tải&rdquo; để lưu ảnh gốc.
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            {DOWNLOADS.map((d) => (
              <DownloadCard
                key={d.src}
                {...d}
                fileName={`mam-sang-tao-${d.src.split('/').pop()}`}
              />
            ))}
          </div>
        </Section>
      </main>
      <SiteFooter />
    </>
  )
}
