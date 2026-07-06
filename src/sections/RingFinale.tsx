import { useState, useEffect, useRef } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function RingFinale() {
  const [showRing, setShowRing] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleReveal = () => {
    setShowRing(true)
    setTimeout(() => setShowMessage(true), 1500)
    setTimeout(() => setShowConfetti(true), 800)
  }

  const confettiHearts = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 3 + Math.random() * 3,
    color: ['#C8557A', '#D4A853', '#F4C2C2', '#D4BBDD'][Math.floor(Math.random() * 4)]
  }))

  return (
    <section
      id="finale"
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4A2C3F 0%, #2D1B2E 100%)' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-deep-rose/10 animate-float"
            style={{
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              width: `${24 + i * 6}px`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {showConfetti && confettiHearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: '-20px',
            color: heart.color,
            width: '16px',
            height: '16px',
            animation: `confetti-fall ${heart.duration}s linear forwards`,
            animationDelay: `${heart.delay}s`,
            opacity: 0.7
          }}
          fill="currentColor"
        />
      ))}

      <div className={`relative z-10 text-center px-4 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

        {!showRing ? (
          <>
            <div className="mb-10">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-deep-rose/20 animate-heartbeat" style={{ border: '2px solid rgba(212, 168, 83, 0.3)' }}>
                  <Heart className="w-10 h-10 text-deep-rose" fill="currentColor" />
                </div>
              </div>
              <h2 className="font-amiri text-3xl md:text-4xl font-bold text-warm-cream mb-3">
                لحظة حبنا
              </h2>
              <p className="font-cairo text-warm-cream/60 text-sm md:text-base">
                كل قصة حب ليها لحظة مش هتتنسى
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="w-16 h-px bg-gold-accent" />
                <Sparkles className="w-4 h-4 text-gold-accent" />
                <div className="w-16 h-px bg-gold-accent" />
              </div>
            </div>

            <button
              onClick={handleReveal}
              className="px-12 py-4 rounded-full bg-gradient-to-r from-deep-rose to-[#D4687A] text-white font-cairo font-bold text-lg shadow-romantic hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-3 mx-auto group"
            >
              <Heart className="w-5 h-5 group-hover:scale-125 transition-transform" fill="currentColor" />
              اكشفي المفاجأة
              <Sparkles className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            </button>

            <p className="font-cairo text-warm-cream/40 mt-6 text-xs">
              أنتِ مستعدة؟
            </p>
          </>
        ) : (
          <>
            <div className="mb-6 flex justify-center">
              <div className={`relative ${showRing ? 'animate-ring-spin' : ''}`}>
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle, rgba(212,168,83,0.4) 0%, transparent 70%)',
                  filter: 'blur(20px)',
                  transform: 'scale(1.5)',
                }} />
                <img
                  src={`${import.meta.env.BASE_URL}images/ring.png`}
                  alt="خاتم الحب"
                  className="w-40 h-40 md:w-56 md:h-56 mx-auto relative"
                  style={{
                    filter: 'drop-shadow(0 15px 40px rgba(212, 168, 83, 0.6))',
                  }}
                />
              </div>
            </div>

            {showMessage && (
              <div className="animate-fade-in-up max-w-md mx-auto">
                <div
                  className="p-8 md:p-10 rounded-3xl relative"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 248, 245, 0.97), rgba(255, 240, 235, 0.97))',
                    border: '2px solid #D4A853',
                    boxShadow: '0 20px 60px rgba(212, 168, 83, 0.3), 0 0 40px rgba(200, 85, 122, 0.1)',
                  }}
                >
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-gold-accent/60 rounded-tl-lg" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-gold-accent/60 rounded-tr-lg" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-gold-accent/60 rounded-bl-lg" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-gold-accent/60 rounded-br-lg" />

                  <div className="flex justify-center gap-2 mb-5">
                    <Heart className="w-4 h-4 text-deep-rose animate-heartbeat" fill="currentColor" />
                    <Heart className="w-5 h-5 text-gold-accent animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.2s' }} />
                    <Heart className="w-4 h-4 text-deep-rose animate-heartbeat" fill="currentColor" style={{ animationDelay: '0.4s' }} />
                  </div>

                  <p className="font-amiri text-xl md:text-2xl text-dark-plum leading-relaxed mb-4">
                    كل حاجة في الدنيا بتتغير، لكن حبنا لبعض ثابت.
                  </p>
                  <p className="font-amiri text-lg md:text-xl text-dark-plum/80 leading-relaxed mb-4">
                    أنتِ مش بس حبيبتي، أنتِ دنيتي كلها و أماني و مستقبلي.
                  </p>
                  <p className="font-amiri text-lg md:text-xl text-dark-plum leading-relaxed">
                    معاكِ لآخر نفس في عمري.
                  </p>

                  <div className="mt-6 pt-4 border-t border-gold-accent/30 text-center">
                    <p className="font-vibes text-3xl md:text-4xl text-deep-rose">
                      بحبك للأبد
                    </p>
                    <p className="font-cairo text-xs text-dusty-mauve mt-2">
                      من كل قلبي
                    </p>
                  </div>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                  {[...Array(5)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-deep-rose/60 animate-float"
                      style={{
                        width: `${16 + i * 4}px`,
                        height: `${16 + i * 4}px`,
                        animationDelay: `${i * 0.3}s`
                      }}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
