'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { Check, Eye, EyeOff, Info } from 'lucide-react'

type AuthFormProps = {
  mode: 'login' | 'register'
}

export function AuthForm({ mode }: AuthFormProps) {
  const isRegister = mode === 'register'
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    agree: false,
  })

  function update<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-hairline bg-white p-8 text-center shadow-[0_18px_40px_rgba(29,49,80,0.08)]">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green/15 text-green">
          <Check className="h-7 w-7" strokeWidth={3} />
        </span>
        <h2 className="mt-5 text-2xl">
          {isRegister ? 'Tạo tài khoản thành công!' : 'Chào mừng quay lại!'}
        </h2>
        <p className="mt-3 text-pretty text-ink/70">
          Đây là bản demo giao diện nên chưa lưu tài khoản thật. Khi kết nối hệ thống đăng nhập, các
          thông tin sẽ được xử lý an toàn tại đây.
        </p>
        <Link href="/" className="btn btn-primary mt-6">
          Về trang chủ →
        </Link>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-hairline bg-white p-7 shadow-[0_18px_40px_rgba(29,49,80,0.08)] sm:p-8"
    >
      <div className="flex items-start gap-2 rounded-xl bg-cream px-4 py-3 text-sm text-ink/70">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
        <span>Bản demo giao diện — thông tin không được lưu lại.</span>
      </div>

      <div className="mt-6 space-y-5">
        {isRegister ? (
          <Field label="Tên của bạn" htmlFor="name">
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              value={values.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="Nguyễn Văn A"
              className="field"
            />
          </Field>
        ) : null}

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="ban@email.com"
            className="field"
          />
        </Field>

        <Field label="Mật khẩu" htmlFor="password">
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              minLength={6}
              autoComplete={isRegister ? 'new-password' : 'current-password'}
              value={values.password}
              onChange={(e) => update('password', e.target.value)}
              placeholder={isRegister ? 'Tối thiểu 6 ký tự' : 'Nhập mật khẩu'}
              className="field pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/50 hover:text-ink"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </Field>

        {isRegister ? (
          <label className="flex items-start gap-3 text-sm text-ink/75">
            <input
              type="checkbox"
              required
              checked={values.agree}
              onChange={(e) => update('agree', e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-hairline accent-blue"
            />
            <span>
              Tôi đồng ý với{' '}
              <Link href="/dieu-khoan" className="font-bold text-blue hover:underline">
                Điều khoản sử dụng
              </Link>{' '}
              và{' '}
              <Link href="/chinh-sach" className="font-bold text-blue hover:underline">
                Chính sách quyền riêng tư
              </Link>
              .
            </span>
          </label>
        ) : (
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-ink/75">
              <input type="checkbox" className="h-5 w-5 rounded border-hairline accent-blue" />
              Ghi nhớ đăng nhập
            </label>
            <a href="#" className="font-bold text-blue hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full justify-center">
        {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
      </button>

      <p className="mt-6 text-center text-sm text-ink/70">
        {isRegister ? 'Đã có tài khoản? ' : 'Chưa có tài khoản? '}
        <Link
          href={isRegister ? '/dang-nhap' : '/dang-ky'}
          className="font-bold text-blue hover:underline"
        >
          {isRegister ? 'Đăng nhập' : 'Đăng ký ngay'}
        </Link>
      </p>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string
  htmlFor: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-extrabold text-ink">
        {label}
      </label>
      {children}
    </div>
  )
}
