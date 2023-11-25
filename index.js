const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const colors = require("@colors/colors");

const PORT = process.env.PORT | 5000;
const app = express();
const routes = require("./routes/");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/", routes);

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`.brightCyan.bgMagenta);
});
