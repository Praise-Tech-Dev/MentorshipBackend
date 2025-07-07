import { get } from 'mongoose';
import { register, login ,logout, getUserData} from '../controller/Auth.js';
import express from 'express';
const AuthRoutes = express.Router(); 

// User Registration route
AuthRoutes.post('/register', register);

// User Login route
AuthRoutes.post('/login', login);
AuthRoutes.post('/logout', logout);
AuthRoutes.post('/getUserData/:id', getUserData);

export default AuthRoutes;