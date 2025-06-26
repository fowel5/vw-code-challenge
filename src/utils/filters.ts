import type { Student } from '../types/Student';

export function searchStudent(
  data: Student[],
  wordToSearch: string
): Student[] {
  return data.filter((item) => {
    return JSON.stringify(item)
      .toLowerCase()
      .includes(wordToSearch.toLowerCase());
  });
}
