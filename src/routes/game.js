// express added
const express = require("express");
const gameRouter = express.Router();
const axios = require("axios");
const cors = require("cors");

gameRouter.use(cors());
gameRouter.get("/", async (req, res) => {
  // res.render("pages/index");
  try {
    const gameAPI = await axios.get(
      "https://bad-api-assignment.reaktor.com/rps/history"
    );

    const key = gameAPI.data.cursor;
    const data = gameAPI.data.data;

    res.render("pages/index");
  } catch (err) {
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.error("Error", err.message);
    }
  }
});

module.exports = gameRouter;
