"use client"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Send, X, Paperclip, Smile, ChevronDown, MoreHorizontal, Image, MapPin } from "lucide-react"

const ChatBot = ({ isOpen, toggleChat }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your map assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: input,
      isBot: false,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages([...messages, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate typing indicator
    const typingMessage = { id: "typing", isTyping: true, isBot: true }
    setMessages((prev) => [...prev, typingMessage])

    // Send user input to backend (placeholder)
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })
      const data = await response.json()

      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"))

      // Add bot response
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error fetching bot response:", error)
      setMessages((prev) => prev.filter((msg) => msg.id !== "typing"))
      const botMessage = {
        id: Date.now() + 1,
        text: "Sorry, something went wrong. Please try again.",
        isBot: true,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed right-6 bottom-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 z-50"
          aria-label="Open chat"
        >
          <MessageSquare size={22} />
        </button>
      )}

      {/* Chat sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-96 bg-white text-black shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        {/* Chat header */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mr-3 shadow-inner">
              <MessageSquare size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-medium">Map Assistant</h3>
              <div className="text-xs text-gray-300 flex items-center">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1.5"></span>
                Online now
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button className="hover:bg-gray-800 p-1.5 rounded-full transition-colors" aria-label="Chat options">
              <MoreHorizontal size={16} />
            </button>
            <button className="hover:bg-gray-800 p-1.5 rounded-full transition-colors" aria-label="Minimize chat">
              <ChevronDown size={16} />
            </button>
            <button
              onClick={toggleChat}
              className="hover:bg-gray-800 p-1.5 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 h-[calc(100vh-136px)]">
          <div className="text-xs text-center text-gray-500 my-2">Today</div>

          {messages.map((message) =>
            message.isTyping ? (
              <div
                key="typing"
                className="flex items-center space-x-2 p-3 rounded-2xl bg-gray-100 text-black max-w-[80%] animate-fadeIn"
              >
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="h-2 w-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            ) : (
              <div key={message.id} className={`flex flex-col ${message.isBot ? "" : "items-end"}`}>
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] shadow-sm ${
                    message.isBot
                      ? "bg-white text-black rounded-tl-none border border-gray-100"
                      : "bg-black text-white rounded-tr-none"
                  }`}
                >
                  {message.text}
                </div>
                <div className="text-xs text-gray-400 mt-1 px-1">{message.timestamp}</div>
              </div>
            ),
          )}

          {isLoading && (
            <div className="flex items-center space-x-2 p-3 rounded-2xl bg-gray-100 text-black max-w-[80%] animate-fadeIn">
              <span className="text-sm">...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Chat input */}
        <div className="border-t border-gray-100 bg-white p-3">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-100">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm"
              />

              <button
                type="button"
                className="p-1.5 rounded-full hover:bg-gray-200 transition-colors text-gray-500"
                aria-label="Insert emoji"
              >
                <Smile size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Attach file"
              >
                <Paperclip size={18} />
              </button>

              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Attach image"
              >
                <Image size={18} />
              </button>

              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                aria-label="Share location"
              >
                <MapPin size={18} />
              </button>

              <button
                type="submit"
                className={`p-3 rounded-full transition-colors ${
                  input.trim()
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
                aria-label="Send message"
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ChatBot