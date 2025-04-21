import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchUserProgress, fetchLearningPath, updateLearningPathItem, type SkillProgress, type LearningPath } from '@/lib/supabase/progress';
import { toast } from '@/components/ui/use-toast';

const skillProgress = [
  { name: 'Leadership', progress: 75 },
  { name: 'Communication', progress: 85 },
  { name: 'Technical Skills', progress: 60 },
  { name: 'Problem Solving', progress: 90 },
  { name: 'Time Management', progress: 70 },
];

const monthlyData = [
  { name: 'Jan', sessions: 2, goals: 1 },
  { name: 'Feb', sessions: 4, goals: 2 },
  { name: 'Mar', sessions: 3, goals: 3 },
  { name: 'Apr', sessions: 5, goals: 4 },
  { name: 'May', sessions: 6, goals: 4 },
  { name: 'Jun', sessions: 8, goals: 5 },
];

const learningPath = [
  { id: 1, title: 'Career Development Fundamentals', completed: true },
  { id: 2, title: 'Communication Skills for Professionals', completed: true },
  { id: 3, title: 'Leadership Essentials', completed: true },
  { id: 4, title: 'Advanced Problem Solving', completed: false },
  { id: 5, title: 'Building Professional Networks', completed: false },
];

const ProgressTracker: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    getUser();
  }, []);

  const { data: skillProgress = [], isLoading: isLoadingSkills } = useQuery({
    queryKey: ['skillProgress', userId],
    queryFn: () => fetchUserProgress(userId!),
    enabled: !!userId,
  });

  const { data: learningPathItems = [], isLoading: isLoadingPath } = useQuery({
    queryKey: ['learningPath', userId],
    queryFn: () => fetchLearningPath(userId!),
    enabled: !!userId,
  });

  const updatePathItemMutation = useMutation({
    mutationFn: ({ itemId, completed }: { itemId: string; completed: boolean }) =>
      updateLearningPathItem(userId!, itemId, completed),
    onSuccess: () => {
      toast({
        title: "Progress updated",
        description: "Your learning path has been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update progress. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!userId) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">Please log in to view your progress.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Progress Tracker</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Total Sessions</CardTitle>
            <CardDescription>All mentor sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-mentor-500">24</div>
            <p className="text-sm text-gray-500 mt-1">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Goals Completed</CardTitle>
            <CardDescription>Career milestones achieved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-learner-500">12</div>
            <p className="text-sm text-gray-500 mt-1">75% completion rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Learning Hours</CardTitle>
            <CardDescription>Total time invested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-indigo-500">48</div>
            <p className="text-sm text-gray-500 mt-1">+8 from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>Sessions and goals over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="sessions" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="goals" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Skill Assessment</CardTitle>
                <CardDescription>Personal and professional skills</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillProgress} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="progress" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Top Skills to Improve</CardTitle>
                <CardDescription>Based on mentor recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {skillProgress.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills Assessment</CardTitle>
              <CardDescription>Your progress in key skill areas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isLoadingSkills ? (
                  <p>Loading skills...</p>
                ) : (
                  skillProgress.map((skill: SkillProgress) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{skill.skill_name}</span>
                        <span>{skill.progress}%</span>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning-path">
          <Card>
            <CardHeader>
              <CardTitle>Professional Growth Path</CardTitle>
              <CardDescription>Your personalized learning journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative border-l-2 border-gray-200 ml-3 pl-8 py-4 space-y-10">
                {isLoadingPath ? (
                  <p>Loading learning path...</p>
                ) : (
                  learningPathItems.map((item: LearningPath, index: number) => (
                    <div key={item.id} className="relative">
                      <div className={`absolute w-6 h-6 rounded-full -left-11 flex items-center justify-center ${
                        item.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        {item.completed && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                      <div className="mb-1 text-lg font-semibold">{item.title}</div>
                      <div className="text-sm text-gray-500">
                        {item.completed ? 'Completed' : 'In progress'}
                      </div>
                      {index < learningPathItems.length - 1 && (
                        <div className="absolute h-12 border-l-2 border-gray-200 -left-11 top-6"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="goals">
          <div className="text-center py-12">
            <p className="text-gray-500">Your career goals and progress will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgressTracker;
