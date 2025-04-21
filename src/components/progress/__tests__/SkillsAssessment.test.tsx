
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SkillsAssessment from '../SkillsAssessment';
import type { SkillProgress } from '@/lib/supabase/progress';

const mockSkillProgress: SkillProgress[] = [
  {
    id: '1',
    user_id: 'test-user-1',
    skill_name: 'Leadership',
    progress: 75,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    user_id: 'test-user-1',
    skill_name: 'Communication',
    progress: 85,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

describe('SkillsAssessment', () => {
  it('renders loading state', () => {
    render(<SkillsAssessment skillProgress={[]} isLoading={true} />);
    expect(screen.getByText('Loading skills...')).toBeInTheDocument();
  });

  it('renders skills with progress bars', () => {
    render(<SkillsAssessment skillProgress={mockSkillProgress} isLoading={false} />);
    
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
    expect(screen.getByText('Communication')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });
});
