const jwt = require("jsonwebtoken");
const ChatUser = require("../models/UserModel");
const asyncHandler = require("express-async-handler");
const secret="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.cThIIoDvwdueQB468K5xDc5633seEFoqwxjF_xSJyQQ"

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify and decode token
      const decoded = jwt.verify(token, secret);

      // Fetch user by ID (excluding password)
      req.user = await ChatUser.findById(decoded.id).select("-password");

      if (!req.user) {
        res.status(404);
        throw new Error("User not found");
      }

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Token verification error:", error.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  // If no token was found
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };