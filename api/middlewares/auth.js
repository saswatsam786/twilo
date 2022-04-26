const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token)
      return res.status(500).json({ message: "Invalid authentication" });

    const decoded = jwt.verify(token, process.env.SECRET_ACCESS);

    if (!decoded)
      return res.status(500).json({ message: "Invalid authentication" });

    const user = await Users.findOne({ _id: decoded.id });

    rer.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = auth;
