import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

// Mock mockData because it may change
vi.mock('../../utils/mockData', () => ({
  data: [
    {
      id: 1,
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      note: 'Excellent',
    },
    {
      id: 2,
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      note: 'Good',
    },
  ],
}));

describe('BeautifulTable', () => {
  it('renders table headers', () => {
    render(<DataTable />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Note')).toBeInTheDocument();
  });

  it('renders all students initially', () => {
    render(<DataTable />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('filters students by first name', () => {
    render(<DataTable />);
    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'Alice' } });
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('filters students by last name', () => {
    render(<DataTable />);
    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'Johnson' } });
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
  });
});
