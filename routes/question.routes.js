const { isAuthenticated } = require("../middleware/routeGuard.middleware");

const router = require("express").Router();

//To get all the questions
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const allQuestions = await Question.find();
    res.status(201).json({ allQuestions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//To get a specific question
router.get("/:questionId", isAuthenticated, async (req, res, next) => {
  const { questionId } = req.params;
  if (mongoose.isValidObjectId(questionId)) {
    try {
      const oneQuestion = await Question.findById(questionId);
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
//To post a question
router.post("/new", isAuthenticated, async (req, res, next) => {
  try {
    const newQuestion = await Question.create(req.body);
    console.log(req.body);
    res.status(201).json({ question: newQuestion });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

//To edit a question card
router.put("/:questionId", isAuthenticated, async (req, res, next) => {
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
router.delete("/:questionId", isAuthenticated, async (req, res, next) => {
  const { questionId } = req.params;
  try {
    await Question.findByIdAndDelete(questionId);
    res.status(204).json({ message: "question deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
