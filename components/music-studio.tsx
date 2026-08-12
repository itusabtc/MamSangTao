'use client'

import { Play, RotateCcw, Square } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const INSTRUMENTS = [
  { id: 'piano', label: 'Piano', icon: '🎹', wave: 'sine' as OscillatorType },
  { id: 'bell', label: 'Chuông', icon: '🔔', wave: 'triangle' as OscillatorType },
  { id: 'robot', label: 'Robot', icon: '🤖', wave: 'square' as OscillatorType },
  { id: 'flute', label: 'Sáo', icon: '🪈', wave: 'sine' as OscillatorType },
]
const NOTES = [262, 294, 330, 392, 440, 392, 330, 294]

export function MusicStudio({ idea, onReset }: { idea: string; onReset: () => void }) {
  const [instrument, setInstrument] = useState(0)
  const [steps, setSteps] = useState([true, false, true, false, true, true, false, true])
  const [tempo, setTempo] = useState(110)
  const [playingStep, setPlayingStep] = useState<number | null>(null)
  const timer = useRef<number | null>(null)
  const audio = useRef<AudioContext | null>(null)

  function stop() { if (timer.current) window.clearInterval(timer.current); timer.current = null; setPlayingStep(null) }
  useEffect(() => stop, [])

  function tone(frequency: number) {
    if (!audio.current) audio.current = new AudioContext()
    const oscillator = audio.current.createOscillator(); const gain = audio.current.createGain()
    oscillator.type = INSTRUMENTS[instrument].wave; oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.12, audio.current.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, audio.current.currentTime + 0.28)
    oscillator.connect(gain); gain.connect(audio.current.destination); oscillator.start(); oscillator.stop(audio.current.currentTime + 0.3)
  }

  function play() {
    stop(); let index = 0
    const tick = () => { setPlayingStep(index); if (steps[index]) tone(NOTES[index]); index = (index + 1) % steps.length }
    tick(); timer.current = window.setInterval(tick, 60000 / tempo)
  }

  return <section className="mt-7" aria-labelledby="music-title">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"><div><p className="kicker">Xưởng âm nhạc</p><h3 id="music-title" className="mt-2 text-2xl">Phối nhịp điệu của riêng bé</h3><p className="mt-1 text-sm text-ink/60">Chủ đề: {idea}</p></div><span className="text-5xl" aria-hidden>🎵</span></div>
    <div className="mt-5 rounded-3xl bg-violet/10 p-4 sm:p-6">
      <p className="text-sm font-extrabold">Chọn nhạc cụ</p><div className="mt-2 flex flex-wrap gap-2">{INSTRUMENTS.map((item, index) => <button key={item.id} type="button" onClick={() => setInstrument(index)} aria-pressed={instrument === index} className={`min-h-12 rounded-2xl px-4 font-bold ${instrument === index ? 'bg-violet text-white' : 'bg-white'}`}>{item.icon} {item.label}</button>)}</div>
      <div className="mt-6 flex items-center gap-3"><label htmlFor="music-tempo" className="text-sm font-extrabold">Tốc độ: {tempo}</label><input id="music-tempo" type="range" min="70" max="180" value={tempo} onChange={(event) => setTempo(Number(event.target.value))} className="max-w-xs flex-1" /></div>
      <p className="mt-6 text-sm font-extrabold">Bật các ô để tạo giai điệu</p><div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">{steps.map((active, index) => <button key={index} type="button" onClick={() => { setSteps((items) => items.map((value, i) => i === index ? !value : value)); tone(NOTES[index]) }} aria-pressed={active} aria-label={`Nốt ${index + 1}`} className={`aspect-square rounded-2xl text-xl font-black transition ${playingStep === index ? 'ring-4 ring-yellow' : ''} ${active ? 'bg-coral text-white' : 'bg-white text-ink/35'}`}>{active ? '♪' : index + 1}</button>)}</div>
      <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={play} className="btn btn-primary"><Play className="h-4 w-4" />Nghe thử</button><button type="button" onClick={stop} className="btn border border-hairline bg-white"><Square className="h-4 w-4" />Dừng</button><button type="button" onClick={onReset} className="btn ml-auto"><RotateCcw className="h-4 w-4" />Ý tưởng khác</button></div>
    </div>
  </section>
}
