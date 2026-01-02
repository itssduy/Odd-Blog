import express from 'express'

import userController from '../controllers/userController.js';
import validToken from '../middleware/tokenMiddleware.js';
const userRouter = express.Router();


userRouter.get('/',validToken, userController.getCurrentUser)
userRouter.get('/:id', userController.getUser)
userRouter.get('/:id/posts', userController.getUserPosts)
userRouter.get('/:id/comments', userController.getUserComments)


export default userRouter;