# Mầm Sáng Tạo — Product Specification

## 1. Tầm nhìn

Mầm Sáng Tạo là xưởng sáng tạo số an toàn cho trẻ 6–12 tuổi, nơi trẻ biến ý tưởng thành tranh, truyện và dự án lập trình bằng khối. Sản phẩm khuyến khích trẻ chủ động thử, sửa và tạo ra tác phẩm thay vì chỉ xem nội dung thụ động.

## 2. Đối tượng

- Người dùng chính: trẻ 6–12 tuổi, thao tác cùng hoặc dưới sự hướng dẫn của người lớn.
- Người quyết định: phụ huynh, giáo viên và trường học.
- Nguyên tắc: không quảng cáo, không trò chuyện với người lạ, không công khai dữ liệu trẻ em.

## 3. Phạm vi phiên bản hiện tại

Đây là prototype front-end có tương tác, chưa gọi API AI, chưa lưu tài khoản và chưa gửi biểu mẫu thật.

### Có trong phiên bản này

- Trang chủ responsive và ba landing page công cụ.
- Luồng tạo tranh mẫu: nhập ý tưởng → chờ tạo → xem bốn phương án → chọn phong cách/tác phẩm → thao tác tiếp.
- Công cụ Truyện tạo bản nháp nhiều trang và truyện tranh tự vẽ; công cụ Lập trình có xưởng khối lệnh và sân khấu chạy thử.
- Tìm kiếm nội bộ, dark mode, menu mobile, trang giới thiệu/pháp lý/liên hệ.
- Metadata, Open Graph, robots và sitemap.

### Chưa có trong phiên bản này

- API tạo ảnh hoặc mô hình ngôn ngữ thật.
- API tạo ảnh AI, Excalidraw và Blockly thật. Bàn vẽ canvas nội bộ đã hoạt động.
- Đăng nhập, lưu cloud, thanh toán hoặc gửi email thật.
- Chia sẻ công khai tác phẩm của trẻ.

## 4. Luồng tạo tranh chuẩn

1. Người dùng chọn tab **Tranh**.
2. Nhập ý tưởng hoặc bấm một chip gợi ý; chip phải tự điền nội dung và cuộn tới xưởng.
3. Chọn phong cách: Hoạt hình, Màu nước, Giấy cắt hoặc Tranh tô màu.
4. Bấm **Tạo 4 tranh mẫu**.
5. Hiển thị lần lượt các trạng thái: gom ý tưởng → pha màu → hoàn thiện.
6. Hiển thị bốn phương án minh họa prototype, có trạng thái được chọn rõ ràng.
7. Cho phép: chọn tranh, đổi phong cách, tạo lại, mở bàn vẽ và tải bản mẫu.
8. Bàn vẽ mở toàn màn hình và focus đúng đầu công cụ; người dùng có thể thu nhỏ/phóng to, sửa chữ/màu chữ, đổi màu từng vùng nền, dùng cọ/tẩy, hoàn tác, thêm/chọn/kéo thả/xóa cả icon mẫu lẫn sticker, khôi phục mẫu và tải PNG.
9. Mọi thao tác prototype phải giải thích rõ rằng đây chưa phải ảnh AI thật.

## 5. Yêu cầu UX

### Luồng Truyện

1. Nhập ý tưởng, nhân vật, bối cảnh và chọn giọng kể.
2. Tạo bản nháp bốn trang cục bộ, giải thích rõ chưa dùng AI.
3. Cho phép sửa tên truyện và nội dung từng trang, thêm/xóa/chuyển trang; trang mới có nội dung mở đầu, nhóm gợi ý theo ngữ cảnh và nút sinh bộ gợi ý khác.
4. Hiển thị số trang, số từ và cho phép tải toàn bộ truyện dạng TXT.
5. Xưởng Truyện có chế độ phóng to toàn màn hình và thu nhỏ mà không mất nội dung.
6. Chế độ Truyện tranh cung cấp khung minh họa riêng cho từng trang, gợi ý cảnh vẽ và cọ/tẩy/màu/tải ảnh đơn giản.

### Luồng Lập trình

1. Nhập nhiệm vụ rồi mở xưởng khối lệnh.
2. Bấm hoặc kéo các khối di chuyển, xoay, nói, phát nốt nhạc và đổi màu vào chương trình.
3. Sắp xếp bằng kéo thả hoặc nút lên/xuống; cho phép xóa từng khối hoặc toàn bộ.
4. Chạy tuần tự trên sân khấu, tô sáng khối hiện tại, dừng và đặt lại trạng thái.
5. Hỗ trợ toàn màn hình, khôi phục mẫu và tải dự án JSON cục bộ.
6. Chế độ Game nhận diện prompt để chọn chủ đề; hỗ trợ Nhặt vật phẩm, Đua về đích, Tìm kho báu, Mê cung, Chạy vượt chướng ngại và Bay qua cổng, có tính điểm và nhạc nền Web Audio.
7. Khi chọn Ý tưởng khác, trang cuộn và focus lại đúng ô nhập ý tưởng của tab hiện tại.

- Mobile-first; vùng bấm tối thiểu 44px.
- Dưới 901px phải có menu điều hướng thay thế nav desktop.
- Có focus state, label/aria-label và hỗ trợ bàn phím.
- Tôn trọng `prefers-reduced-motion`.
- Không dùng dark pattern hoặc tạo cảm giác chức năng demo là chức năng thật.
- Tiếng Việt tự nhiên, dễ hiểu với trẻ và phụ huynh.

## 6. Yêu cầu SEO

- Một H1 duy nhất trên mỗi trang; heading có thứ bậc đúng.
- URL gốc hiện tại: `https://mam-sang-tao.hailong1289.chatgpt.site`.
- Có thể thay bằng `NEXT_PUBLIC_SITE_URL` khi gắn domain riêng.
- Mỗi trang công cụ có title, description và canonical riêng.
- Sitemap gồm các trang nội dung công khai; không đưa đăng nhập/đăng ký vào sitemap.
- Open Graph dùng ảnh `public/og.png` theo tỷ lệ ngang.
- Nội dung SEO phải là HTML, không nằm hoàn toàn trong ảnh.

## 7. Yêu cầu kỹ thuật

- vinext/Sites với App Router API, React, TypeScript strict và Tailwind CSS. Vercel/v0 chỉ được dùng để tạo layout mẫu, không phải runtime triển khai.
- Production build không được bỏ qua lỗi TypeScript.
- `npx tsc --noEmit` và production build phải thành công trước khi phát hành.
- Component nhỏ, tên rõ nghĩa; không dồn toàn bộ trang vào một file.
- Không thêm backend/persistence nếu chưa có quyết định kiến trúc và chính sách dữ liệu trẻ em.

## 8. Tiêu chí hoàn thành đợt nâng cấp này

- [x] TypeScript validation được bật và không còn lỗi.
- [x] Chip gợi ý tự điền đúng ý tưởng.
- [x] Mobile menu mở/đóng được, đóng khi chọn liên kết và có thuộc tính accessibility.
- [x] Luồng Tranh có input, style, loading, bốn kết quả và hành động tiếp theo.
- [x] Bàn vẽ canvas hỗ trợ chuột/cảm ứng, cọ màu, tẩy, hoàn tác, kéo thả sticker và tải PNG.
- [x] Bàn vẽ mở toàn màn hình, khóa cuộn nền, focus đúng đầu công cụ và có nút thu nhỏ/phóng to.
- [x] Khi đóng bàn vẽ, cuộn nền được khôi phục và focus quay lại đúng phương án tranh đang chọn.
- [x] Tiêu đề, dòng phụ, màu chữ, ba vùng nền và vị trí các icon mẫu đều chỉnh sửa độc lập.
- [x] Luồng Truyện có cấu hình đầu vào, bản nháp nhiều trang, trình sửa trang và tải TXT.
- [x] Trang truyện mới có gợi ý theo mạch truyện; xưởng hỗ trợ phóng to/thu nhỏ.
- [x] Có sinh bộ gợi ý khác và chế độ Truyện tranh với khung tự vẽ riêng từng trang.
- [x] Xưởng Lập trình có palette khối, vùng chương trình, chạy thử sân khấu và tải JSON.
- [x] Có chế độ Game, tính điểm, điều khiển bàn phím, nhạc nền và khối phát âm thanh.
- [x] Game bám prompt theo chủ đề và có bốn mẫu luật chơi đơn giản; luồng quay lại focus đúng ô nhập.
- [x] Có mẫu platform chạy/nhảy và mẫu bay qua cổng với trọng lực, va chạm và tính điểm.
- [x] Metadata có `metadataBase`, canonical, Twitter/Open Graph đúng.
- [x] Sitemap/robots dùng cùng URL gốc và bao phủ trang công khai.
- [x] Build production thành công.

## 9. Giai đoạn tiếp theo

Sau khi bàn vẽ được xác nhận, ưu tiên tích hợp API tạo ảnh có kiểm duyệt đầu vào/đầu ra, rồi bổ sung lưu tác phẩm. Truyện và Blockly được triển khai sau khi luồng Tranh có số liệu sử dụng thực tế.
