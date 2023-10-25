const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});
const questionsRoutes = require("./question.routes");
router.use("/questions", questionsRoutes);

const userRoute = require(".profile.routes");
router.use("/users", userRoute);

module.exports = router;
