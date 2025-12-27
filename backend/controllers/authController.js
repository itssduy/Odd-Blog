import { prisma } from "../lib/prisma.js"
import { genPass, verifyPass } from "../lib/passwordUtils.js"

const postLogin = async (req, res) => {
    const {username, password} = req.body

    const user = await prisma.user.findFirst({
        where: {
            username: username
        }
    })
    console.log(user)
}

const postSignup = async (req, res) => {
    const {username, password} = req.body

    const saltHash = genPass(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = await prisma.user.create({
        data: {
            username: username,
            salt: salt,
            hash: hash,
        }
    })

    res.json(newUser);
}


export default {
    postLogin,
    postSignup
}