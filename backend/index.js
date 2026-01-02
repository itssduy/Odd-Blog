import express, { urlencoded } from 'express'
import 'dotenv/config'

import cors from 'cors'

import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import userRoute from './routes/userRoute.js'

const PORT = process.env.PORT || 3030

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://odd-blog-frontend-production.up.railway.app",
    ]
}))

app.use(urlencoded({extended: true}));
app.use(express.json())

app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/users', userRoute);
app.use('/comments', commentRoute);

app.listen(PORT, ()=>{
    console.log(`App is running on PORT ${PORT}`)
})