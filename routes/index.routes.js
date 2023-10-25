const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const questionsRoutes = require("./question.routes");
router.use("/questions", questionsRoutes);

router.get("/profile", (req, res, next) => {
  res.json("All good in profile");
});

module.exports = router;
