import { renderHook } from '@testing-library/react';
import { useStudents } from './useStudents';
import { StudentContext } from '../logic/StudentsProvider';
import type { ReactNode } from 'react';

vi.mock('react-router', async () => {
  return {
    useNavigate: () => vi.fn(),
  };
});

const mockStudents = [
  {
    id: '1',
    firstName: 'Alice',
    lastName: 'Smith',
    email: 'alice@example.com',
    mark: 7.3,
  },
  {
    id: '2',
    firstName: 'Bob',
    lastName: 'Johnson',
    email: 'bob@example.com',
    mark: 2.4,
  },
];
const setStudents = vi.fn();

describe('useStudents', () => {
  it('returns right values from context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <StudentContext.Provider value={{ students: mockStudents, setStudents }}>
        {children}
      </StudentContext.Provider>
    );

    const { result } = renderHook(() => useStudents(), { wrapper });

    expect(result.current).toStrictEqual({
      students: mockStudents,
      setStudents,
    });
  });

  it('handles the undefined from the context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <StudentContext.Provider value={undefined}>
        {children}
      </StudentContext.Provider>
    );

    const { result } = renderHook(() => useStudents(), { wrapper });

    // since we return a function from the context and we check it with another function, we can not check for strict equality
    // Background: () => {} !== () => {}
    expect(result.current.students).toEqual([]);
    expect(typeof result.current.setStudents).toBe('function');
  });
});
