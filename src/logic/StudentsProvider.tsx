import { createContext, useEffect, useState, type JSX, type ReactNode } from 'react';
import type { Student } from '../types/Student';
import { fetchStudents } from '../api/studentsApi';

type StudentsProviderProps = {
  children?: ReactNode;
};

// eslint-disable-next-line react-refresh/only-export-components
export const StudentContext = createContext<
  | {
      students: Student[];
      setStudents: (students: Student[]) => void;
    }
  | undefined
>(undefined);

export const StudentsProvider = ({ children }: StudentsProviderProps): JSX.Element => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isRequestFailed, setIsRequestFailed] = useState(false);

  useEffect(() => {
    fetchStudents()
      .then((students) => setStudents(students))
      .catch(() => setIsRequestFailed(true));
  }, []);

  return <StudentContext.Provider value={isRequestFailed ? undefined : { students, setStudents }}>{children}</StudentContext.Provider>;
};
