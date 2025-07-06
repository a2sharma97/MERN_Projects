const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ msg: "error" });
  }

  // console.log(authHeader + " header");

  const token = authHeader.split(" ")[1];
  // console.log(token + "  Token ");
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    // console.log(decode + "  decoded");
    if (decode.userId) {
      req.userId = decode.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    res.status(403).json({ msg: "catch error" });
  }
};

module.exports = {
  authMiddleware,
};
