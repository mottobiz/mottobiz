import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
      }
    }

    const enterHover = (e: MouseEvent) => {
      if ((e.target as Element).closest('a, button, [data-hover]')) setIsHovering(true)
    }
    // Fix: check if we're entering another interactive element before clearing hover state
    const leaveHover = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null
      const stillOverInteractive =
        related?.closest?.('a, button, [data-hover]') ?? false
      if (!stillOverInteractive) setIsHovering(false)
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', enterHover)
    document.addEventListener('mouseout', leaveHover)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', enterHover)
      document.removeEventListener('mouseout', leaveHover)
    }
  }, [])

  return (
    <>
      <div
        aria-hidden="true"
        role="presentation"
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          width: 40, height: 40, borderRadius: '50%',
          background: isHovering
            ? 'radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%)',
          // Include transform in the inline transition so it eases smoothly
          transition: 'transform 80ms ease-out, background 0.3s ease',
        }}
      />
      <div
        aria-hidden="true"
        role="presentation"
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          width: isHovering ? 16 : 12, height: isHovering ? 16 : 12, borderRadius: '50%',
          background: isHovering ? '#f59e0b' : '#6366f1',
          // Include transform so the smooth position updates ease
          transition: 'transform 40ms ease-out, width 0.2s, height 0.2s, background 0.2s',
          mixBlendMode: 'screen',
        }}
      />
    </>
  )
}

export function AnimatedBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      ref.current.style.background = `
        radial-gradient(ellipse 50% 40% at ${x}% ${y}%, rgba(99,102,241,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 35% 30% at ${100 - x}% ${100 - y}%, rgba(245,158,11,0.05) 0%, transparent 60%),
        #0a0a0b
      `
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      aria-hidden="true"
      role="presentation"
      ref={ref}
      className="fixed inset-0 z-0 pointer-events-none transition-[background] duration-500"
      style={{ background: '#0a0a0b' }}
    />
  )
}

export function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 500, height: 500, top: '-15%', right: '-10%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 400, height: 400, bottom: '5%', left: '-10%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{ y: [0, 30, 0], x: [0, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />
    </div>
  )
}