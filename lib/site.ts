const FALLBACK_SITE_URL = 'https://mam-sang-tao.hailong1289.chatgpt.site'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL).replace(/\/$/, '')
export const SITE_NAME = 'Mầm Sáng Tạo'
export const SITE_DESCRIPTION =
  'Xưởng sáng tạo an toàn cho trẻ 6–12 tuổi: vẽ tranh từ ý tưởng, tạo truyện riêng và làm quen với lập trình bằng khối.'
