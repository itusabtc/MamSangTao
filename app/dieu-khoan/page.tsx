import type { Metadata } from 'next'
import { LegalPage, type LegalSection } from '@/components/legal-page'

export const metadata: Metadata = {
  title: 'Điều khoản sử dụng — Mầm Sáng Tạo',
  description: 'Các điều khoản và điều kiện khi sử dụng nền tảng sáng tạo Mầm Sáng Tạo.',
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'Chấp nhận điều khoản',
    paragraphs: [
      'Khi tạo tài khoản hoặc sử dụng Mầm Sáng Tạo, bạn đồng ý với các điều khoản dưới đây. Nếu bạn là phụ huynh hoặc người giám hộ đăng ký thay cho trẻ, bạn đồng ý thay mặt và chịu trách nhiệm cho việc sử dụng của trẻ.',
    ],
  },
  {
    heading: 'Tài khoản cho trẻ em',
    paragraphs: [
      'Mầm Sáng Tạo được thiết kế cho trẻ 6–12 tuổi và cần có sự đồng ý của phụ huynh. Phụ huynh chịu trách nhiệm giám sát hoạt động của trẻ và bảo mật thông tin đăng nhập.',
    ],
    bullets: [
      'Không chia sẻ mật khẩu với người khác.',
      'Thông tin đăng ký phải chính xác và được cập nhật khi cần.',
      'Một tài khoản dành cho một gia đình hoặc lớp học sử dụng hợp lý.',
    ],
  },
  {
    heading: 'Sử dụng được phép',
    paragraphs: [
      'Bạn được sử dụng nền tảng cho mục đích học tập và sáng tạo cá nhân. Vui lòng không sử dụng dịch vụ theo cách gây hại, vi phạm pháp luật hoặc ảnh hưởng tới người dùng khác.',
    ],
  },
  {
    heading: 'Nội dung do người dùng tạo',
    paragraphs: [
      'Các tác phẩm bé tạo ra thuộc về bé và gia đình. Chúng tôi chỉ lưu trữ nội dung để hiển thị lại cho bạn và không sử dụng cho mục đích thương mại nếu không có sự đồng ý.',
    ],
  },
  {
    heading: 'Thay đổi dịch vụ',
    paragraphs: [
      'Chúng tôi có thể cập nhật, bổ sung hoặc tạm dừng một số tính năng để cải thiện trải nghiệm. Những thay đổi quan trọng sẽ được thông báo trước tới người dùng.',
    ],
  },
  {
    heading: 'Liên hệ',
    paragraphs: [
      'Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ qua email hello@mamsangtao.vn hoặc trang Liên hệ.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      kicker="Pháp lý"
      title="Điều khoản sử dụng"
      updated="11/08/2026"
      intro="Điều khoản này giải thích quyền và trách nhiệm của bạn khi sử dụng Mầm Sáng Tạo. Chúng tôi cố gắng viết ngắn gọn và dễ hiểu nhất có thể."
      sections={SECTIONS}
    />
  )
}
