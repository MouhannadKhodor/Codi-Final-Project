const express = require('express');
const app = express()
const router = express.Router();
const Post = require('../models/Post')
const verify = require('./verifyToken')
const multer = require('multer')
const path = require('path')

//Routes

//Upload Image
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../public/uploads/'))
    },
    filename: (req, file, callback) => {
        console.log(file)
        callback(null,Date.now()+ path.extname(file.originalname));
    }
})
const upload = multer({ storage: storage });

//Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})


//Insert a post
router.post('/', upload.single("image"), async (req, res) => {
    const post = new Post({
        userID:req.body.userID,
        title: req.body.title,
        description: req.body.description,
        country: req.body.country,
        city: req.body.city,
        image: req.file.filename,
        status: req.body.status,
        type: req.body.type,
        categoryID: req.body.categoryID,
    });
    try {
        const savedPost = await post.save()
       return res.json(savedPost)
    } catch (err) {
        return  res.json({ message: err })
    }
})

//Get Post By ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.json(post)

    } catch (err) {
        res.json({ message: err })
    }
})


//Delete Post By ID
router.delete('/:id', async (req, res) => {
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        res.json(deletePost)

    } catch (err) {
        res.json({ message: err })
    }
})

//Update a post By ID

router.patch('/:id', upload.single("image"), async (req, res) => {
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
            $set: {
                userID:req.body.id,
                title:req.body.title,
                description:req.body.description,
                country:req.body.country,
                city:req.body.city,
                image: req.file.filename,
                status:req.body.status,
                type:req.body.type,
                categoryID:req.body.categoryID,
            }
        })
        res.json(updatePost)

    } catch (err) {
        res.json({ message: err })
    }
})

//Get certain amout of posts lost
router.get('/latest/lost', async (req, res) => {
    try {
        const posts = await Post.find({ type:"lost"} ).limit(6).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

//Get certain amout of posts lost
router.get('/latest/found', async (req, res) => {
    try {
        const posts = await Post.find({ type:"found"} ).limit(6).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

router.get('/latest/sameArea/:city', async (req, res) => {
    try {
        const posts = await Post.find({ city:req.params.city} ).limit(6).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})
//get posts by cat type
router.get('/latest/all/:type', async (req, res) => {
    try {
        const posts = await Post.find({ type:req.params.type}).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

//get posts by cat
router.get('/catItems/:id', async (req, res) => {
    try {
        const posts = await Post.find({ categoryID:req.params.id} ).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})

//get posts by userID
router.get('/user/:id', async (req, res) => {
    try {
        const posts = await Post.find({ userID:req.params.id} ).sort({ date: -1 });
        res.json(posts)
    } catch (err) {
        res.json({ message: err })
    }
})


module.exports = router;