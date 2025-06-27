import type { Student } from '../types/Student';

export async function fetchStudents(): Promise<Student[]> {
  return fetch('http://localhost:3000/students').then((res) => res.json());
}
