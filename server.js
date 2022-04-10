// express added
const express = require("express");
const app = express();

// PORT to listen
const PORT = process.env.PORT || 5000;

// Use static content from public dir
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/img", express.static(__dirname + "/img"));
app.use("/js", express.static(__dirname + "/js"));

// set up ejs engine
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.locals.pretty = true;

// create Router
const gameRouter = require("./src/routes/game");

// Use Router
app.use("/", gameRouter);

// Listening on port
app.listen(PORT, function () {
  console.log("Server listening on port", PORT);
});
