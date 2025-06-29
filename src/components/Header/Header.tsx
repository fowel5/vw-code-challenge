import { Bounce, ToastContainer } from 'react-toastify';

export default function Header() {
  return (
    <div className='bg-white w-full h-[10vh] pt-4 flex justify-center align-middle'>
      <img src='/header-image.png' width={220} />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition={Bounce}
      />
    </div>
  );
}
