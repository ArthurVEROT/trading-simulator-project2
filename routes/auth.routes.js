const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const saltRounds = 10;

// SignUp route
router.post("/signup", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Checking if username is an empty string
    if (!username) {
      res.status(400).json({ message: "Username cannot be empty" });
      return;
    }

    //Checking if username already exist
    const isUsernameExists = await User.findOne({ username });
    if (isUsernameExists) {
      res.status(400).json({ message: `Username already exists` });
      return;
    }

    // Hashing password
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in DB
    const createdUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ createdUser });

    // Checking for errors
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// Login route
router.get("/login", async (req, res, next) => {
  try {
    // Get body
    const { username, password } = req.body;

    // Check username
    const foundUsername = await User.findOne({ username });
    // Check password
    const isPasswordMatched = await bcrypt.compare(
      password,
      foundUsername.password
    );
    if ((!foundUsername) || (!isPasswordMatched)) {
      res.status(400).json({ message: `Username or password incorrect` });
      return;
    }

    const playload = { username };

    // Create auth token
    const authToken = jsonwebtoken.sign(playload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "30s",
    });

    // Connect user
    res.status(200).json({ isLoggedIn: true, authToken });

    // Check for errors
  } catch (error) {
    console.error(error);
    next(error);
  }
});


// Verify route
router.get("/verify", async (req, res, next) => {
  // Get the bearer token from the header
  const { authorization } = req.headers;
  // extract the jwt
  const token = authorization.replace("Bearer ", "");

  try {
    // verify the web token
    const playload = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    console.log({ playload });
    // send the user the payload
    res.json({ token, playload });

    // if error, catch it and say token is invalid
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid token" });
  }
});

module.exports = router;
