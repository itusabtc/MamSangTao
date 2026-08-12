import type { Metadata } from 'next'
import Link from 'next/link'
import { chatGPTSignInPath } from '@/app/chatgpt-auth'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Đăng ký — Mầm Sáng Tạo',
  description: 'Tạo tài khoản Mầm Sáng Tạo miễn phí và bắt đầu hành trình sáng tạo cùng bé.',
}

export default function RegisterPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main className="grid place-items-center px-5 py-16 md:py-24">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="kicker justify-center">Bắt đầu miễn phí</p>
            <h1 className="mt-3 text-balance text-3xl sm:text-4xl">Tạo tài khoản</h1>
            <p className="mx-auto mt-3 max-w-sm text-pretty text-ink/70">
              Mở khóa mọi công cụ sáng tạo an toàn dành cho trẻ 6–12 tuổi.
            </p>
          </div>
          <div className="mt-8">
            <div className="rounded-2xl border border-hairline bg-white p-7 text-center shadow-lg"><div className="text-5xl">🪴</div><h2 className="mt-4 text-2xl">Tạo hồ sơ Mầm miễn phí</h2><p className="mt-3 text-ink/65">Xác nhận bằng ChatGPT, sau đó hệ thống tự tạo hồ sơ để lưu thành tích và kết nối bạn bè.</p><Link href={chatGPTSignInPath('/ho-so')} className="btn btn-primary mt-6 w-full justify-center">Tiếp tục với ChatGPT →</Link><p className="mt-4 text-xs text-ink/50">Không cần tạo thêm mật khẩu mới.</p></div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
