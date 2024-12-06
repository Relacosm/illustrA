import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface ControlPanelProps {
  brushSize: number
  onBrushSizeChange: (value: number) => void
  eraserSize: number
  onEraserSizeChange: (value: number) => void
  color: string
  onColorChange: (value: string) => void
  mode: string
  onModeChange: (value: string) => void
  artParams: {
    complexity: number
    symmetry: number
    colorfulness: number
    layers: number
    curvature: number
    density: number
  }
  onArtParamsChange: (params: any) => void
  onGenerateArt: (type: string) => void
}

export default function ControlPanel({
  brushSize,
  onBrushSizeChange,
  eraserSize,
  onEraserSizeChange,
  color,
  onColorChange,
  mode,
  onModeChange,
  artParams,
  onArtParamsChange,
  onGenerateArt,
}: ControlPanelProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="drawing">
        <AccordionTrigger>Drawing Controls</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="brush-size">Brush Size</Label>
              <Slider
                id="brush-size"
                min={1}
                max={50}
                step={1}
                value={[brushSize]}
                onValueChange={(value) => onBrushSizeChange(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="eraser-size">Eraser Size</Label>
              <Slider
                id="eraser-size"
                min={1}
                max={50}
                step={1}
                value={[eraserSize]}
                onValueChange={(value) => onEraserSizeChange(value[0])}
              />
            </div>
            <div>
              <Label htmlFor="color">Color</Label>
              <input
                id="color"
                type="color"
                value={color}
                onChange={(e) => onColorChange(e.target.value)}
                className="w-full h-10 rounded-md"
              />
            </div>
            <div>
              <Label>Mode</Label>
              <RadioGroup value={mode} onValueChange={onModeChange}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Normal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="speed" id="speed" />
                  <Label htmlFor="speed">Speed</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="eraser" id="eraser" />
                  <Label htmlFor="eraser">Eraser</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="art-params">
        <AccordionTrigger>Art Parameters</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="complexity">Complexity</Label>
              <Slider
                id="complexity"
                min={1}
                max={10}
                step={1}
                value={[artParams.complexity]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, complexity: value[0] })}
              />
            </div>
            <div>
              <Label htmlFor="symmetry">Symmetry</Label>
              <Slider
                id="symmetry"
                min={2}
                max={12}
                step={1}
                value={[artParams.symmetry]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, symmetry: value[0] })}
              />
            </div>
            <div>
              <Label htmlFor="colorfulness">Colorfulness</Label>
              <Slider
                id="colorfulness"
                min={0}
                max={100}
                step={1}
                value={[artParams.colorfulness]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, colorfulness: value[0] })}
              />
            </div>
            <div>
              <Label htmlFor="layers">Layers</Label>
              <Slider
                id="layers"
                min={1}
                max={5}
                step={1}
                value={[artParams.layers]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, layers: value[0] })}
              />
            </div>
            <div>
              <Label htmlFor="curvature">Curvature</Label>
              <Slider
                id="curvature"
                min={1}
                max={10}
                step={1}
                value={[artParams.curvature]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, curvature: value[0] })}
              />
            </div>
            <div>
              <Label htmlFor="density">Density</Label>
              <Slider
                id="density"
                min={10}
                max={100}
                step={1}
                value={[artParams.density]}
                onValueChange={(value) => onArtParamsChange({ ...artParams, density: value[0] })}
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="generate">
        <AccordionTrigger>Generate Art</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            <Button onClick={() => onGenerateArt('fractal')} className="w-full">
              Generate Fractal
            </Button>
            <Button onClick={() => onGenerateArt('mandala')} className="w-full">
              Generate Mandala
            </Button>
            <Button onClick={() => onGenerateArt('abstract')} className="w-full">
              Generate Abstract
            </Button>
            <Button onClick={() => onGenerateArt('tessellation')} className="w-full">
              Generate Tessellation
            </Button>
            <Button onClick={() => onGenerateArt('spirograph')} className="w-full">
              Generate Spirograph
            </Button>
            <Button onClick={() => onGenerateArt('landscape')} className="w-full">
              Generate Landscape
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

