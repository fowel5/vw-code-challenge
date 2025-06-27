import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StudentsProvider } from './logic/StudentsProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import DataTable from './components/DataTable/DataTable';
import StudentShowCase from './components/StudentShowcase/StudentShowcase';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StudentsProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DataTable />} />
          <Route path='/student/:id' element={<StudentShowCase />} />
        </Routes>
      </BrowserRouter>
    </StudentsProvider>
  </StrictMode>
);
