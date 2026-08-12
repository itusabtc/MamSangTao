export type LearningSound = 'tap' | 'move' | 'correct' | 'wrong' | 'reward' | 'complete'

const patterns: Record<LearningSound, Array<[number, number, number]>> = {
  tap: [[520, .035, .05]],
  move: [[360, .04, .045], [520, .08, .05]],
  correct: [[523, 0, .07], [659, .09, .07], [784, .18, .12]],
  wrong: [[220, 0, .11], [175, .13, .14]],
  reward: [[659, 0, .07], [784, .09, .07], [988, .18, .18]],
  complete: [[523, 0, .08], [659, .1, .08], [784, .2, .08], [1047, .31, .22]],
}

export function audioEnabled() {
  return typeof window !== 'undefined' && localStorage.getItem('mam-learning-sound') !== 'off'
}

export function setAudioEnabled(enabled: boolean) {
  if (typeof window !== 'undefined') localStorage.setItem('mam-learning-sound', enabled ? 'on' : 'off')
}

export function playLearningSound(kind: LearningSound) {
  if (!audioEnabled() || typeof window === 'undefined') return
  const AudioCtx = window.AudioContext
  if (!AudioCtx) return
  const context = new AudioCtx()
  patterns[kind].forEach(([frequency, delay, duration]) => {
    const oscillator = context.createOscillator(), gain = context.createGain(), start = context.currentTime + delay
    oscillator.type = kind === 'wrong' ? 'triangle' : 'sine'; oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(.11, start + .012); gain.gain.exponentialRampToValueAtTime(.0001, start + duration)
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .02)
  })
  window.setTimeout(() => void context.close(), 900)
}

export function speakVietnamese(text: string) {
  if (!audioEnabled() || typeof window === 'undefined' || !('speechSynthesis' in window)) return false
  const synth = window.speechSynthesis
  const voices = synth.getVoices()
  const voice = voices.find(item => item.lang.toLowerCase() === 'vi-vn') ?? voices.find(item => item.lang.toLowerCase().startsWith('vi'))
  synth.cancel()
  const speech = new SpeechSynthesisUtterance(text)
  if (voice) speech.voice = voice
  speech.lang = 'vi-VN'; speech.rate = .92; speech.pitch = 1.03
  synth.speak(speech)
  return true
}
