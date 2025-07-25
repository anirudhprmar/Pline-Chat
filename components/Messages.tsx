/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { UIMessage } from "ai"
import MarkdownMsg from "./MarkdownMsg"
import { Button } from "./ui/button"
import { ArrowDown } from "lucide-react"
import { useState } from "react"
import { deleteChat } from "@/frontend/dexie/queries"
import { useNavigate } from "react-router"

interface MessagesProps {
  messages?: UIMessage[],
  setMessages?: (messages: UIMessage[]) => void,
  status?: "streaming" | "error" | "submitted" | "ready"
  reload?: () => void
  chatInfo:{id:string,title:string,createdAt:Date,updatedAt:Date} 
}

export default function Messages({
  messages,
  setMessages,
  status,
  reload,
  chatInfo
}: MessagesProps) {
  
  const [isOpen,setIsOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  
  //array of messages already here : messages -> store it in a state

  //get the date from messages
  function getDateString(date:any){
    const d = new Date(date)
    return d.toISOString().slice(0,10)
  }

  //group msg with same date 
  if (!messages) return;
  const grouped = messages.reduce((acc,msg)=>{
    const key = getDateString(msg.createdAt)
    if (!acc[key]) acc[key]=[]
    acc[key].push(msg)
    return acc;
  },{})


  //sort msgs acc. to time
  for (const group in grouped) {
    grouped[group].sort((a:any,b:any)=>new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  }

  // console.log('time sort',grouped)  // this is all we need proper time with proper msg 

const date = (dateStr:string) =>{
const d = new Date(dateStr)
return d.toLocaleDateString('en-US')
}


const handleChatDelete = async(id:string )=>{
  await deleteChat(id)
  navigate('/chat')
}

console.log(chatInfo?.id)
  return (
    <div>
      <div>
        <Button
        size={'sm'}
        variant={'ghost'}
        className={`flex items-center justify-center text-md bg-gray-200 text-gray-800 cursor-pointer`}
        onClick={()=>setIsOpen(!isOpen)}
        >{chatInfo?.title}<ArrowDown/></Button>

      {
        isOpen && <div className="bg-gray-300 fixed  w-fit rounded-md  ">
            <Button onClick={()=> handleChatDelete(chatInfo?.id)} className=" hover:bg-red-300 bg-gray-200 text-center text-red-700 cursor-pointer absolute left-10 top-1">Delete</Button>
        </div>
      }
      </div>
    {
    Object.entries(grouped).map(([key, msgs]) => (
      Array.isArray(msgs) ? (
        <div key={key}>
          <p className="text-center">{date(key)}</p>
          {msgs.map(msg => (
            <MarkdownMsg
              key={msg.id}
              message={msg}
              status={status ?? "ready"}
              reload={reload}
              edit={setMessages ?? (() => {})}
            />
          ))}
        </div>
      ) : null
    ))
  }

    </div>
  )
}