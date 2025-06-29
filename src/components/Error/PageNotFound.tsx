import { Link } from 'react-router';

export default function PageNotFound() {
  return (
    <div className='flex items-center justify-center min-h-[80vh]'>
      <div className='bg-red-100 border border-red-400 text-red-700 px-8 py-6 rounded-xl shadow text-xl font-semibold text-center'>
        Page Not found, go back to the{' '}
        <Link to={'/'} className='underline'>
          main page
        </Link>
        .
      </div>
    </div>
  );
}
