import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDb from './config/Mongodb.js';
import AuthRoutes from './routes/AuthRoutes.js';
import ProfileRoutes from './routes/profileRoutes.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.PORT; 

app.use(express.json());
app.use(cookieParser());

const allowOrigin = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowOrigin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Mentorship Backend API' });
});
//connecting to database
connectDb();

app.listen(PORT, () => {
  console.log('Server is running on port 8000');
});