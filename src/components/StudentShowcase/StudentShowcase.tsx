import { useParams } from 'react-router';

export default function StudentShowCase() {
  const params = useParams();

  return <h1>{params['id']}</h1>;
}
