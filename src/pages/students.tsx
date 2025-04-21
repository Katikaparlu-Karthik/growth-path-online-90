
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Clock, MessagesSquare } from 'lucide-react';

// Mock student data
const students = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    joinedDate: "March 15, 2025",
    progress: 75,
    nextSession: "Friday, April 25",
    totalSessions: 6,
    image: "/placeholder.svg",
    learningPath: "Web Development"
  },
  {
    id: 2,
    name: "Samantha Lee",
    role: "Data Analyst",
    company: "AnalyticsPro",
    joinedDate: "February 10, 2025",
    progress: 45,
    nextSession: "Monday, April 28",
    totalSessions: 4,
    image: "/placeholder.svg",
    learningPath: "Data Science"
  },
  {
    id: 3,
    name: "Jordan Smith",
    role: "Product Designer",
    company: "CreativeInc",
    joinedDate: "April 3, 2025",
    progress: 25,
    nextSession: "Wednesday, April 30",
    totalSessions: 2,
    image: "/placeholder.svg",
    learningPath: "UX/UI Design"
  }
];

const MyStudents: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Students</h1>
        <Button className="bg-mentor-500 hover:bg-mentor-600">Add Learning Path</Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-8">
          <TabsTrigger value="active">Active Students</TabsTrigger>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="past">Past Students</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid gap-6">
            {students.map(student => (
              <Card key={student.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={student.image} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-xl font-semibold">{student.name}</h3>
                          <p className="text-gray-500">{student.role} at {student.company}</p>
                        </div>
                        <span className="text-sm text-gray-500">Joined: {student.joinedDate}</span>
                      </div>
                      
                      <div>
                        <p className="text-sm text-gray-700 mb-1">Learning Path: <span className="font-medium">{student.learningPath}</span></p>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500 mr-2 w-16">Progress:</span>
                          <Progress value={student.progress} className="h-2 flex-1" />
                          <span className="text-xs text-gray-500 ml-2">{student.progress}%</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-mentor-500" />
                          <span>Next session: {student.nextSession}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-mentor-500" />
                          <span>{student.totalSessions} total sessions</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button className="bg-mentor-500 hover:bg-mentor-600 flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Schedule Session</span>
                      </Button>
                      <Button variant="outline" className="flex items-center gap-1">
                        <MessagesSquare className="h-4 w-4" />
                        <span>Message</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You have no pending student requests at this time.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">Your past students will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyStudents;
