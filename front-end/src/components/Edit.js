import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentForm from './StudentForm';
import studentApi from '../api/studentApi';
import { toast, ToastContainer } from 'react-toastify';

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    studentApi
      .get(`/${id}`)
      .then((res) => setStudent(res.data))
      .catch(() => toast.error('Failed to fetch student'));
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await studentApi.put(`/${id}`, formData);
      toast.success('Student updated successfully!');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      toast.error('Failed to update student');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Edit Student</h2>
      {student ? <StudentForm initialData={student} onSubmit={handleSubmit} /> : <p>Loading...</p>}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default EditStudent;
