import type { Metadata } from 'next'
import Link from 'next/link'
import { chatGPTSignInPath } from '@/app/chatgpt-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Đăng nhập — Mầm Sáng Tạo',
  description: 'Đăng nhập vào Mầm Sáng Tạo để tiếp tục hành trình sáng tạo của bé.',
}

export default function LoginPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main className="grid place-items-center px-5 py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="kicker justify-center">Chào mừng quay lại</p>
            <h1 className="mt-3 text-balance text-3xl sm:text-4xl">Đăng nhập</h1>
            <p className="mx-auto mt-3 max-w-sm text-pretty text-ink/70">
              Tiếp tục nơi bé đã dừng lại và khám phá những ý tưởng mới.
            </p>
          </div>
          <div className="mt-8">
            <div className="rounded-2xl border border-hairline bg-white p-7 text-center shadow-lg"><div className="text-5xl">🌱</div><h2 className="mt-4 text-2xl">Đăng nhập an toàn</h2><p className="mt-3 text-ink/65">Dùng tài khoản ChatGPT để bảo vệ hồ sơ, tiến độ, bạn bè và lời thách đấu của bé.</p><Link href={chatGPTSignInPath('/ho-so')} className="btn btn-primary mt-6 w-full justify-center">Đăng nhập với ChatGPT →</Link><p className="mt-4 text-xs text-ink/50">Mầm Sáng Tạo không nhận hoặc lưu mật khẩu của bạn.</p></div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
