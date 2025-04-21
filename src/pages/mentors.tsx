
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MessageSquare } from 'lucide-react';

const mentors = [
  {
    id: 1,
    name: "Dr. Emma Johnson",
    role: "Senior Product Manager",
    company: "Tech Corp",
    expertise: ["Career Development", "Product Management"],
    nextSession: "Today, 3:00 PM",
    totalSessions: 12,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Engineering Director",
    company: "InnovateCo",
    expertise: ["Leadership", "Technical Growth"],
    nextSession: "Tomorrow, 5:00 PM",
    totalSessions: 8,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "HR Executive",
    company: "Global Inc",
    expertise: ["Interview Preparation", "Resume Building"],
    nextSession: "Friday, 4:00 PM",
    totalSessions: 15,
    image: "/placeholder.svg"
  }
];

const MyMentors: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Mentors</h1>
        <Button className="bg-mentor-500 hover:bg-mentor-600">Find New Mentors</Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-8">
          <TabsTrigger value="active">Active Mentorships</TabsTrigger>
          <TabsTrigger value="past">Past Mentorships</TabsTrigger>
          <TabsTrigger value="requests">Pending Requests</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="space-y-6">
            {mentors.map(mentor => (
              <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={mentor.image} alt={mentor.name} />
                      <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-xl font-semibold">{mentor.name}</h3>
                        <p className="text-gray-500">{mentor.role} at {mentor.company}</p>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {mentor.expertise.map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>Next session: {mentor.nextSession}</span>
                        <span className="mx-2">•</span>
                        <span>{mentor.totalSessions} total sessions</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-2">
                      <Button variant="outline" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                      <Button className="bg-mentor-500 hover:bg-mentor-600 flex items-center gap-1">
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
          <div className="text-center py-12">
            <p className="text-gray-500">Your past mentorships will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="requests">
          <div className="text-center py-12">
            <p className="text-gray-500">Your pending mentorship requests will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyMentors;
