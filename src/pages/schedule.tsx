
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Video, MessageSquare, Clock, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock schedule data
const today = new Date();
const mockSessions = [
  {
    id: 1,
    studentName: "Alex Johnson",
    image: "/placeholder.svg",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 0).toISOString(),
    topic: "Career Transition Strategy",
    status: "upcoming",
    type: "video"
  },
  {
    id: 2,
    studentName: "Samantha Lee",
    image: "/placeholder.svg",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 30).toISOString(),
    topic: "Technical Interview Preparation",
    status: "upcoming",
    type: "video"
  },
  {
    id: 3,
    studentName: "Jordan Smith",
    image: "/placeholder.svg",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 9, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1, 10, 0).toISOString(),
    topic: "Code Review and Feedback",
    status: "upcoming",
    type: "chat"
  },
  {
    id: 4,
    studentName: "Taylor Wong",
    image: "/placeholder.svg",
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 13, 0).toISOString(),
    endTime: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2, 14, 0).toISOString(),
    topic: "Portfolio Review",
    status: "upcoming",
    type: "video"
  }
];

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 7 PM

const SessionSchedule: React.FC = () => {
  const [availableDays, setAvailableDays] = useState([1, 2, 3, 4, 5]); // Monday to Friday
  const [availableTimes, setAvailableTimes] = useState([9, 10, 11, 14, 15, 16]); // 9-11 AM, 2-4 PM
  
  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const isToday = (date: string) => {
    const sessionDate = new Date(date);
    const now = new Date();
    return sessionDate.getDate() === now.getDate() &&
      sessionDate.getMonth() === now.getMonth() &&
      sessionDate.getFullYear() === now.getFullYear();
  };
  
  const getSessionsForDay = (dayOffset: number) => {
    const targetDate = new Date();
    targetDate.setDate(today.getDate() + dayOffset);
    
    return mockSessions.filter(session => {
      const sessionDate = new Date(session.date);
      return sessionDate.getDate() === targetDate.getDate() &&
        sessionDate.getMonth() === targetDate.getMonth() &&
        sessionDate.getFullYear() === targetDate.getFullYear();
    });
  };
  
  const toggleAvailableDay = (day: number) => {
    if (availableDays.includes(day)) {
      setAvailableDays(availableDays.filter(d => d !== day));
    } else {
      setAvailableDays([...availableDays, day]);
    }
  };
  
  const toggleAvailableTime = (time: number) => {
    if (availableTimes.includes(time)) {
      setAvailableTimes(availableTimes.filter(t => t !== time));
    } else {
      setAvailableTimes([...availableTimes, time]);
    }
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Session Schedule</h1>
        <Button className="bg-mentor-500 hover:bg-mentor-600">
          Set Recurring Availability
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="availability">My Availability</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Today's Sessions</CardTitle>
                <CardDescription>
                  {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {getSessionsForDay(0).length > 0 ? (
                  <div className="space-y-4">
                    {getSessionsForDay(0).map(session => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={session.image} alt={session.studentName} />
                            <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.studentName}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{formatTime(session.date)} - {formatTime(session.endTime)}</span>
                            </div>
                            <p className="text-sm mt-1">{session.topic}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.type === 'video' ? (
                            <Button className="flex items-center gap-1">
                              <Video className="h-4 w-4" />
                              <span>Join Video</span>
                            </Button>
                          ) : (
                            <Button className="flex items-center gap-1">
                              <MessageSquare className="h-4 w-4" />
                              <span>Chat</span>
                            </Button>
                          )}
                          <Button variant="outline" size="icon">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 text-gray-500">
                    No sessions scheduled for today
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Your scheduled sessions for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSessions
                    .filter(session => !isToday(session.date))
                    .map(session => (
                      <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={session.image} alt={session.studentName} />
                            <AvatarFallback>{session.studentName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{session.studentName}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>{formatDate(session.date)}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{formatTime(session.date)} - {formatTime(session.endTime)}</span>
                            </div>
                            <p className="text-sm mt-1">{session.topic}</p>
                          </div>
                        </div>
                        <Button variant="outline" className="flex items-center gap-1">
                          <X className="h-4 w-4" />
                          <span>Cancel</span>
                        </Button>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>My Weekly Availability</CardTitle>
              <CardDescription>Set your regular available hours for mentoring sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Available Days</h3>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day, index) => (
                      <Button
                        key={index}
                        variant={availableDays.includes(index) ? "default" : "outline"}
                        className={availableDays.includes(index) ? "bg-mentor-500 hover:bg-mentor-600" : ""}
                        onClick={() => toggleAvailableDay(index)}
                      >
                        {day.substring(0, 3)}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Available Hours</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {timeSlots.map(time => (
                      <Button
                        key={time}
                        variant={availableTimes.includes(time) ? "default" : "outline"}
                        className={availableTimes.includes(time) ? "bg-mentor-500 hover:bg-mentor-600" : ""}
                        onClick={() => toggleAvailableTime(time)}
                      >
                        {time % 12 === 0 ? '12' : time % 12}:00 {time >= 12 ? 'PM' : 'AM'}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button className="bg-mentor-500 hover:bg-mentor-600">
                    Save Availability
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Custom Time Off</CardTitle>
              <CardDescription>Set dates when you are not available for mentoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">You don't have any time off periods set.</p>
                <Button variant="outline">Add Time Off</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Your past sessions will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SessionSchedule;
