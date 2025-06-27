import { renderHook } from '@testing-library/react';
import { useStudents } from './useStudents';
import { StudentContext } from '../logic/StudentsProvider';
import type { ReactNode } from 'react';

const mockStudents = [
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
];
const setStudents = vi.fn();

describe('useStudents', () => {
  it('returns value from context', () => {
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

  it('returns value from context', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <StudentContext.Provider value={undefined}>
        {children}
      </StudentContext.Provider>
    );

    const { result } = renderHook(() => useStudents(), { wrapper });

    expect(result.current).toStrictEqual(undefined);
  });
});
