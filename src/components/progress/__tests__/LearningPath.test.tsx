
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import LearningPath from '../LearningPath';
import type { LearningPath as LearningPathType } from '@/lib/supabase/progress';

const mockLearningPathItems: LearningPathType[] = [
  {
    id: '1',
    user_id: 'test-user-1',
    title: 'Career Development Fundamentals',
    completed: true,
    order: 1,
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'test-user-1',
    title: 'Communication Skills',
    completed: false,
    order: 2,
    created_at: '2024-01-01T00:00:00Z'
  }
];

describe('LearningPath', () => {
  it('renders loading state', () => {
    render(<LearningPath learningPathItems={[]} isLoading={true} />);
    expect(screen.getByText('Loading learning path...')).toBeInTheDocument();
  });

  it('renders learning path items', () => {
    render(<LearningPath learningPathItems={mockLearningPathItems} isLoading={false} />);
    
    expect(screen.getByText('Career Development Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Communication Skills')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });
});
