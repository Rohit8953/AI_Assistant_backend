import express from 'express';
const userRouter = express.Router();
import { auth } from '../middleware/auth.js';
import { categoriesCount, getPublishedCreations, getUserCreations, toggleLikeCreation } from '../controller/userController.js';

userRouter.get('/get-user-creations', auth, getUserCreations);
userRouter.post('/toggle-like-creation', auth, toggleLikeCreation);
userRouter.get('/get-published-creations', auth, getPublishedCreations);
userRouter.get('/get-category-count', auth, categoriesCount);

export default userRouter;