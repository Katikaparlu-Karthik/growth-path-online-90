
import React, { useState } from 'react';
import { Calendar, Clock, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

type ScheduleSessionButtonProps = {
  mentorId: string;
  mentorName?: string;
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
};

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", 
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", 
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", 
  "5:00 PM", "5:30 PM"
];

const ScheduleSessionButton: React.FC<ScheduleSessionButtonProps> = ({ 
  mentorId,
  mentorName = "Mentor",
  variant = 'default', 
  size = 'default',
  className
}) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>();
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleScheduleSession = async () => {
    if (!date || !timeSlot || !topic) {
      toast({
        title: "Missing information",
        description: "Please select a date, time, and topic for your session",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        toast({
          title: "Authentication required",
          description: "Please log in to schedule a session",
          variant: "destructive"
        });
        setIsOpen(false);
        navigate('/login');
        return;
      }

      const userId = sessionData.session.user.id;
      
      // Parse time slot and create start/end times
      const [hour, minute] = timeSlot.split(':');
      const ampm = timeSlot.slice(-2);
      let hourNum = parseInt(hour);
      if (ampm === 'PM' && hourNum !== 12) hourNum += 12;
      if (ampm === 'AM' && hourNum === 12) hourNum = 0;
      
      const startTime = new Date(date);
      startTime.setHours(hourNum, parseInt(minute), 0);
      
      const endTime = new Date(startTime);
      endTime.setMinutes(endTime.getMinutes() + 60); // 1 hour session
      
      const { error } = await supabase
        .from('mentorship_sessions')
        .insert({
          mentor_id: mentorId,
          learner_id: userId,
          start_time: startTime.toISOString(),
          end_time: endTime.toISOString(),
          status: 'scheduled',
          title: topic,
          description: `Session with ${mentorName} about ${topic}`
        });

      if (error) {
        toast({
          title: "Failed to schedule session",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Session scheduled!",
          description: `Your session with ${mentorName} is confirmed for ${format(date, 'PPP')} at ${timeSlot}`
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error scheduling session:", error);
      toast({
        title: "Something went wrong",
        description: "Failed to schedule your session. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={cn("gap-2", className)}
        >
          <Calendar className="h-4 w-4" />
          Schedule Session
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Schedule a Session</SheetTitle>
          <SheetDescription>
            Book a mentoring session with {mentorName}
          </SheetDescription>
        </SheetHeader>
        
        <div className="space-y-6 py-6">
          <div className="space-y-2">
            <Label htmlFor="date">Select a Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="time">Select a Time</Label>
            <Select value={timeSlot} onValueChange={setTimeSlot}>
              <SelectTrigger>
                <SelectValue placeholder="Select a time">
                  {timeSlot ? (
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      {timeSlot}
                    </div>
                  ) : (
                    "Select a time"
                  )}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topic">What would you like to discuss?</Label>
            <Textarea
              id="topic"
              placeholder="Describe what you'd like to learn or discuss in this session"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          
          <div className="pt-4">
            <Button 
              className="w-full" 
              onClick={handleScheduleSession}
              disabled={isSubmitting || !date || !timeSlot || !topic}
            >
              {isSubmitting ? "Scheduling..." : "Confirm Session"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ScheduleSessionButton;
