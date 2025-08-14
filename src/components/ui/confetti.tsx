"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ConfettiProps {
  active: boolean
  onComplete?: () => void
}

export function Confetti({ active, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    rotation: number
    color: string
    size: number
    velocityX: number
    velocityY: number
  }>>([])

  useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4,
      velocityX: (Math.random() - 0.5) * 4,
      velocityY: Math.random() * 3 + 2
    }))

    setParticles(newParticles)

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.velocityX,
        y: particle.y + particle.velocityY,
        rotation: particle.rotation + 5,
        velocityY: particle.velocityY + 0.1
      })).filter(particle => particle.y < window.innerHeight + 50))
    }

    const interval = setInterval(animateParticles, 16)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setParticles([])
      onComplete?.()
    }, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [active, onComplete])

  if (!active || particles.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
    </div>
  )
}

interface CelebrationToastProps {
  title: string
  message: string
  show: boolean
  onClose: () => void
  icon?: React.ReactNode
}

export function CelebrationToast({ title, message, show, onClose, icon }: CelebrationToastProps) {
  useEffect(() => {
    if (show) {
      const timeout = setTimeout(onClose, 4000)
      return () => clearTimeout(timeout)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-start space-x-3">
          {icon && (
            <div className="flex-shrink-0">
              {icon}
            </div>
          )}
          <div className="flex-1">
            <h3 className="font-bold text-sm">{title}</h3>
            <p className="text-sm opacity-90 mt-1">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}
