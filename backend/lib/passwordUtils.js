import crypto from 'crypto'

const genPass = (password)=>{
    var salt = crypto.randomBytes(32).toString('hex');
    var hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');

    return {
        salt: salt,
        hash: hash
    }
}

const verifyPass = (salt, hash, password)=>{
    var hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
    return hash === hashVerify
}

export {
    genPass, 
    verifyPass,
}