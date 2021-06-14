const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

userRouter.post('/',async(req,res)=>{
    const body = req.body
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
        username:body.username,
        name:body.name,
        password:passwordHash
    })

    const savedUser = user.save().then(result=>{
        res.json(result)
    })
})

userRouter.get('/',(req,res)=>{
    const users = User.find({}).populate('blogs').then(result=>{
        res.json(result)
    })
})

module.exports = userRouter