var jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const verifyAccessToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).send({ success: false, message: "Please authenticate valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res
      .status(401)
      .send({ success: false, message: "Please authenticate valid token2" });
  }
};

module.exports = verifyAccessToken;
