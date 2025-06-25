'use client';

import { useChat } from '@ai-sdk/react';
import { v4 as uuidv4 } from "uuid"
import { Message } from "ai"
import { useCallback, useEffect, useState } from 'react';
import { Sidebar } from './Sidebar';
import ChatArea from './ChatArea';


interface chat {
  id:string,
  messages:Message[],
  title:string,
  createdAt:string,
}


export default function Page() {
  const [chats, setChats] = useState<chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string>("");

  const { messages, input, handleInputChange, handleSubmit, setMessages } =
    useChat({
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
    const newChat : chat = {
      id:newChatId,
      messages: [],
      title: 'New Chat',
      createdAt: new Date().toISOString(),
    }
    setChats(prevChats => [...prevChats, newChat]);
    setCurrentChatId(newChatId)
    setMessages([])
  },[setMessages])

  const updateChatTitle = useCallback((chatId:string,title:string)=>{
    setChats(prevChat => prevChat.map(chat => chat.id === chatId ? {...chat , title} : chat))
  },[])

  const switchChat = useCallback((chatId:string)=>{
    setCurrentChatId(chatId) // set the id for chat to be the same as chatId of the chat you clicked 
    const chat = chats.find(chat => chat.id === chatId) // check if chat exists and if yes then return the messages of the chat
    if (chat) {
      setMessages(chat.messages)
    }
  },[chats,setMessages])

  const updateChatMessages = useCallback((chatId:string,message:Message[])=>{
    chats.map(chat => chat.id === chatId ? {...chat,messages:message} : chat)
  },[chats])

  const deleteChat = useCallback((chatId:string)=>{
    setChats(prevChats => {
       const filteredChats = prevChats.filter(chat => chat.id !== chatId)
      if (chatId === currentChatId) {
        if (filteredChats.length > 0) {
          const newCurrentChat = filteredChats[0]
          setCurrentChatId(newCurrentChat.id)
          setMessages(newCurrentChat.messages)
        }else{
          createNewChat()
        }
      }
      return filteredChats
    })
  },[currentChatId,setMessages,createNewChat])

  useEffect(()=>{
    if (chats.length === 0) {
      createNewChat()
    }
  },[chats,createNewChat])
  
  return (
    <div className='flex h-screen bg-background'>

      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        createNewChat={createNewChat}
        switchChat={switchChat}
        deleteChat={deleteChat}
        // isOpen={sidebarOpen}
        // setIsOpen={setSidebarOpen}
        // isMobile={isMobile}
      />

      <ChatArea
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        // isLoading={isLoading}
        createNewChat={createNewChat}
      />

    </div>
  );
}

// this component is handling the chat messages , where user inputs the query and get an answer in reply. 
// make it look good