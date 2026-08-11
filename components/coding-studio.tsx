'use client'

import { ArrowDown, ArrowUp, Download, Gamepad2, Maximize2, Minimize2, Play, Plus, RotateCcw, Square, Trash2, Volume2, VolumeX } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react'

type Props = { idea: string; initialGame: GameChoice; onReset: () => void }
type CommandType = 'move' | 'back' | 'up' | 'down' | 'turn' | 'say' | 'color' | 'sound'
type Command = { id: number; type: CommandType; label: string; color: string }
export type GameType = 'collect' | 'race' | 'treasure' | 'maze' | 'runner' | 'flappy'
export type GameChoice = 'auto' | GameType

export const GAME_OPTIONS: { id: GameType; label: string; icon: string }[] = [
  { id: 'collect', label: 'Nhặt vật phẩm', icon: '⭐' },
  { id: 'race', label: 'Đua về đích', icon: '🏁' },
  { id: 'treasure', label: 'Tìm kho báu', icon: '🧰' },
  { id: 'maze', label: 'Mê cung', icon: '🗝️' },
  { id: 'runner', label: 'Chạy vượt chướng ngại', icon: '🏃' },
  { id: 'flappy', label: 'Bay qua cổng', icon: '🪽' },
]

export function gameFromIdea(idea: string): GameType {
  const text = idea.toLowerCase()
  if (text.includes('đua') || text.includes('về đích')) return 'race'
  if (text.includes('kho báu') || text.includes('kho bau')) return 'treasure'
  if (text.includes('mê cung') || text.includes('me cung')) return 'maze'
  if (text.includes('bay') || text.includes('cánh') || text.includes('flappy')) return 'flappy'
  if (text.includes('nhảy') || text.includes('vượt chướng ngại')) return 'runner'
  return 'collect'
}

function themeFromIdea(idea: string) {
  const text = idea.toLowerCase()
  if (text.includes('vũ trụ') || text.includes('vu tru') || text.includes('hành tinh')) return { actor: '🚀', item: '🪐', sky: '#17214f', ground: '#594c86', label: 'vũ trụ' }
  if (text.includes('biển') || text.includes('đại dương') || text.includes('cá')) return { actor: '🐠', item: '🐚', sky: '#bde9ff', ground: '#e8cf8d', label: 'đại dương' }
  if (text.includes('khủng long')) return { actor: '🦕', item: '🥚', sky: '#dff4d8', ground: '#78aa69', label: 'thời tiền sử' }
  if (text.includes('phù thủy') || text.includes('phép thuật')) return { actor: '🧙', item: '💎', sky: '#efe4ff', ground: '#8a73c9', label: 'phép thuật' }
  if (text.includes('rừng') || text.includes('khu rung') || text.includes('cây')) return { actor: '🐿️', item: '🍎', sky: '#dff4d8', ground: '#5f9b68', label: 'khu rừng' }
  return { actor: '🐱', item: '⭐', sky: '#eaf3ff', ground: '#dff0e5', label: 'khu vườn' }
}

const PALETTE: Omit<Command, 'id'>[] = [
  { type: 'move', label: 'Đi tới 20 bước', color: '#3158a8' },
  { type: 'back', label: 'Lùi lại 20 bước', color: '#3158a8' },
  { type: 'up', label: 'Đi lên', color: '#64aa82' },
  { type: 'down', label: 'Đi xuống', color: '#64aa82' },
  { type: 'turn', label: 'Xoay 45 độ', color: '#8a73c9' },
  { type: 'say', label: 'Nói “Xin chào!”', color: '#f47d61' },
  { type: 'color', label: 'Đổi màu sân khấu', color: '#e3a91f' },
  { type: 'sound', label: 'Phát một nốt nhạc', color: '#d45f9f' },
]

export function CodingStudio({ idea, initialGame, onReset }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const nextId = useRef(3)
  const runToken = useRef(0)
  const audioRef = useRef<AudioContext | null>(null)
  const musicTimer = useRef<number | null>(null)
  const [commands, setCommands] = useState<Command[]>([
    { id: 1, ...PALETTE[0] }, { id: 2, ...PALETTE[5] },
  ])
  const [position, setPosition] = useState({ x: 25, y: 62, rotation: 0 })
  const [speech, setSpeech] = useState('')
  const [stageColor, setStageColor] = useState(() => themeFromIdea(idea).sky)
  const [running, setRunning] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [draggedId, setDraggedId] = useState<number | null>(null)
  const [gameMode, setGameMode] = useState(true)
  const [musicOn, setMusicOn] = useState(false)
  const [score, setScore] = useState(0)
  const [star, setStar] = useState({ x: 72, y: 55 })
  const [gameType, setGameType] = useState<GameType>(() => initialGame === 'auto' ? gameFromIdea(idea) : initialGame)
  const [pipeX, setPipeX] = useState(88)
  const [gapY, setGapY] = useState(48)
  const theme = useMemo(() => themeFromIdea(idea), [idea])
  const goalIcon = gameType === 'flappy' ? '' : gameType === 'race' || gameType === 'runner' ? '🏁' : gameType === 'treasure' ? '🧰' : gameType === 'maze' ? '🗝️' : theme.item

  const playTone = useCallback((frequency = 523, duration = 0.22) => {
    if (!audioRef.current) audioRef.current = new AudioContext()
    const audio = audioRef.current; const oscillator = audio.createOscillator(); const gain = audio.createGain()
    oscillator.type = 'sine'; oscillator.frequency.value = frequency; gain.gain.setValueAtTime(0.12, audio.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration)
    oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(); oscillator.stop(audio.currentTime + duration)
  }, [])

  useEffect(() => () => { runToken.current += 1; if (musicTimer.current) window.clearInterval(musicTimer.current); void audioRef.current?.close() }, [])
  useEffect(() => {
    if (!fullscreen) return
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => document.getElementById('coding-title')?.focus({ preventScroll: true }))
    return () => { document.body.style.overflow = old }
  }, [fullscreen])

  useEffect(() => {
    if (!gameMode) return
    function keydown(event: KeyboardEvent) {
      if (gameType === 'flappy' && (event.key === ' ' || event.key === 'ArrowUp')) {
        event.preventDefault(); setPosition((value) => ({ ...value, y: Math.max(10, value.y - 15) })); playTone(620, 0.08); return
      }
      if (gameType === 'runner' && (event.key === ' ' || event.key === 'ArrowUp')) {
        event.preventDefault(); setPosition((value) => ({ ...value, y: 38 })); window.setTimeout(() => setPosition((value) => ({ ...value, y: 62 })), 380); playTone(520, 0.08); return
      }
      const moves: Record<string, { x: number; y: number }> = { ArrowLeft: { x: -7, y: 0 }, ArrowRight: { x: 7, y: 0 }, ArrowUp: { x: 0, y: -7 }, ArrowDown: { x: 0, y: 7 } }
      const move = moves[event.key]
      if (!move || gameType === 'flappy') return
      event.preventDefault()
      const next = { ...position, x: Math.max(6, Math.min(92, position.x + move.x)), y: Math.max(14, Math.min(80, position.y + move.y)) }
      setPosition(next)
      const reached = gameType === 'race' || gameType === 'runner' ? next.x >= 88 : Math.abs(next.x - star.x) <= 9 && Math.abs(next.y - star.y) <= 12
      if (reached) {
        setScore((value) => value + 1); playTone(880, 0.16)
        if (gameType === 'race' || gameType === 'runner') setPosition((value) => ({ ...value, x: 8 }))
        else setStar((value) => ({ x: value.x > 50 ? 20 : 78, y: value.y > 45 ? 28 : 62 }))
      }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [gameMode, gameType, playTone, position, star])

  useEffect(() => {
    if (!gameMode || gameType !== 'flappy') return
    const timer = window.setInterval(() => {
      if (pipeX > 17 && pipeX < 33 && (position.y < gapY - 16 || position.y > gapY + 16)) {
        setSpeech('Chạm cổng rồi! Thử lại nhé.'); setScore(0); setPosition((value) => ({ ...value, x: 25, y: 48 })); setPipeX(88); playTone(180, 0.18); return
      }
      setPosition((value) => ({ ...value, x: 25, y: Math.min(88, value.y + 3.5) }))
      setPipeX((value) => {
        const next = value - 3
        if (next < -8) { setScore((scoreValue) => scoreValue + 1); playTone(760, 0.1); setGapY((gap) => gap > 48 ? 34 : 62); return 105 }
        return next
      })
    }, 120)
    return () => window.clearInterval(timer)
  }, [gameMode, gameType, gapY, pipeX, playTone, position.y])

  function toggleMusic() {
    if (musicTimer.current) { window.clearInterval(musicTimer.current); musicTimer.current = null; setMusicOn(false); return }
    const notes = [392, 494, 523, 659]; let index = 0
    playTone(notes[index++], 0.28)
    musicTimer.current = window.setInterval(() => { playTone(notes[index++ % notes.length], 0.28) }, 420)
    setMusicOn(true)
  }

  function add(type: CommandType) {
    const block = PALETTE.find((item) => item.type === type)!
    setCommands((items) => [...items, { id: nextId.current++, ...block }])
  }

  function moveBlock(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= commands.length) return
    setCommands((items) => { const copy = [...items]; [copy[index], copy[target]] = [copy[target], copy[index]]; return copy })
  }

  function dropOn(event: DragEvent, targetIndex?: number) {
    event.preventDefault()
    const paletteType = event.dataTransfer.getData('application/x-block') as CommandType
    if (paletteType) return add(paletteType)
    if (draggedId === null || targetIndex === undefined) return
    setCommands((items) => {
      const from = items.findIndex((item) => item.id === draggedId)
      if (from < 0) return items
      const copy = [...items]; const [block] = copy.splice(from, 1); copy.splice(targetIndex, 0, block); return copy
    })
    setDraggedId(null)
  }

  function resetStage() {
    runToken.current += 1; setRunning(false); setActiveId(null); setSpeech(''); setStageColor(theme.sky); setPosition({ x: 25, y: gameType === 'flappy' ? 48 : 62, rotation: 0 }); setPipeX(88)
  }

  async function run() {
    const token = ++runToken.current
    setRunning(true); setSpeech(''); setPosition({ x: 25, y: 62, rotation: 0 })
    for (const command of commands) {
      if (token !== runToken.current) return
      setActiveId(command.id)
      if (command.type === 'move') setPosition((p) => ({ ...p, x: Math.min(88, p.x + 16) }))
      if (command.type === 'back') setPosition((p) => ({ ...p, x: Math.max(8, p.x - 16) }))
      if (command.type === 'up') setPosition((p) => ({ ...p, y: Math.max(18, p.y - 16) }))
      if (command.type === 'down') setPosition((p) => ({ ...p, y: Math.min(78, p.y + 16) }))
      if (command.type === 'turn') setPosition((p) => ({ ...p, rotation: p.rotation + 45 }))
      if (command.type === 'say') setSpeech('Xin chào! Mình làm được rồi!')
      if (command.type === 'color') setStageColor((value) => value === '#eaf3ff' ? '#fff0dc' : '#eaf3ff')
      if (command.type === 'sound') playTone(659, 0.3)
      await new Promise((resolve) => window.setTimeout(resolve, 650))
    }
    if (token === runToken.current) { setActiveId(null); setRunning(false) }
  }

  function download() {
    const data = JSON.stringify({ project: idea, gameMode, music: musicOn, blocks: commands.map(({ type, label }) => ({ type, label })) }, null, 2)
    const link = document.createElement('a'); link.download = 'du-an-lap-trinh.json'; link.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); link.click(); URL.revokeObjectURL(link.href)
  }

  return (
    <section ref={sectionRef} className={fullscreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-[#eef5ef] p-3 sm:p-6' : 'mt-7 scroll-mt-24'} aria-labelledby="coding-title" aria-modal={fullscreen || undefined} role={fullscreen ? 'dialog' : undefined}>
      <div className={fullscreen ? 'mx-auto max-w-7xl rounded-3xl border border-hairline bg-white p-4 shadow-2xl sm:p-6' : ''}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="kicker">Xưởng lập trình</p><h3 id="coding-title" tabIndex={-1} className="mt-2 text-2xl outline-none">Ghép khối lệnh, tạo hoạt cảnh và game</h3><p className="mt-1 text-sm text-ink/60">Nhiệm vụ: {idea}</p></div><div className="flex flex-wrap gap-2"><button type="button" onClick={() => { setGameMode((value) => !value); setScore(0); resetStage() }} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-extrabold ${gameMode ? 'border-blue bg-blue text-white' : 'border-hairline'}`}><Gamepad2 className="h-4 w-4" />{gameMode ? 'Tắt game' : 'Chế độ game'}</button><button type="button" onClick={toggleMusic} className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-extrabold ${musicOn ? 'border-violet bg-violet text-white' : 'border-hairline'}`}>{musicOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}{musicOn ? 'Tắt nhạc' : 'Bật nhạc'}</button><button type="button" onClick={() => setFullscreen((value) => !value)} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-4 text-sm font-extrabold">{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}{fullscreen ? 'Thu nhỏ' : 'Phóng to'}</button></div></div>

        {gameMode ? <div className="mt-4 rounded-2xl bg-green-soft p-3"><div className="flex flex-col gap-2 sm:flex-row sm:items-center"><p className="text-sm font-extrabold">Chọn loại game:</p><div className="flex flex-wrap gap-2">{GAME_OPTIONS.map((game) => <button key={game.id} type="button" onClick={() => { setGameType(game.id); setScore(0); setStar({ x: 72, y: 55 }); setPipeX(88); setPosition({ x: 25, y: game.id === 'flappy' ? 48 : 62, rotation: 0 }) }} aria-pressed={gameType === game.id} className={`min-h-10 rounded-full px-3 text-sm font-bold ${gameType === game.id ? 'bg-blue text-white' : 'bg-white text-ink'}`}>{game.icon} {game.label}</button>)}</div></div><p className="mt-2 text-xs text-ink/60">Prompt được nhận diện theo chủ đề <strong>{theme.label}</strong>; bé vẫn có thể đổi loại game ở đây.</p></div> : null}

        <div className="mt-5 grid gap-4 lg:grid-cols-[210px_1fr_1fr]">
          <aside className="rounded-2xl bg-cream p-3"><p className="text-sm font-extrabold">Khối lệnh</p><p className="mt-1 text-xs text-ink/55">Bấm hoặc kéo sang chương trình.</p><div className="mt-3 space-y-2">{PALETTE.map((block) => <button key={block.type} type="button" draggable onDragStart={(event) => event.dataTransfer.setData('application/x-block', block.type)} onClick={() => add(block.type)} className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-extrabold text-white shadow-sm" style={{ backgroundColor: block.color }}><Plus className="h-4 w-4" />{block.label}</button>)}</div></aside>

          <div className="rounded-2xl border-2 border-dashed border-blue/25 bg-blue/5 p-3" onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropOn(event)}><div className="flex items-center justify-between"><p className="text-sm font-extrabold">Chương trình của bé</p><button type="button" onClick={() => setCommands([])} className="text-xs font-bold text-coral">Xóa hết</button></div><div className="mt-3 min-h-72 space-y-2">{commands.length === 0 ? <p className="rounded-xl bg-white p-5 text-center text-sm text-ink/50">Kéo hoặc bấm một khối lệnh để bắt đầu.</p> : commands.map((command, index) => <div key={command.id} draggable onDragStart={() => setDraggedId(command.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropOn(event, index)} className={`flex items-center gap-2 rounded-xl p-2 text-white shadow-sm ${activeId === command.id ? 'ring-4 ring-yellow' : ''}`} style={{ backgroundColor: command.color }}><span className="min-w-6 text-center text-xs font-black">{index + 1}</span><span className="flex-1 text-sm font-extrabold">{command.label}</span><button type="button" onClick={() => moveBlock(index, -1)} aria-label="Đưa khối lên" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><ArrowUp className="h-4 w-4" /></button><button type="button" onClick={() => moveBlock(index, 1)} aria-label="Đưa khối xuống" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><ArrowDown className="h-4 w-4" /></button><button type="button" onClick={() => setCommands((items) => items.filter((item) => item.id !== command.id))} aria-label="Xóa khối" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><Trash2 className="h-4 w-4" /></button></div>)}</div></div>

          <div><button type="button" className="relative aspect-[4/3] w-full text-left overflow-hidden rounded-2xl border-2 border-hairline transition-colors" style={{ backgroundColor: stageColor }} tabIndex={gameMode ? 0 : undefined} aria-label={gameMode ? 'Sân khấu game. Dùng phím mũi tên để di chuyển.' : 'Sân khấu lập trình'}><div className="absolute bottom-0 h-[28%] w-full" style={{ backgroundColor: theme.ground }} /><div className="absolute right-[10%] top-[10%] h-14 w-14 rounded-full bg-yellow" />{gameMode ? <><div className="absolute left-3 top-3 z-10 rounded-full bg-white px-3 py-1 text-sm font-extrabold shadow">⭐ Điểm: {score}</div><div className="absolute text-4xl transition-all" style={{ left: `${star.x}%`, top: `${star.y}%`, transform: 'translate(-50%, -50%)' }}>{goalIcon}</div>{gameType === 'runner' ? <><div className="absolute bottom-[24%] left-[45%] text-4xl">🪨</div><div className="absolute bottom-[24%] left-[68%] text-4xl">🪵</div></> : null}{gameType === 'flappy' ? <><div className="absolute w-[13%] bg-green" style={{ left: `${pipeX}%`, top: 0, height: `${gapY - 18}%` }} /><div className="absolute bottom-0 w-[13%] bg-green" style={{ left: `${pipeX}%`, height: `${82 - gapY}%` }} /></> : null}</> : null}{speech ? <div className="absolute z-10 max-w-[55%] rounded-2xl bg-white px-3 py-2 text-sm font-bold shadow-lg" style={{ left: `${Math.min(65, position.x + 8)}%`, top: `${Math.max(4, position.y - 22)}%` }}>{speech}</div> : null}<div className="absolute text-6xl transition-all duration-200" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: `translate(-50%, -50%) rotate(${position.rotation}deg)` }}>{theme.actor}</div></button><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" disabled={running || commands.length === 0} onClick={run} className="btn btn-primary justify-center disabled:opacity-40"><Play className="h-4 w-4" />Chạy</button><button type="button" onClick={resetStage} className="btn justify-center border border-hairline bg-white"><Square className="h-4 w-4" />Dừng</button></div><p className="mt-3 text-xs text-ink/55" role="status">{gameMode ? gameType === 'flappy' ? 'Bay qua cổng: bấm Space hoặc ↑ để bay lên.' : gameType === 'runner' ? 'Vượt chướng ngại: dùng ← → và Space để nhảy.' : `Game ${GAME_OPTIONS.find((game) => game.id === gameType)?.label}: dùng phím mũi tên điều khiển ${theme.actor}.` : running ? 'Đang chạy từng khối lệnh được tô sáng…' : 'Sân khấu sẵn sàng. Bấm Chạy để xem kết quả.'}</p></div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="btn btn-primary justify-center"><Download className="h-4 w-4" />Tải dự án JSON</button><button type="button" onClick={() => { setCommands([{ id: nextId.current++, ...PALETTE[0] }, { id: nextId.current++, ...PALETTE[5] }]); resetStage() }} className="btn justify-center border border-hairline bg-white"><RotateCcw className="h-4 w-4" />Khôi phục mẫu</button><button type="button" onClick={onReset} className="btn justify-center text-ink/70 sm:ml-auto">Ý tưởng khác</button></div>
      </div>
    </section>
  )
}
