const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./controllers/userRouter')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())

app.use('/api/users',userRouter)
app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app



