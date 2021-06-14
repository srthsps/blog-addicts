const config = require('../utils/config')
const blogRouter = require('express').Router()
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/users')
const { request, response } = require('express')



const mongoUrl = 'mongodb+srv://dev-sps:devguy@cluster0.e91lg.mongodb.net/blog_db?retryWrites=true&w=majority'
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }).then(res=>{
    console.log("Connected to database")
}).catch(error=>{
    console.log(error," Failed to connected to database");
})

  
  blogRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user')
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogRouter.post('/', async(request, response) => {

    const body = request.body
    const user = await User.findById(body.userId)
  
    const blog = new Blog({
      title:body.title,
      author:body.author,
      url:body.url.Blog,
      user:user._id
    })
    
    const savedBlog = await blog.save()
    console.log(savedBlog);
    user.blogs = user.blogs.concat(savedBlog._id)
    await   user.save()
  })

  blogRouter.delete('/',(request,response)=>{
    const id=request.body
    Blog.findByIdAndRemove(id.blogId).then(res=>{
      response.send("Removed succesfully").end()
    })
  })


  module.exports = blogRouter