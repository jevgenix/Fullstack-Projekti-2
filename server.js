// express added
const express = require("express");
const app = express();
const port = 5000;

// adding body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

// Use static content from public dir
app.use(express.static(__dirname + "/public"));

// set up ejs engine
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.locals.pretty = true;

const gameRouter = require("./src/routes/game");

app.use("/", gameRouter);

app.listen(port, function () {
  console.log("Server listening on port", port);
});
