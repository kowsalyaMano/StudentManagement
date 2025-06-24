import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

const ViewStudents = lazy(() => import('./components/ViewDetails'));
const AddStudent = lazy(() => import('./components/AddDetails'));
const EditStudent = lazy(() => import('./components/Edit'));

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="container py-4">
          <Link className="navbar-brand" to="/">Student Manager</Link>
          <div className='ms-auto'>
            <Link className="btn btn-outline-light me-2" to="/">View Students</Link>
            <Link className="btn btn-outline-light" to="/add">Add Student</Link>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<ViewStudents />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/edit/:id" element={<EditStudent />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
