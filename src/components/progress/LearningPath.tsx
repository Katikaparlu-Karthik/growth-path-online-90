
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LearningPath as LearningPathType } from '@/lib/supabase/progress';

interface LearningPathProps {
  learningPathItems: LearningPathType[];
  isLoading: boolean;
}

const LearningPath = ({ learningPathItems, isLoading }: LearningPathProps) => {
  if (isLoading) {
    return <p>Loading learning path...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Growth Path</CardTitle>
        <CardDescription>Your personalized learning journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative border-l-2 border-gray-200 ml-3 pl-8 py-4 space-y-10">
          {learningPathItems.map((item, index) => (
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LearningPath;
