import Dexie, { type EntityTable } from 'dexie';

interface Chat {
  id: string,
  title:string
  createdAt: string
  updatedAt: string
}

interface Message{
    id:string
    chatId: string
    role: 'user' | 'ai'
    content:string,
    createdAt: string
    updatedAt: string
}



const db = new Dexie('localDb') as Dexie & {
  chats: EntityTable<Chat,'id'>,
  messages: EntityTable<Message,'id'>
};

// Schema declaration:
db.version(1).stores({
  chats: '++id, title, updatedAt',
  messages: '++id, chatId, updatedAt'
});

export type { Chat, Message };
export { db };