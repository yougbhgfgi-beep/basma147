import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import { Heart } from 'lucide-react'
import LoadingScreen from './pages/LoadingScreen'
import Login from './pages/Login'
import Envelope from './pages/Envelope'
import Home from './pages/Home'
import AudioPlayer from './components/AudioPlayer'

function PageTransition({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false)
  const location = useLocation()

  useEffect(() => {
    document.body.style.opacity = '1'
    document.body.style.transition = ''
    setVisible(false)
    const timer = setTimeout(() => setVisible(true), 50)
    window.scrollTo(0, 0)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div
      className={`transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
    >
      {children}
    </div>
  )
}

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {[...Array(6)].map((_, i) => (
        <Heart
          key={i}
          className="absolute text-deep-rose/8 animate-float"
          style={{
            left: `${8 + i * 16}%`,
            top: `${10 + (i % 3) * 28}%`,
            width: `${20 + i * 5}px`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i * 0.5}s`,
          }}
          fill="currentColor"
        />
      ))}
    </div>
  )
}

export default function App() {
  return (
    <>
      <AudioPlayer />
      <FloatingHearts />
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<PageTransition><LoadingScreen /></PageTransition>} />
          <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
          <Route path="/envelope" element={<PageTransition><Envelope /></PageTransition>} />
          <Route path="/home" element={<PageTransition><Home /></PageTransition>} />
        </Routes>
      </div>
    </>
  )
}
