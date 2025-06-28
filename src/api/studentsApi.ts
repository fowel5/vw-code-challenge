import type { Student } from '../types/Student';

export async function fetchStudents(): Promise<Student[]> {
  return fetch('http://localhost:3000/students').then((res) => res.json());
}

export async function createStudent(newStudent: Omit<Student, 'id'>): Promise<Student> {
  return fetch('http://localhost:3000/students', {
    body: JSON.stringify(newStudent),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
