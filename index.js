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
app.use("/api/auth", AuthRoutes);
app.use("/api/profile", ProfileRoutes);
//connecting to database
connectDb();

app.listen(PORT, () => {
  console.log('Server is running on port 8000');
});