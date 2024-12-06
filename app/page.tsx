'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import PaintCanvas from './components/PaintCanvas'
import ControlPanel from './components/ControlPanel'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function EnhancedArtGenerator() {
  const [brushSize, setBrushSize] = useState(10)
  const [eraserSize, setEraserSize] = useState(20)
  const [color, setColor] = useState('#6d28d9')
  const [mode, setMode] = useState('normal')
  const [artParams, setArtParams] = useState({
    complexity: 5,
    symmetry: 6,
    colorfulness: 50,
    layers: 3,
    curvature: 5,
    density: 50
  })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleSave = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'enhanced-art.png'
      link.href = canvasRef.current.toDataURL()
      link.click()
    }
  }

  const handleGenerateArt = (type: string) => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        
        switch (type) {
          case 'fractal':
            generateFractal(ctx, canvasRef.current.width / 2, canvasRef.current.height / 2, 200, 0)
            break
          case 'mandala':
            generateMandala(ctx, canvasRef.current.width / 2, canvasRef.current.height / 2, 200)
            break
          case 'abstract':
            generateAbstract(ctx, canvasRef.current.width, canvasRef.current.height)
            break
          case 'tessellation':
            generateTessellation(ctx, canvasRef.current.width, canvasRef.current.height)
            break
          case 'spirograph':
            generateSpirograph(ctx, canvasRef.current.width / 2, canvasRef.current.height / 2, 180)
            break
          case 'landscape':
            generateLandscape(ctx, canvasRef.current.width, canvasRef.current.height)
            break
        }
      }
    }
  }

  const generateFractal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, angle: number) => {
    if (size < 1) return

    const hue = (angle / (Math.PI * 2)) * 360
    ctx.strokeStyle = `hsl(${hue}, ${artParams.colorfulness}%, 50%)`
    ctx.lineWidth = Math.max(1, (artParams.complexity / 10) * (size / 200))

    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + size * Math.cos(angle), y + size * Math.sin(angle))
    ctx.stroke()

    const branchFactor = 0.8 - (artParams.complexity / 20)
    const angleChange = Math.PI / artParams.symmetry

    generateFractal(ctx, x + size * Math.cos(angle), y + size * Math.sin(angle), size * branchFactor, angle + angleChange)
    generateFractal(ctx, x + size * Math.cos(angle), y + size * Math.sin(angle), size * branchFactor, angle - angleChange)
  }

  const generateMandala = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) => {
    const numPetals = artParams.symmetry * 2
    for (let i = 0; i < numPetals; i++) {
      const angle = (i / numPetals) * Math.PI * 2
      const hue = (i / numPetals) * 360
      ctx.strokeStyle = `hsl(${hue}, ${artParams.colorfulness}%, 50%)`
      ctx.lineWidth = Math.max(1, (artParams.complexity / 5) * (radius / 200))

      ctx.beginPath()
      ctx.moveTo(x, y)
      const controlRadius = radius * (0.5 + artParams.complexity / 20)
      ctx.quadraticCurveTo(
        x + controlRadius * Math.cos(angle),
        y + controlRadius * Math.sin(angle),
        x + radius * Math.cos(angle + Math.PI / numPetals),
        y + radius * Math.sin(angle + Math.PI / numPetals)
      )
      ctx.stroke()
    }
  }

  const generateAbstract = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const numShapes = artParams.complexity * 5
    const maxSize = Math.min(width, height) * 0.2
    for (let i = 0; i < numShapes; i++) {
      const hue = (i / numShapes) * 360
      ctx.fillStyle = `hsla(${hue}, ${artParams.colorfulness}%, 50%, 0.5)`
      ctx.strokeStyle = `hsl(${(hue + 180) % 360}, ${artParams.colorfulness}%, 50%)`
      ctx.lineWidth = 2

      const x = Math.random() * width
      const y = Math.random() * height
      const size = Math.random() * maxSize * (artParams.symmetry / 6)

      ctx.beginPath()
      if (Math.random() < 0.5) {
        ctx.arc(x, y, size, 0, Math.PI * 2)
      } else {
        ctx.rect(x - size / 2, y - size / 2, size, size)
      }
      ctx.fill()
      ctx.stroke()
    }
  }

  const generateTessellation = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const tileSize = Math.min(width, height) / artParams.complexity
    const numTilesX = Math.ceil(width / tileSize)
    const numTilesY = Math.ceil(height / tileSize)

    for (let x = 0; x < numTilesX; x++) {
      for (let y = 0; y < numTilesY; y++) {
        const hue = (x + y) * (360 / (numTilesX + numTilesY))
        ctx.fillStyle = `hsl(${hue}, ${artParams.colorfulness}%, 50%)`

        ctx.beginPath()
        ctx.moveTo(x * tileSize, y * tileSize)
        ctx.lineTo((x + 1) * tileSize, y * tileSize)
        ctx.lineTo((x + 0.5) * tileSize, (y + 1) * tileSize)
        ctx.closePath()
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo((x + 0.5) * tileSize, y * tileSize)
        ctx.lineTo((x + 1) * tileSize, (y + 1) * tileSize)
        ctx.lineTo(x * tileSize, (y + 1) * tileSize)
        ctx.closePath()
        ctx.fillStyle = `hsl(${(hue + 180) % 360}, ${artParams.colorfulness}%, 50%)`
        ctx.fill()
      }
    }
  }

  const generateSpirograph = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number) => {
    const innerRadius = radius * (artParams.complexity / 10)
    const offset = radius * (artParams.symmetry / 12)
    const numRotations = 100 * (artParams.density / 50)

    ctx.beginPath()
    for (let t = 0; t <= Math.PI * 2 * numRotations; t += 0.01) {
      const x = centerX + (radius - innerRadius) * Math.cos(t) + offset * Math.cos((radius - innerRadius) / innerRadius * t)
      const y = centerY + (radius - innerRadius) * Math.sin(t) - offset * Math.sin((radius - innerRadius) / innerRadius * t)

      if (t === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.strokeStyle = `hsl(${artParams.colorfulness * 3.6}, 100%, 50%)`
    ctx.lineWidth = 2 * (radius / 200)
    ctx.stroke()
  }

  const generateLandscape = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Sky
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, `hsl(200, ${artParams.colorfulness}%, 70%)`)
    gradient.addColorStop(1, `hsl(200, ${artParams.colorfulness}%, 90%)`)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Sun
    ctx.beginPath()
    ctx.arc(width * 0.8, height * 0.2, Math.min(width, height) * 0.1, 0, Math.PI * 2)
    ctx.fillStyle = `hsl(40, ${artParams.colorfulness}%, 70%)`
    ctx.fill()

    // Mountains
    for (let i = 0; i < artParams.layers; i++) {
      const mountainHeight = height * (0.3 + (i * 0.2))
      ctx.beginPath()
      ctx.moveTo(0, height)

      for (let x = 0; x <= width; x += width / 40) {
        const y = height - mountainHeight + Math.sin(x * 0.01 * artParams.curvature) * (height * 0.1) + Math.random() * (height * 0.05)
        ctx.lineTo(x, y)
      }

      ctx.lineTo(width, height)
      ctx.closePath()

      const shade = 40 + (i * 20)
      ctx.fillStyle = `hsl(100, ${artParams.colorfulness}%, ${shade}%)`
      ctx.fill()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto bg-white rounded-xl shadow-2xl p-8"
      >
        <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">illustrA</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            <Tabs defaultValue="canvas" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="canvas">Canvas</TabsTrigger>
                <TabsTrigger value="generated">Generated Art</TabsTrigger>
              </TabsList>
              <TabsContent value="canvas">
                <PaintCanvas
                  ref={canvasRef}
                  brushSize={brushSize}
                  eraserSize={eraserSize}
                  color={color}
                  mode={mode}
                />
              </TabsContent>
              <TabsContent value="generated">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="w-full h-auto border border-gray-300 rounded-lg"
                />
              </TabsContent>
            </Tabs>
          </div>
          <div className="w-full lg:w-1/3">
            <ControlPanel
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
              eraserSize={eraserSize}
              onEraserSizeChange={setEraserSize}
              color={color}
              onColorChange={setColor}
              mode={mode}
              onModeChange={setMode}
              artParams={artParams}
              onArtParamsChange={setArtParams}
              onGenerateArt={handleGenerateArt}
            />
            <Button onClick={handleSave} className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
              Save Artwork
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

