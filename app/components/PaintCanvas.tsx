'use client'

import { useEffect, useRef, forwardRef, ForwardedRef } from 'react'

interface PaintCanvasProps {
  brushSize: number
  eraserSize: number
  color: string
  mode: string
}

const PaintCanvas = forwardRef(({ brushSize, eraserSize, color, mode }: PaintCanvasProps, ref: ForwardedRef<HTMLCanvasElement>) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const isDrawing = useRef(false)
  const lastX = useRef(0)
  const lastY = useRef(0)
  const lastSpeed = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const handleMouseDown = (e: MouseEvent) => {
      isDrawing.current = true
      ;[lastX.current, lastY.current] = [e.offsetX, e.offsetY]
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing.current) return

      const x = e.offsetX
      const y = e.offsetY
      const speed = Math.sqrt(Math.pow(x - lastX.current, 2) + Math.pow(y - lastY.current, 2))
      lastSpeed.current = speed

      draw(ctx, x, y)
      ;[lastX.current, lastY.current] = [x, y]
    }

    const handleMouseUp = () => {
      isDrawing.current = false
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseup', handleMouseUp)
    }
  }, [brushSize, eraserSize, color, mode])

  const draw = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.beginPath()
    ctx.moveTo(lastX.current, lastY.current)

    if (mode === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out'
      ctx.strokeStyle = 'rgba(255,255,255,1)'
      ctx.lineWidth = eraserSize
    } else {
      ctx.globalCompositeOperation = 'source-over'
      ctx.lineWidth = brushSize
      if (mode === 'normal') {
        ctx.strokeStyle = color
      } else if (mode === 'speed') {
        const hue = (lastSpeed.current * 2) % 360
        ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
      }
    }

    ctx.lineCap = 'round'
    ctx.lineTo(x, y)
    ctx.stroke()
  }

  return (
    <canvas
      ref={(node) => {
        canvasRef.current = node
        if (typeof ref === 'function') {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
      }}
      width={800}
      height={600}
      className="w-full h-auto border border-gray-300 rounded-lg shadow-md"
    />
  )
})

PaintCanvas.displayName = 'PaintCanvas'

export default PaintCanvas

