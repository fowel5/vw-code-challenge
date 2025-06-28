import { useState } from 'react';
import type { Student } from '../../types/Student';
import { createStudent } from '../../api/studentsApi';
import { useStudents } from '../../hooks/useStudents';

export default function CreateStudentForm({
  onClose,
}: {
  onClose: () => void;
}) {
  const { students, setStudents } = useStudents();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mark: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.firstName || !form.lastName || !form.email || !form.mark) {
      setError('You need to fill every field!');

      return;
    }

    const newStudent: Omit<Student, 'id'> = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      mark: Number(form.mark),
    };

    // TODO: add success message to show that it worked
    createStudent(newStudent)
      // if the request is successful, do not reload the page, just update the context and rerender the table
      .then((student) => setStudents([...students, student]))
      .catch((error) => alert(`Request failed with error: ${error}`));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
      <h2 className='text-xl font-bold mb-4'>Create New Student</h2>
      <div className='w-full mb-3'>
        <input
          name='firstName'
          placeholder='First Name'
          value={form.firstName}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded mb-2'
        />
        <input
          name='lastName'
          placeholder='Last Name'
          value={form.lastName}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded mb-2'
        />
        <input
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded mb-2'
          type='email'
        />
        <input
          name='mark'
          placeholder='Mark'
          value={form.mark}
          onChange={handleChange}
          className='w-full px-3 py-2 border rounded mb-2'
          type='number'
          min='0'
          max='10'
          step='0.1'
        />
      </div>
      {error && <div className='text-red-600 mb-2'>{error}</div>}
      <button
        type='submit'
        className='bg-[#00A5A8] hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow mt-2'
      >
        Create
      </button>
    </form>
  );
}
