import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type ToolData = {
  kicker: string
  emoji: string
  accent: 'coral' | 'violet' | 'green'
  title: string
  description: string
  prompts: string[]
  learning: string
  seo: [string, string]
}

const TOOLS: Record<string, ToolData> = {
  've-tranh-tu-y-tuong': {
    kicker: 'Góc vẽ tranh',
    emoji: '🎨',
    accent: 'coral',
    title: 'Vẽ tranh từ ý tưởng cho trẻ em',
    description:
      'Giúp bé biến những điều đang tưởng tượng thành một bức tranh độc đáo, sau đó tự thêm màu sắc và chi tiết của riêng mình.',
    prompts: ['Chú mèo lái tàu vũ trụ', 'Thành phố nằm trên mây', 'Khu vườn của khủng long'],
    learning: 'Quan sát · Màu sắc · Bố cục hình ảnh',
    seo: [
      'Khi bé vẽ từ trí tưởng tượng, bé đang học cách quan sát thế giới và diễn đạt điều mình thấy theo cách riêng. Không có bức tranh nào là sai — mỗi nét vẽ đều là một quyết định của bé.',
      'Với trẻ 6–12 tuổi, việc bắt đầu từ một ý tưởng thay vì một mẫu có sẵn giúp nuôi dưỡng sự tự tin. Bé thử, sửa và dần khám phá phong cách của chính mình.',
    ],
  },
  'tao-truyen-cho-be': {
    kicker: 'Góc kể chuyện',
    emoji: '📖',
    accent: 'violet',
    title: 'Tạo truyện cho bé từ ý tưởng riêng',
    description:
      'Bé chọn nhân vật, nơi câu chuyện diễn ra và điều bất ngờ. Mỗi lựa chọn tạo nên một câu chuyện không trùng lặp.',
    prompts: ['Chuyến đi đầu tiên của Mây', 'Bạn rồng không biết phun lửa', 'Chiếc chìa khóa dưới đáy biển'],
    learning: 'Ngôn ngữ · Cảm xúc · Trình tự kể chuyện',
    seo: [
      'Kể chuyện là cách trẻ sắp xếp suy nghĩ và gọi tên cảm xúc. Khi tự chọn nhân vật và tình huống, bé học cách xây dựng một mạch truyện có mở đầu, diễn biến và kết thúc.',
      'Mỗi câu chuyện là một bài tập nhỏ về ngôn ngữ và sự đồng cảm. Với trẻ 6–12 tuổi, được tự do sáng tạo cốt truyện quan trọng hơn việc kể “đúng”.',
    ],
  },
  'lap-trinh-cho-tre-em': {
    kicker: 'Góc lập trình',
    emoji: '🧩',
    accent: 'green',
    title: 'Học lập trình bằng khối cho trẻ em',
    description:
      'Xếp khối lệnh trực quan để nhân vật di chuyển, phát âm thanh và tương tác — không cần biết gõ mã.',
    prompts: ['Đưa phi thuyền tới mặt trăng', 'Làm mèo nhảy khi chạm sao', 'Tạo mê cung tìm kho báu'],
    learning: 'Logic · Giải quyết vấn đề · Tư duy trình tự',
    seo: [
      'Lập trình bằng khối biến những khái niệm trừu tượng thành thao tác kéo thả trực quan. Bé nhìn thấy ngay kết quả của mỗi lệnh, từ đó hiểu quan hệ nguyên nhân — kết quả.',
      'Khi một khối chưa chạy đúng, bé học cách thử lại và điều chỉnh. Với trẻ 6–12 tuổi, đó chính là nền tảng của tư duy giải quyết vấn đề.',
    ],
  },
}

const ACCENT: Record<ToolData['accent'], { text: string; tint: string }> = {
  coral: { text: 'text-coral', tint: 'bg-coral/10' },
  violet: { text: 'text-violet', tint: 'bg-violet/10' },
  green: { text: 'text-green', tint: 'bg-green/12' },
}

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tool = TOOLS[slug]
  if (!tool) return { title: 'Không tìm thấy công cụ — Mầm Sáng Tạo' }
  return {
    title: `${tool.title} — Mầm Sáng Tạo`,
    description: tool.description,
  }
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const tool = TOOLS[slug]
  if (!tool) notFound()

  const accent = ACCENT[tool.accent]

  return (
    <>
      <SiteHeader variant="tool" />
      <main>
        {/* Tool hero */}
        <section className="overflow-hidden">
          <div className="wrap grid items-center gap-10 py-14 md:py-20 min-[851px]:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="kicker">{tool.kicker}</p>
              <h1 className="mt-4 text-balance text-4xl sm:text-5xl">
                {tool.title}
              </h1>
              <p className="mt-5 max-w-xl text-pretty text-lg text-ink/75">
                {tool.description}
              </p>
              <a href="#bat-dau" className="btn btn-primary mt-8">
                Bắt đầu miễn phí →
              </a>
            </div>

            {/* Organic blob icon stage */}
            <div className="relative mx-auto grid aspect-square w-full max-w-[380px] place-items-center">
              <div
                className="absolute inset-6 bg-[#f3d06e] shadow-[16px_18px_0_rgba(29,49,80,0.12)]"
                style={{
                  borderRadius: '58% 42% 55% 45% / 48% 55% 45% 52%',
                  transform: 'rotate(-8deg)',
                }}
              />
              <span aria-hidden className="anim-float relative text-7xl sm:text-8xl">
                {tool.emoji}
              </span>
              <Sparkles
                aria-hidden
                className="anim-float absolute right-6 top-6 h-8 w-8 text-coral"
                style={{ animationDelay: '0.7s' }}
              />

            </div>
          </div>
        </section>

        {/* Start section */}
        <section id="bat-dau" className="scroll-mt-24 bg-green-soft">
          <div className="wrap py-16 md:py-24">
            <div className="text-center">
              <p className="kicker justify-center">Gợi ý để bắt đầu</p>
              <h2 className="mx-auto mt-3 max-w-2xl text-balance text-3xl sm:text-4xl">
                Chọn một ý tưởng hoặc viết điều bé thích
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {tool.prompts.map((prompt) => (
                <Link
                  key={prompt}
                  href={`/?idea=${encodeURIComponent(prompt)}#thu-ngay`}
                  className={`group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(29,49,80,0.12)]`}
                >
                  <span className="text-lg font-extrabold text-ink">{prompt}</span>
                  <span aria-hidden className={`text-xl ${accent.text}`}>
                    →
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-8 text-center text-sm font-bold uppercase tracking-wide text-ink/55">
              {tool.learning}
            </p>
          </div>
        </section>

        {/* SEO copy block */}
        <section className="py-16 md:py-24">
          <div className="wrap max-w-3xl">
            <h2 className="text-balance text-3xl sm:text-4xl">
              Sáng tạo là một cách học tự nhiên
            </h2>
            <div className="mt-6 space-y-5 text-lg text-ink/75">
              <p className="text-pretty">{tool.seo[0]}</p>
              <p className="text-pretty">{tool.seo[1]}</p>
            </div>
            <Link
              href="/"
              className="mt-8 inline-flex items-center gap-2 font-extrabold text-blue hover:underline"
            >
              ← Trở về Xưởng sáng tạo
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
