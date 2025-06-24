import React, { useState, useEffect } from 'react';

const departments = ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'];
const years = ['I Year', 'II Year', 'III Year', 'IV Year'];
const skillsOptions = ['JavaScript', 'Python', 'C++', 'HTML/CSS', 'Java', 'React', 'Node.js', 'SQL', 'Machine Learning'];

const StudentForm = React.memo(({ initialData = {}, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    gender: '',
    department: '',
    year: '',
    skills: [],
  });
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        dob: initialData.dob ? initialData.dob.slice(0, 10) : '',
        gender: initialData.gender || '',
        department: initialData.department || '',
        year: initialData.year || '',
        skills: Array.isArray(initialData.skills) ? initialData.skills : [],
      });
    }
  }, [initialData]);

  const validate = () => {
    const errs = {};
    if (!(formData.name || '').trim()) errs.name = 'Full Name is required';
    if (!(formData.email || '').trim()) {
      errs.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Invalid email format';
    }
     if (!formData.dob) {
    errs.dob = 'Date of Birth is required';
  } else {
    const selectedDate = new Date(formData.dob);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      errs.dob = 'Date of Birth must be in the past';
    }
  }
    if (!formData.gender) errs.gender = 'Gender is required';
    if (!formData.department) errs.department = 'Department is required';
    if (!formData.year) errs.year = 'Year of study is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        skills: checked
          ? [...prev.skills, value]
          : prev.skills.filter((s) => s !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    for (const key in formData) {
      if (key === 'skills') {
        data.append('skills', JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    }
    if (photo) data.append('photo', photo);

    onSubmit(data);
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <form onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Phone</label>
            <input
              type="text"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Address</label>
            <textarea
              name="address"
              className="form-control"
              rows="3"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className={`form-control ${errors.dob ? 'is-invalid' : ''}`}
              value={formData.dob}
              onChange={handleChange}
              required
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Gender</label>
            <select
              name="gender"
              className={`form-select ${errors.gender ? 'is-invalid' : ''}`}
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          <div className=" col-md-6 mb-3">
            <label className="form-label">Department</label>
            <select
              name="department"
              className={`form-select ${errors.department ? 'is-invalid' : ''}`}
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            {errors.department && <div className="invalid-feedback">{errors.department}</div>}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Year of Study</label>
            <select
              name="year"
              className={`form-select ${errors.year ? 'is-invalid' : ''}`}
              value={formData.year}
              onChange={handleChange}
              required
            >
              <option value="">Select Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            {errors.year && <div className="invalid-feedback">{errors.year}</div>}
          </div>

          <div className=" col-md-6 mb-3">
            <label className="form-label">Skills</label>
            <div>
              {skillsOptions.map((skill) => (
                <div className="form-check form-check-inline" key={skill}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`skill-${skill}`}
                    value={skill}
                    checked={formData.skills.includes(skill)}
                    onChange={handleChange}
                    name="skills"
                  />
                  <label className="form-check-label" htmlFor={`skill-${skill}`}>
                    {skill}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Profile Photo</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="form-control"
              onChange={handleFileChange}
            />
          </div>

          <div className="text-center">
  <button type="submit" className="btn btn-m btn-primary mt-3">
    Submit
  </button>
</div>
          </div>
        </form>
      </div>
    </div>
  );
});

export default StudentForm;
