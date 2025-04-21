
import React, { useState, FormEvent, KeyboardEvent } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

const ChatMessageInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { sendMessage } = useChat();
  
  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!message.trim()) return;
    
    await sendMessage(message);
    setMessage('');
  };
  
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter without shift
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="p-3 border-t">
      <div className="flex items-end gap-2">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="resize-none min-h-[60px] max-h-[120px]"
        />
        <Button type="submit" size="icon" className="h-10 w-10 bg-mentor-500 hover:bg-mentor-600" disabled={!message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default ChatMessageInput;
