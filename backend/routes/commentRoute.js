import express from 'express'

import commentController from '../controllers/commentController.js';
const commentRouter = express.Router();

//commentRouter.get('/', commentController.getAllComments)
commentRouter.post('/', commentController.postComment)

commentRouter.get('/:commentId', commentController.getComment)
commentRouter.put('/:commentId', commentController.updateComment)
commentRouter.delete('/:commentId', commentController.deleteComment)


export default commentRouter;