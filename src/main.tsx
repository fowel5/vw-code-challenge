import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StudentsProvider } from './logic/StudentsProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import DataTable from './components/DataTable/DataTable';
import StudentShowCase from './components/StudentShowcase/StudentShowcase';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Error from './components/Error/Error';
import PageNotFound from './components/Error/PageNotFound';
import StudentForm from './components/Forms/StudentForm';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Header />
    <LayoutWrapper>
      <StudentsProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<DataTable />} />
            <Route path='/student/:id' element={<StudentShowCase />} />
            <Route path='/student/:id/edit' element={<StudentForm onClose={() => {}} />} />
            <Route path='/error' element={<Error />} />
            <Route path='/*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </StudentsProvider>
    </LayoutWrapper>
    <Footer />
  </StrictMode>
);
