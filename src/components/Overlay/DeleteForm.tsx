import { useNavigate } from 'react-router';
import type { Student } from '../../types/Student';

export function DeleteForm({ student, onClose }: { student: Student; onClose(): void }) {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <h2 className='text-xl font-bold mb-4'>Delete Student</h2>
      <p className='mb-6 text-gray-700'>
        Are you sure you want to delete{' '}
        <span className='font-semibold'>
          {student.firstName} {student.lastName}
        </span>
        ?
      </p>
      <div className='flex gap-4'>
        <button
          type='button'
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow'
          onClick={() => {
            onClose();
            navigate('/');
          }}
        >
          Delete
        </button>
        <button type='button' className='bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-semibold shadow' onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
