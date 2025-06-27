import { render, screen, fireEvent } from '@testing-library/react';
import DataTable from './DataTable';

describe('BeautifulTable', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [
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
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders table headers', async () => {
    render(<DataTable />);
    expect(await screen.findByText('ID')).toBeInTheDocument();
    expect(await screen.findByText('First Name')).toBeInTheDocument();
    expect(await screen.findByText('Last Name')).toBeInTheDocument();
    expect(await screen.findByText('Email')).toBeInTheDocument();
    expect(await screen.findByText('Mark')).toBeInTheDocument();
  });

  it('renders all students initially', async () => {
    render(<DataTable />);
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(await screen.findByText('Bob')).toBeInTheDocument();
    expect(await screen.findByText('alice@example.com')).toBeInTheDocument();
    expect(await screen.findByText('bob@example.com')).toBeInTheDocument();
  });

  it('filters students by first name', async () => {
    render(<DataTable />);
    const input = await screen.findByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'Alice' } });
    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(await screen.queryByText('Bob')).not.toBeInTheDocument();
  });

  it('filters students by last name', async () => {
    render(<DataTable />);
    const input = await screen.findByPlaceholderText('Search users...');
    fireEvent.change(input, { target: { value: 'Johnson' } });
    expect(await screen.findByText('Bob')).toBeInTheDocument();
    expect(await screen.queryByText('Alice')).not.toBeInTheDocument();
  });
});
