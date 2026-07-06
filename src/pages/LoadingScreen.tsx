import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Heart, Sparkles } from 'lucide-react'

export default function LoadingScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(() => navigate('/login'), 600)
          }, 600)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center transition-all duration-700 ${fadeOut ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      style={{
        background: 'linear-gradient(135deg, #4A2C3F 0%, #2D1B2E 50%, #4A2C3F 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-deep-rose/10 animate-float"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 22}%`,
              width: `${20 + i * 6}px`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${3 + i * 0.4}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div
          className="p-10 md:p-14 rounded-3xl text-center max-w-sm mx-4"
          style={{
            background: 'rgba(255, 248, 245, 0.06)',
            border: '1px solid rgba(212, 168, 83, 0.2)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="p-4 rounded-full animate-heartbeat"
              style={{
                background: 'linear-gradient(135deg, rgba(200,85,122,0.3), rgba(212,168,83,0.2))',
                border: '2px solid rgba(212, 168, 83, 0.3)',
              }}
            >
              <Heart className="w-12 h-12 text-deep-rose" fill="currentColor" />
            </div>
          </div>

          <h1
            className="font-amiri text-2xl md:text-3xl font-bold text-warm-cream mb-2"
            style={{ textShadow: '0 2px 10px rgba(212, 168, 83, 0.3)' }}
          >
          </h1>

          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="w-3 h-3 text-gold-accent/60" />
            <p className="font-cairo text-sm text-warm-cream/70">
              جاري تحميل قلوبنا
            </p>
            <Sparkles className="w-3 h-3 text-gold-accent/60" />
          </div>

          <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm mx-auto mb-3">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #C8557A, #D4A853)',
                boxShadow: '0 0 12px rgba(212, 168, 83, 0.5)',
              }}
            />
          </div>

          <p className="font-cairo text-xs text-warm-cream/40 font-semibold mb-6">
            {progress}%
          </p>

          <div className="w-16 h-px bg-gold-accent/40 mx-auto mb-4" />

          <p className="font-vibes text-lg text-gold-accent/80">
            Love Journey
          </p>
        </div>
      </div>
    </div>
  )
}
