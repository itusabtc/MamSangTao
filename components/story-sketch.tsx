'use client'

import { Download, Eraser, Paintbrush, Trash2 } from 'lucide-react'
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'

type Props = { value?: string; prompt: string; onChange: (image: string) => void }
const COLORS = ['#1d3150', '#294d9b', '#f47d61', '#f5c34d', '#64aa82', '#8a73c9']

export function StorySketch({ value, prompt, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)
  const [color, setColor] = useState(COLORS[0])
  const [size, setSize] = useState(8)
  const [eraser, setEraser] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height)
    if (!value) return
    const image = new Image()
    image.onload = () => context.drawImage(image, 0, 0)
    image.src = value
  }, [value])

  function point(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    return { x: (event.clientX - rect.left) * canvas.width / rect.width, y: (event.clientY - rect.top) * canvas.height / rect.height }
  }

  function start(event: ReactPointerEvent<HTMLCanvasElement>) {
    const context = canvasRef.current!.getContext('2d')!
    const p = point(event); drawing.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
    context.beginPath(); context.moveTo(p.x, p.y)
  }

  function move(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const context = canvasRef.current!.getContext('2d')!
    const p = point(event)
    context.globalCompositeOperation = eraser ? 'destination-out' : 'source-over'
    context.strokeStyle = color; context.lineWidth = size; context.lineCap = 'round'; context.lineJoin = 'round'
    context.lineTo(p.x, p.y); context.stroke()
  }

  function stop() {
    if (!drawing.current) return
    drawing.current = false
    onChange(canvasRef.current!.toDataURL('image/png'))
  }

  function clear() {
    const canvas = canvasRef.current!; const context = canvas.getContext('2d')!
    context.globalCompositeOperation = 'source-over'; context.fillStyle = '#ffffff'; context.fillRect(0, 0, canvas.width, canvas.height)
    onChange(canvas.toDataURL('image/png'))
  }

  function download() {
    const link = document.createElement('a'); link.download = 'khung-truyen-cua-be.png'; link.href = canvasRef.current!.toDataURL('image/png'); link.click()
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white p-3 text-left">
      <p className="rounded-xl bg-yellow/20 px-3 py-2 text-sm font-bold"><span className="text-coral">Gợi ý vẽ:</span> {prompt}</p>
      <canvas ref={canvasRef} width={800} height={450} onPointerDown={start} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} className="mt-3 aspect-video w-full touch-none rounded-xl border-2 border-dashed border-blue/25 bg-white" aria-label="Khung tự vẽ minh họa truyện" />
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {COLORS.map((item) => <button key={item} type="button" onClick={() => { setColor(item); setEraser(false) }} aria-label={`Chọn màu ${item}`} aria-pressed={!eraser && color === item} className={`h-9 w-9 rounded-full border-2 ${!eraser && color === item ? 'border-blue ring-2 ring-blue/20' : 'border-white'}`} style={{ backgroundColor: item }} />)}
        <label className="ml-1 text-xs font-bold">Cỡ cọ <input type="range" min="3" max="30" value={size} onChange={(event) => setSize(Number(event.target.value))} className="w-20 align-middle" /></label>
        <button type="button" onClick={() => setEraser(false)} className={`btn min-h-10 px-3 ${!eraser ? 'bg-blue text-white' : 'bg-cream'}`}><Paintbrush className="h-4 w-4" />Cọ</button>
        <button type="button" onClick={() => setEraser(true)} className={`btn min-h-10 px-3 ${eraser ? 'bg-blue text-white' : 'bg-cream'}`}><Eraser className="h-4 w-4" />Tẩy</button>
        <button type="button" onClick={clear} className="btn min-h-10 bg-cream px-3"><Trash2 className="h-4 w-4" />Xóa</button>
        <button type="button" onClick={download} className="btn min-h-10 bg-cream px-3 sm:ml-auto"><Download className="h-4 w-4" />Tải ảnh</button>
      </div>
    </div>
  )
}
