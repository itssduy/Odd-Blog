
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



export default {
    getUser,
    getCurrentUser
}