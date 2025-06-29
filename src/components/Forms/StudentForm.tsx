import { useState } from 'react';
import type { Student } from '../../types/Student';
import { createStudent, updateStudent } from '../../api/studentsApi';
import { useStudents } from '../../hooks/useStudents';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';

export default function StudentForm({ onClose }: { onClose: () => void }) {
  const { students, setStudents } = useStudents();
  const { id } = useParams();

  const parsedId = parseInt(id || '0');
  // If there is a student to find, the form will work as a edit form
  // If there is NO student, it would be a create form.
  const studentToFind = students.find((student) => student.id === parsedId);

  const [form, setForm] = useState(studentToFind ? studentToFind : { id: '', firstName: '', lastName: '', email: '', mark: '' });

  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName || !form.email || !form.mark) {
      setError('You need to fill every field!');

      return;
    }

    if (!studentToFind) {
      const newStudent: Omit<Student, 'id'> = {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mark: Number(form.mark),
      };

      createStudent(newStudent)
        // if the request is successful, do not reload the page nor send a fetch, just update the context and rerender the table
        .then((student) => {
          setStudents([...students, student]);
          toast.success(`The student ${student.firstName} ${student.lastName} was successfully created`);
        })
        .catch(() => toast.error('Student could not be created'));
      navigate('/');
    }

    if (studentToFind) {
      const studentToUpdate: Student = {
        id: studentToFind.id,
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        mark: Number(form.mark),
      };
      updateStudent(studentToUpdate)
        .then((updatedStudent) => {
          setStudents(students.map((student) => (student.id === updatedStudent.id ? updatedStudent : student)));
          toast.success(`The student was successfully updated`);
        })
        .catch(() => toast.error('The student could not be updated'));
      navigate(`/student/${id}`);
    }

    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={`w-full max-w-[30vw] flex flex-col justify-self-center items-center ${studentToFind ? 'h-[80vh] p-6' : ''}`}>
        <h2 className='text-2xl font-bold mb-4 text-center'>{studentToFind ? `Edit Student with ID: ${studentToFind.id}` : 'Create New Student'}</h2>
        <div className='w-full mb-3'>
          <input required={true} name='firstName' placeholder='First Name' value={form.firstName} onChange={handleChange} className='w-full px-3 py-2 border rounded mb-2' />
          <input required={true} name='lastName' placeholder='Last Name' value={form.lastName} onChange={handleChange} className='w-full px-3 py-2 border rounded mb-2' />
          <input required={true} name='email' placeholder='Email' value={form.email} onChange={handleChange} className='w-full px-3 py-2 border rounded mb-2' type='email' />
          <input required={true} name='mark' placeholder='Mark' value={form.mark} onChange={handleChange} className='w-full px-3 py-2 border rounded mb-2' type='number' min='0' max='10' step='0.1' />
        </div>
        {error && <div className='text-red-600 mb-2'>{error}</div>}
        <div className='flex gap-4'>
          <button type='submit' className='bg-[#00A5A8] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow mt-2'>
            {studentToFind ? 'Save' : 'Create'}
          </button>
          {studentToFind ? (
            <button type='button' onClick={() => navigate(`/student/${id}`)} className='bg-[#00A5A8] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow mt-2'>
              Cancel
            </button>
          ) : (
            ''
          )}
        </div>
      </form>
    </>
  );
}
