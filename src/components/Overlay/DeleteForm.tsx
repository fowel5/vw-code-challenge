import { useNavigate } from 'react-router';
import type { Student } from '../../types/Student';
import { deleteStudent } from '../../api/studentsApi';
import { useStudents } from '../../hooks/useStudents';
import { toast } from 'react-toastify';

export function DeleteForm({ studentToDelete, onClose }: { studentToDelete: Student; onClose(): void }) {
  const navigate = useNavigate();
  const { students, setStudents } = useStudents();

  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <h2 className='text-xl font-bold mb-4'>Delete Student</h2>
      <p className='mb-6 text-gray-700'>
        Are you sure you want to delete{' '}
        <span className='font-semibold'>
          {studentToDelete.firstName} {studentToDelete.lastName}
        </span>
        ?
      </p>
      <div className='flex gap-4'>
        <button
          data-testid='finaldelete'
          type='button'
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold shadow'
          onClick={() => {
            deleteStudent(studentToDelete.id)
              .then(() => {
                setStudents(
                  students.filter((student) => {
                    return student.id !== studentToDelete.id;
                  })
                );
                toast.success(`The student ${studentToDelete.firstName} ${studentToDelete.lastName} with ID ${studentToDelete.id} was successfully deleted`);
              })
              .catch(() => toast.error('The student could not be deleted'));
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
