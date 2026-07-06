import { useState, useEffect } from 'react'
import { Heart, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const fullText = 'بصمة'
  const [showContent, setShowContent] = useState(false)
  const [showSubtitle, setShowSubtitle] = useState(false)

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
        setTimeout(() => setShowContent(true), 500)
        setTimeout(() => setShowSubtitle(true), 1000)
      }
    }, 200)
    return () => clearInterval(timer)
  }, [])

  const scrollToNext = () => {
    document.getElementById('photo-album')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/hero-bg.jpg)` }}
      />
      <div className="absolute inset-0 bg-dark-plum/60" />

      <dotlottie-player
        src="https://lottie.host/c1d4c284-db32-4f5e-b0a6-890b6936ece9/yNqOMzR1fG.lottie"
        background="transparent"
        speed="0.5"
        style={{ position: 'absolute', width: '100%', height: '100%', opacity: 0.15, objectFit: 'cover' }}
        loop
        autoplay
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-deep-rose/20 animate-float"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              width: `${16 + i * 6}px`,
              animationDelay: `${i * 0.6}s`,
              willChange: 'transform, opacity',
            }}
            fill="currentColor"
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <div className="mb-6">
          <h1
            className="font-amiri text-5xl md:text-7xl font-bold text-warm-cream inline-block"
            style={{
              textShadow: '0 4px 20px rgba(212, 168, 83, 0.5)',
              minHeight: '1.2em'
            }}
          >
            {displayText}
            <span className="animate-pulse text-gold-accent">|</span>
          </h1>
        </div>

        {showContent && (
          <div className="flex justify-center mb-6 animate-fade-in-up">
            <div className="relative">
              <svg width="120" height="120" viewBox="0 0 120 120" className="animate-heartbeat">
                <defs>
                  <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#C8557A" />
                    <stop offset="100%" stopColor="#D4A853" />
                  </linearGradient>
                </defs>
                <path
                  d="M60 100 C60 100 20 70 20 45 C20 30 30 20 42 20 C50 20 57 25 60 32 C63 25 70 20 78 20 C90 20 100 30 100 45 C100 70 60 100 60 100Z"
                  fill="url(#heartGrad)"
                  opacity="0.9"
                />
                <path d="M35 45 Q40 35 50 38" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M38 50 Q45 40 55 43" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M41 55 Q48 45 58 48" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M65 38 Q75 35 82 45" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M62 43 Q72 40 79 50" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M59 48 Q69 45 76 55" stroke="white" strokeWidth="1" fill="none" opacity="0.5" />
                <path d="M45 60 Q55 55 65 60" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
                <path d="M50 68 Q58 63 68 68" stroke="white" strokeWidth="1" fill="none" opacity="0.4" />
              </svg>
            </div>
          </div>
        )}

        {showSubtitle && (
          <div className="animate-fade-in-up">
            <p className="font-cairo text-xl md:text-2xl text-warm-cream/90 mb-2">
              أهلاً بيك في عالمنا الرومانسي
            </p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="w-16 h-px bg-gold-accent/60" />
              <Heart className="w-4 h-4 text-gold-accent" fill="currentColor" />
              <div className="w-16 h-px bg-gold-accent/60" />
            </div>
          </div>
        )}

        {showSubtitle && (
          <button
            onClick={scrollToNext}
            className="mt-12 animate-bounce text-warm-cream/70 hover:text-gold-accent transition-colors"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        )}
      </div>
    </section>
  )
}
