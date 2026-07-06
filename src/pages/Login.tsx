import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Lock, Sparkles } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'love') {
      navigate('/envelope')
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 500)
    }
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: 'url(/images/login-bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-dark-plum/40 backdrop-blur-sm" />

      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="absolute text-gold-accent/30 animate-float"
            style={{
              left: `${5 + i * 12}%`,
              top: `${10 + (i % 4) * 20}%`,
              width: `${16 + (i % 3) * 8}px`,
              height: `${16 + (i % 3) * 8}px`,
              animationDelay: `${i * 0.7}s`,
            }}
          />
        ))}
      </div>

      {/* Login Card */}
      <div
          className={`relative z-10 glass-card p-6 md:p-10 w-full max-w-md mx-4 transition-all duration-500 ${shake ? 'animate-shake' : ''}`}
          style={{
            border: '1px solid rgba(212, 168, 83, 0.3)',
          }}
        >
        {/* Decorative top */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent rounded-full" />
        </div>

        {/* Title */}
        <h1 className="font-amiri text-3xl md:text-4xl font-bold text-dark-plum text-center mb-2">
          أهلاً بك في رحلتنا
        </h1>
        
        {/* Subtitle */}
        <p className="font-cairo text-dusty-mauve text-center mb-8 text-sm">
          أدخل كلمة السر لاكتشاف عالمنا الرومانسي
        </p>

        {/* Gold line */}
        <div className="w-24 h-0.5 bg-gold-accent mx-auto mb-8 rounded-full" />

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dusty-mauve" />
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="اكتب كلمة السر هنا..."
              className={`w-full pr-12 pl-4 py-3.5 rounded-xl border-2 bg-white/80 font-cairo text-dark-plum placeholder:text-dusty-mauve/60 focus:outline-none focus:ring-2 transition-all ${
                error 
                  ? 'border-red-400 focus:ring-red-400/30' 
                  : 'border-soft-lavender/50 focus:border-deep-rose focus:ring-deep-rose/20'
              }`}
            />
          </div>

          {error && (
            <p className="font-cairo text-red-500 text-sm text-center -mt-2">
              كلمة السر غير صحيحة، حاول مرة أخرى
            </p>
          )}

          {/* Hint */}
          <p className="font-cairo text-xs text-dusty-mauve/60 text-center">
            تلميح: الحب الحقيقي مش محتاج كلمة سر ❤️
          </p>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-deep-rose to-[#D4687A] text-white font-cairo font-semibold text-lg shadow-romantic hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            افتح الظرف
          </button>
        </form>

        {/* Bottom decoration */}
        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gold-accent/50" />
            <Sparkles className="w-4 h-4 text-gold-accent" />
            <div className="w-8 h-px bg-gold-accent/50" />
          </div>
        </div>
      </div>
    </div>
  )
}
