import { useState } from 'react';
import { searchData } from '../../utils/filters';
import { useStudents } from '../../hooks/useStudents';
import { useNavigate } from 'react-router';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay/Overlay';
import StudentForm from '../Forms/StudentForm';
import useDebounce from '../../hooks/useDebounce';
import type { Student } from '../../types/Student';
import { sortObjectsArrayById } from '../../utils/sort';

type SortConfigType = {
  key: keyof Student;
  direction: 'asc' | 'desc';
};

const columns: Array<{ key: keyof Student; label: string }> = [
  { key: 'id', label: 'ID' },
  { key: 'firstName', label: 'First Name' },
  { key: 'lastName', label: 'Last Name' },
  { key: 'email', label: 'Email' },
  { key: 'mark', label: 'Mark' },
];

export default function DataTable() {
  const [search, setSearch] = useState('');

  // Use debounced value to avoid that the table updates its state shifting
  // the rows. It is also useful if we did the search function via API
  const debouncedSearchValue = useDebounce(search, 300);
  const [showOverlay, setShowOverlay] = useState(false);
  const studentsContext = useStudents();
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState<SortConfigType>({
    key: 'id',
    direction: 'asc',
  });

  const { students } = studentsContext;
  const filteredData = searchData(students, debouncedSearchValue);

  const sortedData = sortObjectsArrayById(filteredData, sortConfig);

  const handleSort = (key: keyof Student) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }

      // By default we will always sort in asc if new key
      return { key, direction: 'asc' };
    });
  };

  return (
    <div className='max-w-auto'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Students Overview</h1>
      <div className='flex items-center gap-4 mb-4 w-full flex-col sm:flex-row'>
        <div>
          <button
            className='bg-[#00A5A8] hover:bg-[rgba(0,165,168,0.8)] text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200 cursor-pointer'
            onClick={() => setShowOverlay(true)}
          >
            + New Student
          </button>
        </div>
        <div className='flex-1 flex justify-end'>
          <input
            type='text'
            placeholder='Search students...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg shadow-sm outline-[#00A5A8]'
          />
        </div>
      </div>
      <div className='overflow-x-auto overflow-y-scroll rounded-2xl shadow-md max-h-[65vh]'>
        <table className='min-w-full w-auto'>
          <thead className='bg-[#00A5A8] sticky top-0 '>
            <tr>
              {columns.map((col) => (
                <th key={col.key} onClick={() => handleSort(col.key)} className='px-6 py-4 text-left text-sm font-medium text-white cursor-pointer select-none w-[100vw]'>
                  {col.label}
                  {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((student) => (
              <tr key={student.id} className='hover:bg-[rgba(0,165,168,0.1)] transition-colors duration-200 cursor-pointer' onClick={() => navigate(`/student/${student.id}`)}>
                {columns.map((col) => (
                  <td
                    data-testid={col.key}
                    key={col.key}
                    className={`px-6 py-4 text-sm text-gray-900 ${col.key === 'mark' ? `font-bold ${student.mark < 5 ? 'text-red-600' : 'text-green-600'}` : ''}`}
                  >
                    {student[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showOverlay &&
        createPortal(
          <Overlay
            onClose={() => {
              setShowOverlay(false);
            }}
          >
            <StudentForm
              onClose={() => {
                setShowOverlay(false);
              }}
            />
          </Overlay>,
          document.body
        )}
    </div>
  );
}
