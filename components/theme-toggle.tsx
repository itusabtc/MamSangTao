'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setMounted(true)
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  function toggle() {
    const next = !document.documentElement.classList.contains('dark')
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    setIsDark(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      title={isDark ? 'Chế độ sáng' : 'Chế độ tối'}
      className="grid h-10 w-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-blue"
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch */}
      {mounted && isDark ? (
        <Sun className="h-[22px] w-[22px]" />
      ) : (
        <Moon className="h-[22px] w-[22px]" />
      )}
    </button>
  )
}
