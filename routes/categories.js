const express = require('express');
const router = express.Router();
const Category = require('../models/Category')
const verify = require('./verifyToken')
const multer = require('multer')
const path = require('path')

//Routes


//Get all categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories)
    } catch (err) {
        res.json({ message: err })
    }
})


//Insert a cat
router.post('/', async (req, res) => {
    const category = new Category({
        name: req.body.name,
        image: req.body.image,
    });
    try {
        const savedCategory = await category.save()
       return res.json(savedCategory)
    } catch (err) {
        return  res.json({ message: err })
    }
})

//Get Category By ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        res.json(category)

    } catch (err) {
        res.json({ message: err })
    }
})


//Delete Category By ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id)
        res.json(deleteCategory)

    } catch (err) {
        res.json({ message: err })
    }
})

//Update a Category By ID

router.patch('/:id', async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                image: req.body.image,
                
            }
        })
        res.json(updateCategory)

    } catch (err) {
        res.json({ message: err })
    }
})



module.exports = router;