'use client'

import { useState, useEffect } from 'react'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

interface CodeEditorProps {
  onCodeChange: (code: string) => void;
  initialCode?: string;
}

export default function CodeEditor({ onCodeChange, initialCode = '' }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)

  useEffect(() => {
    setCode(initialCode)
  }, [initialCode])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value
    setCode(newCode)
    onCodeChange(newCode)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <Label htmlFor="code-input" className="text-xl font-semibold mb-2 text-indigo-700 dark:text-indigo-300">Paste Your Code Snippet</Label>
        <Textarea
          id="code-input"
          className="font-mono mt-2 bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          value={code}
          onChange={handleCodeChange}
          placeholder="Paste your code here..."
          rows={15}
        />
      </CardContent>
    </Card>
  )
}

