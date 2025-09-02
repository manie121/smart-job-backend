const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");

const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(401).json({ message: "No token provided" });

      const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretkey");
      
      // Load full user from DB
      const user = await User.findById(decoded.id).select("-password");
      if (!user) return res.status(401).json({ message: "User not found" });

      // Role check
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user; // ✅ full user object available
      next();
    } catch (error) {
      res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authMiddleware;