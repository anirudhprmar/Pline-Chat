import {db} from './db';

const createChat = async (title: string) => {
    const chat = {
        id: crypto.randomUUID(),
        title,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    await db.chats.add(chat);
    return chat;
}

const getChats = async () => {
    return await db.chats.toArray();
}

// const getChatById = async (id: string) => {
//     return await db.chats.get(id);
// }

const updateChat = async (id: string, title:string) => {
    return await db.chats.update(id,{title:title,updatedAt: new Date().toISOString()});
}

const deleteChat = async (id: string) => {
    await db.chats.delete(id);
    await db.messages.where('chatId').equals(id).delete();
}

const getMessagesByChatId = async (chatId: string) => {
    return await db.messages.where('chatId').equals(chatId).toArray();
}

const addMessage = async (chatId: string, role: 'user' | 'ai', content: string) => {
    const message = {
        id: crypto.randomUUID(),
        chatId,
        role,
        content,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    await db.messages.add(message);
    return message;
}

const updateMessage = async (id: string, content: string) => {
    return await db.messages.update(id, { content, updatedAt: new Date().toISOString() });
}   

export {createChat, getChats, updateChat, deleteChat, getMessagesByChatId, addMessage, updateMessage};