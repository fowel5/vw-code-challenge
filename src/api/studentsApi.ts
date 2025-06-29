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

export async function updateStudent(studentToUpdate: Student): Promise<Student> {
  return fetch(`http://localhost:3000/students/${studentToUpdate.id}`, {
    body: JSON.stringify(studentToUpdate),
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}

export async function deleteStudent(id: number): Promise<void> {
  return fetch(`http://localhost:3000/students/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json());
}
