import { useState, useEffect, useRef } from 'react'
import { Heart, Play, Pause } from 'lucide-react'

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <section
      id="video"
      ref={sectionRef}
      className="py-20 px-4 md:px-8 relative bg-warm-cream"
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className={`max-w-4xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-10">
          <h2 className="font-amiri text-3xl md:text-4xl font-bold text-dark-plum mb-4">
            لحظاتنا
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gold-accent" />
            <Heart className="w-5 h-5 text-deep-rose" fill="currentColor" />
            <div className="w-16 h-px bg-gold-accent" />
          </div>
        </div>

        <div
          className="relative rounded-2xl overflow-hidden mx-auto"
          style={{
            maxWidth: '1000px',
            border: '3px solid #D4A853',
            boxShadow: '0 8px 32px rgba(212, 168, 83, 0.3)'
          }}
        >
          <div className="relative flex items-center justify-center bg-dark-plum/5">
            <video
              ref={videoRef}
              src={`${import.meta.env.BASE_URL}video.mp4`}
              className="w-full h-auto max-h-[75vh] object-contain cursor-pointer"
              loop
              playsInline
              onClick={togglePlay}
            />

            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute z-10 w-20 h-20 rounded-full bg-dark-plum/60 backdrop-blur-sm flex items-center justify-center hover:bg-dark-plum/80 transition-all hover:scale-110"
                style={{ border: '2px solid rgba(212, 168, 83, 0.5)' }}
              >
                <Play className="w-8 h-8 text-warm-cream mr-1" fill="currentColor" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />
    </section>
  )
}
