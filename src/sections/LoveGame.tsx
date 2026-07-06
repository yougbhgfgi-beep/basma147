import { useState, useEffect, useRef } from 'react'
import { Heart, RefreshCw } from 'lucide-react'

export default function LoveGame() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [hearts, setHearts] = useState<{id: number; x: number; y: number}[]>([])
  const [visibleSection, setVisibleSection] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const gameAreaRef = useRef<HTMLDivElement>(null)
  const heartIdRef = useRef(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const heartGeneratorRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleSection(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const startGame = () => {
    setGameState('playing')
    setScore(0)
    setTimeLeft(30)
    setHearts([])
    heartIdRef.current = 0

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          endGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    heartGeneratorRef.current = setInterval(() => {
      if (gameAreaRef.current) {
        const rect = gameAreaRef.current.getBoundingClientRect()
        const newHeart = {
          id: heartIdRef.current++,
          x: Math.random() * (rect.width - 50),
          y: Math.random() * (rect.height - 50),
        }
        setHearts(prev => [...prev.slice(-15), newHeart])
      }
    }, 800)
  }

  const endGame = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    if (heartGeneratorRef.current) clearInterval(heartGeneratorRef.current)
    setGameState('ended')
    setHearts([])
  }

  const clickHeart = (id: number) => {
    setHearts(prev => prev.filter(h => h.id !== id))
    setScore(prev => prev + 1)
  }

  const resetGame = () => {
    setGameState('idle')
    setScore(0)
    setTimeLeft(30)
    setHearts([])
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (heartGeneratorRef.current) clearInterval(heartGeneratorRef.current)
    }
  }, [])

  return (
    <section
      id="game"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 relative"
      style={{ background: 'linear-gradient(135deg, #4A2C3F 0%, #2D1B2E 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className={`max-w-4xl mx-auto transition-all duration-700 ${visibleSection ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-10">
          <h2 className="font-amiri text-3xl md:text-4xl font-bold text-warm-cream mb-4">
            لعبة الحب
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold-accent" />
            <Heart className="w-5 h-5 text-deep-rose" fill="currentColor" />
            <div className="w-16 h-px bg-gold-accent" />
          </div>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#FFF8F5',
            border: '3px solid #D4A853',
            boxShadow: '0 8px 32px rgba(212, 168, 83, 0.3)'
          }}
        >
          <div className="bg-gradient-to-r from-deep-rose to-[#D4687A] p-4 flex justify-between items-center">
            <div className="text-warm-cream font-cairo">
              <span className="text-sm opacity-80">النقاط: </span>
              <span className="text-2xl font-bold">{score}</span>
            </div>
            <div className="text-warm-cream font-cairo">
              <span className="text-sm opacity-80">الوقت: </span>
              <span className="text-2xl font-bold">{timeLeft}</span>
            </div>
          </div>

          <div
            ref={gameAreaRef}
            className="relative h-80 md:h-96 bg-warm-cream overflow-hidden"
          >
            {gameState === 'idle' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <Heart className="w-16 h-16 text-deep-rose animate-heartbeat" fill="currentColor" />
                <p className="font-amiri text-xl text-dark-plum">اضغط على القلوب قبل ما تختفي!</p>
                <button
                  onClick={startGame}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-deep-rose to-[#D4687A] text-white font-cairo font-semibold shadow-romantic hover:scale-105 transition-transform"
                >
                  ابدأ اللعبة
                </button>
              </div>
            )}

            {gameState === 'playing' && (
              <>
                {hearts.map(heart => (
                  <button
                    key={heart.id}
                    onClick={() => clickHeart(heart.id)}
                    className="absolute animate-heartbeat transition-all duration-300 hover:scale-125"
                    style={{
                      right: `${heart.x}px`,
                      top: `${heart.y}px`,
                    }}
                  >
                    <Heart
                      className="w-10 h-10 text-deep-rose drop-shadow-md"
                      fill="currentColor"
                    />
                  </button>
                ))}
              </>
            )}

            {gameState === 'ended' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6">
                <Heart className="w-12 h-12 text-gold-accent" fill="currentColor" />
                <p className="font-amiri text-2xl text-dark-plum">انتهت اللعبة!</p>
                <p className="font-cairo text-lg text-deep-rose">
                  نقاطك: <span className="font-bold text-2xl">{score}</span>
                </p>

                {score >= 10 && (
                  <div className="mt-2 p-4 rounded-xl text-center animate-fade-in-up max-w-sm"
                    style={{
                      background: 'linear-gradient(135deg, #FFF8F5, #FFF0EB)',
                      border: '2px solid #D4A853',
                    }}
                  >
                    <p className="font-amiri text-lg text-dark-plum leading-relaxed">
                      {score >= 20
                        ? 'حبي ليكي قد السما و كل النجوم اللي فيها ❤️'
                        : score >= 15
                          ? 'أنتِ أجمل حاجة في حياتي و قلبي بينبض ليكي ❤️'
                          : 'كل نقطة جبتيها دليل على إن حبنا كبير ❤️'}
                    </p>
                    <div className="w-12 h-0.5 bg-gold-accent mx-auto mt-3" />
                    <p className="font-vibes text-lg text-deep-rose mt-2">بحبك</p>
                  </div>
                )}

                {score < 10 && (
                  <p className="font-cairo text-sm text-dusty-mauve">جرب تاني تجمع قلوب أكتر ❤️</p>
                )}

                <button
                  onClick={resetGame}
                  className="mt-1 px-8 py-3 rounded-full bg-gradient-to-r from-deep-rose to-[#D4687A] text-white font-cairo font-semibold shadow-romantic hover:scale-105 transition-transform flex items-center gap-2"
                >
                  <RefreshCw className="w-5 h-5" />
                  أعد المحاولة
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />
    </section>
  )
}
