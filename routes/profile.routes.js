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
})

module.exports = router