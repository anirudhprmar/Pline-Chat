/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { UIMessage } from "ai"
import MarkdownMsg from "./MarkdownMsg"

interface MessagesProps {
    messages?: UIMessage[],
    setMessages?: (messages: UIMessage[]) => void,
    status?: "streaming" | "error" | "submitted" | "ready"
    reload?: () => void
}

export default function Messages({
    messages,
    setMessages,
    status,
    reload
}: MessagesProps) {

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
  return (
    <div>
      
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