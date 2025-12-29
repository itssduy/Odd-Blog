import express, { urlencoded } from 'express'
import 'dotenv/config'

import authRoute from './routes/authRoute.js'
import postRoute from './routes/postRoute.js'
import commentRoute from './routes/commentRoute.js'
import userRoute from './routes/userRoute.js'

const PORT = process.env.PORT || 3030

const app = express()

app.use(urlencoded({extended: true}));
app.use(express.json())

app.use('/auth', authRoute);
app.use('/posts', postRoute);
app.use('/user', commentRoute);
app.use('/comment', userRoute);

app.listen(PORT, ()=>{
    console.log(`App is running on PORT ${PORT}`)
})