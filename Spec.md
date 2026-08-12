# Mầm Sáng Tạo — Product & Engineering Specification

> Cập nhật: 12/08/2026 · Trạng thái nguồn: `main` · Production: <https://mam-sang-tao.hailong1289.chatgpt.site>

Tài liệu này là nguồn bàn giao chính thức cho AI/developer tiếp theo. Đọc `AGENTS.md` và tài liệu Next.js cục bộ trong `node_modules/next/dist/docs/` trước khi sửa mã. Không suy luận theo Next.js phiên bản cũ.

## 1. Tầm nhìn và nguyên tắc

Mầm Sáng Tạo là hệ sinh thái học và sáng tạo an toàn cho trẻ 6–12 tuổi. Trẻ biến ý tưởng thành tranh, truyện, hoạt hình, âm nhạc và mini game; học qua nghe–nhìn–chạm–thử; được phép sai và tự điều chỉnh.

- Người dùng chính: trẻ 6–12 tuổi; phụ huynh là người đồng hành/quyết định.
- Không quảng cáo, loot box, mua ngẫu nhiên, dark pattern hoặc tạo áp lực điểm số.
- Không trò chuyện công khai với người lạ; không công khai dữ liệu trẻ em.
- Chức năng demo phải ghi rõ nếu chưa dùng AI/API thật.
- Mobile-first; vùng bấm tối thiểu 44px; tiếng Việt tự nhiên, dễ hiểu.

## 2. Stack, nguồn và phát hành

- Runtime: vinext/Sites, App Router API, React 19, TypeScript strict, Tailwind CSS.
- Lưu cloud/community: Cloudflare D1 binding `DB` qua Sites.
- Trạng thái cá nhân trên thiết bị: `localStorage` (tiến độ, Hạt Mầm, kho đồ, lộ trình sở thích).
- GitHub: `https://github.com/itusabtc/MamSangTao.git`, nhánh `main`.
- Sites project: lấy đúng `project_id` trong `.openai/hosting.json`; không tạo site mới.
- Vercel/v0 chỉ là nguồn layout tham khảo, không phải runtime triển khai.
- Trước khi bàn giao: `npm.cmd run typecheck`, `npm.cmd run lint`, `npm.cmd run build` đều phải đạt.
- Sau thay đổi đã được duyệt: commit đúng file liên quan, push GitHub, đóng gói bằng Sites, save version, deploy và chờ trạng thái `succeeded`.
- Không stage log, archive build, `AGENTS.md`, `CLAUDE.md`, `docs/` hoặc file ngoài phạm vi nếu chưa được yêu cầu.

## 3. Điều hướng và route

Header desktop/mobile:

1. `/xuong-sang-tao` — Xưởng sáng tạo.
2. `/khoa-hoc` — Khóa học, có mega-menu 5 khóa.
3. `/cua-hang-mam` — Cửa hàng Mầm.
4. `/bang-xep-hang` — Bảng xếp hạng.
5. `/danh-gia`, tìm kiếm, dark mode, `/ho-so`.

Mega-menu đóng khi chọn link, nhấn Escape hoặc rời vùng menu; không tự mở lại tức thì. Giới thiệu, liên hệ, pháp lý và thương hiệu nằm ở footer.

Route công khai chính: `/`, `/cong-cu/[slug]`, `/xuong-sang-tao`, `/khoa-hoc`, `/khoa-hoc/[slug]`, `/cua-hang-mam`, `/bang-xep-hang`, `/ho-so`, `/dang-nhap`, `/dang-ky`, `/danh-gia`, `/gioi-thieu`, `/lien-he`, `/thuong-hieu`, `/chinh-sach`, `/dieu-khoan`.

## 4. Xưởng sáng tạo

### 4.1 Prompt chung

- Mỗi tab có prompt gợi ý riêng; chọn chip phải điền nội dung, chọn đúng tab/tool và cuộn/focus đúng vùng nhập.
- Dải prompt nhanh bên ngoài được chia theo cụm tool, không tạo vòng điều hướng.
- Nút Phóng to/Thu nhỏ luôn ở bên phải hàng tab và áp dụng cho cả màn hình prompt lẫn studio.
- Khi đóng studio hoặc “Ý tưởng khác”, khôi phục scroll và focus đúng vị trí trước đó.

### 4.2 Vẽ tranh

- Nhập ý tưởng → chọn phong cách → trạng thái tạo → 4 phương án mẫu → chọn → mở bản vẽ/tạo lại/tải mẫu.
- Canvas hỗ trợ chuột/cảm ứng: cọ, tẩy, màu, cỡ cọ, undo, clear, khôi phục mẫu, tải PNG.
- Sửa tiêu đề, phụ đề, màu chữ và màu ba vùng nền độc lập.
- Sticker/icon mẫu đều chọn, kéo thả và xóa được; sticker được chọn có viền rõ.
- Kho có 62+ emoji, chia 6 nhóm: Nổi bật, Động vật, Thiên nhiên, Vũ trụ, Cảm xúc, Đồ vật; bộ đã mua bổ sung item tương ứng.
- Fullscreen khóa scroll nền, focus heading; thu nhỏ/đóng phải trả focus về phương án tranh đã chọn.
- Đây là canvas nội bộ, chưa phải Excalidraw hay API tạo ảnh thật.

### 4.3 Truyện

- Cấu hình nhân vật, bối cảnh, giọng kể → bản nháp nhiều trang.
- Sửa tên/nội dung từng trang; thêm, xóa, chuyển trang; tải TXT.
- Trang mới có nội dung mở và 4 gợi ý theo ngữ cảnh; có nút sinh bộ gợi ý khác.
- Fullscreen/thu nhỏ không làm mất nội dung.
- Chế độ truyện tranh: mỗi trang có cảnh vẽ riêng, gợi ý minh họa, cọ/tẩy/màu/tải ảnh.
- Vật phẩm nền truyện đã mua xuất hiện trực tiếp trong studio.

### 4.4 Lập trình và game

- Prompt tự nhận diện loại game; người dùng vẫn có thể chọn thủ công ngay dưới prompt.
- Sáu loại: Nhặt vật phẩm, Đua về đích, Tìm kho báu, Mê cung, Chạy vượt chướng ngại, Bay qua cổng.
- Palette khối → vùng chương trình → sắp xếp/kéo thả/xóa → chạy/dừng/đặt lại → tải JSON.
- Có game platform chạy/nhảy và game bay với trọng lực, va chạm, điểm số, bàn phím.
- Nhân vật lọc theo luật chơi và bối cảnh prompt; icon tự quay theo hướng di chuyển. Game bay có chim, vẹt, đại bàng, cú, bướm, ong.
- Nhạc nền Web Audio, khối phát âm thanh, bật/tắt nhạc.
- Vật phẩm nhân vật và âm thanh đã mua xuất hiện trong dự án.

### 4.5 Âm nhạc và hoạt hình

- Âm nhạc: sequencer 8 bước, chọn nhạc cụ, tốc độ, ngẫu nhiên, phát/dừng.
- Hoạt hình: chọn nhân vật, bối cảnh, chuỗi cảnh, xem thử.

## 5. Khóa học

### 5.1 Danh mục và cá nhân hóa

Có 5 khóa, tổng 35 bài: Cờ vua nhập môn, Âm nhạc vui nhộn, Vẽ nhân vật hoạt hình, Kể chuyện tự tin, Game đầu tiên của bé.

Trang `/khoa-hoc` hiện có:

- Onboarding cục bộ: chọn nhóm tuổi 6–7, 8–9 hoặc 10–12 và tối đa 3 sở thích.
- Sở thích lưu tại `mam-learner-profile-v1`; khóa học tự xếp theo độ phù hợp.
- Thẻ khóa hiển thị độ tuổi, mức độ, kỹ năng, mô tả, thời lượng, tiến độ và sản phẩm cuối khóa.
- Nút **Học thử** vào `/khoa-hoc/[slug]?trial=1`, tự mở bài đầu, không bắt đăng nhập.
- Khối **Tiếp tục hành trình** xuất hiện nếu có khóa đang học dở.
- Bản đồ năng lực lấy từ tiến độ thật trên thiết bị: Sáng tạo, Logic, Ngôn ngữ, Âm nhạc.
- CTA báo cáo phụ huynh dẫn tới `/ho-so`.

Metadata trải nghiệm khóa học nằm tại `lib/course-experience.ts`; nội dung 35 bài tại `lib/courses.ts`.

### 5.2 Luồng bài học

- Bản đồ bài dạng gamification; chỉ mở bài tiếp theo khi hoàn thành bài trước.
- Popup/phòng học toàn màn hình: header tiến độ + tim, vùng nội dung co theo viewport, Escape để đóng.
- Chu trình: hướng dẫn/giọng Việt → thực hành tương tác → kiểm tra nhanh → kết quả/phần thưởng.
- Mỗi bài có mục tiêu, 3 bước, bài thực hành và mẹo phụ huynh riêng.
- Cờ vua có bàn 8×8, nước đi hợp lệ, đổi lựa chọn quân, trộn/xếp chuẩn/gợi ý/kiểm tra.
- Âm nhạc có sequencer; Vẽ/Truyện/Lập trình có hoạt động trực quan và nút ngẫu nhiên phù hợp.
- Âm thanh phản hồi đúng/sai/hoàn thành; trợ giảng đọc tiếng Việt và có fallback khi thiết bị thiếu giọng Việt.
- Kết quả cộng XP, Hạt Mầm, phút học, bài hoàn hảo và streak vào `mam-learning-progress-v2`.

### 5.3 Nhiệm vụ, đấu trường và báo cáo

- Nhiệm vụ ngày/tuần, streak, XP, Hạt Mầm và huy hiệu.
- Đấu trường cuối khóa: 3 câu, thi với Mầm Bot, kết quả, thi lại, ELO.
- Bảng xếp hạng riêng `/bang-xep-hang`: top 20, podium top 3, tab Điểm KN/Chuỗi ngày; ưu tiên D1, có dữ liệu fallback local.
- Hồ sơ hiển thị thống kê, huy hiệu, tác phẩm, nhiệm vụ, cộng đồng, lời thách đấu và dữ liệu phụ huynh.

## 6. Cửa hàng Mầm và inventory

- Tiền tệ: Hạt Mầm; không tiền thật, không mua ngẫu nhiên, không lợi thế thi đấu.
- Số dư và inventory lưu local (`mam-seeds`, `mam-inventory`).
- Lọc theo: Tất cả, Sticker, Truyện, Game, Vẽ, Âm nhạc, Hỗ trợ.
- 18 vật phẩm, mỗi tab 3 bộ:
  - Sticker: Vũ trụ, Muông thú, Tiệc vui.
  - Truyện: Đại dương, Rừng cổ tích, Du hành sao.
  - Game: Chim bay, Khủng long, Thợ lặn.
  - Vẽ: Hoàng hôn, Kẹo ngọt, Cọ Kim tuyến.
  - Âm nhạc: Phép thuật, Thiên nhiên, Game vui.
  - Hỗ trợ: Lá bảo vệ chuỗi, Túi 3 gợi ý, Tim thử lại.
- Mua có xác nhận, kiểm tra đủ hạt và trạng thái đã sở hữu; kho đồ hiển thị item đã mua.
- Một số item đã nối trực tiếp vào studio. AI tiếp theo phải nối nốt các ID mới thay vì chỉ để chúng tồn tại trong shop.

## 7. Tài khoản và cộng đồng

- Có `/dang-nhap`, `/dang-ky`, `/ho-so`; đăng nhập Sites/ChatGPT và API community.
- D1 schema tạo/lazy-init trong `lib/community-db.ts`: `profiles`, `follows`, `challenges` cùng index.
- Đã seed khoảng 20 thành viên mẫu; có tìm bạn, theo dõi, mời bạn và thách đấu.
- Profile cộng đồng có XP, seeds, streak, avatar, bio, followers/following và challenge.
- Không thêm tính năng nhắn tin công khai giữa trẻ em nếu chưa có thiết kế kiểm duyệt/an toàn.

## 8. SEO, accessibility và chất lượng

- Mỗi trang một H1, heading đúng cấp, metadata/canonical riêng.
- `metadataBase`, Open Graph/Twitter, robots và sitemap dùng cùng URL gốc.
- Sitemap chỉ chứa trang công khai; đã có `/khoa-hoc`, chi tiết khóa, shop, xưởng và bảng xếp hạng.
- Nội dung SEO phải là HTML, không đặt hoàn toàn trong ảnh.
- Hỗ trợ keyboard, focus state, aria-label, Escape, touch; tôn trọng `prefers-reduced-motion`.
- Dark mode và menu mobile phải tiếp tục hoạt động sau mọi thay đổi header/layout.

## 9. File chịu trách nhiệm chính

| Phạm vi | File |
|---|---|
| Header/footer/search/theme | `components/site-header.tsx`, `site-footer.tsx`, `site-search.tsx`, `theme-toggle.tsx` |
| Prompt/xưởng tổng | `app/studio-demo.tsx`, `components/demo-section.tsx`, `prompt-ideas.ts` |
| Tranh | `components/drawing-canvas.tsx` |
| Truyện | `components/story-studio.tsx`, `story-sketch.tsx` |
| Game/lập trình | `components/coding-studio.tsx` |
| Âm nhạc/hoạt hình | `components/music-studio.tsx`, `animation-studio.tsx` |
| Danh mục khóa học | `components/course-discovery.tsx`, `lib/course-experience.ts` |
| Dữ liệu bài học | `lib/courses.ts` |
| Luồng học | `components/course-progress.tsx`, `lesson-activity.tsx` |
| Nhiệm vụ/đấu trường | `components/daily-quests.tsx`, `course-arena.tsx` |
| Tiến độ/âm thanh | `lib/learning-progress.ts`, `learning-audio.ts` |
| Shop/inventory | `components/seed-shop.tsx`, `lib/inventory.ts` |
| Hồ sơ/community | `components/profile-community.tsx`, `profile-showcase.tsx`, `lib/community-db.ts`, `app/api/community/route.ts` |
| Xếp hạng | `components/leaderboard-board.tsx`, `app/bang-xep-hang/page.tsx` |
| SEO | `app/layout.tsx`, `sitemap.ts`, `robots.ts`, `lib/site.ts` |

## 10. Trạng thái thật và giới hạn hiện tại

- Tranh/truyện/game hiện sinh nội dung bằng logic/mẫu cục bộ, chưa gọi API AI thật.
- Canvas chưa phải Excalidraw; khối lệnh chưa phải Blockly/Scratch thật.
- Tiến độ học, shop và inventory chủ yếu theo thiết bị; community dùng D1.
- Chưa có thanh toán, email thật hoặc chia sẻ công khai tác phẩm.
- Dữ liệu fallback/demo phải được phân biệt với dữ liệu thành viên thật.
- Không tuyên bố hiệu quả giáo dục, “số 1”, khan hiếm hoặc thành tích không có nguồn kiểm chứng.

## 11. Backlog ưu tiên

### P0 — hoàn thiện những gì đã hứa

- [ ] Nối toàn bộ 18 vật phẩm shop vào đúng studio/chức năng; hiện mới có một số bộ legacy được tiêu thụ.
- [ ] Thay hoạt động trực quan dùng chung bằng bài thực hành riêng theo từng lesson, nhất là 4 khóa ngoài cờ vua.
- [ ] Đồng bộ tiến độ local với hồ sơ D1 sau đăng nhập, có chiến lược merge rõ ràng.
- [ ] Rà toàn bộ responsive 360/768/1024/1440 và keyboard focus sau các thay đổi mới.

### P1 — nâng trải nghiệm học

- [ ] Đánh giá đầu vào 5 hoạt động vui và sinh lộ trình theo kết quả, không dùng bài thi nặng nề.
- [ ] Ôn tập thích ứng: ưu tiên dạng bài sai, giảm bài đã thành thạo.
- [ ] Báo cáo tuần cho phụ huynh: thời gian, kỹ năng, điểm cần hỗ trợ, tác phẩm mới.
- [ ] Hoạt động ngoài màn hình cho từng bài (giấy, đồ vật, vận động).
- [ ] Ghi âm kể chuyện/phát âm chỉ khi có consent và thiết kế dữ liệu trẻ em phù hợp.

### P2 — AI thật

- [ ] API tạo ảnh có kiểm duyệt prompt/ảnh đầu ra và giới hạn phù hợp trẻ em.
- [ ] Lưu tác phẩm cloud riêng tư, quyền xóa/xuất dữ liệu cho phụ huynh.
- [ ] Cân nhắc tích hợp Excalidraw/Blockly sau khi xác nhận yêu cầu và đo usage thực tế.

## 12. Quy trình làm việc và review từ thời điểm này

1. AI triển khai phải đọc `AGENTS.md` + `Spec.md`, kiểm tra worktree và không ghi đè thay đổi người khác.
2. Mỗi task ghi rõ: phạm vi, file thay đổi, acceptance criteria, kiểm thử đã chạy và ảnh/video nếu là lỗi UI.
3. Không tự mở rộng sang tính năng khác; mọi thay đổi dữ liệu trẻ em, thanh toán, chia sẻ hoặc quyền truy cập cần phê duyệt riêng.
4. Khi báo hoàn thành, cung cấp commit SHA và danh sách điểm cần reviewer chú ý.
5. Vai trò Codex chính từ đây: **chỉ review sau khi AI khác báo làm xong**, trừ khi người dùng yêu cầu trực tiếp Codex triển khai.
6. Review phải kiểm tra: đúng Spec, regression, TypeScript/lint/build, mobile/accessibility, dữ liệu/an toàn trẻ em, SEO và khả năng phát hành Sites.

## 13. Definition of Done

- [ ] Acceptance criteria của task được đáp ứng và có bằng chứng.
- [ ] Không phá luồng Tranh/Truyện/Game/Khóa học/Shop/Profile hiện có.
- [ ] TypeScript, lint, production build đạt.
- [ ] Không stage file ngoài phạm vi hoặc log/local artifact.
- [ ] Keyboard, touch, mobile và focus được kiểm tra tương xứng rủi ro.
- [ ] Metadata/sitemap cập nhật nếu thêm route công khai.
- [ ] GitHub và Sites chỉ được đồng bộ/phát hành khi người dùng yêu cầu hoặc workflow task đã quy định.
