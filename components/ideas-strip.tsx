import Link from 'next/link'
import { PROMPT_GROUPS } from '@/components/prompt-ideas'

export function IdeasStrip() {
  return (
    <section className="border-y border-hairline bg-white">
      <div className="wrap py-6">
        <p className="kicker">Bé có thể bắt đầu với</p>
        <div className="mt-4 grid gap-3 lg:grid-cols-3">
          {PROMPT_GROUPS.map((group) => <div key={group.id} className="rounded-2xl bg-cream/70 p-3"><p className="text-sm font-extrabold text-blue">{group.icon} {group.label}</p><ul className="mt-2 flex flex-wrap gap-2">{group.ideas.slice(0, 2).map((idea) => (
            <li key={idea}>
              <Link
                href={`/?tool=${group.id}&idea=${encodeURIComponent(idea)}#thu-ngay`}
                className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-hairline bg-white px-3 py-2 text-sm font-bold text-ink transition-colors hover:border-coral hover:text-blue"
              >
                {idea}<span aria-hidden className="text-coral">↗</span>
              </Link>
            </li>
          ))}</ul></div>)}
        </div>
      </div>
    </section>
  )
}
