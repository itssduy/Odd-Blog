
import {prisma} from '../lib/prisma.js'

const getUser = async (req, res)=> {
    const userId = req.params.id

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true
        }
    })
    res.json(user);
}

const getCurrentUser = async (req, res)=> {
    const userId = req.data.userId

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            username: true
        }
    })
    res.json(user);
}

const getUserPosts = async (req, res)=>{
    try {
        const userId = req.params.userId;

        const posts = await prisma.post.findMany({
            where: {
                authorId: userId
            }
        })
        res.json(posts);
    } catch(err){
        res.status(500).json({"message": "error"});
    }
}

const getUserComments = async (req, res)=>{
    try {
        const userId = req.params.userId;

        const comments = await prisma.comment.findMany({
            where: {
                authorId: userId
            },
            include: {
                post: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        })
        res.json(comments);
    } catch(err){
        console.log(err)
        res.status(500).json({"message": "error"});
    }
}

export default {
    getUser,
    getCurrentUser,
    getUserPosts,
    getUserComments
}