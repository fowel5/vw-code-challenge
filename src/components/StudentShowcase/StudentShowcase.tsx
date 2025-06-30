import { Link, useNavigate, useParams } from 'react-router';
import { useStudents } from '../../hooks/useStudents';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay/Overlay';
import { DeleteForm } from '../Forms/DeleteForm';

export default function StudentShowCase() {
  const { id } = useParams();
  const studentContext = useStudents();
  const [isDelete, setIsDelete] = useState(false);
  const navigate = useNavigate();

  const studentIdToSearch = parseInt(id || '0');
  if (studentContext === undefined) {
    return undefined;
  }

  const { students } = studentContext;
  const studentToShow = students.find((student) => student.id === studentIdToSearch);

  if (!studentToShow) {
    return <div className='text-center text-gray-500'>Student not found</div>;
  }

  const studentFields: Array<{ label: string; key: keyof typeof studentToShow; testid?: string; isMark?: boolean }> = [
    { label: 'ID', key: 'id' },
    { label: 'First Name', key: 'firstName', testid: 'firstName' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Email', key: 'email' },
    { label: 'Mark', key: 'mark', isMark: true },
  ];

  return (
    <div className='max-w-auto'>
      <Link to={'/'}>
        <button className='text-[#00A5A8] hover:underline font-semibold px-2 py-1 cursor-pointer absolute'>← Back to Home</button>
      </Link>
      <h2 className='text-2xl font-bold text-center pb-4'>Student Details</h2>
      <div className='flex justify-center mb-4 gap-4'>
        <button
          data-testid='edit'
          className='bg-[#00A5A8] hover:bg-[rgba(0,165,168,0.8)] text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200 cursor-pointer'
          onClick={() => navigate(`/student/${id}/edit`)}
        >
          Edit
        </button>
        <button
          data-testid='delete'
          className='bg-red-600 hover:opacity-75 text-white font-semibold px-4 py-2 rounded-lg shadow transition-opacity duration-200 cursor-pointer'
          onClick={() => setIsDelete(true)}
        >
          Delete
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='overflow-x-auto rounded-2xl shadow-md w-full max-w-lg'>
          <table className='min-w-full w-auto divide-y divide-gray-200'>
            <thead className='bg-[#00A5A8]'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium text-white'>Field</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-white'>Value</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              {studentFields.map((row) => (
                <tr key={row.label}>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>{row.label}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${row.isMark ? `font-bold ${Number(studentToShow[row.key]) < 5 ? 'text-red-600' : 'text-green-600'}` : ''}`}
                    {...(row.testid ? { 'data-testid': row.testid } : {})}
                  >
                    {studentToShow[row.key]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isDelete &&
        createPortal(
          <Overlay onClose={() => setIsDelete(false)}>
            <DeleteForm studentToDelete={studentToShow} onClose={() => setIsDelete(false)} />
          </Overlay>,
          document.body
        )}
    </div>
  );
}
