const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('./db/mongoose')
const todoRoutes = require('./routes/todo-routes')
const userRoutes = require('./routes/user-routes')
const errorRoutes = require('./routes/error-routes')
let cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 5000
//-----to use in production so only our FE is accessing the BE
// const corsOptions = {
//     origin: process.env.CLIENT,
//     credentials: true
// }

app.use(express.json())
// app.use(cors(corsOptions))
app.use(cors())

app.use(cookieParser())

app.use(helmet())
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
    }
}))

app.use(todoRoutes)
app.use(userRoutes)
// app.use(errorRoutes)
app.get('/test',(req,res)=>{
    res.send('server up n running')
})
app.listen(port, () => {
    console.log('ToDo server is up on port ' + port)
})

