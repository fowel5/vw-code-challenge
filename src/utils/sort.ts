import type { Student } from '../types/Student';

export type SortConfigType = {
  key: keyof Student;
  direction: 'asc' | 'desc';
};

export function sortStudents<T extends Record<string, string | number>>(data: T[], sortConfig: SortConfigType): T[] {
  // sort mutes the data, so we give a shallow copy of data
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const result = (aValue as string).localeCompare(bValue as string);

    return sortConfig.direction === 'asc' ? result : -result;
  });
}
