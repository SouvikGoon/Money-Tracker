const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const authToken = req.header("auth-token");
  if (!authToken) {
    return res.status(401).json({ message: "Access Denied!" });
  }

  try {
    const verifiedToken = jwt.verify(authToken, process.env.TOKEN_SECRET);
    req.user = verifiedToken;
    //console.log(verifiedToken);
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token", error: err });
  }
}

module.exports = verifyToken;
