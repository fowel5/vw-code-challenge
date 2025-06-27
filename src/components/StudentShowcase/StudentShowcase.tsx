import { useParams } from 'react-router';
import { useStudents } from '../../hooks/useStudents';

export default function StudentShowCase() {
  const { id } = useParams();
  const studentIdToSearch = parseInt(id || '0');
  const studentContext = useStudents();

  if (studentContext === undefined) {
    return undefined;
  }

  const { students } = studentContext;
  const studentToShow = students.find(
    (student) => student.id == studentIdToSearch
  );

  return <div>{JSON.stringify(studentToShow)}</div>;
}
