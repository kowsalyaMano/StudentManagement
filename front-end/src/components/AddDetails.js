import React from 'react';
import { useNavigate } from 'react-router-dom';
import studentApi from '../api/studentApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentForm from './StudentForm';

function AddStudent() {
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      await studentApi.post('/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      toast.success('Student added successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error('Failed to add student!');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Student</h2>
      <StudentForm onSubmit={handleSubmit} />
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default AddStudent;
