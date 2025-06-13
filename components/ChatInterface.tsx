"use client"

import { useState, useEffect, useCallback } from "react"
import { useChat } from '@ai-sdk/react'
import { v4 as uuidv4 } from "uuid"
import { Message } from "ai"
import { Sidebar } from "@/components/Sidebar"
import ChatArea from "@/components/ChatArea"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Button } from "@/components/ui/Button"
import { Menu } from "lucide-react"

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: Date
}

export interface SidebarProps {
  chats: Chat[]
  currentChatId: string
  createNewChat: () => void
  switchChat: (chatId: string) => void
  deleteChat: (chatId: string) => void
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  isMobile: boolean
}


export default function ChatInterface() {
  const [chats, setChats] = useState<Chat[]>([])
  const [currentChatId, setCurrentChatId] = useState<string>("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    isLoading, 
    setMessages 
  } = useChat({
    id: currentChatId,
    onResponse: () => {
      if (chats.find((chat) => chat.id === currentChatId)?.messages.length === 0) {
        const firstUserMessage = input.substring(0, 30) + (input.length > 30 ? "..." : "")
        updateChatTitle(currentChatId, firstUserMessage)
      }
    },
    onFinish: (message) => {
      updateChatMessages(currentChatId, [...messages, message])
    },
  })

  const createNewChat = useCallback(() => {
    const newChatId = uuidv4()
    const newChat: Chat = {
      id: newChatId,
      title: "New Chat",
      messages: [],
      createdAt: new Date(),
    }

    setChats(prevChats => [newChat, ...prevChats])
    setCurrentChatId(newChatId)
    setMessages([])

    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile, setMessages])

  const switchChat = useCallback((chatId: string) => {
    setCurrentChatId(chatId)
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      setMessages(chat.messages)
    }

    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [chats, isMobile, setMessages])

  const updateChatTitle = useCallback((chatId: string, title: string) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, title } : chat
      )
    )
  }, [])

  const updateChatMessages = useCallback((chatId: string, newMessages: Message[]) => {
    setChats(prevChats => 
      prevChats.map(chat => 
        chat.id === chatId ? { ...chat, messages: newMessages } : chat
      )
    )
  }, [])

  const deleteChat = useCallback((chatId: string) => {
    setChats(prevChats => {
      const filteredChats = prevChats.filter(chat => chat.id !== chatId)
      
      if (chatId === currentChatId) {
        if (filteredChats.length > 0) {
          const newCurrentChat = filteredChats[0]
          setCurrentChatId(newCurrentChat.id)
          setMessages(newCurrentChat.messages)
        } else {
          createNewChat()
        }
      }
      
      return filteredChats
    })
  }, [currentChatId, createNewChat, setMessages])

  // Initialize with a new chat if none exists
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat()
    }
  }, [chats.length, createNewChat])

  // Handle mobile sidebar
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }, [isMobile])

  return (
    <div className="flex h-screen bg-background">
      {isMobile && (
        <Button
          variant="outline"
          size="small"
          className="absolute top-4 left-4 z-50" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <Menu />
        </Button>
      )}

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        createNewChat={createNewChat}
        switchChat={switchChat}
        deleteChat={deleteChat}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <ChatArea
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        createNewChat={createNewChat}
      />
    </div>
  )
}