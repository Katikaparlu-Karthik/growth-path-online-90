
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SkillProgress } from '@/lib/supabase/progress';

interface SkillsAssessmentProps {
  skillProgress: SkillProgress[];
  isLoading: boolean;
}

const SkillsAssessment = ({ skillProgress, isLoading }: SkillsAssessmentProps) => {
  if (isLoading) {
    return <p>Loading skills...</p>;
  }

  return (
    <div className="space-y-6">
      {skillProgress.map((skill) => (
        <div key={skill.id} className="space-y-2">
          <div className="flex justify-between">
            <span className="font-medium">{skill.skill_name}</span>
            <span>{skill.progress}%</span>
          </div>
          <Progress value={skill.progress} className="h-2" />
        </div>
      ))}
    </div>
  );
};

export default SkillsAssessment;
