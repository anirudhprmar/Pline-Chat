"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Send, PlusCircle } from "lucide-react"
import ChatMessage from "@/components/ChatMessage"
import type { Message } from "ai"

interface ChatAreaProps {
  messages: Message[]
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  createNewChat: () => void
  status: string
  stop: () => void
}

export default function ChatArea({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  status,
  stop,
  createNewChat,
  // isLoading,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  return (
    <div className="flex-1 flex flex-col h-full">
    
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-3xl font-bold mb-6">AI Chat Assistant</h1>
            <p className="text-muted-foreground text-center max-w-md mb-8">
              Start a conversation with the AI assistant. Ask questions, get information, or just chat!
            </p>
            <Button variant="outline" className="gap-2" onClick={createNewChat}>
              <PlusCircle size={16} />
              New Chat
            </Button>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            { !messages && (
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-100" />
                <div className="h-2 w-2 rounded-full bg-muted-foreground animate-bounce delay-200" />
              </div>
            )} 
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2 max-w-3xl mx-auto">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          
          <Button type="submit" size="small" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>

           {(status === 'submitted' || status === 'streaming') && (
              <div >
                {status === 'submitted' ? 'Thinking...' : 'Streaming...'}
                <button type="button" onClick={() => stop()} className="text-gray-50 ">
                  Stop
                </button>
              </div>
            )}
            
        </form>
      </div>
    </div>
  )
}
