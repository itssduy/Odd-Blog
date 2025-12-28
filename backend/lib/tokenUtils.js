import jwt from 'jsonwebtoken'
import fs from 'fs'

const privateKey = fs.readFileSync('private.key', 'utf8');
const publicKey = fs.readFileSync('private.key.pub', 'utf8');

const getToken = (data)=> {

    const token = jwt.sign(data, privateKey, { algorithm: 'RS256' });

    return token;
}
const verifyToken = (token)=>{
    try {

        const decoded = jwt.verify(token, publicKey, {algorithms: ['RS256']})
        return decoded;
    } catch( err) {
        throw err
    }

}


export {
    getToken,
    verifyToken
}