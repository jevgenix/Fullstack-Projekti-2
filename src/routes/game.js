// express added
const express = require("express");
const gameRouter = express.Router();
const fs = require("fs");
const axios = require("axios");
// adding body parser
const bodyParser = require("body-parser");
gameRouter.use(bodyParser.urlencoded({ extended: true }));

gameRouter.get("/", async (req, res) => {
  try {
    const gameAPI = await axios.get(
      "https://bad-api-assignment.reaktor.com/rps/history"
    );

    let dataJson = JSON.parse(fs.readFileSync("./data.json"));
    const data = gameAPI.data.data;

    data.forEach((item) => {
      let id = data.gameId;
      if (!dataJson.data.includes(id)) {
        dataJson.data.push(item);
      }
    });

    let jsonStr = JSON.stringify(dataJson);
    fs.writeFile("src/routes/data.json", jsonStr, (err) => {
      if (err) throw err;
      console.log("Data sended to json file!");
    });
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

gameRouter.get("/json", (req, res) => {
  let dataJson = JSON.parse(fs.readFileSync("src/routes/data.json"));
  res.send(dataJson);
});

module.exports = gameRouter;
