const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  //verify authentication
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  // authentication = 'Bearer sdlfkjlaksjdflk.asflkjsdflkajflskajf.adsflkjasdlfkj' we dont want the Bearer we just want the jwt so we will split it and it will create an array of two
  // ['Bearer', 'sdlfkjlaksjdflk.asflkjsdflkajflskajf.adsflkjasdlfkj'] and from this array we will take the second element

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;
