const express = require("express");
const app = express();

// Import Middleware
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

// Middleware
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(morgan("dev"));

require("./src/models");
// app.use('/', require('./src/routes'))

app.listen(5000, () => {
  console.log(`Server start http://localhost:` + 5000);
});
