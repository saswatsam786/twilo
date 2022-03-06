const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { fullname, email, username, password, gender } = req.body;
    newUserName = username.toLowerCase().replace(/ /g, "");
    console.log(newUserName);

    const userName = await Users.findOne({ username: newUserName });
    console.log(userName);
    if (userName)
      return res.status(400).json({ message: "The user name already taken" });

    const userEmail = await Users.findOne({ email });
    if (userEmail)
      return res.status(400).json({ message: "The email id already exists" });

    var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    if (password.length < 7)
      return res.status(400).json({
        message:
          "Password should be at least 7 characters and use some special characters",
      });

    // if (!format.test(password))
    //   return res.status(400).json({ message: "Use some special character" });

    const hashPassword = await bcrypt.hash(password, 15);

    const newUser = new Users({
      fullname,
      username: newUserName,
      email,
      password: hashPassword,
      gender,
    });

    await newUser.save();

    const accessToken = createaccessToken({ id: newUser._id });
    const refreshToken = createrefreshToken({ id: newUser._id });

    const cookieOptions = {
      httpOnly: true,

      path: "/api/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(201).json({
      message: "Registered",
      accessToken,
      user: {
        ...newUser._doc,
        password: "",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email }).populate(
      "followers following",
      "-password"
    );

    if (!user)
      return res
        .status(400)
        .json({ message: "The user does not exist. Please Sign UP" });

    const compare = await bcrypt.compare(password, user.password);

    if (!compare)
      return res.status(404).json({ message: "The password is incorrect" });

    const accessToken = createaccessToken({ id: user._id });
    const refreshToken = createrefreshToken({ id: user._id });

    const cookieOptions = {
      httpOnly: true,
      path: "/api/refreshtoken",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    };

    res.cookie("refreshToken", refreshToken, cookieOptions);

    res.status(200).json({
      message: "Logged In",
      accessToken,
      user: { ...user._doc, password: "" },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      path: "/api/refreshtoken",
    });

    return res.status(200).json({ message: "Logged Out" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    console.log(refreshToken, 3);

    if (!refreshToken)
      return res
        .status(400)
        .json({ message: "You have logged out. Please log in!!" });

    jwt.verify(
      refreshToken,
      process.env.SECRET_REFRESH,
      async (err, result) => {
        if (err) return res.status(400).json({ message: err });
        console.log(result);
        const user = await Users.findById(result.id)
          .select("-password")
          .populate("followers following", "-password");
        if (!user)
          return res.status(400).json({ message: "Please login again" });

        const accessToken = createaccessToken({ id: result.id });
        res.status(200).json({ accessToken, ...user._doc });
      }
    );
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

const createaccessToken = (id) => {
  return jwt.sign(id, process.env.SECRET_ACCESS, { expiresIn: "1d" });
};

const createrefreshToken = (id) => {
  return jwt.sign(id, process.env.SECRET_REFRESH, { expiresIn: "30d" });
};
