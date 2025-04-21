
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  read: boolean;
  sender_name?: string;
  sender_avatar?: string;
};

type Conversation = {
  id: string;
  user_id: string;
  username: string;
  avatar_url?: string;
  last_message?: string;
  last_message_time?: string;
  unread_count: number;
  online: boolean;
  role: 'mentor' | 'student';
};

type ChatContextType = {
  isOpen: boolean;
  activeConversation: Conversation | null;
  conversations: Conversation[];
  messages: Message[];
  unreadTotal: number;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: () => void;
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string) => Promise<void>;
  markAsRead: (conversationId: string) => Promise<void>;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadTotal, setUnreadTotal] = useState(0);
  
  // Mock user for now - in a real implementation, this would come from auth
  const currentUser = {
    id: '1',
    role: 'student' as const,
    name: 'Current User'
  };

  useEffect(() => {
    // Load conversations
    const loadConversations = async () => {
      // In a real implementation, this would fetch from Supabase
      // This is mock data for demonstration
      const mockConversations: Conversation[] = [
        {
          id: '1',
          user_id: '2',
          username: 'Dr. Emily Chen',
          avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          last_message: 'Looking forward to our session tomorrow!',
          last_message_time: new Date().toISOString(),
          unread_count: 3,
          online: true,
          role: 'mentor'
        },
        {
          id: '2',
          user_id: '3',
          username: 'Alex Johnson',
          avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
          last_message: 'Thanks for the feedback on my project',
          last_message_time: new Date(Date.now() - 3600000).toISOString(),
          unread_count: 0,
          online: false,
          role: 'student'
        }
      ];
      
      setConversations(mockConversations);
      
      // Calculate total unread messages
      const total = mockConversations.reduce((sum, conv) => sum + conv.unread_count, 0);
      setUnreadTotal(total);
    };

    loadConversations();
    
    // Set up real-time subscription
    // In a real implementation with Supabase, we would set up a real-time subscription here
    
    return () => {
      // Clean up subscription
    };
  }, []);

  useEffect(() => {
    if (activeConversation) {
      // Load messages for the active conversation
      const loadMessages = async () => {
        // In a real implementation, this would fetch from Supabase
        // This is mock data for demonstration
        const mockMessages: Message[] = [
          {
            id: '1',
            sender_id: activeConversation.user_id,
            receiver_id: currentUser.id,
            content: 'Hi there! How can I help you today?',
            created_at: new Date(Date.now() - 86400000).toISOString(),
            read: true,
            sender_name: activeConversation.username,
            sender_avatar: activeConversation.avatar_url
          },
          {
            id: '2',
            sender_id: currentUser.id,
            receiver_id: activeConversation.user_id,
            content: 'I had a question about our next session.',
            created_at: new Date(Date.now() - 82800000).toISOString(),
            read: true
          },
          {
            id: '3',
            sender_id: activeConversation.user_id,
            receiver_id: currentUser.id,
            content: 'Sure, what would you like to know?',
            created_at: new Date(Date.now() - 3600000).toISOString(),
            read: false,
            sender_name: activeConversation.username,
            sender_avatar: activeConversation.avatar_url
          }
        ];
        
        setMessages(mockMessages);
      };

      loadMessages();
    } else {
      setMessages([]);
    }
  }, [activeConversation]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const openChat = () => {
    setIsOpen(true);
  };

  const sendMessage = async (content: string) => {
    if (!activeConversation || !content.trim()) return;

    // In a real implementation, this would save to Supabase
    const newMessage: Message = {
      id: Date.now().toString(),
      sender_id: currentUser.id,
      receiver_id: activeConversation.user_id,
      content,
      created_at: new Date().toISOString(),
      read: false
    };

    // Optimistically update the UI
    setMessages(prev => [...prev, newMessage]);

    // Update last message in conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              last_message: content, 
              last_message_time: new Date().toISOString() 
            } 
          : conv
      )
    );

    // In a real implementation, we would save to Supabase here
  };

  const markAsRead = async (conversationId: string) => {
    // In a real implementation, this would update in Supabase
    
    // Update the UI optimistically
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, unread_count: 0 } 
          : conv
      )
    );

    // Recalculate total unread
    setConversations(prevConvs => {
      const total = prevConvs.reduce((sum, conv) => sum + conv.unread_count, 0);
      setUnreadTotal(total);
      return prevConvs;
    });

    // Mark messages as read
    if (activeConversation?.id === conversationId) {
      setMessages(prev => 
        prev.map(msg => 
          msg.sender_id === activeConversation.user_id && !msg.read 
            ? { ...msg, read: true } 
            : msg
        )
      );
    }
  };

  return (
    <ChatContext.Provider
      value={{
        isOpen,
        activeConversation,
        conversations,
        messages,
        unreadTotal,
        toggleChat,
        closeChat,
        openChat,
        setActiveConversation,
        sendMessage,
        markAsRead
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
