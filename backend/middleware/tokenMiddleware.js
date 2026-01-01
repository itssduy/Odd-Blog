import { verifyToken } from "../lib/tokenUtils.js";


const validToken = (req, res, next)=>{
    try {

        const token = req.headers.token;
        const data = verifyToken(token);
        if(data){
        req.data = data;
            next(); 
        } else {
            res.status(400).send('wrong token')
        }
    } catch (err){
        console.log("invalid token")
        res.status(400).send('error')
    }
}

export default validToken