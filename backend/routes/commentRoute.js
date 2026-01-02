import express from 'express'

import commentController from '../controllers/commentController.js';
import validToken from '../middleware/tokenMiddleware.js'

const commentRouter = express.Router();

//commentRouter.get('/', commentController.getAllComments)
commentRouter.post('/', validToken, commentController.postComment)

commentRouter.get('/:postId', commentController.getComments)
commentRouter.put('/:commentId', validToken, commentController.updateComment)
commentRouter.delete('/:commentId', validToken, commentController.deleteComment)


export default commentRouter;