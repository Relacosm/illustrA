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

    const getCoordinates = (e: MouseEvent | TouchEvent): [number, number] => {
      const rect = canvas.getBoundingClientRect()
      const scaleX = canvas.width / rect.width
      const scaleY = canvas.height / rect.height

      if (e instanceof MouseEvent) {
        return [
          (e.clientX - rect.left) * scaleX,
          (e.clientY - rect.top) * scaleY
        ]
      } else {
        const touch = e.touches[0]
        return [
          (touch.clientX - rect.left) * scaleX,
          (touch.clientY - rect.top) * scaleY
        ]
      }
    }

    const startDrawing = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true
      ;[lastX.current, lastY.current] = getCoordinates(e)
    }

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return
      e.preventDefault()

      const [x, y] = getCoordinates(e)
      const speed = Math.sqrt(Math.pow(x - lastX.current, 2) + Math.pow(y - lastY.current, 2))
      lastSpeed.current = speed

      drawLine(ctx, lastX.current, lastY.current, x, y)
      ;[lastX.current, lastY.current] = [x, y]
    }

    const stopDrawing = () => {
      isDrawing.current = false
    }

    canvas.addEventListener('mousedown', startDrawing)
    canvas.addEventListener('mousemove', draw)
    canvas.addEventListener('mouseup', stopDrawing)
    canvas.addEventListener('mouseout', stopDrawing)

    canvas.addEventListener('touchstart', startDrawing)
    canvas.addEventListener('touchmove', draw)
    canvas.addEventListener('touchend', stopDrawing)

    return () => {
      canvas.removeEventListener('mousedown', startDrawing)
      canvas.removeEventListener('mousemove', draw)
      canvas.removeEventListener('mouseup', stopDrawing)
      canvas.removeEventListener('mouseout', stopDrawing)
      canvas.removeEventListener('touchstart', startDrawing)
      canvas.removeEventListener('touchmove', draw)
      canvas.removeEventListener('touchend', stopDrawing)
    }
  }, [brushSize, eraserSize, color, mode])

  const drawLine = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
    ctx.beginPath()
    ctx.moveTo(x1, y1)

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
    ctx.lineJoin = 'round'
    ctx.lineTo(x2, y2)
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
      style={{ touchAction: 'none' }}
      className="w-full h-auto border border-gray-300 rounded-lg shadow-md"
    />
  )
})

PaintCanvas.displayName = 'PaintCanvas'

export default PaintCanvas

