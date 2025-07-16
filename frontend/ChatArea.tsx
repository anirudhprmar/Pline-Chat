"use client"
import Chat from "@/components/Chat";
import { useParams } from "react-router";
import {useLiveQuery} from 'dexie-react-hooks'
import { getMessagesByChatId } from "./dexie/queries";
import { type DBMessage } from "./dexie/db";
import { UIMessage } from "ai";


export default function ChatArea() {
    const { id } = useParams();

   const messages = useLiveQuery(() => getMessagesByChatId(id as string), [id]);

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
    initialMessages={convertToUIMessages(messages)}
    />
  )
}


