import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import StudentShowCase from './components/StudentShowcase/StudentShowcase.tsx';
import DataTable from './components/DataTable/DataTable.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DataTable />} />
        <Route path='/student/:id' element={<StudentShowCase />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
