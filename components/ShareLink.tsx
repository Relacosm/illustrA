'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ShareLink() {
  const [shareLink, setShareLink] = useState('')

  const generateShareLink = () => {
    // In a real application, this would generate a unique link
    const uniqueId = Math.random().toString(36).substring(7)
    setShareLink(`https://yourwebsite.com/share/${uniqueId}`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink)
    alert('Link copied to clipboard!')
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Share Your Video</h2>
      <Button onClick={generateShareLink} className="mb-2">Generate Share Link</Button>
      {shareLink && (
        <div className="flex gap-2">
          <Input value={shareLink} readOnly />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      )}
    </div>
  )
}

