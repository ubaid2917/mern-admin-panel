const express = require("express");
const { sequelize } = require("./models/index");
const app = require("./app");
const PORT = 5000;
const { Server } = require("socket.io");  

// http server
const server = require("http").createServer(app);

// instance 
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})
  
// setup socket.io
io.on("connection", (socket) => {
  console.log("a user connected");  


  socket.emit("welcome", "Welcome to the Socket.io server!");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
})

app.set("io", io);

// Middleware to parse JSON
app.use(express.json());

// Test DB connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Unable to connect to the database:", err));

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running at ${PORT}`);
});
