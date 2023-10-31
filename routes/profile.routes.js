const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const Question = require("../models/Question.model");
const { isAuthenticated } = require("../middleware/routeGuard.middleware");

router.get("/", async (req, res) => {
  res.status(200).json();
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  if (mongoose.isValidObjectId(userId)) {
    try {
      const oneUser = await User.findById(userId);
      console.log(oneUser);
      if (oneUser) {
        const user = oneUser._doc;
        delete user.password;
        res.status(201).json({ user: user });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(500).json({ message: "id seems wrong" });
  }
});

router.get("/:userId/questions", async (req, res) => {
  const { userId } = req.params;
  if (mongoose.isValidObjectId(userId)) {
    try {
      const userQuestions = await Question.find({ owner: userId });
      console.log(userQuestions);
      if (userQuestions) {
        res.status(201).json({ userQuestions: userQuestions });
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(500).json({ message: "id seems wrong" });
  }
});
//update profile
const uploader = require("../middleware/cloudinary.config.js");

router.put(
  "/:userId",
  uploader.single("imageUrl"),
  isAuthenticated,
  async (req, res) => {
    console.log("ITSS HEREEE", req.body);
    const { userId } = req.params;
    if (!req.file) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { ...req.body },
          {
            new: true,
          }
        );
        console.log(updatedUser);
        if (updatedUser) {
          res.status(200).json({ user: updatedUser });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
      console.log("there was an error uploading the file");
    } else {
    if (mongoose.isValidObjectId(userId)) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { ...req.body, photo: req.file.path },
          {
            new: true,
          }
        );
        console.log(updatedUser);
        if (updatedUser) {
          res.status(200).json({ user: updatedUser });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    }else {
      res.status(500).json({ message: "id seems wrong" });
    }
    } 
  }
);

router.delete("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    await User.findByIdAndDelete(userId);
    res.status(204).json({ message: "Profile deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
