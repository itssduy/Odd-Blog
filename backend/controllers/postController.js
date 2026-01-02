import { prisma } from '../lib/prisma.js'

const getAllPosts = async (req, res)=>{
    try{
        const posts = await prisma.post.findMany({})
        res.json(posts)
    }
    catch (err){
        res.status(400).send('error')
    }

}

const postPost = async (req, res)=>{
    try {
        const {title, text} = req.body;
        const authorId = req.data.userId;
        const newPost = await prisma.post.create({
            data: {
                authorId: authorId,
                title: title,
                text: text
            }
        })
        res.json(newPost);
    } catch (err) {
        console.log(err)
        res.status(400).send('error')
    }
}


const getPost = async (req, res)=>{
    try {
        const postId = req.params.postId

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            }
        });
        res.json(post);
    } catch (err){
        res.status(400).send('error')
    }
}

const putPost = async (req, res)=>{
    try {
        const postId = req.params.postId;
        const {text, title} = req.body;
        const updatedPost = prisma.post.update({
            where: {
                id: postId
            },
            data: {
                title: title,
                text: text
            }
        });
        res.json(updatedPost);
    } catch (err) {
        res.status(400).send('error')
    }
}

const deletePost = async (req, res)=>{
    try {
        const postId = req.params.postId;
        await prisma.comment.deleteMany({
            where: {
                postId: postId
            }
        })
        await prisma.post.delete({
            where: {
                id: postId
            }
        });

        res.json('sucessful');
    } catch (err) {
        console.log(err)
        res.status(400).send('error')
    }
}



export default {
    getAllPosts,
    getPost,
    putPost,
    postPost,
    deletePost
}