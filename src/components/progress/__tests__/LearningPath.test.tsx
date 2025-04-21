
import { render, screen } from '@testing-library/react';
import LearningPath from '../LearningPath';

const mockLearningPathItems = [
  {
    id: '1',
    title: 'Career Development Fundamentals',
    completed: true,
    order: 1,
  },
  {
    id: '2',
    title: 'Communication Skills',
    completed: false,
    order: 2,
  },
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

