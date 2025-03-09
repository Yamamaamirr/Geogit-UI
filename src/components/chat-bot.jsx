'use client'

import React, { useState } from 'react'
import { MessageSquare, Send, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I can help you navigate the map. What would you like to know?", isBot: true }
  ])
  const [inputValue, setInputValue] = useState('')

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    const newUserMessage = { id: Date.now(), text: inputValue, isBot: false }
    setMessages([...messages, newUserMessage])
    setInputValue('')

    // Simulate bot response
    setTimeout(() => {
      const botResponse = { 
        id: Date.now() + 1, 
        text: "I'm your map assistant. I can help you find locations and navigate the interface.", 
        isBot: true 
      }
      setMessages(prev => [...prev, botResponse])
    }, 1000)
  }

  return (
    <div className="absolute bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="flex h-96 w-80 flex-col rounded-lg border border-gray-200 bg-white shadow-lg">
          {/* Chat header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-3">
            <h3 className="font-medium">Map Assistant</h3>
            <Button variant="ghost" size="icon" onClick={toggleChat}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-3">
            <div className="flex flex-col gap-3">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`max-w-[80%] rounded-lg p-2 ${
                    message.isBot 
                      ? 'bg-gray-100 text-black self-start' 
                      : 'bg-black text-white self-end'
                  }`}
                >
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 p-3">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit" size="icon" className="bg-black text-white hover:bg-gray-800">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <Button 
          onClick={toggleChat} 
          size="icon" 
          className="h-12 w-12 rounded-full bg-black text-white shadow-lg hover:bg-gray-800"
        >
          <MessageSquare className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  )
}

