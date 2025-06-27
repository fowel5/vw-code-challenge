import {
  createContext,
  useEffect,
  useState,
  type JSX,
  type ReactNode,
} from 'react';
import type { Student } from '../types/Student';

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

export const StudentsProvider = ({
  children,
}: StudentsProviderProps): JSX.Element => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/students')
      .then((res) => res.json())
      .then((students) => setStudents(students));
  }, []);

  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
};
