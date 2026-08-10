import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
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
            <AuthForm mode="register" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
