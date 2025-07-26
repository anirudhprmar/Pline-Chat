"use client"

import Messages from "./Messages";
import ChatInput from "./ChatInput";
import { UIMessage } from "ai";
import {getChatById, saveMessage} from "../frontend/dexie/queries";
import { useChat } from "@ai-sdk/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useProviderStore } from "@/store/providerStore";

interface chatProps {
  chatId:string
  initialMessages:UIMessage[] | undefined
}

export default function Chat({chatId,initialMessages}: chatProps) {

    const { selectedProvider, selectedModel, getApiKey } = useProviderStore();


  const {messages, setMessages, input, setInput, append, reload, status, stop } = useChat({
    id:chatId,
    api:'/api/chat',
    body:{
      provider:selectedProvider,
      model:selectedModel,
      apiKey:getApiKey(selectedProvider)
    },
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

    const chatInfo = useLiveQuery(()=>getChatById(chatId as string),[chatId])
  
  return (
    <main className="mx-auto px-5 min-h-screen pt-10">

      <Messages
      messages={messages}
      setMessages={setMessages}
      status={status}
      reload={reload}
      chatInfo={chatInfo}
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


