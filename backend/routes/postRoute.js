import express from 'express'

import postController from '../controllers/postController.js'

import validToken from '../middleware/tokenMiddleware.js'

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.post('/', validToken, postController.postPost);

postRouter.get('/:postId', postController.getPost);
postRouter.put('/:postId', validToken, postController.putPost);
postRouter.delete('/:postId', validToken, postController.deletePost);

export default postRouter