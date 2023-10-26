const router = require('express').Router()
const User = require('../models/User.model')
const mongoose = require("mongoose");

/* router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({allUsers});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
});


router.post('/new', async (req,res) => {
    try {
        const newUser = await User.create();
        res.status(201).json({newUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error });
    }
}) */

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  if (mongoose.isValidObjectId(userId)) {
      try {
        const oneUser = await User.findById(userId)
        if (oneUser) {
            res.status(201).json({ user: oneUser });
        } else {
          res.status(404).json({ message: "user not found" });
        }
      }  catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    } else {
      res.status(500).json({ message: "id seems wrong" });
    }
})

module.exports = router