import type { ReactNode } from 'react';

export default function LayoutWrapper({ children }: { children: ReactNode }) {
  return <div className='px-4 py-4 h-[80vh] max-w-full'>{children}</div>;
}
