
import { render, screen } from '@testing-library/react';
import SkillsAssessment from '../SkillsAssessment';

const mockSkillProgress = [
  {
    id: '1',
    skill_name: 'Leadership',
    progress: 75,
  },
  {
    id: '2',
    skill_name: 'Communication',
    progress: 85,
  },
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

