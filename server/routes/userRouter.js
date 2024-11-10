import { Router } from 'express';
const userRouter = Router();
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { authenticateJWT } from '../middlewares/authMiddleware.js'; // JWT middleware for protected routes

userRouter.post('/register', registerUser);

userRouter.post('/login', loginUser);

userRouter.get('/profile', authenticateJWT, getUserProfile);


export default userRouter;