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
            <button type="button" className="font-bold text-blue hover:underline">
              Quên mật khẩu?
            </button>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary mt-7 w-full justify-center">
        {isRegister ? 'Tạo tài khoản' : 'Đăng nhập'}
      </button>

      <div className="my-6 flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-ink/45">
        <span className="h-px flex-1 bg-hairline" />
        hoặc tiếp tục với
        <span className="h-px flex-1 bg-hairline" />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="flex items-center justify-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3 text-sm font-extrabold text-ink transition-colors hover:border-blue/50 hover:bg-ink/[0.03]"
        >
          <GoogleIcon />
          Google
        </button>
        <button
          type="button"
          onClick={() => setSubmitted(true)}
          className="flex items-center justify-center gap-2.5 rounded-lg border border-hairline bg-surface px-4 py-3 text-sm font-extrabold text-ink transition-colors hover:border-blue/50 hover:bg-ink/[0.03]"
        >
          <FacebookIcon />
          Facebook
        </button>
      </div>

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

function GoogleIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#4285F4"
        d="M23.52 12.27c0-.82-.07-1.6-.2-2.36H12v4.46h6.47a5.53 5.53 0 0 1-2.4 3.63v3h3.88c2.27-2.09 3.57-5.17 3.57-8.73z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.88-3c-1.08.72-2.45 1.15-4.07 1.15-3.13 0-5.78-2.11-6.73-4.96H1.28v3.09A12 12 0 0 0 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.27 14.29a7.2 7.2 0 0 1 0-4.58V6.62H1.28a12 12 0 0 0 0 10.76l3.99-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.95 1.18 15.24 0 12 0A12 12 0 0 0 1.28 6.62l3.99 3.09C6.22 6.86 8.87 4.75 12 4.75z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path
        fill="#1877F2"
        d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"
      />
    </svg>
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
