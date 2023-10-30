const router = require("express").Router();
const Answer = require("../models/Answer.model");
const Question = require("../models/Question.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/routeGuard.middleware");

//To get all the answers
router.get("/", async (req, res, next) => {
    try {
      const allAnswers = await Answer.find();
      res.status(201).json({ allAnswers });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  });



//To get a specific answer with owner
router.get("/:answerId", async (req, res, next) => {
    const { answerId } = req.params;
    if (mongoose.isValidObjectId(answerId)) {
      try {
        const oneAnswer = await Answer.findById(answerId).populate("owner");
        if (oneAnswer) {
          /* const user = oneQuestion._doc;
          delete user.password; */
          res.status(201).json({ question: oneAnswer });
        } else {
          res.status(404).json({ message: "answer not found" });
        }
      } catch (error) {
        console.log(error);
        res.status(400).json({ error });
      }
    } else {
      res.status(500).json({ message: "id seems wrong" });
    }
  });



  //To post an answer
  const uploader = require("../middleware/cloudinary.config.js");
  
  router.post(
    "/:questionId/new",
    uploader.single("imageUrl"),
    isAuthenticated,
    async (req, res, next) => {
      /*console.log(req.body, req.payload);*/
  
      console.log("HOOOO", req.body);
      /*console.log("file is: ", req.file);*/
      if (!req.file) {
        console.log("there was an error uploading the file");
      }

      console.log(req.body);
      try {
        const newAnswer = await Answer.create({
          ...req.body,
          owner: req.payload.userId,
          question: req.params.questionId,
          image: req.file ? req.file.path : undefined,
        });
        const updatedQuestion = await Question.updateOne({_id:req.params.questionId}, {$push:{answers:[newAnswer._id]}})
        const allAnswers = await Answer.find({question: req.params.questionId}).populate("owner question")
        res.status(201).json({ answer: allAnswers });
      } catch (error) {
        console.log(error);
        res.status(500).json({ error });
      }
    }
  );


  //To delete an answer
router.delete("/:answerId", async (req, res, next) => {
    const { answerId } = req.params;
    try {
      await Answer.findByIdAndDelete(answerId);
      res.status(204).json({ message: "answer deleted" });
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
  module.exports = router;

