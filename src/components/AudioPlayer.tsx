import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const handler = () => {
      if (audioRef.current && !playing) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
      }
    }
    window.addEventListener('click', handler, { once: true })
    window.addEventListener('touchstart', handler, { once: true })
    return () => {
      window.removeEventListener('click', handler)
      window.removeEventListener('touchstart', handler)
    }
  }, [playing])

  const toggle = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause()
        setPlaying(false)
      } else {
        audioRef.current.play().catch(() => {})
        setPlaying(true)
      }
    }
  }

  return (
    <>
      <audio ref={audioRef} src={`${import.meta.env.BASE_URL}song.mp3`} loop />
      <button
        onClick={toggle}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-dark-plum/60 backdrop-blur-md flex items-center justify-center hover:bg-dark-plum/80 transition-all border border-gold-accent/30 shadow-lg"
        aria-label={playing ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
      >
        {playing ? (
          <Volume2 className="w-5 h-5 text-gold-accent" />
        ) : (
          <VolumeX className="w-5 h-5 text-gold-accent" />
        )}
      </button>
    </>
  )
}
