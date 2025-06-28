import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DataTable from './DataTable';

vi.mock('react-router', async () => {
  return {
    useNavigate: () => vi.fn(),
  };
});

vi.mock('../../hooks/useStudents', () => ({
  useStudents: () => ({
    students: [
      {
        id: 1,
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        mark: 7.3,
      },
      {
        id: 2,
        firstName: 'Bob',
        lastName: 'Johnson',
        email: 'bob@example.com',
        mark: 2.4,
      },
    ],
    setStudents: vi.fn(),
  }),
}));

describe('DataTable', () => {
  // There is no need for this tests to be async, since the data is mocked and no fetch operations are
  // done directly.
  it('renders table headers', () => {
    render(<DataTable />);
    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Last Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Mark')).toBeInTheDocument();
  });

  it('renders all students initially', async () => {
    render(<DataTable />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    expect(screen.getByText('bob@example.com')).toBeInTheDocument();
  });

  it('filters students by first name', async () => {
    render(<DataTable />);
    const input = await screen.findByPlaceholderText('Search students...');
    fireEvent.change(input, { target: { value: 'Alice' } });
    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  it('filters students by last name', async () => {
    render(<DataTable />);
    const input = await screen.findByPlaceholderText('Search students...');
    fireEvent.change(input, { target: { value: 'Johnson' } });

    await waitFor(() => {
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });
});
