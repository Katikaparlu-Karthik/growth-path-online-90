
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, Video, Plus, MessageSquare } from 'lucide-react';

const upcomingSessions = [
  {
    id: 1,
    mentorName: "Dr. Emma Johnson",
    mentorRole: "Senior Product Manager",
    topic: "Career Development Strategy",
    date: "April 22, 2025",
    time: "3:00 PM - 4:00 PM",
    status: "confirmed",
    image: "/placeholder.svg"
  },
  {
    id: 2,
    mentorName: "Michael Chen",
    mentorRole: "Engineering Director",
    topic: "Leadership Skills in Tech",
    date: "April 25, 2025",
    time: "5:00 PM - 6:00 PM",
    status: "confirmed",
    image: "/placeholder.svg"
  },
  {
    id: 3,
    mentorName: "Sarah Williams",
    mentorRole: "HR Executive",
    topic: "Interview Preparation",
    date: "April 28, 2025",
    time: "2:00 PM - 3:30 PM",
    status: "pending",
    image: "/placeholder.svg"
  }
];

const pastSessions = [
  {
    id: 101,
    mentorName: "Dr. Emma Johnson",
    mentorRole: "Senior Product Manager",
    topic: "Resume Review",
    date: "April 15, 2025",
    time: "3:00 PM - 4:00 PM",
    feedback: true,
    image: "/placeholder.svg"
  },
  {
    id: 102,
    mentorName: "Michael Chen",
    mentorRole: "Engineering Director",
    topic: "Technical Growth Planning",
    date: "April 10, 2025",
    time: "5:00 PM - 6:00 PM",
    feedback: false,
    image: "/placeholder.svg"
  }
];

const MySessions: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <Button className="bg-mentor-500 hover:bg-mentor-600">
          <Plus className="h-4 w-4 mr-2" /> Schedule New Session
        </Button>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-8">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="past">Past Sessions</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          <div className="space-y-6">
            {upcomingSessions.map(session => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={session.image} alt={session.mentorName} />
                      <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-semibold">{session.topic}</h3>
                      <p className="text-gray-700">with {session.mentorName}, {session.mentorRole}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center">
                          {session.status === "confirmed" ? (
                            <span className="text-green-600 font-medium">Confirmed</span>
                          ) : (
                            <span className="text-yellow-600 font-medium">Pending</span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button variant="outline" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                      <Button 
                        className="bg-learner-500 hover:bg-learner-600 flex items-center gap-1"
                        disabled={session.status !== "confirmed"}
                      >
                        <Video className="h-4 w-4" />
                        <span>Join Session</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            {pastSessions.map(session => (
              <Card key={session.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={session.image} alt={session.mentorName} />
                      <AvatarFallback>{session.mentorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-1">
                      <h3 className="text-xl font-semibold">{session.topic}</h3>
                      <p className="text-gray-700">with {session.mentorName}, {session.mentorRole}</p>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{session.date}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{session.time}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-gray-600 font-medium">Completed</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2">
                      {session.feedback ? (
                        <Button variant="outline" disabled>Feedback Submitted</Button>
                      ) : (
                        <Button className="bg-mentor-500 hover:bg-mentor-600">
                          Leave Feedback
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="cancelled">
          <div className="text-center py-12">
            <p className="text-gray-500">Your cancelled sessions will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MySessions;
