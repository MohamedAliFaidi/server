const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function requireAuh(req, res, next) {
  //read the token from the header or url
 const token = req.cookies.Authorization;
  //decode the token using a secret key-phrase
  const decoded = jwt.verify(token, process.env.SECRET);
  try {
    const user = User.findById(decoded.sub);

    if(Date.now() >  decoded.exp){
        res.status(401).json("token expired");
    }


    if (!user) {
      return res.status(401).json("unauthorized");
    }
    req.user = user;
  } catch (error) {
    res.status(401).json("unauthorized");
  }

  next();

  console.log("middle");
  next();
}
module.exports = requireAuh;
