require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { unless } = require("express-unless");
const routes = require("./routes");
const { authenticateRoutes } = require("./config/unlessRoutes");
const { authenticate } = require("./middlewares/auth.middleware");


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerConfig');

const app = express();


// Swagger API docs route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/test", (req, res) => {
  console.log("✅ I am here");
  res.send("Test route working!");
});

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "5mb", extended: false }));

// Middleware example
app.use(require("./middlewares/paginate").paginate);

authenticate.unless = unless;
app.use(authenticate.unless(authenticateRoutes));

app.use('/api/v1', routes);


module.exports = app;
