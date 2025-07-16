"use client"

import { createChat, getChats, saveMessage, updateChatTitle } from "@/frontend/dexie/queries";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import { UIMessage } from "ai";
import { Button } from "./ui/button";
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
    if (chats.find(chat => chat.id === chatId && chat.title === 'New Chat')) {
        updateChatTitle(chatId, title);
    }
};


    return (
        <div>
          <form onSubmit={handleSubmit} className="flex space-x-2 max-w-3xl mx-auto">
        <input
        type="text"
        value={input ?? ""}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your question"
        className="flex-1 p-2"
        />
        <Button variant={'default'} size={'icon'} type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
        Send
        </Button>
    </form>
    {/* <form onSubmit={() =>(
        handleInputSubmit
        )} 
        className="flex space-x-2 max-w-3xl mx-auto">
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
          />
          
          <button type="submit" disabled={status === 'submitted' || status === 'streaming'} className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50">
            <Send className="h-4 w-4" />
          </button>

           {(status === 'submitted' || status === 'streaming') && (
              <div >
                {status === 'submitted' ? 'Thinking...' : 'Streaming...'}
                <button type="button" onClick={() => stop()} className="text-gray-50 ">
                  Stop
                </button>
              </div>
            )}
            
        </form> */}
        </div>
    )
}

export default ChatInput