const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verified = require('./verifyToken')
//Routes

//REGISTER
router.post('/register', async (req,res) => {

    //validation
    const {error} = registerValidation(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    
    //checking if the email is unique
    const emailExist = await User.findOne({email:req.body.email});
    if(emailExist) return  ({message:"Email already exist"})
    
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    
    //adding user
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashPassword,
        role:req.body.role
    })
    try{
        const saveUser = await user.save();
        res.json({id: user._id,email:user.email,role:user.role})
    }catch(err){
        res.json({ meesage:err })
    }

 })


 //LOGIN
 router.post('/login',async (req,res)=>{
    const {error} = loginValidation(req.body)
    if(error) return res.status(400).json({message:error.details[0].message})

    //checking if the user exist
    const user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).json({message:"Email or password is incorrect"})

    //checking if password is correct
    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).json({message:"Email or password is incorrect"})

    //create and assign token
    const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
    res.header('auth-token',token).json({data:{username:user.username,email:user.email,id:user._id,role:user.role},access_token:token})
 })

 //Get user By Id
router.get('/:id',async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
          res.json({id:user.id,username:user.username,email:user.email})
          
      }catch(err){
          res.json({ message:err })
      }
})

//update a user 
router.patch('/:id', async (req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(req.body.password, salt)
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password:hashPassword
                }
            })
            return res.json(updateUser)
        }
        else{
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                }
            })
            return res.json(updateUser)
        }
        

    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router