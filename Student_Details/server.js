import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors( 
    {
        origin: 'http://localhost:3000', 
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    }
));
app.use(bodyParser.json());

app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;   //PORT=5000 in .env file
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
