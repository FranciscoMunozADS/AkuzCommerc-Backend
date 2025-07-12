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
// Middlewares
app.use(express.json());
app.use(cors());
app.use(logRoute);
app.use("/", router);

// app para testing
module.exports = app;

// Server (lo ejecuta si no es test)
if (require.main === module) {
  app.listen(process.env.SVPORT, () =>{
    console.log(`Server Up in Port ${process.env.SVPORT}`)
  });
}
