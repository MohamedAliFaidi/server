const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function signup(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json("user created");
  } catch (err) {
    console.log(err);
    res.status(400).json("alereaady exist");
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json("user not found");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json("wrong password");
    }
    const exp = Date.now() + 1000 * 60 * 60 * 7;
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET);
    res.cookie("Authorization", token, {
      expires: new Date(exp),
      httpOnly: true,
    });

    res.status(200).json( "logged in");
  } catch (err) {
    console.log(err);
    res.status(400).json("error");
  }
}

function logout(req, res) {}
module.exports = {
  signup,
  login,
  logout,
};
