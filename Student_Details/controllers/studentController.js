import Student from '../models/Student.js';

export const createStudent = async (req, res) => {
  try {
    const skills = JSON.parse(req.body.skills || '[]');

    const newStudent = new Student({
      ...req.body,
      skills,
      photo: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : null,
    });

    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create student' });
  }
};

export const getStudents = async (req, res) => {
  try {
    if (req.params.id) {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ error: 'Not found' });
      return res.json(student);
    }
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: 'Fetch failed' });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const update = { ...req.body };
    if (update.skills) update.skills = JSON.parse(update.skills);

    if (req.file) {
      update.photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const updated = await Student.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!updated) return res.status(404).json({ message: 'Not found' || error.message });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed' || err.message });
  }
};


export const deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Delete failed' });
  }
};

export const getStudentPhoto = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student || !student.photo || !student.photo.data) {
      return res.status(404).send('No image');
    }
    res.set('Content-Type', student.photo.contentType);
    res.send(student.photo.data);
  } catch (err) {
    res.status(500).send('Image fetch failed');
  }
};
