'use client'

import { ArrowDown, ArrowUp, Download, Maximize2, Minimize2, Play, Plus, RotateCcw, Square, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState, type DragEvent } from 'react'

type Props = { idea: string; onReset: () => void }
type CommandType = 'move' | 'back' | 'up' | 'down' | 'turn' | 'say' | 'color'
type Command = { id: number; type: CommandType; label: string; color: string }

const PALETTE: Omit<Command, 'id'>[] = [
  { type: 'move', label: 'Đi tới 20 bước', color: '#3158a8' },
  { type: 'back', label: 'Lùi lại 20 bước', color: '#3158a8' },
  { type: 'up', label: 'Đi lên', color: '#64aa82' },
  { type: 'down', label: 'Đi xuống', color: '#64aa82' },
  { type: 'turn', label: 'Xoay 45 độ', color: '#8a73c9' },
  { type: 'say', label: 'Nói “Xin chào!”', color: '#f47d61' },
  { type: 'color', label: 'Đổi màu sân khấu', color: '#e3a91f' },
]

export function CodingStudio({ idea, onReset }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const nextId = useRef(3)
  const runToken = useRef(0)
  const [commands, setCommands] = useState<Command[]>([
    { id: 1, ...PALETTE[0] }, { id: 2, ...PALETTE[5] },
  ])
  const [position, setPosition] = useState({ x: 25, y: 62, rotation: 0 })
  const [speech, setSpeech] = useState('')
  const [stageColor, setStageColor] = useState('#eaf3ff')
  const [running, setRunning] = useState(false)
  const [activeId, setActiveId] = useState<number | null>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const [draggedId, setDraggedId] = useState<number | null>(null)

  useEffect(() => () => { runToken.current += 1 }, [])
  useEffect(() => {
    if (!fullscreen) return
    const old = document.body.style.overflow; document.body.style.overflow = 'hidden'
    requestAnimationFrame(() => document.getElementById('coding-title')?.focus({ preventScroll: true }))
    return () => { document.body.style.overflow = old }
  }, [fullscreen])

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
    runToken.current += 1; setRunning(false); setActiveId(null); setSpeech(''); setStageColor('#eaf3ff'); setPosition({ x: 25, y: 62, rotation: 0 })
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
      await new Promise((resolve) => window.setTimeout(resolve, 650))
    }
    if (token === runToken.current) { setActiveId(null); setRunning(false) }
  }

  function download() {
    const data = JSON.stringify({ project: idea, blocks: commands.map(({ type, label }) => ({ type, label })) }, null, 2)
    const link = document.createElement('a'); link.download = 'du-an-lap-trinh.json'; link.href = URL.createObjectURL(new Blob([data], { type: 'application/json' })); link.click(); URL.revokeObjectURL(link.href)
  }

  return (
    <section ref={sectionRef} className={fullscreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-[#eef5ef] p-3 sm:p-6' : 'mt-7 scroll-mt-24'} aria-labelledby="coding-title" aria-modal={fullscreen || undefined} role={fullscreen ? 'dialog' : undefined}>
      <div className={fullscreen ? 'mx-auto max-w-7xl rounded-3xl border border-hairline bg-white p-4 shadow-2xl sm:p-6' : ''}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><p className="kicker">Xưởng lập trình</p><h3 id="coding-title" tabIndex={-1} className="mt-2 text-2xl outline-none">Ghép khối lệnh, xem nhân vật hành động</h3><p className="mt-1 text-sm text-ink/60">Nhiệm vụ: {idea}</p></div><button type="button" onClick={() => setFullscreen((value) => !value)} className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-hairline px-4 text-sm font-extrabold">{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}{fullscreen ? 'Thu nhỏ' : 'Phóng to'}</button></div>

        <div className="mt-5 grid gap-4 lg:grid-cols-[210px_1fr_1fr]">
          <aside className="rounded-2xl bg-cream p-3"><p className="text-sm font-extrabold">Khối lệnh</p><p className="mt-1 text-xs text-ink/55">Bấm hoặc kéo sang chương trình.</p><div className="mt-3 space-y-2">{PALETTE.map((block) => <button key={block.type} type="button" draggable onDragStart={(event) => event.dataTransfer.setData('application/x-block', block.type)} onClick={() => add(block.type)} className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 text-left text-sm font-extrabold text-white shadow-sm" style={{ backgroundColor: block.color }}><Plus className="h-4 w-4" />{block.label}</button>)}</div></aside>

          <div className="rounded-2xl border-2 border-dashed border-blue/25 bg-blue/5 p-3" onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropOn(event)}><div className="flex items-center justify-between"><p className="text-sm font-extrabold">Chương trình của bé</p><button type="button" onClick={() => setCommands([])} className="text-xs font-bold text-coral">Xóa hết</button></div><div className="mt-3 min-h-72 space-y-2">{commands.length === 0 ? <p className="rounded-xl bg-white p-5 text-center text-sm text-ink/50">Kéo hoặc bấm một khối lệnh để bắt đầu.</p> : commands.map((command, index) => <div key={command.id} draggable onDragStart={() => setDraggedId(command.id)} onDragOver={(event) => event.preventDefault()} onDrop={(event) => dropOn(event, index)} className={`flex items-center gap-2 rounded-xl p-2 text-white shadow-sm ${activeId === command.id ? 'ring-4 ring-yellow' : ''}`} style={{ backgroundColor: command.color }}><span className="min-w-6 text-center text-xs font-black">{index + 1}</span><span className="flex-1 text-sm font-extrabold">{command.label}</span><button type="button" onClick={() => moveBlock(index, -1)} aria-label="Đưa khối lên" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><ArrowUp className="h-4 w-4" /></button><button type="button" onClick={() => moveBlock(index, 1)} aria-label="Đưa khối xuống" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><ArrowDown className="h-4 w-4" /></button><button type="button" onClick={() => setCommands((items) => items.filter((item) => item.id !== command.id))} aria-label="Xóa khối" className="grid h-9 w-9 place-items-center rounded-lg bg-white/20"><Trash2 className="h-4 w-4" /></button></div>)}</div></div>

          <div><div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-2 border-hairline transition-colors" style={{ backgroundColor: stageColor }}><div className="absolute bottom-0 h-[28%] w-full bg-green-soft" /><div className="absolute right-[10%] top-[10%] h-14 w-14 rounded-full bg-yellow" />{speech ? <div className="absolute z-10 max-w-[55%] rounded-2xl bg-white px-3 py-2 text-sm font-bold shadow-lg" style={{ left: `${Math.min(65, position.x + 8)}%`, top: `${Math.max(4, position.y - 22)}%` }}>{speech}</div> : null}<div className="absolute text-6xl transition-all duration-500" style={{ left: `${position.x}%`, top: `${position.y}%`, transform: `translate(-50%, -50%) rotate(${position.rotation}deg)` }}>🐱</div></div><div className="mt-3 grid grid-cols-2 gap-2"><button type="button" disabled={running || commands.length === 0} onClick={run} className="btn btn-primary justify-center disabled:opacity-40"><Play className="h-4 w-4" />Chạy</button><button type="button" onClick={resetStage} className="btn justify-center border border-hairline bg-white"><Square className="h-4 w-4" />Dừng</button></div><p className="mt-3 text-xs text-ink/55" role="status">{running ? 'Đang chạy từng khối lệnh được tô sáng…' : 'Sân khấu sẵn sàng. Bấm Chạy để xem kết quả.'}</p></div>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row"><button type="button" onClick={download} className="btn btn-primary justify-center"><Download className="h-4 w-4" />Tải dự án JSON</button><button type="button" onClick={() => { setCommands([{ id: nextId.current++, ...PALETTE[0] }, { id: nextId.current++, ...PALETTE[5] }]); resetStage() }} className="btn justify-center border border-hairline bg-white"><RotateCcw className="h-4 w-4" />Khôi phục mẫu</button><button type="button" onClick={onReset} className="btn justify-center text-ink/70 sm:ml-auto">Ý tưởng khác</button></div>
      </div>
    </section>
  )
}
