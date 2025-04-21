
import React from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';

interface ChatConversationListProps {
  filter?: 'mentor' | 'student';
}

const ChatConversationList: React.FC<ChatConversationListProps> = ({ filter }) => {
  const { conversations, setActiveConversation, markAsRead } = useChat();

  const filteredConversations = filter 
    ? conversations.filter(conv => conv.role === filter) 
    : conversations;

  const handleSelectConversation = (conversation: typeof conversations[0]) => {
    setActiveConversation(conversation);
    markAsRead(conversation.id);
  };

  if (filteredConversations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <p>No conversations yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100vh-250px)] sm:h-[450px]">
      {filteredConversations.map(conversation => (
        <div
          key={conversation.id}
          onClick={() => handleSelectConversation(conversation)}
          className={`flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer transition-colors duration-150 ${
            conversation.unread_count > 0 ? 'bg-gray-50' : ''
          }`}
        >
          <div className="relative">
            <Avatar>
              <AvatarImage src={conversation.avatar_url} alt={conversation.username} />
              <AvatarFallback>
                {conversation.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            {conversation.online && (
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline">
              <h4 className="font-medium truncate">{conversation.username}</h4>
              {conversation.last_message_time && (
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(conversation.last_message_time), { addSuffix: true })}
                </span>
              )}
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 truncate">{conversation.last_message}</p>
              {conversation.unread_count > 0 && (
                <Badge variant="default" className="bg-mentor-500 text-white">
                  {conversation.unread_count}
                </Badge>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatConversationList;
