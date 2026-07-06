import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { Heart, Sparkles } from 'lucide-react'

export default function Envelope() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showLetter, setShowLetter] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [hearts, setHearts] = useState<{id: number; x: number; delay: number}[]>([])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowLetter(true), 800)
      setTimeout(() => setShowButton(true), 4000)

      const newHearts = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2
      }))
      setHearts(newHearts)
    }
  }, [isOpen])

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4"
      style={{
        background: 'linear-gradient(135deg, #4A2C3F 0%, #2D1B2E 100%)'
      }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-deep-rose/5 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              willChange: 'transform, opacity',
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {isOpen && hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute text-deep-rose/40 pointer-events-none"
          style={{
            left: `${heart.x}%`,
            top: '-20px',
            width: '16px',
            height: '16px',
            animation: `confetti-fall ${3 + Math.random() * 2}s linear forwards`,
            animationDelay: `${heart.delay}s`,
          }}
          fill="currentColor"
        />
      ))}

      <dotlottie-player
        src="https://assets1.lottiefiles.com/packages/lf20_u4j3xm6r.json"
        background="transparent"
        speed="0.8"
        style={{ position: 'absolute', width: '300px', height: '300px', opacity: 0.15 }}
        loop
        autoplay
      />

      <div className="relative z-10 flex flex-col items-center gap-6 md:gap-8 px-4">

        {!isOpen && (
          <h1 className="font-amiri text-xl md:text-3xl text-warm-cream/90 text-center mb-2 md:mb-4">
            لديك رسالة رومانسية...
          </h1>
        )}

        <div
          className={`relative cursor-pointer transition-all duration-500 ${isOpen ? 'scale-105' : 'hover:scale-105 animate-float'}`}
          onClick={() => !isOpen && setIsOpen(true)}
        >
          <svg
            width="260"
            height="180"
            viewBox="0 0 300 200"
            className={`transition-transform duration-1000 ${isOpen ? 'scale-95' : ''} w-[220px] md:w-[300px]`}
          >
            <rect x="10" y="80" width="280" height="110" rx="5" fill="#D4A853" />
            <rect x="10" y="80" width="280" height="110" rx="5" fill="url(#envelopeGrad)" />

            <path
              d={`M 10 80 L 150 ${isOpen ? '20' : '80'} L 290 80`}
              fill={isOpen ? '#B8933F' : '#C49545'}
              stroke="#B8933F"
              strokeWidth="1"
              className="transition-all duration-1000"
            />

            <rect x="10" y="80" width="280" height="110" rx="5" fill="url(#frontGrad)" opacity="0.3" />

            <circle cx="150" cy="85" r="18" fill="#C8557A" />
            <Heart
              cx="150"
              cy="85"
              className="text-white"
              style={{ transform: 'translate(141px, 76px)' }}
              size="18"
              fill="white"
            />

            <defs>
              <linearGradient id="envelopeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4A853" />
                <stop offset="100%" stopColor="#B8933F" />
              </linearGradient>
              <linearGradient id="frontGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4A2C3F" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4A2C3F" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>

          {!isOpen && (
            <p className="font-cairo text-warm-cream/70 text-center mt-3 md:mt-4 text-xs md:text-sm">
              اضغط على الظرف لفتحه
            </p>
          )}
        </div>

        {showLetter && (
          <div
            className="max-w-md w-full mx-4 p-5 md:p-8 rounded-2xl animate-fade-in-up relative"
            style={{
              background: 'linear-gradient(135deg, #FFF8F5 0%, #FFF0EB 100%)',
              border: '2px solid #D4A853',
              boxShadow: '0 10px 40px rgba(212, 168, 83, 0.3), 0 0 60px rgba(200, 85, 122, 0.1)'
            }}
          >
            <div className="absolute top-2 left-2 w-5 h-5 md:w-6 md:h-6 border-t-2 border-l-2 border-gold-accent rounded-tl-lg" />
            <div className="absolute top-2 right-2 w-5 h-5 md:w-6 md:h-6 border-t-2 border-r-2 border-gold-accent rounded-tr-lg" />
            <div className="absolute bottom-2 left-2 w-5 h-5 md:w-6 md:h-6 border-b-2 border-l-2 border-gold-accent rounded-bl-lg" />
            <div className="absolute bottom-2 right-2 w-5 h-5 md:w-6 md:h-6 border-b-2 border-r-2 border-gold-accent rounded-br-lg" />

            <div className="flex items-center justify-center gap-2 mb-4 md:mb-6">
              <div className="w-8 md:w-12 h-px bg-gold-accent" />
              <Heart className="w-4 md:w-5 h-4 md:h-5 text-deep-rose" fill="currentColor" />
              <div className="w-8 md:w-12 h-px bg-gold-accent" />
            </div>

            <div className="text-center">
              <p className="font-amiri text-base md:text-xl text-dark-plum leading-relaxed mb-3 md:mb-4">
                من أول يوم شفتك فيه و أنا عرفت إنكِ نصيبي و أجمل حاجة هتحصلي في حياتي.
              </p>
              <p className="font-amiri text-base md:text-xl text-dark-plum leading-relaxed mb-3 md:mb-4">
                معاكِ الدنيا بقيت أحلى، و الأيام بقت ليها معنى. أنتِ مش بس حبيبتي، أنتِ كل حاجة.
              </p>
              <p className="font-amiri text-base md:text-xl text-dark-plum leading-relaxed mb-4 md:mb-6">
                بحبك قد ما في الدنيا حب، و قد ما في السما نجوم.
              </p>

              <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gold-accent/30">
                <p className="font-vibes text-xl md:text-2xl text-deep-rose">
                  بحبك للابد
                </p>
                <p className="font-cairo text-xs text-dusty-mauve mt-1">من كل قلبي</p>
              </div>
            </div>

            <div className="flex justify-center mt-3 md:mt-4">
              <Sparkles className="w-3 md:w-4 h-3 md:h-4 text-gold-accent animate-sparkle" />
            </div>
          </div>
        )}

        {showButton && (
          <button
            onClick={() => navigate('/home')}
            className="mt-2 md:mt-4 px-8 md:px-10 py-3 md:py-4 rounded-full bg-gradient-to-r from-deep-rose to-[#D4687A] text-white font-cairo font-semibold text-base md:text-lg shadow-romantic hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 animate-fade-in-up flex items-center gap-2"
          >
            <Heart className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" />
            ادخل عالمنا
            <Heart className="w-4 md:w-5 h-4 md:h-5" fill="currentColor" />
          </button>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
