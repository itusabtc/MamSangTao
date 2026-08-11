import Link from 'next/link'
import { Blocks, MoonStar, Sparkles, type LucideIcon } from 'lucide-react'

type Tool = {
  no: string
  color: 'coral' | 'violet' | 'green'
  Icon: LucideIcon
  title: string
  desc: string
  href: string
}

const TOOLS: Tool[] = [
  {
    no: '01',
    color: 'coral',
    Icon: Sparkles,
    title: 'Vẽ tranh từ ý tưởng',
    desc: 'Biến một câu mô tả thành tranh minh hoạ đầy màu sắc.',
    href: '/?tool=tranh#thu-ngay',
  },
  {
    no: '02',
    color: 'violet',
    Icon: MoonStar,
    title: 'Tạo truyện cho bé',
    desc: 'Cùng bé chọn nhân vật, bối cảnh và một kết thúc thật riêng.',
    href: '/?tool=truyen#thu-ngay',
  },
  {
    no: '03',
    color: 'green',
    Icon: Blocks,
    title: 'Lập trình bằng khối',
    desc: 'Ghép khối lệnh, tạo hoạt cảnh, âm nhạc và sáu loại mini game tương tác.',
    href: '/?tool=laptrinh#thu-ngay',
  },
]

const COLOR: Record<Tool['color'], { text: string; bg: string; ring: string }> = {
  coral: { text: 'text-coral', bg: 'bg-coral/12', ring: 'group-hover:border-coral' },
  violet: { text: 'text-violet', bg: 'bg-violet/12', ring: 'group-hover:border-violet' },
  green: { text: 'text-green', bg: 'bg-green/15', ring: 'group-hover:border-green' },
}

export function ToolsSection() {
  return (
    <section id="cong-cu" className="scroll-mt-24 py-16 md:py-24">
      <div className="wrap">
        <div className="grid items-end gap-6 md:grid-cols-[1fr_1fr]">
          <div>
            <p className="kicker">Ba góc sáng tạo</p>
            <h2 className="mt-3 text-3xl sm:text-4xl">Học bằng cách tự tay làm</h2>
          </div>
          <p className="text-pretty text-ink/70 md:pb-1">
            Không có đáp án đúng duy nhất. Mỗi hoạt động là một cơ hội để bé thử,
            sửa và tự hào về tác phẩm của mình.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TOOLS.map((tool) => {
            const c = COLOR[tool.color]
            const { Icon } = tool
            return (
              <Link
                key={tool.no}
                href={tool.href}
                className={`group flex flex-col rounded-3xl border border-hairline bg-white p-7 transition-all duration-200 hover:-translate-y-1.5 hover:shadow-[0_16px_34px_rgba(29,49,80,0.12)] ${c.ring}`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl ${c.bg} ${c.text}`}
                    aria-hidden
                  >
                    <Icon className="h-7 w-7" />
                  </span>
                  <span className={`font-display text-2xl font-bold ${c.text}`}>
                    {tool.no}
                  </span>
                </div>
                <h3 className="mt-6 text-xl">{tool.title}</h3>
                <p className="mt-2 flex-1 text-ink/70">{tool.desc}</p>
                <span
                  className={`mt-6 inline-flex items-center gap-1.5 text-sm font-extrabold ${c.text}`}
                >
                  Mở xưởng sáng tạo →
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
