
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useChat } from '@/contexts/ChatContext';

const ChatButton: React.FC = () => {
  const { toggleChat, unreadTotal } = useChat();

  return (
    <button
      onClick={toggleChat}
      className="fixed bottom-6 left-6 z-50 p-3 rounded-full bg-mentor-500 text-white shadow-lg hover:bg-mentor-600 transition-colors duration-200 flex items-center justify-center"
      aria-label="Chat with mentors"
    >
      <MessageCircle className="h-6 w-6" />
      {unreadTotal > 0 && (
        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white" variant="destructive">
          {unreadTotal > 99 ? '99+' : unreadTotal}
        </Badge>
      )}
    </button>
  );
};

export default ChatButton;
