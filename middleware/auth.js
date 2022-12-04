const jwt = require("jsonwebtoken");
const User = require("../model/User");

module.exports = async function (req, res, next) {
  const bearerToken = await req?.headers?.authorization;

  if (!bearerToken) return res.status(403).send("No token found");

  const token = bearerToken.substr(7);
  if (!token) return res.status(404);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findOne({ _id: verified.id }, { password: 0 });
    req.user = user;

    next();
  } catch (error) {
    return res.status(500).send("Error in Token", error);
  }
};
