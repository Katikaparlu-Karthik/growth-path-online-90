
import React from 'react';
import { ChatProvider } from '@/contexts/ChatContext';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

const Chat: React.FC = () => {
  return (
    <ChatProvider>
      <ChatButton />
      <ChatWindow />
    </ChatProvider>
  );
};

export default Chat;
