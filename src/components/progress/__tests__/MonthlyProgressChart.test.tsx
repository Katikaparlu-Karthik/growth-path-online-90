
import { render, screen } from '@testing-library/react';
import MonthlyProgressChart from '../MonthlyProgressChart';

describe('MonthlyProgressChart', () => {
  it('renders chart with title', () => {
    render(<MonthlyProgressChart />);
    
    expect(screen.getByText('Monthly Progress')).toBeInTheDocument();
    expect(screen.getByText('Sessions and goals over time')).toBeInTheDocument();
  });
});

