const  express = require('express')

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => res.send('hello'))

app.listen(5000, () => {console.log('server started on port 5000')})