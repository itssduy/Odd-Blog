import express from 'express'

import postController from '../controllers/postController.js'

const postRouter = express.Router();

postRouter.get('/', postController.getAllPosts);
postRouter.post('/', postController.postPost);

postRouter.get('/:postId', postController.getPost);
postRouter.put('/:postId', postController.putPost);
postRouter.delete('/:postId', postController.deletePost);

export default postRouter