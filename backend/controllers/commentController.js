import {prisma} from '../lib/prisma.js'

const getAllComments = async (req, res) => {

    const comments = await prisma.comment.findMany({});
    res.json(comments);
}

const postComment = async (req, res) => {
    const {text} = req.body

    const userId = req.data.userId
    const newComment = await prisma.comment.create({
        data: {
            authorId: userId,
            text: text
        }
    });

    res.json(newComment);
}

const getComment = async (req, res)=>{
    const commentId = req.params.commentId;

    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        }
    });

    res.json(comment);
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
    getComment,
    deleteComment,
    updateComment
}