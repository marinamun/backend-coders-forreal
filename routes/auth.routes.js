const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/routeGuard.middleware");

const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in auth");
});

//POST to Sign up
router.post("/signup", async (req, res) => {
  const { username, password, email } = req.body;

  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(password, salt);
  try {
    const newUser = await User.create({
      username,
      password: passwordHash,
      email,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//POST to log in
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const potentialUser = await User.findOne({ username });
  console.log(potentialUser);
  if (potentialUser) {
    if (bcrypt.compareSync(password, potentialUser.password)) {
      const authToken = jwt.sign(
        { userId: potentialUser._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        }
      );
      res.status(200).json({ token: authToken });
    } else {
      res.status(400).json({ message: "Bad password" });
    }
  } else {
    res.status(400).json({ message: "User doesn't exist" });
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  console.log(req.payload);
  res.json(req.payload);
});

module.exports = router;
