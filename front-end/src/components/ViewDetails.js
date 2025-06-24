import React, { useEffect, useState } from 'react';
import studentApi from '../api/studentApi';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import ConfirmDeleteToast from '../toaster/toast';

const skillsOptions = ['JavaScript', 'Python', 'C++', 'HTML/CSS', 'Java'];
const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];

function ViewStudents() {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [skillsFilter, setSkillsFilter] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await studentApi.get('/');
      console.log(res.data);
      setStudents(res.data);
    } catch {
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter((student) => {
    const matchesName = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter ? student.department === departmentFilter : true;
    const matchesSkills =
      skillsFilter.length === 0 || skillsFilter.every((skill) => student.skills.includes(skill));
    return matchesName && matchesDept && matchesSkills;
  });

  const handleSkillChange = (skill) => {
    if (skillsFilter.includes(skill)) {
      setSkillsFilter(skillsFilter.filter((s) => s !== skill));
    } else {
      setSkillsFilter([...skillsFilter, skill]);
    }
  };

 const handleDelete = (student) => {
  const toastId = toast.info(
    <ConfirmDeleteToast
      studentName={student.name}
      onConfirm={async () => {
        toast.dismiss(toastId);
        try {
          await studentApi.delete(`/${student._id}`);
          toast.success('Student deleted successfully');
          fetchStudents();
        } catch {
          toast.error('Failed to delete student');
        }
      }}
      onCancel={() => toast.dismiss(toastId)}
    />,
    { autoClose: false, closeOnClick: false, draggable: false }
  );
};


  return (
    <div className="container mt-4">
      <h2>Student Records</h2>
<div className="card mb-4">
  <div className="card-body">
    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control w-50"
      />
      <div className="dropdown">
        <button
          className="btn btn-outline-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Filter
        </button>
        <ul className="dropdown-menu p-3" style={{ minWidth: '250px' }}>
          <li className="mb-2">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </li>

          <li>
            <label className="form-label mb-1">Skills</label>
            <div className="d-flex flex-wrap gap-2">
              {skillsOptions.map((skill) => (
                <div className="form-check" key={skill}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={skillsFilter.includes(skill)}
                    onChange={() => handleSkillChange(skill)}
                    id={`filter-skill-${skill}`}
                  />
                  <label className="form-check-label" htmlFor={`filter-skill-${skill}`}>
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="card mt-4">
          <div className="card-body">
             <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Photo</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>Department</th>
              <th>Year</th>
              <th>Skills</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="11" className="text-center">
                  No students found.
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <tr key={student._id}>
                   <td>
                     {student._id && student.photo?.data ? (
                       <img src={`http://localhost:5000/api/students/${student._id}/photo`}
                        alt="Profile"
                        className="img-thumbnail"
                        style={{ width: 50, height: 50, objectFit: 'cover' }}/>
                      ) : (
                      <span>No Photo</span>
                      )}
                    </td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone || '-'}</td>
                  <td>{student.address || '-'}</td>
                  <td>{student.dob ? new Date(student.dob).toLocaleDateString() : '-'}</td>
                  <td>{student.gender}</td>
                  <td>{student.department}</td>
                  <td>{student.year}</td>
                   <td>
                {Array.isArray(student.skills) && student.skills.length > 0 ? (
                  student.skills.map((s, i) => (
                    <span className="badge bg-secondary me-1" key={i}>
                      {s}
                    </span>
                  ))
                ) : (
                  <span>-</span>
                )}
              </td>
                  <td>
                    <div className="d-flex justify-content-center">
                    <Link
                      to={`/edit/${student._id}`}
                      className="btn btn-sm me-2" title="Edit"
                    >
                      <i className="bi bi-pencil-square text-primary"></i>
                    </Link>
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDelete(student)}
                       title="Delete"
                    >
                     <i className="bi bi-trash text-danger "></i>
                    </button>
                    </div>
                  </td>
                 
                </tr>
              ))
            )}
          </tbody>
        </table>
          </div>
        </div>
      </div>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default ViewStudents;
