import Image from 'next/image'
import Link from 'next/link'

type BrandLogoProps = {
  /** Extra classes for the wrapping link. */
  className?: string
  /** Badge size in pixels. */
  size?: number
  /** Hide the "Mầm Sáng Tạo" wordmark, showing only the badge. */
  hideWordmark?: boolean
  /** Override the wordmark color, e.g. for dark backgrounds. */
  wordmarkClassName?: string
}

export function BrandLogo({
  className = '',
  size = 40,
  hideWordmark = false,
  wordmarkClassName = 'text-blue',
}: BrandLogoProps) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Mầm Sáng Tạo — về trang chủ"
    >
      <span
        className="grid shrink-0 place-items-center overflow-hidden rounded-[28%] shadow-sm ring-1 ring-ink/10"
        style={{ width: size, height: size }}
      >
        <Image
          src="/brand/favicon-source.png"
          alt=""
          width={size}
          height={size}
          className="h-full w-full object-cover"
          priority
        />
      </span>
      {!hideWordmark && (
        <span
          className={`font-display text-lg font-extrabold leading-none tracking-tight sm:text-[22px] ${wordmarkClassName}`}
        >
          Mầm Sáng Tạo
        </span>
      )}
    </Link>
  )
}
