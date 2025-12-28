import { prisma } from "../lib/prisma.js"
import { genPass, verifyPass } from "../lib/passwordUtils.js"
import { getToken, verifyToken } from "../lib/tokenUtils.js"
const postLogin = async (req, res) => {
    try {

        const {username, password} = req.body

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        })

        if(!user){
            res.send(400).send('user not found')
        }
        if (verifyPass(user.salt, user.hash, password)){
            const data = { userId: user.id }

            const token = await getToken(data);
            res.json(token);
        } else {
            res.status(400).send('wrong password')
        }
    

    } catch (err){
        console.log(err);
        res.status(500).send('unkown error');
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
        
        const privateKey = fs.readFileSync('private.key');
        const data = { userId: user.id }


        jwt.sign({ userId: newUser.id }, privateKey, { algorithm: 'RS256' }, (err, token) => {
            if(err){
                res.status(400).send('error')
            }else {
                res.send(token)

            }
        });
    }catch (err){
        console.log(err);
        res.status(500).send('unkown error');
    }
    

}

export default {
    postLogin,
    postSignup
}