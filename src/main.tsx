import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { StudentsProvider } from './logic/StudentsProvider';
import { BrowserRouter, Route, Routes } from 'react-router';
import DataTable from './components/DataTable/DataTable';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LayoutWrapper from './components/LayoutWrapper/LayoutWrapper';
import React from 'react';
import StudentForm from './components/Forms/StudentForm';

const StudentShowCase = React.lazy(() => import('./components/StudentShowcase/StudentShowcase'));
// It is useless to lazy load student form, because it is imported in StudentShowCase and therefore in its chunk.
// const StudentForm = React.lazy(() => import('./components/Forms/StudentForm'));
const Error = React.lazy(() => import('./components/Error/Error'));
const PageNotFound = React.lazy(() => import('./components/Error/PageNotFound'));

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
