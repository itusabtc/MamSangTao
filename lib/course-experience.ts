export type CourseExperience = { skills: readonly string[]; output: string; interests: readonly string[]; level: 'Bắt đầu' | 'Dễ' | 'Vừa sức'; sensory: readonly string[] }

export const COURSE_EXPERIENCE: Record<string, CourseExperience> = {
  'co-vua-cho-be': { skills: ['Logic', 'Tập trung', 'Giải quyết vấn đề'], output: 'Một ván cờ hoàn chỉnh', interests: ['logic', 'game'], level: 'Bắt đầu', sensory: ['Nhìn thế cờ', 'Chạm để đi quân', 'Nói cách giải'] },
  'am-nhac-vui-nhon': { skills: ['Nhịp điệu', 'Cảm âm', 'Biểu đạt'], output: 'Giai điệu 8 nhịp của bé', interests: ['music', 'creative'], level: 'Dễ', sensory: ['Nghe âm thanh', 'Vỗ theo nhịp', 'Tự phối nhạc'] },
  've-nhan-vat-hoat-hinh': { skills: ['Quan sát', 'Màu sắc', 'Tưởng tượng'], output: 'Poster nhân vật hoạt hình', interests: ['draw', 'creative'], level: 'Dễ', sensory: ['Nhìn hình mẫu', 'Vẽ bằng tay', 'Kể về nhân vật'] },
  'ke-chuyen-tu-tin': { skills: ['Ngôn ngữ', 'Cảm xúc', 'Tự tin'], output: 'Câu chuyện minh họa của bé', interests: ['story', 'creative'], level: 'Vừa sức', sensory: ['Nghe truyện', 'Sắp xếp tranh', 'Kể lại bằng lời'] },
  'lap-trinh-game-dau-tien': { skills: ['Tư duy hệ thống', 'Thử–sai', 'Sáng tạo'], output: 'Mini game có thể chơi', interests: ['game', 'logic'], level: 'Vừa sức', sensory: ['Nhìn hoạt cảnh', 'Chạm ghép lệnh', 'Chạy và sửa lỗi'] },
}

export const INTERESTS = [
  { id: 'draw', icon: '🎨', label: 'Vẽ và màu sắc' }, { id: 'story', icon: '📖', label: 'Kể chuyện' },
  { id: 'music', icon: '🎵', label: 'Âm nhạc' }, { id: 'game', icon: '🎮', label: 'Game' },
  { id: 'logic', icon: '🧠', label: 'Logic' }, { id: 'creative', icon: '✨', label: 'Sáng tạo' },
] as const
