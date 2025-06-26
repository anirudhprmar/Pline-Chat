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

const updateChatTitle = async (id: string, title:string) => {
    return await db.chats.update(id,{title,updatedAt: new Date().toISOString()});
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

export {createChat, getChats, updateChatTitle, deleteChat, getMessagesByChatId, addMessage, updateMessage};