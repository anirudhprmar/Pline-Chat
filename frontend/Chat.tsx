import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "next/navigation";
import { getMessagesByChatId } from "./dexie/localDb";
import { type Message } from "./dexie/db";
import { UIMessage } from "ai";
// change name to something else not as chat will be a component 

export default function Chat() {
  return (
    <div>
      
    </div>
  )
}


