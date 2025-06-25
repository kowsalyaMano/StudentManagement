import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);   //MONGO_URI=mongodb+srv://<username>:<password>@cluster0.psaavzb.mongodb.net/Student_Management?retryWrites=true&w=majority
                                                     //use ur mongodb atlas username and password
   
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
