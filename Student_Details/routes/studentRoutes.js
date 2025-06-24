import express from 'express';
import multer from 'multer';
import {
  createStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  getStudentPhoto,
} from '../controllers/studentController.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.single('photo'), createStudent);
router.get('/', getStudents);
router.get('/:id', getStudents);
router.get('/:id/photo', getStudentPhoto); 
router.put('/:id', upload.single('photo'), updateStudent);
router.delete('/:id', deleteStudent);

export default router;
