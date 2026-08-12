'use client'

import { Download, Eraser, Maximize2, Minimize2, Paintbrush, RotateCcw, Trash2, Undo2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import Link from 'next/link'
import { useInventory } from '@/lib/inventory'

type Props = {
  idea: string
  style: string
  colors: readonly [string, string, string]
  subject: string
  onClose: () => void
}

type StickerItem = { id: number; emoji: string; x: number; y: number; size: number }

const PALETTE = ['#1d3150', '#294d9b', '#f47d61', '#f5c34d', '#64aa82', '#8a73c9', '#ffffff']
const STICKERS = ['⭐', '☁️', '🌈', '🌸', '🚀', '🐱']

export function DrawingCanvas({ idea, style, colors, subject, onClose }: Props) {
  const owned = useInventory()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const drawing = useRef(false)
  const stickerId = useRef(2)
  const draggingSticker = useRef<{ id: number; offsetX: number; offsetY: number } | null>(null)
  const history = useRef<string[]>([])
  const [color, setColor] = useState(PALETTE[0])
  const [size, setSize] = useState(10)
  const [eraser, setEraser] = useState(false)
  const [stickers, setStickers] = useState<StickerItem[]>([
    { id: 1, emoji: subject, x: 50, y: 50, size: 120 },
    { id: 2, emoji: '☀️', x: 82, y: 16, size: 104 },
  ])
  const [selectedSticker, setSelectedSticker] = useState<number | null>(null)
  const [backgrounds, setBackgrounds] = useState<[string, string, string]>([colors[0], colors[1], colors[2]])
  const [title, setTitle] = useState(idea.slice(0, 44))
  const [subtitle, setSubtitle] = useState(`${style} · Mầm Sáng Tạo`)
  const [textColor, setTextColor] = useState('#1d3150')
  const [fullscreen, setFullscreen] = useState(true)
  const [status, setStatus] = useState('Bàn vẽ đã sẵn sàng.')

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    history.current = [...history.current.slice(-19), canvas.toDataURL()]
  }, [])

  const drawTemplate = useCallback(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    history.current = [canvas.toDataURL()]
    stickerId.current = 2
    setStickers([{ id: 1, emoji: subject, x: 50, y: 50, size: 120 }, { id: 2, emoji: '☀️', x: 82, y: 16, size: 104 }])
    setBackgrounds([colors[0], colors[1], colors[2]])
    setTitle(idea.slice(0, 44)); setSubtitle(`${style} · Mầm Sáng Tạo`); setTextColor('#1d3150')
    setSelectedSticker(null)
    setStatus('Đã khôi phục tranh mẫu.')
  }, [colors, idea, style, subject])

  useEffect(() => { drawTemplate() }, [drawTemplate])

  useEffect(() => {
    const heading = document.getElementById('drawing-title')
    const frame = window.requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ block: 'start' })
      heading?.focus({ preventScroll: true })
    })
    if (!fullscreen) return () => window.cancelAnimationFrame(frame)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
    }
  }, [fullscreen])

  function point(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }
  }

  function start(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    const p = point(event)
    drawing.current = true
    canvas.setPointerCapture(event.pointerId)
    context.beginPath(); context.moveTo(p.x, p.y)
  }

  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const context = canvasRef.current!.getContext('2d')!
    const p = point(event)
    context.globalCompositeOperation = eraser ? 'destination-out' : 'source-over'
    context.strokeStyle = color
    context.lineWidth = size
    context.lineCap = 'round'; context.lineJoin = 'round'
    context.lineTo(p.x, p.y); context.stroke()
  }

  function stop() {
    if (!drawing.current) return
    drawing.current = false
    saveHistory()
    setStatus('Đã lưu nét vẽ mới.')
  }

  function undo() {
    const canvas = canvasRef.current
    if (!canvas || history.current.length < 2) return setStatus('Chưa có thao tác để hoàn tác.')
    history.current.pop()
    const image = new Image()
    image.onload = () => canvas.getContext('2d')?.drawImage(image, 0, 0)
    image.src = history.current.at(-1)!
    setStatus('Đã hoàn tác.')
  }

  function clear() {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    context.clearRect(0, 0, canvas.width, canvas.height)
    setStickers([]); setSelectedSticker(null)
    saveHistory(); setStatus('Đã làm sạch trang vẽ.')
  }

  function addSticker(sticker: string) {
    const id = ++stickerId.current
    setStickers((items) => [...items, { id, emoji: sticker, x: 50, y: 50, size: 96 }])
    setSelectedSticker(id)
    setStatus(`Đã thêm sticker ${sticker}. Giữ và kéo sticker đến vị trí bé thích nhé!`)
  }

  function startStickerDrag(event: ReactPointerEvent<HTMLButtonElement>, item: StickerItem) {
    const wrap = canvasWrapRef.current
    if (!wrap) return
    event.stopPropagation()
    const rect = wrap.getBoundingClientRect()
    draggingSticker.current = {
      id: item.id,
      offsetX: event.clientX - (rect.left + item.x / 100 * rect.width),
      offsetY: event.clientY - (rect.top + item.y / 100 * rect.height),
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setSelectedSticker(item.id)
  }

  function moveSticker(event: ReactPointerEvent<HTMLButtonElement>) {
    const drag = draggingSticker.current
    const wrap = canvasWrapRef.current
    if (!drag || !wrap) return
    const rect = wrap.getBoundingClientRect()
    const x = Math.max(4, Math.min(96, (event.clientX - rect.left - drag.offsetX) / rect.width * 100))
    const y = Math.max(6, Math.min(94, (event.clientY - rect.top - drag.offsetY) / rect.height * 100))
    setStickers((items) => items.map((item) => item.id === drag.id ? { ...item, x, y } : item))
  }

  function stopStickerDrag() {
    if (!draggingSticker.current) return
    draggingSticker.current = null
    setStatus('Đã đặt sticker vào vị trí mới.')
  }

  function removeSelectedSticker() {
    if (selectedSticker === null) return setStatus('Hãy chọn một sticker trên tranh trước.')
    setStickers((items) => items.filter((item) => item.id !== selectedSticker))
    setSelectedSticker(null)
    setStatus('Đã xóa sticker được chọn.')
  }

  function download() {
    const canvas = canvasRef.current!
    const exportCanvas = document.createElement('canvas')
    exportCanvas.width = canvas.width; exportCanvas.height = canvas.height
    const context = exportCanvas.getContext('2d')!
    context.fillStyle = backgrounds[0]; context.fillRect(0, 0, exportCanvas.width, exportCanvas.height)
    context.fillStyle = backgrounds[1]
    context.beginPath(); context.ellipse(235, 700, 390, 250, 0, Math.PI, 0); context.fill()
    context.fillStyle = backgrounds[2]
    context.beginPath(); context.ellipse(760, 720, 480, 280, 0, Math.PI, 0); context.fill()
    context.drawImage(canvas, 0, 0)
    context.textAlign = 'left'; context.textBaseline = 'alphabetic'; context.fillStyle = textColor
    context.font = '700 34px sans-serif'; context.fillText(title.slice(0, 44), 48, 58)
    context.font = '22px sans-serif'; context.fillText(subtitle.slice(0, 60), 48, 100)
    context.textAlign = 'center'; context.textBaseline = 'middle'
    stickers.forEach((item) => {
      context.font = `${item.size}px sans-serif`
      context.fillText(item.emoji, item.x / 100 * canvas.width, item.y / 100 * canvas.height)
    })
    const link = document.createElement('a')
    link.download = 'tranh-cua-be.png'; link.href = exportCanvas.toDataURL('image/png'); link.click()
    setStatus('Đã tải tranh PNG về máy.')
  }

  return (
    <section ref={sectionRef} className={fullscreen ? 'fixed inset-0 z-[100] overflow-y-auto bg-[#eef5ef] p-3 sm:p-6' : 'mt-7 scroll-mt-24'} aria-labelledby="drawing-title" aria-modal={fullscreen || undefined} role={fullscreen ? 'dialog' : undefined}>
      <div className={fullscreen ? 'mx-auto max-w-7xl rounded-3xl border border-hairline bg-white p-4 shadow-2xl sm:p-6' : ''}>
      <div className={`flex items-start justify-between gap-4 ${fullscreen ? 'sticky top-0 z-20 -mx-2 -mt-2 rounded-2xl bg-white/95 p-2 backdrop-blur' : ''}`}>
        <div><p className="kicker">Bàn vẽ của bé</p><h3 id="drawing-title" tabIndex={-1} className="mt-2 text-2xl outline-none">Tô điểm ý tưởng của riêng mình</h3></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setFullscreen((value) => !value)} aria-label={fullscreen ? 'Thu nhỏ bàn vẽ' : 'Phóng to bàn vẽ'} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-hairline px-3 text-sm font-extrabold">
            {fullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}<span className="hidden sm:inline">{fullscreen ? 'Thu nhỏ' : 'Phóng to'}</span>
          </button>
          <button type="button" onClick={onClose} aria-label="Đóng bàn vẽ" className="grid h-11 w-11 place-items-center rounded-full border border-hairline"><X className="h-5 w-5" /></button>
        </div>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[190px_1fr]">
        <div className="rounded-2xl bg-cream p-4">
          <p className="text-sm font-extrabold">Màu cọ</p>
          <div className="mt-2 flex flex-wrap gap-2">{[...PALETTE,...(owned.includes('palette-sunset')?['#ff8a65','#ffb74d','#ffd180','#d46a8c']:[])].filter((item,index,items)=>items.indexOf(item)===index).map((item) => <button key={item} type="button" onClick={() => { setColor(item); setEraser(false) }} aria-label={`Chọn màu ${item}`} aria-pressed={!eraser && color === item} className={`h-10 w-10 rounded-full border-2 ${!eraser && color === item ? 'border-blue ring-2 ring-blue/20' : 'border-white'}`} style={{ backgroundColor: item }} />)}</div>
          <label className="mt-4 block text-sm font-extrabold">Cỡ cọ: {size}<input type="range" min="3" max="42" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-2 w-full" /></label>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setEraser(false)} aria-pressed={!eraser} className={`btn justify-center px-2 ${!eraser ? 'bg-blue text-white' : 'bg-white'}`}><Paintbrush className="h-4 w-4" />Cọ</button>
            <button type="button" onClick={() => setEraser(true)} aria-pressed={eraser} className={`btn justify-center px-2 ${eraser ? 'bg-blue text-white' : 'bg-white'}`}><Eraser className="h-4 w-4" />Tẩy</button>
            <button type="button" onClick={undo} className="btn justify-center bg-white px-2"><Undo2 className="h-4 w-4" />Lùi</button>
            <button type="button" onClick={clear} className="btn justify-center bg-white px-2"><Trash2 className="h-4 w-4" />Xóa</button>
          </div>
          <p className="mt-4 text-sm font-extrabold">Sticker</p>
          <div className="mt-2 grid grid-cols-3 gap-2">{[...STICKERS,...(owned.includes('sticker-space')?['🪐','🛸','🌟']:[])].map((item) => <button key={item} type="button" onClick={() => addSticker(item)} className="grid h-11 place-items-center rounded-xl bg-white text-xl" aria-label={`Thêm sticker ${item}`}>{item}</button>)}</div>
          {owned.includes('sticker-space')?<p className="mt-2 text-xs font-bold text-green">✓ Đã dùng bộ Sticker Vũ trụ</p>:<Link href="/cua-hang-mam" className="mt-2 block text-xs font-bold text-blue hover:underline">🔒 Mở thêm sticker trong Cửa hàng Mầm</Link>}
          <button type="button" onClick={removeSelectedSticker} className="btn mt-3 w-full justify-center bg-white px-2"><Trash2 className="h-4 w-4" />Xóa sticker chọn</button>
          <div className="mt-5 border-t border-hairline pt-4">
            <p className="text-sm font-extrabold">Chữ trên tranh</p>
            <label className="mt-2 block text-xs font-bold">Tiêu đề<input value={title} maxLength={44} onChange={(event) => setTitle(event.target.value)} className="field mt-1 min-h-10 px-3 py-2 text-sm" /></label>
            <label className="mt-2 block text-xs font-bold">Dòng phụ<input value={subtitle} maxLength={60} onChange={(event) => setSubtitle(event.target.value)} className="field mt-1 min-h-10 px-3 py-2 text-sm" /></label>
            <label className="mt-2 flex items-center justify-between text-xs font-bold">Màu chữ<input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} className="h-10 w-14 rounded-lg border border-hairline bg-white p-1" /></label>
          </div>
          <div className="mt-4 border-t border-hairline pt-4">
            <p className="text-sm font-extrabold">Màu các vùng nền</p>
            {(['Bầu trời', 'Đồi trái', 'Đồi phải'] as const).map((label, index) => <label key={label} className="mt-2 flex items-center justify-between text-xs font-bold">{label}<input type="color" value={backgrounds[index]} onChange={(event) => setBackgrounds((items) => items.map((item, itemIndex) => itemIndex === index ? event.target.value : item) as [string, string, string])} className="h-10 w-14 rounded-lg border border-hairline bg-white p-1" /></label>)}
          </div>
        </div>
        <div>
          <div ref={canvasWrapRef} className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-hairline shadow-inner" style={{ backgroundColor: backgrounds[0] }} onPointerDown={() => setSelectedSticker(null)}>
            <div className="pointer-events-none absolute -bottom-[28%] -left-[15%] h-[65%] w-[75%] rounded-[50%]" style={{ backgroundColor: backgrounds[1] }} />
            <div className="pointer-events-none absolute -bottom-[30%] -right-[15%] h-[70%] w-[85%] rounded-[50%]" style={{ backgroundColor: backgrounds[2] }} />
            <div className="pointer-events-none absolute left-[4.8%] top-[4%] z-10 max-w-[75%]" style={{ color: textColor }}><p className="truncate text-[clamp(16px,3.4vw,34px)] font-bold leading-tight">{title}</p><p className="mt-1 truncate text-[clamp(12px,2.2vw,22px)]">{subtitle}</p></div>
            <canvas ref={canvasRef} width={1000} height={750} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} className="absolute inset-0 z-10 h-full w-full touch-none" aria-label="Vùng vẽ tranh tương tác" />
            {stickers.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Sticker ${item.emoji}. Kéo để di chuyển.`}
                aria-pressed={selectedSticker === item.id}
                onPointerDown={(event) => startStickerDrag(event, item)}
                onPointerMove={moveSticker}
                onPointerUp={stopStickerDrag}
                onPointerCancel={stopStickerDrag}
                className={`absolute z-20 grid touch-none select-none place-items-center rounded-xl border-2 bg-white/20 leading-none ${selectedSticker === item.id ? 'border-blue shadow-lg' : 'border-transparent hover:border-white'}`}
                style={{ left: `${item.x}%`, top: `${item.y}%`, width: `${item.size / 10}%`, aspectRatio: '1', fontSize: `clamp(28px, ${item.size / 10}vw, ${item.size}px)`, transform: 'translate(-50%, -50%)' }}
              >{item.emoji}</button>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={download} className="btn btn-primary justify-center"><Download className="h-4 w-4" />Tải tranh PNG</button>
            <button type="button" onClick={drawTemplate} className="btn justify-center border border-hairline bg-white"><RotateCcw className="h-4 w-4" />Khôi phục mẫu</button>
          </div>
          <p className="mt-3 text-sm text-ink/60" role="status" aria-live="polite">{status} Tranh được xử lý trên thiết bị, không tự động tải lên mạng.</p>
        </div>
      </div>
      </div>
    </section>
  )
}
