import jwt from 'jsonwebtoken'

const privateKey = process.env.PRIVATE_KEY
const publicKey = process.env.PUBLIC_KEY

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