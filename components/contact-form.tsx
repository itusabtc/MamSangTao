'use client'

import { useState, type FormEvent } from 'react'
import { Check, Send } from 'lucide-react'

const TOPICS = ['Câu hỏi chung', 'Hỗ trợ kỹ thuật', 'Hợp tác — trường học', 'Góp ý sản phẩm']

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [values, setValues] = useState({
    name: '',
    email: '',
    topic: TOPICS[0],
    message: '',
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
        <h2 className="mt-5 text-2xl">Cảm ơn bạn đã liên hệ!</h2>
        <p className="mt-3 text-pretty text-ink/70">
          Chúng tôi đã nhận được lời nhắn của bạn (bản demo nên tin nhắn chưa thực sự được gửi đi) và
          sẽ phản hồi sớm nhất có thể.
        </p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: '', email: '', topic: TOPICS[0], message: '' })
            setSubmitted(false)
          }}
          className="btn btn-primary mt-6"
        >
          Gửi lời nhắn khác
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-hairline bg-white p-7 shadow-[0_18px_40px_rgba(29,49,80,0.08)] sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-2 block text-sm font-extrabold text-ink">
            Họ và tên
          </label>
          <input
            id="c-name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            placeholder="Nguyễn Văn A"
            className="field"
          />
        </div>
        <div>
          <label htmlFor="c-email" className="mb-2 block text-sm font-extrabold text-ink">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            placeholder="ban@email.com"
            className="field"
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="c-topic" className="mb-2 block text-sm font-extrabold text-ink">
          Chủ đề
        </label>
        <select
          id="c-topic"
          value={values.topic}
          onChange={(e) => update('topic', e.target.value)}
          className="field"
        >
          {TOPICS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="c-message" className="mb-2 block text-sm font-extrabold text-ink">
          Lời nhắn
        </label>
        <textarea
          id="c-message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          placeholder="Bạn muốn chia sẻ điều gì với chúng tôi?"
          className="field resize-y"
        />
      </div>

      <button type="submit" className="btn btn-coral mt-7 w-full justify-center">
        Gửi lời nhắn
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}
