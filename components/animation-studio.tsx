'use client'

import { Play, Plus, RotateCcw, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'

const ACTORS = ['🐱', '🐰', '🐉', '🚀', '🦋', '🤖']
const BACKGROUNDS = [{ icon: '🌳', label: 'Khu rừng', color: '#dff4d8' }, { icon: '🌌', label: 'Vũ trụ', color: '#dce5ff' }, { icon: '🏰', label: 'Lâu đài', color: '#efe4ff' }, { icon: '🌊', label: 'Đại dương', color: '#bde9ff' }]

export function AnimationStudio({ idea, onReset }: { idea: string; onReset: () => void }) {
  const [actor, setActor] = useState(ACTORS[0]); const [background, setBackground] = useState(0)
  const [scenes, setScenes] = useState([{ x: 18, y: 62 }, { x: 48, y: 38 }, { x: 78, y: 62 }])
  const [scene, setScene] = useState(0); const [playing, setPlaying] = useState(false)
  useEffect(() => { if (!playing) return; const timer = window.setInterval(() => setScene((value) => (value + 1) % scenes.length), 700); return () => window.clearInterval(timer) }, [playing, scenes.length])
  const current = scenes[scene]
  return <section className="mt-7" aria-labelledby="animation-title">
    <div><p className="kicker">Xưởng hoạt hình</p><h3 id="animation-title" className="mt-2 text-2xl">Ghép cảnh và cho nhân vật chuyển động</h3><p className="mt-1 text-sm text-ink/60">Kịch bản: {idea}</p></div>
    <div className="mt-5 grid gap-4 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl bg-cream p-4"><p className="text-sm font-extrabold">Nhân vật</p><div className="mt-2 grid grid-cols-3 gap-2">{ACTORS.map((item) => <button key={item} type="button" onClick={() => setActor(item)} aria-pressed={actor === item} className={`grid aspect-square place-items-center rounded-xl text-3xl ${actor === item ? 'bg-blue ring-2 ring-blue' : 'bg-white'}`}>{item}</button>)}</div><p className="mt-5 text-sm font-extrabold">Bối cảnh</p><div className="mt-2 space-y-2">{BACKGROUNDS.map((item, index) => <button key={item.label} type="button" onClick={() => setBackground(index)} className={`min-h-11 w-full rounded-xl px-3 text-left text-sm font-bold ${background === index ? 'bg-violet text-white' : 'bg-white'}`}>{item.icon} {item.label}</button>)}</div></aside>
      <div><div className="relative aspect-video overflow-hidden rounded-3xl border-2 border-hairline" style={{ backgroundColor: BACKGROUNDS[background].color }}><div className="absolute right-6 top-5 text-5xl">{BACKGROUNDS[background].icon}</div><div className="absolute bottom-0 h-[25%] w-full bg-green/70" /><div className="absolute text-7xl transition-all duration-500" style={{ left: `${current.x}%`, top: `${current.y}%`, transform: 'translate(-50%, -50%)' }}>{actor}</div><div className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold">Cảnh {scene + 1}/{scenes.length}</div></div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">{scenes.map((item, index) => <button key={index} type="button" onClick={() => { setScene(index); setPlaying(false) }} className={`min-h-14 min-w-24 rounded-xl text-sm font-extrabold ${scene === index ? 'bg-blue text-white' : 'bg-cream'}`}>Cảnh {index + 1}<br/><span className="text-xs opacity-70">{item.x}% · {item.y}%</span></button>)}<button type="button" onClick={() => { setScenes((items) => [...items, { x: 20 + Math.round(Math.random() * 60), y: 30 + Math.round(Math.random() * 35) }]); setScene(scenes.length) }} className="min-h-14 min-w-24 rounded-xl border-2 border-dashed border-blue font-bold"><Plus className="mx-auto h-4 w-4" />Thêm cảnh</button></div>
        <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => setPlaying((value) => !value)} className="btn btn-primary"><Play className="h-4 w-4" />{playing ? 'Tạm dừng' : 'Xem hoạt hình'}</button><button type="button" disabled={scenes.length <= 1} onClick={() => { setScenes((items) => items.filter((_, index) => index !== scene)); setScene(0) }} className="btn border border-hairline bg-white disabled:opacity-40"><Trash2 className="h-4 w-4" />Xóa cảnh</button><button type="button" onClick={onReset} className="btn ml-auto"><RotateCcw className="h-4 w-4" />Ý tưởng khác</button></div>
      </div>
    </div>
  </section>
}
