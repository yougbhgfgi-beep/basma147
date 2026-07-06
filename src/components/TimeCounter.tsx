import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

const START_DATE = new Date('2025-05-09T00:00:00')

export default function TimeCounter() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const diff = now.getTime() - START_DATE.getTime()
  const totalSeconds = Math.floor(diff / 1000)
  const years = Math.floor(totalSeconds / (365.25 * 24 * 60 * 60))
  const remainingAfterYears = totalSeconds % (365.25 * 24 * 60 * 60)
  const days = Math.floor(remainingAfterYears / (24 * 60 * 60))
  const hours = Math.floor((remainingAfterYears % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((remainingAfterYears % (60 * 60)) / 60)
  const seconds = Math.floor(remainingAfterYears % 60)

  const items = [
    { label: 'سنة', value: years },
    { label: 'يوم', value: days },
    { label: 'ساعة', value: hours },
    { label: 'دقيقة', value: minutes },
    { label: 'ثانية', value: seconds },
  ]

  return (
    <section className="py-12 px-4 relative" style={{ background: 'linear-gradient(135deg, #4A2C3F 0%, #2D1B2E 100%)' }}>
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-gold-accent" />
          <p className="font-amiri text-lg text-warm-cream/80">
            منذ أن بدأت رحلتنا
          </p>
          <Clock className="w-5 h-5 text-gold-accent" />
        </div>
        <div className="grid grid-cols-5 gap-2 md:gap-3" dir="ltr">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center p-2 md:p-3 rounded-xl"
              style={{
                background: 'rgba(255, 248, 245, 0.08)',
                border: '1px solid rgba(212, 168, 83, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span
                className="font-amiri text-xl md:text-3xl font-bold text-gold-accent tabular-nums"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cairo text-[10px] md:text-xs text-warm-cream/60 mt-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
