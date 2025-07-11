// Dotenv
require("dotenv").config();
// Express
const express = require("express");
const app = express();
// CORS
const cors = require("cors");
// Router
const { router } = require("./src/routes/app");
// Middleware
const { logRoute } = require("./src/middleware/middleware");

app.listen(
  process.env.SVPORT,
  console.log(`Server Up in Port ${process.env.SVPORT}`)
);

app.use(express.json());
app.use(cors());

app.use(logRoute);
app.use("/", router);

module.exports = app