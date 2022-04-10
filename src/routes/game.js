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
    // getting API using axios
    const gameAPI = await axios.get(
      "https://bad-api-assignment.reaktor.com/rps/history"
    );
    // finding our json file
    let dataJson = JSON.parse(fs.readFileSync("./data.json"));
    // looping through API and parsing API data items into json file, if json file doesn't contain id
    const data = gameAPI.data.data;
    data.forEach((item) => {
      let id = data.gameId;
      if (!dataJson.data.includes(id)) {
        dataJson.data.push(item);
      }
    });
    // stringify data
    let jsonStr = JSON.stringify(dataJson);
    // write data into json file
    fs.writeFile("src/routes/data.json", jsonStr, (err) => {
      if (err) throw err;
      console.log("Data sended to json file!");
    });
    // render page
    res.render("pages/index");
  } catch (err) {
    // catching all possible errors
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

// "/json" route, where we keep all json data
gameRouter.get("/json", (req, res) => {
  // finding needed json file
  let dataJson = JSON.parse(fs.readFileSync("src/routes/data.json"));
  // sending raw json file to "/json" route
  res.send(dataJson);
});

// gameRouter export
module.exports = gameRouter;
