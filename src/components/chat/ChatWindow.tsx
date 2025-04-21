
import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatConversationList from './ChatConversationList';
import ChatMessageList from './ChatMessageList';
import ChatMessageInput from './ChatMessageInput';

const ChatWindow: React.FC = () => {
  const { isOpen, closeChat, activeConversation, setActiveConversation } = useChat();
  const chatRef = useRef<HTMLDivElement>(null);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        closeChat();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeChat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/20 backdrop-blur-sm animate-fade-in sm:p-4">
      <div
        ref={chatRef}
        className="bg-white rounded-t-lg sm:rounded-lg shadow-xl flex flex-col w-full sm:w-[450px] h-[550px] max-h-[80vh] animate-scale-in"
        style={{ maxWidth: 'calc(100% - 2rem)' }}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold text-lg">
            {activeConversation 
              ? activeConversation.username
              : 'Messages'}
          </h2>
          <Button variant="ghost" size="icon" onClick={closeChat}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Chat Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeConversation ? (
            <>
              {/* Active conversation view */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="p-2 bg-gray-100 flex items-center">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setActiveConversation(null)}
                    className="text-sm flex items-center gap-1"
                  >
                    ← Back to conversations
                  </Button>
                </div>
                <ChatMessageList />
                <ChatMessageInput />
              </div>
            </>
          ) : (
            /* Conversation list view */
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                <TabsTrigger value="mentors" className="flex-1">Mentors</TabsTrigger>
                <TabsTrigger value="students" className="flex-1">Students</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <ChatConversationList />
              </TabsContent>
              <TabsContent value="mentors" className="mt-0">
                <ChatConversationList filter="mentor" />
              </TabsContent>
              <TabsContent value="students" className="mt-0">
                <ChatConversationList filter="student" />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
