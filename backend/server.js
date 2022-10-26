const  express = require('express')
const {chats} =require("./data/data")

const app = express()

const dotenv  = require("dotenv")
dotenv.config()
const PORT = process.env.PORT||5000
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => res.send('hello'))
app.get("/api/chat",(req,res)=>{
    res.send(chats)
})
app.get("/api/chat/:id",(req,res)=>{
    const {id} = req.params;
    const singlechat = chats.find((c)=>c._id===req.params.id)
    res.send(singlechat)
})

app.listen(PORT, () => {console.log(`server started on port ${PORT}`)})