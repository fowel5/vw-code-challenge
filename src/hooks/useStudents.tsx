import { useContext } from 'react';
import { StudentContext } from '../logic/StudentsProvider';
import type { Student } from '../types/Student';

export function useStudents():
  | { students: Student[]; setStudents(students: Student[]): void }
  | undefined {
  const studentContextValue = useContext(StudentContext);

  if (studentContextValue === undefined) {
    return undefined;
  }

  return studentContextValue;
}
