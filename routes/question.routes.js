const router = require("express").Router();
const Question = require("../models/Question.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require("../middleware/routeGuard.middleware");



const answersRoutes = require("./answers.routes");
router.use("/answers", answersRoutes);




//To get all the questions
router.get("/", async (req, res, next) => {
  try {
    const allQuestions = await Question.find();
    res.status(201).json({ allQuestions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});


//To post a question
const uploader = require("../middleware/cloudinary.config.js");

router.post(
  "/new",
  uploader.single("imageUrl"),
  isAuthenticated,
  async (req, res, next) => {
    /*console.log(req.body, req.payload);*/

    console.log("HEREEE", req.body);
    /*console.log("file is: ", req.file);*/
    if (!req.file) {
      console.log("there was an error uploading the file");
    }

    try {
      const newQuestion = await Question.create({
        ...req.body,
        owner: req.payload.userId,
        image: req.file ? req.file.path : undefined,
      });

      res.status(201).json({ question: newQuestion });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  }
);


//To get a specific question
router.get("/:questionId", async (req, res, next) => {
  const { questionId } = req.params;
  if (mongoose.isValidObjectId(questionId)) {
    try {
      const oneQuestion = await Question.findById(questionId).populate("owner answers");
      if (oneQuestion) {
        res.status(201).json({ question: oneQuestion });
      } else {
        res.status(404).json({ message: "question not found" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error });
    }
  } else {
    res.status(500).json({ message: "id seems wrong" });
  }
});



//To edit a question card
router.put("/:questionId", async (req, res, next) => {
  const { questionId } = req.params;
  try {
    const updateQuestion = await Question.findByIdAndUpdate(
      questionId,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ question: updateQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//To delete a question
router.delete("/:questionId", async (req, res, next) => {
  const { questionId } = req.params;
  try {
    await Question.findByIdAndDelete(questionId);
    res.status(204).json({ message: "question deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
