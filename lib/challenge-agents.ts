export type ChallengeAgent = {
  id: string
  name: string
  avatar: string
  elo: number
  level: string
  specialty: string
  color: string
}

export const CHALLENGE_AGENTS: readonly ChallengeAgent[] = [
  { id: 'mam-nhanh', name: 'Mầm Nhanh', avatar: '🐿️', elo: 720, level: 'Làm quen', specialty: 'Gợi ý nhẹ nhàng', color: 'bg-green-soft' },
  { id: 'cu-thong-thai', name: 'Cú Thông Thái', avatar: '🦉', elo: 820, level: 'Vừa sức', specialty: 'Quan sát và logic', color: 'bg-violet/10' },
  { id: 'cao-logic', name: 'Cáo Logic', avatar: '🦊', elo: 920, level: 'Thử thách', specialty: 'Phản xạ nhanh', color: 'bg-coral/10' },
  { id: 'robot-sao', name: 'Rô-bốt Sao', avatar: '🤖', elo: 1040, level: 'Nâng cao', specialty: 'Chiến thuật bất ngờ', color: 'bg-sky-100' },
]

export function closestChallengeAgent(playerElo: number) {
  return CHALLENGE_AGENTS.reduce((closest, agent) =>
    Math.abs(agent.elo - playerElo) < Math.abs(closest.elo - playerElo) ? agent : closest,
  CHALLENGE_AGENTS[0])
}

export function calculateRatingChange(playerElo: number, opponentElo: number, won: boolean, matches: number) {
  const expected = 1 / (1 + 10 ** ((opponentElo - playerElo) / 400))
  const kFactor = matches < 10 ? 32 : 24
  const raw = Math.round(kFactor * ((won ? 1 : 0) - expected))
  return won ? Math.min(32, Math.max(6, raw)) : Math.max(-24, Math.min(-4, raw))
}
