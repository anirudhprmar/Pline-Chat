"use client"
import Chat from "@/components/Chat";
import { useParams } from "react-router";
import {useLiveQuery} from 'dexie-react-hooks'
import { getMessagesByChatId } from "./dexie/queries";
import { type DBMessage } from "./dexie/db";
import { UIMessage } from "ai";
import { useEffect, useState } from "react";


export default function ChatArea() {
    const { id } = useParams();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [chatMsgs,setChatMsgs] = useState<any>([])

    const messages = useLiveQuery(() => getMessagesByChatId(id as string), [id]);

    useEffect(()=>{
      setChatMsgs(messages)
    },[messages,id])



    const convertToUIMessages = (messages?: DBMessage[]) => {
        return messages?.map(
        (message): UIMessage => ({
            id: message.id,
            role: message.role,
            parts: message.parts as UIMessage['parts'],
            content: '',
            createdAt: message.createdAt,
        })
        );
    };
  return (
    <Chat
    chatId={id as string}
    initialMessages={convertToUIMessages(chatMsgs)}
    />
  )
}


