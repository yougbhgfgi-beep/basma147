import { useState, useEffect } from 'react'
import { Heart, ChevronUp } from 'lucide-react'
import HeroSection from '../sections/HeroSection'
import PhotoAlbum from '../sections/PhotoAlbum'
import RomanticQuotes from '../sections/RomanticQuotes'
import LoveGame from '../sections/LoveGame'
import VideoSection from '../sections/VideoSection'
import RingFinale from '../sections/RingFinale'
import Footer from '../sections/Footer'
import TimeCounter from '../components/TimeCounter'

const loveMessages = [
  'أنتِ حب عمري و ضحكة قلبي ❤️',
  'كل لحظة معاكِ بتسوى دنيتي كلها',
  'بحبك قد السماء و كل النجوم',
  'عيونك هي دنيتي اللي بعيش فيها',
  'أنتِ أجمل قصة حب في العالم',
  'نبضي مش لغيرك أبداً',
  'أنتِ الأمان و الشوق و كل حاجة',
  'حبي ليكي مش هينتهي أبداً',
]

function LoveNotification() {
  const [msg, setMsg] = useState('')
  const [show, setShow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsg(loveMessages[Math.floor(Math.random() * loveMessages.length)])
      setShow(true)
      setTimeout(() => setShow(false), 4000)
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  if (!show) return null

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] animate-fade-in-up">
      <div
        className="px-6 py-3 rounded-2xl text-center shadow-xl"
        style={{
          background: 'rgba(255, 248, 245, 0.95)',
          border: '1px solid rgba(212, 168, 83, 0.4)',
          boxShadow: '0 8px 32px rgba(212, 168, 83, 0.2)',
        }}
      >
        <p className="font-amiri text-base md:text-lg text-dark-plum">{msg}</p>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 md:bottom-8 left-6 md:left-8 z-50 p-2.5 md:p-3 rounded-full bg-gradient-to-r from-deep-rose to-gold-accent text-white shadow-lg transition-all duration-300 ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      } hover:scale-110`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      aria-label="العودة للأعلى"
    >
      <ChevronUp className="w-5 h-5 md:w-6 md:h-6" />
    </button>
  )
}

function NavDots() {
  const [active, setActive] = useState(0)
  const sections = ['hero', 'photo-album', 'quotes', 'game', 'video', 'finale']

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActive(sections.indexOf(id))
          }
        },
        { threshold: 0.3 }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="fixed right-3 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3">
      {sections.map((id, i) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${
            i === active ? 'bg-gold-accent scale-125' : 'bg-warm-cream/30 hover:bg-warm-cream/60'
          }`}
          aria-label={`الذهاب إلى القسم ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-cream" dir="rtl">
      <NavDots />
      <LoveNotification />
      <HeroSection />
      <PhotoAlbum />
      <RomanticQuotes />
      <LoveGame />
      <VideoSection />
      <TimeCounter />
      <RingFinale />
      <Footer />
      <ScrollToTop />
    </div>
  )
}
