import { useState } from 'react';
import { searchStudent } from '../../utils/filters';
import { useStudents } from '../../hooks/useStudents';
import { useNavigate } from 'react-router';

export default function DataTable() {
  const [search, setSearch] = useState('');
  const studentsContext = useStudents();
  const navigate = useNavigate();

  if (studentsContext === undefined) {
    return;
  }

  const { students } = studentsContext;
  const filteredData = searchStudent(students, search);

  return (
    <div className='p-6 max-w-full h-[80vh]'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Students Overview</h1>
      <input
        type='text'
        placeholder='Search users...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='mb-4 w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
      <div className='overflow-x-auto overflow-y-scroll rounded-2xl shadow-md'>
        <table className='min-w-full w-auto divide-gray-200'>
          <thead className='bg-gray-100 sticky top-0'>
            <tr>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-700'>
                ID
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-700'>
                First Name
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-700'>
                Last Name
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-700'>
                Email
              </th>
              <th className='px-6 py-4 text-left text-sm font-medium text-gray-700'>
                Mark
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student) => (
              <tr
                key={student.id}
                className='hover:bg-gray-50 transition-colors duration-200'
                onClick={() => {
                  navigate(`/student/${student.id}`);
                }}
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {student.id}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {student.firstName}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                  {student.lastName}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                  {student.email}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    student.mark < 5 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {student.mark}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
