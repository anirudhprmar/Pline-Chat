"use client"

import { createChat, getChats, saveMessage, updateChatTitle } from "@/frontend/dexie/queries";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import { UIMessage } from "ai";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { Input } from "./ui/input";
// import {Send} from 'lucide-react'

interface ChatInputProps {
    append: (message: UIMessage) => void
    chatId?: string
    setInput: (input: string) => void
    status?: "streaming" | "error" | "submitted" | "ready"
    input?: string
    stop?: () => void
}
function ChatInput({
    append, 
    chatId,
    setInput,
    // status,
    input,
    // stop 
}: ChatInputProps) {
    const [chats, setChats] = useState([] as { id: string, title: string }[]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchChats() {
            const result = await getChats();
            setChats(result);
        }
        fetchChats();
    }, []);

   const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!input || input.trim() === "") return;

    const title = input.trim().slice(0, 50);

    // If no chatId, create a new chat and navigate, do NOT send the message yet
    if (!chatId) {
        const newChat = await createChat(title);
        if (newChat) {
            setInput(""); // clear input
            navigate(`/chat/${newChat.id}`);
        }
        return;
    }

    // If chatId exists, send the message
    const userMessage: UIMessage = {
        id: uuidv4(),
        parts: [{ type: 'text', text: input }],
        role: 'user',
        createdAt: new Date(),
        content: ''
    };

    append(userMessage);
    setInput(""); // clear input after submit

    // Save message to DB
    saveMessage(chatId, userMessage).catch((error) => {
        console.error('Failed to save message:', error);
    });

    // Only update title if it's empty
    if(chats.find(chat => chat.id === chatId && chat.title !== 'New Chat') ) return;
    if (chats.find(chat => chat.id === chatId && chat.title === 'New Chat')) {
        updateChatTitle(chatId, title)
    }
};


    return (
        <div>
          <form onSubmit={handleSubmit} className="flex space-x-2  mx-auto items-center fixed left-80 right-0  bottom-5 max-w-3xl  p-2 ">
            <Input
            type="text"
            value={input ?? ""}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question"
            className=" p-7  rounded-lg relative "
            />

            <Button variant={'outline'} size={'lg'} type="submit" className="p-3 text-lg absolute right-10 bg-[#59168b] text-white hover:text-gray-50 hover:bg-[#6e11b0] rounded-sm cursor-pointer">
                <Send/>
            </Button>
        </form>
        </div>
    )
}

export default ChatInput