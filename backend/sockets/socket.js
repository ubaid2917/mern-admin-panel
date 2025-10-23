const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (io) => {
  io.use((socket, next) => {
    // Get JWT from client
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Authentication error: no token"));

    try {
      // Verify token (same secret you used in verifyJWTToken)
      const decoded = jwt.verify(token, process.env.JWT_SECRETE_KEY);
      socket.userId = String(decoded.id || decoded.dataValues?.id);
      next();
    } catch (err) {
      console.error("Socket auth error:", err);
      next(new Error("Authentication error"));
    }
  });

  io.on("connection", (socket) => {
    console.log(`✅ User connected: ${socket.userId}`);

    // Each user joins their own room
    if (socket.userId) {
      socket.join(socket.userId);
      console.log(`📦 Joined room: ${socket.userId}`);
    }

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.userId}`);
    });
  });
};
