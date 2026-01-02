import express from 'express'

import userController from '../controllers/userController.js';
import validToken from '../middleware/tokenMiddleware.js';
const userRouter = express.Router();


userRouter.get('/',validToken, userController.getCurrentUser)
userRouter.get('/:id', userController.getUser)

export default userRouter;