import jwt from 'jsonwebtoken';
import express from 'express';
import {getUserData, EditProfile} from '../controller/profile.js';
import authMiddleware from '../middleware/authMiddleware.js';
const ProfileRoutes = express.Router();

ProfileRoutes.get('/getUserData', authMiddleware, getUserData);
ProfileRoutes.put('/editProfile/:id',authMiddleware,  EditProfile);

export default ProfileRoutes;