import express from 'express'

const authRouter  = express.Router()


authRouter.post("/login", (req, res)=>{
    res.send("hello login")
})

authRouter.post("/signup", (req, res)=>{
    res.send("hello signup")
})

export default authRouter