
import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type MessageButtonProps = {
  mentorId: string;
  mentorName?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
};

const MessageButton: React.FC<MessageButtonProps> = ({ 
  mentorId,
  mentorName = "Mentor",
  variant = 'outline', 
  size = 'default',
  className
}) => {
  const navigate = useNavigate();

  const handleMessage = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast({
          title: "Authentication required",
          description: "Please log in to message a mentor",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }

      const userId = sessionData.session.user.id;
      
      // Check if conversation exists
      const { data: existingConversation, error: convError } = await supabase
        .from('chat_conversations')
        .select('id')
        .eq('mentor_id', mentorId)
        .eq('learner_id', userId)
        .single();
      
      if (convError && !existingConversation) {
        // Create new conversation
        const { data: newConversation, error: newConvError } = await supabase
          .from('chat_conversations')
          .insert({
            mentor_id: mentorId,
            learner_id: userId,
            status: 'active'
          })
          .select('id')
          .single();
        
        if (newConvError) {
          toast({
            title: "Error",
            description: "Could not start conversation with mentor",
            variant: "destructive"
          });
          return;
        }
      }
      
      // Open chat modal or redirect to chat page
      toast({
        title: "Chat opened",
        description: `You can now message ${mentorName}`
      });
      
      // In a real implementation, you might open a chat modal or navigate to a chat page
      // For now, we'll just show a toast
    } catch (error) {
      console.error("Error starting conversation:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to start conversation. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={className}
      onClick={handleMessage}
    >
      <MessageSquare className="h-4 w-4 mr-2" />
      Message
    </Button>
  );
};

export default MessageButton;
