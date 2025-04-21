
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

export const fetchUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateSkillProgress = async (
  userId: string,
  skillName: string,
  progress: number
) => {
  const { data, error } = await supabase
    .from('skill_progress')
    .upsert(
      {
        user_id: userId,
        skill_name: skillName,
        progress,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,skill_name' }
    );

  if (error) throw error;
  return data;
};

export const fetchLearningPath = async (userId: string) => {
  const { data, error } = await supabase
    .from('learning_paths')
    .select('*')
    .eq('user_id', userId)
    .order('order', { ascending: true });

  if (error) throw error;
  return data;
};

export const updateLearningPathItem = async (
  userId: string,
  itemId: string,
  completed: boolean
) => {
  const { data, error } = await supabase
    .from('learning_paths')
    .update({ completed })
    .match({ id: itemId, user_id: userId });

  if (error) throw error;
  return data;
};
