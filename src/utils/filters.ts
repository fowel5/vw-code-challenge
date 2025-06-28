// I need the extends Record<string, unknown> in order to make Object.values(item),
// It could be anything but I want to ensure those are only objects
export function searchData<T extends Record<string, unknown>>(
  data: T[],
  wordToSearch: string
): T[] {
  return data.filter((item) => {
    return JSON.stringify(Object.values(item))
      .toLowerCase()
      .includes(wordToSearch.toLowerCase());
  });
}
