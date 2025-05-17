const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization; // Token sent from frontend

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  const token = authHeader.split(" ")[1]; // Extract JWT token
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT Verification Error:", err); // Debugging error
      return res.status(403).json({ message: "Forbidden: Invalid token" });
    }
    console.log("Decoded Token:", decoded); // Log decoded token for debugging
    req.user = decoded;
    next();
  });
  
};

module.exports = authenticateToken;
