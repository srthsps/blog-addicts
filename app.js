const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogRouter')
const middleware = require('./utils/middleware')


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/blogs',blogRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app



