export type PromptTool = 'tranh' | 'truyen' | 'laptrinh'

export const PROMPT_GROUPS: { id: PromptTool; label: string; icon: string; ideas: string[] }[] = [
  { id: 'tranh', label: 'Vẽ tranh', icon: '🎨', ideas: ['Vẽ chú mèo phi hành gia', 'Vẽ cá voi bay giữa trời sao', 'Làm thiệp tặng ông bà', 'Vẽ lâu đài làm từ bánh kẹo'] },
  { id: 'truyen', label: 'Kể chuyện', icon: '📖', ideas: ['Kể chuyện về lòng dũng cảm', 'Chú rồng nhỏ sợ bóng tối', 'Chuyến tàu chạy trên những đám mây', 'Bạn robot học cách chia sẻ'] },
  { id: 'laptrinh', label: 'Làm game', icon: '🧩', ideas: ['Tạo game chạy vượt chướng ngại trong khu rừng', 'Tạo game bay qua cổng ngoài vũ trụ', 'Khủng long đi qua mê cung tìm chìa khóa', 'Tìm kho báu dưới đại dương'] },
]

export function promptsFor(tool: PromptTool) {
  return PROMPT_GROUPS.find((group) => group.id === tool)?.ideas ?? []
}
