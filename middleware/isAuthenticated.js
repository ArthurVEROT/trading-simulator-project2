const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/User.model");

const isAuthenticated = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    res.status(401).json({ message: "Missing Authorization header" });
    return;
  }
  const token = authorization.replace("Bearer ", "");

  try {
    const decodedJwt = jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
    const { email } = decodedJwt;
    const user = await User.findOne({ email });
    req.user = user;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "invalid token" });
    return;
  }

  next();
};

module.exports = isAuthenticated;
