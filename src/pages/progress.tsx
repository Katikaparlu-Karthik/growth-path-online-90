
import React, { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from '@tanstack/react-query';
import { fetchUserProgress, fetchLearningPath, type SkillProgress, type LearningPath } from '@/lib/supabase/progress';
import StatsCards from '@/components/progress/StatsCards';
import MonthlyProgressChart from '@/components/progress/MonthlyProgressChart';
import SkillsAssessment from '@/components/progress/SkillsAssessment';
import LearningPathComponent from '@/components/progress/LearningPath';
import { Card, CardContent } from '@/components/ui/card';

const ProgressTracker: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      } else {
        // For development purposes, set a mock user ID
        setUserId('mock-user-id');
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
      
      <StatsCards />
      
      <Tabs defaultValue="overview">
        <TabsList className="mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="learning-path">Learning Path</TabsTrigger>
          <TabsTrigger value="goals">Goals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <MonthlyProgressChart />
            <Card>
              <CardContent className="h-80">
                <SkillsAssessment skillProgress={skillProgress} isLoading={isLoadingSkills} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardContent>
              <SkillsAssessment skillProgress={skillProgress} isLoading={isLoadingSkills} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="learning-path">
          <LearningPathComponent 
            learningPathItems={learningPathItems} 
            isLoading={isLoadingPath}
          />
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
