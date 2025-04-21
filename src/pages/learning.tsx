
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const courses = [
  {
    id: 1,
    title: "Career Development Fundamentals",
    instructor: "Dr. Emma Johnson",
    progress: 75,
    totalHours: 12,
    completedHours: 9,
    category: "Career",
    nextSession: "Tomorrow, 3:00 PM"
  },
  {
    id: 2,
    title: "Leadership Skills Masterclass",
    instructor: "Michael Chen",
    progress: 30,
    totalHours: 10,
    completedHours: 3,
    category: "Leadership",
    nextSession: "Monday, 5:00 PM"
  },
  {
    id: 3,
    title: "Effective Communication",
    instructor: "Sarah Williams",
    progress: 90,
    totalHours: 8,
    completedHours: 7.2,
    category: "Soft Skills",
    nextSession: "Completed"
  },
  {
    id: 4,
    title: "Technical Interview Preparation",
    instructor: "James Rodriguez",
    progress: 50,
    totalHours: 15,
    completedHours: 7.5,
    category: "Career",
    nextSession: "Thursday, 6:00 PM"
  }
];

const MyLearning: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Learning</h1>
      
      <Tabs defaultValue="in-progress">
        <TabsList className="mb-8">
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="in-progress">
          <div className="grid md:grid-cols-2 gap-6">
            {courses.map(course => (
              <Card key={course.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription>Instructor: {course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress: {course.progress}%</span>
                        <span>{course.completedHours}/{course.totalHours} hours</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="bg-mentor-100 text-mentor-700 px-2 py-1 rounded-full text-xs">
                        {course.category}
                      </span>
                      <span>Next session: {course.nextSession}</span>
                    </div>
                    <Button className="w-full mt-2 bg-learner-500 hover:bg-learner-600">Continue Learning</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-12">
            <p className="text-gray-500">Your completed courses will appear here.</p>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="text-center py-12">
            <p className="text-gray-500">Personalized course recommendations will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyLearning;
