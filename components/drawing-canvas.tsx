'use client'

import { Download, Eraser, Paintbrush, RotateCcw, Trash2, Undo2, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type Props = {
  idea: string
  style: string
  colors: readonly [string, string, string]
  subject: string
  onClose: () => void
}

const PALETTE = ['#1d3150', '#294d9b', '#f47d61', '#f5c34d', '#64aa82', '#8a73c9', '#ffffff']
const STICKERS = ['⭐', '☁️', '🌈', '🌸', '🚀', '🐱']

export function DrawingCanvas({ idea, style, colors, subject, onClose }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const history = useRef<string[]>([])
  const [color, setColor] = useState(PALETTE[0])
  const [size, setSize] = useState(10)
  const [eraser, setEraser] = useState(false)
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
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = colors[0]
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#f5c34d'
    context.beginPath(); context.arc(820, 120, 68, 0, Math.PI * 2); context.fill()
    context.fillStyle = colors[1]
    context.beginPath(); context.ellipse(235, 700, 390, 250, 0, Math.PI, 0); context.fill()
    context.fillStyle = colors[2]
    context.beginPath(); context.ellipse(760, 720, 480, 280, 0, Math.PI, 0); context.fill()
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = '120px sans-serif'
    context.fillText(subject, 500, 375)
    context.textAlign = 'left'
    context.fillStyle = '#1d3150'
    context.font = '700 34px sans-serif'
    context.fillText(idea.slice(0, 44), 48, 58)
    context.font = '22px sans-serif'
    context.fillText(`${style} · Mầm Sáng Tạo`, 48, 100)
    history.current = [canvas.toDataURL()]
    setStatus('Đã khôi phục tranh mẫu.')
  }, [colors, idea, style, subject])

  useEffect(() => { drawTemplate() }, [drawTemplate])

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
    context.globalCompositeOperation = 'source-over'
    context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height)
    saveHistory(); setStatus('Đã làm sạch trang vẽ.')
  }

  function addSticker(sticker: string) {
    const canvas = canvasRef.current!
    const context = canvas.getContext('2d')!
    context.globalCompositeOperation = 'source-over'
    context.textAlign = 'center'; context.textBaseline = 'middle'; context.font = '96px sans-serif'
    context.fillText(sticker, canvas.width / 2, canvas.height / 2)
    saveHistory(); setStatus(`Đã thêm sticker ${sticker}. Kéo cọ để trang trí tiếp nhé!`)
  }

  function download() {
    const link = document.createElement('a')
    link.download = 'tranh-cua-be.png'; link.href = canvasRef.current!.toDataURL('image/png'); link.click()
    setStatus('Đã tải tranh PNG về máy.')
  }

  return (
    <section className="mt-7" aria-labelledby="drawing-title">
      <div className="flex items-start justify-between gap-4">
        <div><p className="kicker">Bàn vẽ của bé</p><h3 id="drawing-title" className="mt-2 text-2xl">Tô điểm ý tưởng của riêng mình</h3></div>
        <button type="button" onClick={onClose} aria-label="Đóng bàn vẽ" className="grid h-11 w-11 place-items-center rounded-full border border-hairline"><X className="h-5 w-5" /></button>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[190px_1fr]">
        <div className="rounded-2xl bg-cream p-4">
          <p className="text-sm font-extrabold">Màu cọ</p>
          <div className="mt-2 flex flex-wrap gap-2">{PALETTE.map((item) => <button key={item} type="button" onClick={() => { setColor(item); setEraser(false) }} aria-label={`Chọn màu ${item}`} aria-pressed={!eraser && color === item} className={`h-10 w-10 rounded-full border-2 ${!eraser && color === item ? 'border-blue ring-2 ring-blue/20' : 'border-white'}`} style={{ backgroundColor: item }} />)}</div>
          <label className="mt-4 block text-sm font-extrabold">Cỡ cọ: {size}<input type="range" min="3" max="42" value={size} onChange={(event) => setSize(Number(event.target.value))} className="mt-2 w-full" /></label>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setEraser(false)} aria-pressed={!eraser} className={`btn justify-center px-2 ${!eraser ? 'bg-blue text-white' : 'bg-white'}`}><Paintbrush className="h-4 w-4" />Cọ</button>
            <button type="button" onClick={() => setEraser(true)} aria-pressed={eraser} className={`btn justify-center px-2 ${eraser ? 'bg-blue text-white' : 'bg-white'}`}><Eraser className="h-4 w-4" />Tẩy</button>
            <button type="button" onClick={undo} className="btn justify-center bg-white px-2"><Undo2 className="h-4 w-4" />Lùi</button>
            <button type="button" onClick={clear} className="btn justify-center bg-white px-2"><Trash2 className="h-4 w-4" />Xóa</button>
          </div>
          <p className="mt-4 text-sm font-extrabold">Sticker</p>
          <div className="mt-2 grid grid-cols-3 gap-2">{STICKERS.map((item) => <button key={item} type="button" onClick={() => addSticker(item)} className="grid h-11 place-items-center rounded-xl bg-white text-xl" aria-label={`Thêm sticker ${item}`}>{item}</button>)}</div>
        </div>
        <div>
          <canvas ref={canvasRef} width={1000} height={750} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} className="aspect-[4/3] w-full touch-none rounded-2xl border-2 border-hairline bg-white shadow-inner" aria-label="Vùng vẽ tranh tương tác" />
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={download} className="btn btn-primary justify-center"><Download className="h-4 w-4" />Tải tranh PNG</button>
            <button type="button" onClick={drawTemplate} className="btn justify-center border border-hairline bg-white"><RotateCcw className="h-4 w-4" />Khôi phục mẫu</button>
          </div>
          <p className="mt-3 text-sm text-ink/60" role="status" aria-live="polite">{status} Tranh được xử lý trên thiết bị, không tự động tải lên mạng.</p>
        </div>
      </div>
    </section>
  )
}
