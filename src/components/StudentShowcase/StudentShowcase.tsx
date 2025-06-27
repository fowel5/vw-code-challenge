import { useParams } from 'react-router';
import { useStudents } from '../../hooks/useStudents';

export default function StudentShowCase() {
  const { id } = useParams();
  const studentContext = useStudents();

  if (studentContext === undefined) {
    return undefined;
  }

  const { students } = studentContext;
  const studentToShow = students.find((student) => student.id === id);

  if (!studentToShow) {
    return <div className='text-center text-gray-500'>Student not found</div>;
  }

  return (
    <div className='p-6 max-w-auto'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Student Details</h2>
      <div className='flex justify-center'>
        <div className='overflow-x-auto rounded-2xl shadow-md w-full max-w-lg'>
          <table className='min-w-full w-auto divide-y divide-gray-200'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-700'>
                  Field
                </th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-700'>
                  Value
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>
                  ID
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {studentToShow.id}
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>
                  First Name
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {studentToShow.firstName}
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>
                  Last Name
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {studentToShow.lastName}
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>
                  Email
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                  {studentToShow.email}
                </td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>
                  Mark
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${
                    studentToShow.mark < 5 ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {studentToShow.mark}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
