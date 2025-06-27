import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { act, render, waitFor } from '@testing-library/react';
import { StudentsProvider, StudentContext } from './StudentsProvider';
import type { Student } from '../types/Student';
import React from 'react';

const mockStudents: Student[] = [
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

describe('StudentsProvider', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockStudents),
      })
    ) as unknown as typeof fetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('fetches students and provides them via context', async () => {
    let contextValue:
      | { students: Student[]; setStudents: (students: Student[]) => void }
      | undefined = undefined;

    const MockedComponent = () => {
      contextValue = React.useContext(StudentContext);

      return null;
    };

    render(
      <StudentsProvider>
        <MockedComponent />
      </StudentsProvider>
    );

    await waitFor(() => {
      expect(contextValue).toEqual({
        students: mockStudents,
        setStudents: expect.any(Function),
      });
    });
  });

  it('setStudents updates the students in context', async () => {
    let contextValue:
      | { students: Student[]; setStudents: (students: Student[]) => void }
      | undefined = undefined;

    const MockedComponent = () => {
      contextValue = React.useContext(StudentContext);

      return null;
    };

    render(
      <StudentsProvider>
        <MockedComponent />
      </StudentsProvider>
    );

    await waitFor(() => {
      expect(contextValue?.students).toEqual(mockStudents);
    });

    const newStudents: Student[] = [
      {
        id: 3,
        firstName: 'Charlie',
        lastName: 'Brown',
        email: 'charlie@example.com',
        mark: 5.0,
      },
    ];

    act(() => {
      contextValue!.setStudents([...mockStudents, ...newStudents]);
    });

    await waitFor(() => {
      expect(contextValue).toEqual({
        students: [...mockStudents, ...newStudents],
        setStudents: expect.any(Function),
      });
    });
  });
});
