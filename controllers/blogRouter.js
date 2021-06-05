const config = require('../utils/config')
const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')



const mongoUrl = 'mongodb+srv://dev-sps:devguy@cluster0.e91lg.mongodb.net/blog_db?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res=>{
    console.log("Connected to database")
}).catch(error=>{
    console.log(error," Failed to connected to database");
})

  
  blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', (request, response) => {
  
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  module.exports = blogRouter