import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Chính sách quyền riêng tư — Mầm Sáng Tạo',
  description:
    'Cách Mầm Sáng Tạo thu thập, sử dụng và bảo vệ thông tin của trẻ em và phụ huynh.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Cam kết của chúng tôi',
    paragraphs: [
      'Quyền riêng tư của trẻ em là ưu tiên hàng đầu của Mầm Sáng Tạo. Chúng tôi thu thập càng ít dữ liệu càng tốt và không bao giờ bán thông tin cá nhân của bạn cho bên thứ ba.',
    ],
  },
  {
    heading: 'Thông tin chúng tôi thu thập',
    paragraphs: ['Chúng tôi chỉ thu thập những thông tin cần thiết để dịch vụ hoạt động:'],
    bullets: [
      'Thông tin tài khoản: tên hiển thị và email của phụ huynh.',
      'Nội dung sáng tạo: tranh, truyện và dự án bé tạo ra.',
      'Dữ liệu kỹ thuật cơ bản để giữ dịch vụ ổn định và an toàn.',
    ],
  },
  {
    heading: 'Cách chúng tôi sử dụng dữ liệu',
    paragraphs: [
      'Dữ liệu được dùng để hiển thị lại tác phẩm của bé, cải thiện chất lượng công cụ và đảm bảo môi trường an toàn. Chúng tôi không dùng dữ liệu của trẻ cho quảng cáo nhắm mục tiêu.',
    ],
  },
  {
    heading: 'Không có quảng cáo cho trẻ',
    paragraphs: [
      'Nền tảng không hiển thị quảng cáo của bên thứ ba trong không gian sáng tạo của trẻ và không theo dõi hành vi để phục vụ quảng cáo.',
    ],
  },
  {
    heading: 'Quyền của phụ huynh',
    paragraphs: [
      'Phụ huynh có thể xem, chỉnh sửa hoặc yêu cầu xóa dữ liệu của con bất kỳ lúc nào bằng cách liên hệ với chúng tôi. Chúng tôi sẽ xử lý yêu cầu trong thời gian sớm nhất.',
    ],
  },
  {
    heading: 'Bảo mật dữ liệu',
    paragraphs: [
      'Chúng tôi áp dụng các biện pháp kỹ thuật hợp lý để bảo vệ thông tin khỏi truy cập trái phép. Tuy nhiên, không có hệ thống nào an toàn tuyệt đối, nên hãy giữ mật khẩu của bạn cẩn thận.',
    ],
  },
  {
    heading: 'Liên hệ',
    paragraphs: [
      'Nếu bạn có câu hỏi về quyền riêng tư, hãy liên hệ hello@mamsangtao.vn hoặc qua trang Liên hệ.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      kicker="Pháp lý"
      title="Chính sách quyền riêng tư"
      updated="11/08/2026"
      intro="Chính sách này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn và của bé — được viết để phụ huynh dễ dàng nắm rõ."
      sections={SECTIONS}
    />
  )
}
