"use client"

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Bill {
  id: number;
  left: number;
  top: number;
  velocityX: number;
  velocityY: number;
  rotation: number;
  swayFactor: number;
  scale: number;
}

const MoneyRain = () => {
  const [bills, setBills] = useState<Bill[]>([])
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  const createBill = useCallback((): Bill => ({
    id: Math.random(),
    left: Math.random() * 100,
    top: Math.random() * 100,
    velocityX: 0,
    velocityY: 0,
    rotation: Math.random() * 360,
    swayFactor: Math.random() * 2 - 1,
    scale: 1,
  }), [])

  useEffect(() => {
    const billCount = Math.min(50, Math.floor((window.innerWidth * window.innerHeight) / 20000))
    setBills(Array.from({ length: billCount }, createBill))

    const interval = setInterval(() => {
      setBills((prevBills) => [...prevBills.slice(-billCount + 1), createBill()])
    }, 1000)

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      clearInterval(interval)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [createBill])

  const updateBills = useCallback(() => {
    if (!containerRef.current) return

    const { width, height } = containerRef.current.getBoundingClientRect()

    setBills((prevBills) =>
      prevBills.map((bill) => {
        const billX = (bill.left / 100) * width
        const billY = (bill.top / 100) * height
        const dx = mousePos.x - billX
        const dy = mousePos.y - billY
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          const angle = Math.atan2(dy, dx)
          const force = (200 - distance) / 2000
          bill.velocityX -= Math.cos(angle) * force * 2
          bill.velocityY -= Math.sin(angle) * force * 2
          bill.rotation += (Math.random() - 0.5) * 20
          bill.scale = 1.2
        } else {
          bill.scale = Math.max(1, bill.scale - 0.05)
        }
        
        bill.velocityX *= 0.95
        bill.velocityY *= 0.95
        
        bill.velocityX += Math.sin(Date.now() / 1000 + bill.swayFactor) * 0.0005
        bill.velocityY += Math.cos(Date.now() / 1000 + bill.swayFactor) * 0.0005
        
        let newLeft = bill.left + (bill.velocityX / width) * 100
        let newTop = bill.top + (bill.velocityY / height) * 100
        
        if (newLeft < -5) newLeft = 105
        if (newLeft > 105) newLeft = -5
        if (newTop < -5) newTop = 105
        if (newTop > 105) newTop = -5
        
        return {
          ...bill,
          left: newLeft,
          top: newTop,
          rotation: (bill.rotation + bill.velocityX * 20) % 360,
        }
      })
    )
  }, [mousePos])

  useEffect(() => {
    const animate = () => {
      updateBills()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [updateBills])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {bills.map((bill) => (
        <div
          key={bill.id}
          className="absolute"
          style={{
            left: `${bill.left}%`,
            top: `${bill.top}%`,
            transform: `rotate(${bill.rotation}deg) scale(${bill.scale})`,
            transition: 'transform 0.1s linear',
          }}
        >
          <Image
            src="/bill.png"
            alt=""
            width={100}
            height={50}
            className="w-auto h-auto max-w-[75px] opacity-75"
          />
        </div>
      ))}
    </div>
  )
}

export default MoneyRain