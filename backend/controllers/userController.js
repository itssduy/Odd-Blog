
import {prisma} from '../lib/prisma.js'
const getUser = async (req, res)=> {
    const userId = req.params.userId

    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    res.json(user);
}



export default {
    getUser
}