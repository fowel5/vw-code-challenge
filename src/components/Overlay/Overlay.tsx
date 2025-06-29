import type { ReactNode } from 'react';

/**
 * This is a reusable Overlay-Component, which gets children, that will be displayed and a X-button to close it.
 * All the logic has to be implemented within the children.
 */
export default function Overlay({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.2)]'>
      <div className='bg-white rounded-2xl shadow-lg p-8 min-w-[320px] max-w-md w-full flex flex-col items-center relative'>
        <button onClick={onClose} className='absolute top-1 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold focus:outline-none cursor-pointer'>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}
