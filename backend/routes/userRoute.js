import express from 'express'

import userController from '../controllers/userController.js';
const userRouter = express.Router();


//userRouter.get('/')
userRouter.get('/:id', userController.getUser)

export default userRouter;