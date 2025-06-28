import { useContext } from 'react';
import { StudentContext } from '../logic/StudentsProvider';
import type { Student } from '../types/Student';
import { useNavigate } from 'react-router';

export function useStudents(): {
  students: Student[];
  setStudents(students: Student[]): void;
} {
  const studentContextValue = useContext(StudentContext);
  const navigate = useNavigate();

  if (studentContextValue === undefined) {
    navigate('/error');

    return { students: [], setStudents: () => {} };
  }

  return studentContextValue;
}
