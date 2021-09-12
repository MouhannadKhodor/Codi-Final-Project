const express = require('express');
const router = express.Router();
const Post = require('../models/Post')
const verify = require('./verifyToken')
//Routes

//Get all posts
router.get('/',verify, async (req,res)=>{
    try{
       const posts = await Post.find();
       res.json(posts)
    }catch(err){
        res.json({ message:err })
    }
})


//Insert a post
router.post('/', async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });
    try{
        const savedPost = await post.save()
    res.json(savedPost)
    }catch(err){
        res.json({message:err})
    }
    
})

//Get Post By ID
router.get('/:id', async (req,res) =>{
    try{
      const post = await Post.findById(req.params.id)
        res.json(post)
        
    }catch(err){
        res.json({ message:err })
    }
})


//Delete Post By ID
router.delete('/:id', async (req,res) =>{
    try{
      const deletePost = await Post.findByIdAndDelete(req.params.id)
        res.json(deletePost)
        
    }catch(err){
        res.json({ message:err })
    }
})

//Update a post By ID

router.patch('/:id', async (req,res) =>{
    try{
      const updatePost = await Post.findByIdAndUpdate(req.params.id,{
          $set:{
              title:req.body.title,
              description:req.body.description
          }
      })
        res.json(updatePost)
        
    }catch(err){
        res.json({message:err})
    }
})



module.exports = router;