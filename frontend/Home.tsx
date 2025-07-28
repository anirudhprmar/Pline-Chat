"use client"
import { Plus } from "lucide-react"
import { createChat } from "./dexie/queries";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function Home() {
  const navigate = useNavigate()

  const createNewChat = async()=>{
    const chat = await createChat("New Chat")
    navigate(`/chat/${chat.id}`) ;
  }

  return (
   <div className="flex flex-col items-center justify-center min-h-screen  ">
      <h1 className="text-3xl font-bold mb-6">Pline Chat</h1>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Start a conversation with the AI assistant. Ask questions, get information, or just chat!
      </p>
      <Button variant={'outline'} size={'lg'} className="flex gap-2 items-center border p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 cursor-pointer"
      onClick={createNewChat}
      >
        <Plus size={16} />
        New Chat
      </Button>

    </div>
  )
}


