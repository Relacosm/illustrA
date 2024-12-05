'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SyntaxHighlighterProps {
  code: string;
}

export default function CodeSyntaxHighlighter({ code }: SyntaxHighlighterProps) {
  const [language, setLanguage] = useState('javascript')
  const [theme, setTheme] = useState(solarizedlight)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark')
    setTheme(isDarkMode ? tomorrow : solarizedlight)
  }, [])

  const handleLanguageChange = (value: string) => {
    setLanguage(value)
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <Label htmlFor="language-select" className="text-indigo-700 dark:text-indigo-300">Language</Label>
          <Select onValueChange={handleLanguageChange} defaultValue={language}>
            <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-indigo-200 dark:border-indigo-700">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="csharp">C#</SelectItem>
              <SelectItem value="php">PHP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="max-h-[400px] overflow-auto">
          <SyntaxHighlighter 
            language={language}
            style={theme}
            customStyle={{
              margin: 0,
              borderRadius: '0.5rem',
            }}
          >
            {code || '// Paste your code here'}
          </SyntaxHighlighter>
        </div>
      </CardContent>
    </Card>
  )
}

