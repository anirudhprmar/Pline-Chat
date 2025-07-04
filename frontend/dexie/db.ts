import { UIMessage } from 'ai';
import Dexie, { type EntityTable } from 'dexie';

interface Chat {
  id: string,
  title:string
  createdAt: Date
  updatedAt: Date
}

interface DBMessage{
    id:string
    chatId: string
    role: 'user' | 'assistant' | 'system' | 'data'
    parts:UIMessage['parts']
    createdAt: Date
}



const db = new Dexie('localDb') as Dexie & {
  chats: EntityTable<Chat,'id'>,
  messages: EntityTable<DBMessage,'id'>
};

// Schema declaration:
db.version(1).stores({
  chats: 'id, title, updatedAt', 
  messages: 'id, chatId, createdAt',
});

export type { Chat, DBMessage };
export { db };