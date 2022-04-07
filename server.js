// express added
const express = require("express");
const app = express();

// adding body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Use static content from public dir
app.use(express.static(__dirname + "/public"));

// set up ejs engine
app.set("view engine", "ejs");
app.locals.pretty = true;

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
