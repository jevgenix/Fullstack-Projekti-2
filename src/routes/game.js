// express added
const express = require("express");
const gameRouter = express.Router();

gameRouter.get("/", (req, res) => {
  res.render("pages/index");
});

module.exports = gameRouter;
