
import { render, screen } from '@testing-library/react';
import StatsCards from '../StatsCards';

describe('StatsCards', () => {
  it('renders all stats cards with correct information', () => {
    render(<StatsCards />);
    
    expect(screen.getByText('Total Sessions')).toBeInTheDocument();
    expect(screen.getByText('24')).toBeInTheDocument();
    expect(screen.getByText('Goals Completed')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('Learning Hours')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
  });
});
