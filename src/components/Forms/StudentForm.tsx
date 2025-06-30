import { useEffect, useState } from 'react';
import type { Student } from '../../types/Student';
import { createStudent, updateStudent } from '../../api/studentsApi';
import { useStudents } from '../../hooks/useStudents';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { isDirtyOrNotFilled } from '../../helpers/isDirtyOrNotFilled';

export default function StudentForm({ onClose }: { onClose: () => void }) {
  const { students, setStudents } = useStudents();
  const { id } = useParams();

  const parsedId = parseInt(id || '0');
  // If there is a student to find, the form will work as a edit form
  // If there is NO student, it would be a create form.
  const studentToFind = students.find((student) => student.id === parsedId);

  const [form, setForm] = useState(studentToFind ? { ...studentToFind, mark: String(studentToFind.mark) } : { id: '', firstName: '', lastName: '', email: '', mark: '' });
  const [isSubmitButtonEnabled, setIsSubmitButtonEnabled] = useState(false);

  // Use it as safety net if you visit directly the route without loading the context first
  useEffect(() => {
    if (studentToFind) {
      setForm({ ...studentToFind, mark: String(studentToFind.mark) });
    }
  }, [studentToFind]);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Prepare params for isDirtyOrNotFilled
    const newOrEditedStudent = {
      firstName: e.target.name === 'firstName' ? e.target.value : form.firstName,
      lastName: e.target.name === 'lastName' ? e.target.value : form.lastName,
      email: e.target.name === 'email' ? e.target.value : form.email,
      mark: e.target.name === 'mark' ? e.target.value : form.mark,
    };
    const existingStudent = studentToFind
      ? {
          firstName: studentToFind.firstName,
          lastName: studentToFind.lastName,
          email: studentToFind.email,
          mark: String(studentToFind.mark),
        }
      : undefined;

    setIsSubmitButtonEnabled(isDirtyOrNotFilled({ newOrEditedStudent, existingStudent }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // we do not need to check for uncomplete students since the button is disabled for it

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
        <div className='flex gap-4'>
          <button
            type='submit'
            disabled={!isSubmitButtonEnabled}
            className='bg-[#00A5A8] hover:opacity-75 text-white px-4 py-2 transition-opacity rounded-lg font-semibold shadow mt-2 cursor-pointer disabled:opacity-30 disabled:cursor-default'
          >
            {studentToFind ? 'Save' : 'Create'}
          </button>
          {studentToFind ? (
            <button
              type='button'
              onClick={() => navigate(`/student/${id}`)}
              className='bg-[#00A5A8] hover:opacity-75 text-white px-4 py-2 transition-opacity rounded-lg font-semibold shadow mt-2 cursor-pointer'
            >
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
