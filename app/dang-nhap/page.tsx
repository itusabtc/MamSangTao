import type { Metadata } from 'next'
import { AuthForm } from '@/components/auth-form'
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
            <AuthForm mode="login" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
