import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: [/\S+@\S+\.\S+/, 'Email format is invalid'],
    unique: true,
  },
  phone: String,
  address: String,
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  department: { type: String, required: true },
  year: {
    type: String,
    enum: ['I Year', 'II Year', 'III Year', 'IV Year'],
    required: true,
  },
  skills: [String],
  photo: {
    data: Buffer,
    contentType: String
  },
  createdAt: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', studentSchema);
export default Student;
