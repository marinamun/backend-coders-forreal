const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const questionsRoutes = require("./question.routes");
router.use("/questions", questionsRoutes);

module.exports = router;
