import React from 'react';
import { Plus, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Chat } from './ChatInterface';

interface SidebarProps {
  chats: Chat[];
  currentChatId: string;
  createNewChat: () => void;
  switchChat: (chatId: string) => void;
  deleteChat: (chatId: string) => void;
  isOpen: boolean;
  setIsOpen:(isOpen:boolean) => void
  onClose?: () => void;
  isMobile?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  chats,
  currentChatId,
  createNewChat,
  switchChat,
  deleteChat,
  setIsOpen,
  isOpen = true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
  isMobile = false,
}) => {
  return (
    <>
      {/* Overlay for mobile */}
     {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={() => setIsOpen(false)}  // Update this line
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-40
          h-full w-64
          transform transition-transform duration-300 ease-in-out
          bg-white dark:bg-gray-800
          border-r border-gray-200 dark:border-gray-700
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Chats
            </h2>
            {isMobile && (
              <button
                onClick={() => setIsOpen(false)}  // Update this line
                className="p-2 rounded-md lg:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Close sidebar"
              >
                <svg
                  className="w-6 h-6 text-gray-600 dark:text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* New Chat Button */}
          <div className="p-4">
            <Button 
              onClick={createNewChat}
              variant="outline"
              fullWidth
              className="justify-start gap-2"
            >
              <Plus size={20} />
              New Chat
            </Button>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`
                  group flex items-center justify-between
                  p-3 rounded-lg cursor-pointer
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  ${chat.id === currentChatId ? 'bg-gray-100 dark:bg-gray-700' : ''}
                `}
                onClick={() => switchChat(chat.id)}
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <MessageCircle size={20} className="shrink-0 text-gray-500" />
                  <span className="truncate text-sm">{chat.title}</span>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  aria-label="Delete chat"
                >
                  <Trash2 size={16} className="text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};