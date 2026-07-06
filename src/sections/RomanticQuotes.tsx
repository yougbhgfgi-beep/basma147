import { useState, useEffect, useRef } from 'react'
import { Heart, Star } from 'lucide-react'

export default function RomanticQuotes() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(3).fill(false))
  const sectionRef = useRef<HTMLElement>(null)

  const quotes = [
    {
      text: 'الحب ليس ما نقوله، الحب هو ما نفعله',
      author: 'من القلب',
    },
    {
      text: 'معك كل لحظة تصبح ذكرى جميلة',
      author: 'لروحك',
    },
    {
      text: 'أنتِ السبب اللي بيخليني أبتسم كل يوم',
      author: 'بكل حبي',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          quotes.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards(prev => {
                const newArr = [...prev]
                newArr[i] = true
                return newArr
              })
            }, i * 300)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="quotes"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 relative"
      style={{
        background: 'linear-gradient(135deg, #D4BBDD 0%, #F4C2C2 50%, #D4BBDD 100%)'
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-amiri text-3xl md:text-4xl font-bold text-dark-plum mb-4">
            كلام من القلب
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold-accent" />
            <Heart className="w-5 h-5 text-deep-rose" fill="currentColor" />
            <div className="w-16 h-px bg-gold-accent" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className={`glass-card p-8 text-center transition-all duration-700 hover:-translate-y-2 hover:shadow-xl ${
                visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                border: '1px solid rgba(212, 168, 83, 0.3)',
              }}
            >
              <div className="flex justify-center mb-4">
                <Star className="w-8 h-8 text-gold-accent" fill="currentColor" />
              </div>

              <p className="font-amiri text-xl text-dark-plum leading-relaxed mb-6">
                "{quote.text}"
              </p>

              <div className="w-16 h-0.5 bg-gold-accent mx-auto mb-4" />

              <p className="font-vibes text-2xl text-deep-rose">
                {quote.author}
              </p>

              <div className="flex justify-center gap-1 mt-4">
                {[...Array(3)].map((_, i) => (
                  <Heart
                    key={i}
                    className="w-3 h-3 text-deep-rose/40"
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />
    </section>
  )
}
