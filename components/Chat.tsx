"use client"
import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { UIMessage } from "ai";
import {saveMessage} from "../frontend/dexie/queries";
import { useChat } from "@ai-sdk/react";

interface chatProps {
  chatId:string
  initialMessages:UIMessage[] | undefined
}

export default function Chat({chatId,initialMessages}: chatProps) {

  const {messages, setMessages, input, setInput, append, reload, status, stop } = useChat({
    id:chatId,
    api:'/api/chat',
    initialMessages,
    experimental_throttle:50,
    onFinish: async ({parts}) =>{
      const aiResponse: UIMessage = {
        id: crypto.randomUUID(),
        parts: parts as UIMessage['parts'],
        role: 'assistant',
        createdAt: new Date(),
        content:''
      }
        await saveMessage(chatId, aiResponse)
    }
  })
  
  return (
    <main className="mx-auto px-5 min-h-screen pt-10">

      <Messages
      messages={messages}
      setMessages={setMessages}
      status={status}
      reload={reload}
      />

      <ChatInput
        append={append}
        chatId={chatId}
        status={status}
        setInput={setInput}
        input={input}
        stop={stop}
        />
    </main>
  )
}


