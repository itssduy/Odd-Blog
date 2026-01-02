import {prisma} from '../lib/prisma.js'

const getAllComments = async (req, res) => {

    const comments = await prisma.comment.findMany({});
    res.json(comments);
}

const postComment = async (req, res) => {
    const {text, postId} = req.body

    const userId = req.data.userId
    const newComment = await prisma.comment.create({
        data: {
            postId: postId,
            authorId: userId,
            text: text
        }
    });

    res.json(newComment);
}

const getComments = async (req, res)=>{
    try {
        const postId = req.params.postId;

        const comments = await prisma.comment.findMany({
            where: {
                postId: postId
            },
            orderBy: {
                created_at: "desc"
            }
        });
        console.log(comments)
        res.json(comments);
    } catch (err){
        console.log(err);
        res.json({message: "error"});
    }
    
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;

    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    });

    res.json("success"); 
}

const updateComment = async (req, res) => {
    const commentId = req.params.commentId;
    const { text } = req.body
    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data : {
            text: text
        }
    });

    res.json(comment);
}

export default {
    getAllComments,
    postComment,
    getComments,
    deleteComment,
    updateComment
}