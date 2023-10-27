const router = require('express').Router()
const User = require('../models/User.model')
const mongoose = require("mongoose");

router.get('/:userId', async (req, res) => {
    const { userId } = req.params;
  if (mongoose.isValidObjectId(userId)) {
      try {
        const oneUser = await User.findById(userId)
        if (oneUser) {
            const user = oneUser._doc
            delete user.password
            res.status(201).json({ user: user });
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
});

router.put('/:userId', async (req, res) => {
  const { userId } = req.params;
if (mongoose.isValidObjectId(userId)) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
      if (updatedUser) {
          const user = oneUser._doc
          delete user.password
          res.status(200).json({ user: updatedUser });
      } 
    }  catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(500).json({ message: "id seems wrong" });
  }
});

router.delete ('/:userId', async (req, res) => {
  const {userId} = req.params;
  try {
    await User.findByIdAndDelete(userId)
    res.status(204).json({message : 'Profile deleted'})
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router