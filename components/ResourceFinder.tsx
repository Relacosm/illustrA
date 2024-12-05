'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Loader2 } from 'lucide-react'

interface Resource {
  title: string;
  url: string;
  type: 'documentation' | 'video' | 'tutorial';
}

interface ResourceFinderProps {
  code: string;
}

export default function ResourceFinder({ code }: ResourceFinderProps) {
  const [resources, setResources] = useState<Resource[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const findResources = async () => {
    setIsLoading(true)
    setError('')
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))

      const keywords = code.toLowerCase().match(/\b(\w+)\b/g) || []

      const mockResources: Resource[] = [
        { title: "JavaScript MDN Documentation", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", type: "documentation" },
        { title: "React Official Documentation", url: "https://reactjs.org/docs/getting-started.html", type: "documentation" },
        { title: "JavaScript Crash Course", url: "https://www.youtube.com/watch?v=hdI2bqOjy3c", type: "video" },
        { title: "React Tutorial for Beginners", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0", type: "video" },
        { title: "Node.js Tutorial", url: "https://nodejs.dev/learn", type: "tutorial" },
      ]

      const filteredResources = mockResources.filter(resource => 
        keywords.some(keyword => resource.title.toLowerCase().includes(keyword))
      )

      setResources(filteredResources)
    } catch (err) {
      setError('Failed to fetch resources. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (code.trim()) {
      findResources()
    } else {
      setResources([])
    }
  }, [code])

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">Related Resources</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-4">
            <Loader2 className="mr-2 h-6 w-6 animate-spin text-indigo-600 dark:text-indigo-400" />
            <span className="text-lg text-indigo-600 dark:text-indigo-400">Finding resources...</span>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : resources.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-600 dark:text-indigo-400">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Type: {resource.type}</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">View Resource</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-300">No resources found. Try pasting some code in the editor above.</p>
        )}
      </CardContent>
    </Card>
  )
}

