"use client"
import { getChats } from "@/frontend/dexie/queries";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";

import  Settings  from "./Settings";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import ThemeSwitch from "./ThemeSwitch";

function Sidebar() {

  const [settingOpen,setSettingOpen] = useState(false)
  const chats = useLiveQuery(()=> getChats(), []); // using live query to get 
  // the chats from dexie database, this will automatically update the component when the data changes
  const navigate = useNavigate()
  return (
    <div>
      <div className="flex items-center  justify-start gap-20 pb-5">
          <h1 className="text-2xl font-bold text-gray-950 dark:text-white">Pline Chat</h1> 
          <div className='rounded-full  w-fit p-1 cursor-pointer'>
              <ThemeSwitch/>
          </div>
      </div>
      <div className="overflow-y-hidden">
        { chats?.map(chat => {
              return (
                <div key={chat.id} className="p-2 hover:bg-gray-300 dark:hover:bg-purple-900 rounded-lg">
                  <button onClick={(e)=>{
                    e.preventDefault();
                    navigate(`/chat/${chat.id}`);
                  }}
                  className="text-gray-950 dark:text-gray-50 cursor-pointer text-left "
                  >{chat.title}</button>
                </div>
              )
            })
          }
      </div>
      
      <div >
       <Button
       size={'lg'}
       variant={'outline'}
       onClick={()=>setSettingOpen(!settingOpen)}
        className="flex cursor-pointer w-50 justify-between items-center p-2 text-gray-950 dark:text-gray-50 hover:bg-gray-300 dark:hover:bg-purple-800 rounded-lg absolute bottom-10 left-5  "
        >
          Setting <SettingsIcon/>
       </Button>

        {settingOpen && <div className="bg-gray-700 rounded-2xl">
        <Settings/>
          </div>}
      </div>
    </div>
  )
}

export default Sidebar
