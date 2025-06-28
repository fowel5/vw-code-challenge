export default function Footer() {
  return (
    <footer className='bg-[#00A5A8] w-full h-[10vh] flex items-center justify-center text-white text-sm font-medium shadow-inner'>
      &copy; {new Date().getFullYear()} – This page and code were created by Miguel A. Beltra Mayoral
    </footer>
  );
}
