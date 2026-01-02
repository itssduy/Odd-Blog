import { prisma } from "../lib/prisma.js"
import { genPass, verifyPass } from "../lib/passwordUtils.js"
import { getToken, verifyToken } from "../lib/tokenUtils.js"
const postLogin = async (req, res) => {
    try {

        console.log(req.body);
        const {username, password} = req.body

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if(!user){
            res.status(404).send('user not found')
            return;
        }
        if (verifyPass(user.salt, user.hash, password)){
            const data = { userId: user.id }

            const token = await getToken(data);
            res.json(token);
        } else {
            res.status(401).send('wrong password')
            return;
        }
    

    } catch (err){
        console.log(err);
        res.status(500).send('unkown error');
        return;
    }
}

const postSignup = async (req, res) => {
    try {
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
        
        const data = { userId: newUser.id }


        const token = getToken(data);
        res.json(token);
    }catch (err){
        console.log(err);
        res.status(500).send('unkown error');
    }
    

}

export default {
    postLogin,
    postSignup
}