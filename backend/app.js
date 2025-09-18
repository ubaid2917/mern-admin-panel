require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { unless } = require("express-unless");
const routes = require("./routes");

const app = express();

app.get("/test", (req, res) => {
  console.log("✅ I am here");
  res.send("Test route working!");
});

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

// Middleware example
app.use(require("./middlewares/paginate").paginate);
app.use('/api/v1', routes);

module.exports = app;
