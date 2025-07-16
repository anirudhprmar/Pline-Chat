"use client"
import { getChats } from "@/frontend/dexie/queries";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";
import ThemeSwitch from "./ThemeSwitch";

function Sidebar() {

  const chats = useLiveQuery(()=> getChats(), []); // using live query to get 
  // the chats from dexie database, this will automatically update the component when the data changes
  const navigate = useNavigate()
  return (
    <div>
      <div className="overflow-y-scroll">
        { chats?.map(chat => {
              return (
                <div key={chat.id} className="p-2 hover:bg-gray-800 cursor-pointer">
                  <button onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/chat/${chat.id}`);
                  }}>{chat.title}</button>
                </div>
              )
            })
          }
      </div>
      
      <div className="rounded-full border border-gray-50 w-fit p-1">
        <ThemeSwitch/>
      </div>
    </div>
  )
}

export default Sidebar
