export type SortConfigType<T> = {
  key: keyof T;
  direction: 'asc' | 'desc';
};

export function sortObjects<T>(data: T[], sortConfig: SortConfigType<T>): T[] {
  // sort mutes the data, so we give a shallow copy of data
  return [...data].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    const result = String(aValue).localeCompare(String(bValue));

    return sortConfig.direction === 'asc' ? result : -result;
  });
}
