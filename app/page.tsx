'use client'

import { useState, useEffect } from 'react'
import CodeEditor from '../components/CodeEditor'
import ResourceFinder from '../components/ResourceFinder'
import SyntaxHighlighter from '../components/SyntaxHighlighter'
import { Button } from "@/components/ui/button"
import { Moon, Sun, Share2 } from 'lucide-react'
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  const [code, setCode] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const sharedCode = params.get('code')
    if (sharedCode) {
      setCode(decodeURIComponent(sharedCode))
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const shareCode = () => {
    const url = `${window.location.origin}${window.location.pathname}?code=${encodeURIComponent(code)}`
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link Copied!",
        description: "Share this link to show your code snippet to others.",
      })
    }, () => {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy the URL manually.",
        variant: "destructive",
      })
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-indigo-950 ${isDarkMode ? 'dark' : ''}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-indigo-800 dark:text-indigo-300">Code Snippet Resource Finder</h1>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={shareCode}>
              <Share2 className="h-[1.2rem] w-[1.2rem]" />
            </Button>
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <CodeEditor onCodeChange={setCode} initialCode={code} />
          </div>
          <div>
            <SyntaxHighlighter code={code} />
          </div>
        </div>
        <ResourceFinder code={code} />
      </div>
      <Toaster />
    </div>
  )
}

