import { useNavigate, useParams } from 'react-router';
import { useStudents } from '../../hooks/useStudents';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Overlay from '../Overlay/Overlay';
import { DeleteForm } from '../Overlay/DeleteForm';

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

  return (
    <div className='p-6 max-w-auto h-[80vh]'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Student Details</h2>
      <div className='flex justify-center mb-4 gap-4'>
        <button
          className='bg-[#00A5A8] hover:bg-[rgba(0,165,168,0.8)] text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200 cursor-pointer'
          onClick={() => navigate(`/student/${id}/edit`)}
        >
          Edit
        </button>
        <button className='bg-red-600 hover:opacity-75 text-white font-semibold px-4 py-2 rounded-lg shadow transition-opacity duration-200 cursor-pointer' onClick={() => setIsDelete(true)}>
          Delete
        </button>
      </div>
      <div className='flex justify-center'>
        <div className='overflow-x-auto rounded-2xl shadow-md w-full max-w-lg'>
          <table className='min-w-full w-auto divide-y divide-gray-200'>
            <thead className='bg-[#00A5A8]'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-700'>Field</th>
                <th className='px-6 py-3 text-left text-sm font-medium text-gray-700'>Value</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-100'>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>ID</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{studentToShow.id}</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>First Name</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{studentToShow.firstName}</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>Last Name</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{studentToShow.lastName}</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>Email</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{studentToShow.email}</td>
              </tr>
              <tr>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-semibold'>Mark</td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-bold ${studentToShow.mark < 5 ? 'text-red-600' : 'text-green-600'}`}>{studentToShow.mark}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isDelete &&
        createPortal(
          <Overlay onClose={() => setIsDelete(false)}>
            <DeleteForm student={studentToShow} onClose={() => setIsDelete(false)} />
          </Overlay>,
          document.body
        )}
    </div>
  );
}
