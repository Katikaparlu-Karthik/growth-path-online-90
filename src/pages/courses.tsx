
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Users, Clock, Plus, Pencil, Trash2, Eye } from 'lucide-react';

// Mock course data
const courses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "A comprehensive course covering HTML, CSS, and JavaScript basics for beginners.",
    enrolled: 12,
    duration: "8 weeks",
    modules: 6,
    status: "active",
    lastUpdated: "April 10, 2025"
  },
  {
    id: 2,
    title: "Advanced React Patterns",
    description: "Master advanced React concepts including hooks, context, and performance optimization.",
    enrolled: 8,
    duration: "6 weeks",
    modules: 5,
    status: "active",
    lastUpdated: "April 15, 2025"
  },
  {
    id: 3,
    title: "UX Research Methods",
    description: "Learn practical research techniques to inform your design decisions.",
    enrolled: 5,
    duration: "4 weeks",
    modules: 4,
    status: "draft",
    lastUpdated: "April 18, 2025"
  }
];

const MyCourses: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button className="bg-mentor-500 hover:bg-mentor-600">
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-8">
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.status === 'active').map(course => (
              <Card key={course.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">Active</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.enrolled} Students</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.modules} Modules</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Updated: {course.lastUpdated}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.status === 'draft').map(course => (
              <Card key={course.id} className="flex flex-col h-full">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{course.title}</CardTitle>
                    <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">Draft</Badge>
                  </div>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.enrolled} Students</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="h-4 w-4 mr-2 text-gray-500" />
                      <span>{course.modules} Modules</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      Updated: {course.lastUpdated}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between pt-2 border-t">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="archived">
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You have no archived courses.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyCourses;
