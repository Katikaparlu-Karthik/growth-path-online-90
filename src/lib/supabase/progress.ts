
import { supabase } from "@/integrations/supabase/client";

export interface SkillProgress {
  id: string;
  user_id: string;
  skill_name: string;
  progress: number;
  created_at: string;
  updated_at: string;
}

export interface LearningPath {
  id: string;
  user_id: string;
  title: string;
  completed: boolean;
  order: number;
  created_at: string;
}

// Mock data for skill progress since we're using user_progress table
export const fetchUserProgress = async (userId: string) => {
  // Since skill_progress doesn't exist in the database, we'll mock the data
  const mockSkillProgress: SkillProgress[] = [
    { 
      id: '1', 
      user_id: userId, 
      skill_name: 'Leadership', 
      progress: 75, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '2', 
      user_id: userId, 
      skill_name: 'Communication', 
      progress: 85, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '3', 
      user_id: userId, 
      skill_name: 'Technical Skills', 
      progress: 60, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '4', 
      user_id: userId, 
      skill_name: 'Problem Solving', 
      progress: 90, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    { 
      id: '5', 
      user_id: userId, 
      skill_name: 'Time Management', 
      progress: 70, 
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
  ];

  // For now, we'll just return the mock data
  // In a real implementation, you would create these tables in Supabase
  return mockSkillProgress;
};

export const updateSkillProgress = async (
  userId: string,
  skillName: string,
  progress: number
) => {
  // Since we're using mock data, we'll just log the update
  console.log(`Updating skill progress for user ${userId}: ${skillName} = ${progress}%`);
  // In a real implementation, you would update the skill_progress table
  return { success: true };
};

export const fetchLearningPath = async (userId: string) => {
  // Since learning_paths doesn't exist in the database, we'll mock the data
  const mockLearningPath: LearningPath[] = [
    {
      id: '1',
      user_id: userId,
      title: 'Career Development Fundamentals',
      completed: true,
      order: 1,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      user_id: userId,
      title: 'Communication Skills for Professionals',
      completed: true,
      order: 2,
      created_at: new Date().toISOString()
    },
    {
      id: '3',
      user_id: userId,
      title: 'Leadership Essentials',
      completed: true,
      order: 3,
      created_at: new Date().toISOString()
    },
    {
      id: '4',
      user_id: userId,
      title: 'Advanced Problem Solving',
      completed: false,
      order: 4,
      created_at: new Date().toISOString()
    },
    {
      id: '5',
      user_id: userId,
      title: 'Building Professional Networks',
      completed: false,
      order: 5,
      created_at: new Date().toISOString()
    }
  ];

  // For now, we'll just return the mock data
  return mockLearningPath;
};

export const updateLearningPathItem = async (
  userId: string,
  itemId: string,
  completed: boolean
) => {
  // Since we're using mock data, we'll just log the update
  console.log(`Updating learning path item ${itemId} for user ${userId}: completed = ${completed}`);
  // In a real implementation, you would update the learning_paths table
  return { success: true };
};
