import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="py-8 text-center relative"
      style={{ background: '#4A2C3F' }}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-accent to-transparent" />

      <div className="flex items-center justify-center gap-2">
        <p className="font-cairo text-gold-accent">
          صنع بحب
        </p>
        <Heart className="w-4 h-4 text-deep-rose animate-heartbeat" fill="currentColor" />
        <p className="font-cairo text-gold-accent/70 text-sm">
          2025
        </p>
      </div>
    </footer>
  )
}
