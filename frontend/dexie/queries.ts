import { UIMessage } from 'ai';
import {db} from './db';

const createChat = async (title: string) => {
    const chat = {
        id: crypto.randomUUID(),
        title,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    await db.chats.add(chat);
    return chat;
}

const getChats = async () => {
    return await db.chats.toArray();
}

const getChatById = async(id:string)=>{
    if(!id) return;
    return await db.chats.get(id)
}


const updateChatTitle = async (id: string, title:string) => {
    return await db.chats.update(id,{title,updatedAt: new Date()});
}

const deleteChat = async (id: string) => {
    const chat = await db.chats.get(id);
    if (!chat) {
        throw new Error(`Chat with id ${id} not found`);
    }
    return await db.transaction('rw',[db.chats, db.messages], async () => {
        await db.messages.where('chatId').equals(id).delete();
        return await db.chats.delete(id);

    })
}

const getMessagesByChatId = async (chatId: string) => {
    if (!chatId) return []; // Return empty array if chatId is invalid
    return await db.messages.where('chatId').equals(chatId).toArray();
}

const saveMessage = async (chatId: string, message: UIMessage) => {
    await db.messages.add({
        id: message.id,
        chatId,
        createdAt: new Date(),
        parts: message.parts,
        role: message.role
    });
    return message;
}


export {createChat, getChats, deleteChat,updateChatTitle, getMessagesByChatId, saveMessage,getChatById};