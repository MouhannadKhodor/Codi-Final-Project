const express = require('express');
const router = express.Router();
const Message = require('../models/Message')
//Routes


//Get all messages
router.get('/', async (req, res) => {
    try {
        const message = await Message.find();
        res.send(message)
    } catch (err) {
        res.json({ err })
    }
})


//Insert a post
router.post('/', async (req, res) => {
    const message = new Message({
        senderID: req.body.senderID,
        receiverID: req.body.receiverID,
        senderUsername: req.body.senderUsername,
        message: req.body.message,
    });
    try {
        const savedMessage = await message.save()
       return res.json(savedMessage)
    } catch (err) {
        return  res.json({ message :err })
    }
})

//Get received messages
router.get('/received', async (req, res) => {
    try {
        const message = await Message.find({receiverID:req.body.receiverID})
        res.json(message)

    } catch (err) {
        res.json({ err })
    }
})

//Get sent messages
router.get('/sent', async (req, res) => {
    try {
        const message = await Message.find({senderID:req.body.senderID})
        res.json(message)

    } catch (err) {
        res.json({ err })
    }
})


//Delete Message By ID
router.delete('/:id', async (req, res) => {
    try {
        const deleteMessage = await Message.findByIdAndDelete(req.params.id)
        res.json(deleteMessage)

    } catch (err) {
        res.json({ err })
    }
})

//get all messages where Id of sender or receiver = userID
router.get('/all/:id', async (req, res) => {
    try {
        const receivedMessage = await Message.find({receiverID:req.params.id}).sort({ date: -1 })
        const sentMessage = await Message.find({senderID:req.params.id}).sort({ date: -1 })
        const all = Array.prototype.concat(receivedMessage,sentMessage)
        res.json(all)


    } catch (err) {
        res.json({ err })
    }
})

module.exports = router;