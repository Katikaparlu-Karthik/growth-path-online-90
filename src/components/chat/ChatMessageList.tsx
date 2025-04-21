
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const ChatMessageList: React.FC = () => {
  const { messages, activeConversation } = useChat();
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!activeConversation) return null;

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-gray-500">
          <p>No messages yet</p>
          <p className="text-sm">Start the conversation!</p>
        </div>
      ) : (
        messages.map(message => {
          const isIncoming = message.sender_id !== '1'; // Hardcoded for now
          
          return (
            <div
              key={message.id}
              className={`flex ${isIncoming ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${isIncoming ? 'flex-row' : 'flex-row-reverse'}`}>
                {isIncoming && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={message.sender_avatar} />
                    <AvatarFallback>
                      {message.sender_name?.substring(0, 2).toUpperCase() || 'UN'}
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className="flex flex-col">
                  <div
                    className={`rounded-lg p-3 ${
                      isIncoming
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-mentor-500 text-white'
                    }`}
                  >
                    <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <span className={`text-xs mt-1 text-gray-500 ${isIncoming ? 'text-left' : 'text-right'}`}>
                    {format(new Date(message.created_at), 'h:mm a')}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatMessageList;
