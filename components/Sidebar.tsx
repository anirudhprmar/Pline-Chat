import { getChats } from "@/frontend/dexie/queries";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from "react-router";

function Sidebar() {

  const chats = useLiveQuery(()=> getChats(), []); // using live query to get 
  // the chats from dexie database, this will automatically update the component when the data changes
  const navigate = useNavigate()
  return (
    <div>
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
  )
}

export default Sidebar
