const  express = require('express')
const {chats} =require("./data/data")
const mongoose =  require("mongoose")
const connectDB= require("./config/db")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")
const chatRoutes = require("../backend/routes/chatRoutes")
const messageRoutes= require("../backend/routes/messageRoutes")
const app = express()
app.use(cors())
connectDB()
const dotenv  = require("dotenv")
const { notFound, errorHandler } = require('./middleware/errorMiddleware')
dotenv.config()
const PORT = process.env.PORT||5000
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use("/api/user/",userRoutes)
app.use("/api/chat/",chatRoutes)
app.use("/api/message",messageRoutes)

app.use(notFound)
app.use(errorHandler)

 app.listen(PORT, () => console.log(`Listening at Port ${PORT}`))

