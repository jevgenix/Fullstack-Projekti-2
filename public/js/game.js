// setting api-url
// this API is not working properly due to CORS-error
const API_URL = "https://bad-api-assignment.reaktor.com/rps/history";

// needed variables to output game session
const session_result = document.getElementById("result");
const playerA_name = document.getElementById("playerA_name");
const playerB_name = document.getElementById("playerB_name");
const playerA_hand_img = document.getElementById("playerA_hand");
const playerB_hand_img = document.getElementById("playerB_hand");

// table element, where to parse html table code
const table_element = document.getElementById("table");
const scoreboard_element = document.getElementById("scoreboard");

// timer
const t = document.getElementById("timer");

// creating Object for an array of objects
let history = [];

// scoreboard object
let scoreboard = {};

countdown();

// fetching data from /json
getSession("/json");
function getSession(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const progress = data.data;

      // counter for our interval
      let counter = 5;
      // setInterval is like a forloop, but with time out.
      const interval = setInterval(() => {
        // timer for next session
        countdown();
        // sending each data into winner function
        let result = winner(
          progress[counter].playerA.name,
          progress[counter].playerA.played,
          progress[counter].playerB.name,
          progress[counter].playerB.played
        );

        if (result == "Tie!") {
          session_result.innerHTML = result;
        } else {
          session_result.innerHTML = "Winner: " + result;
        }

        // sending data to objectArray function, so that it pushes all data
        // into history array
        objectArray(
          progress[counter].playerA.name,
          progress[counter].playerB.name,
          progress[counter].playerA.played,
          progress[counter].playerB.played,
          result
        );

        // create a table and parse object information into it
        // to implement table I use bootstrap
        let table = "<table class='table table-striped'>";
        table += ` 
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope='col'> Player A </th>
                        <th scope='col'> Player B </th>
                        <th scope='col'> Player A Played </th>
                        <th scope='col'> Player B Played </th>
                        <th scope='col'> Winner </th>
                      </tr>
                    </thead>`;
        // loop every object item to create table, index works as counter
        history.forEach((session, index) => {
          table += `<tbody><tr><th scope='row'> ${index + 1} </th>`;
          table += "<td>" + session.playerA + "</td>";
          table += "<td>" + session.playerB + "</td>";
          table += "<td>" + session.playerA_played + "</td>";
          table += "<td>" + session.playerB_played + "</td>";
          table += "<td>" + session.result + "</td></tr>";
        });
        table += "</tbody></table>";
        table_element.innerHTML = table;

        // sending data to scoreboardObj function, implements our scoreboard
        // if result is not Tie, it sends winners name
        if (result != "Tie!") {
          scoreboardObj(result);
        }

        // Sorting scoreboard Object by highest score
        let sorted = Object.entries(scoreboard)
          .sort(([, v1], [, v2]) => v2 - v1)
          .reduce(
            (obj, [k, v]) => ({
              ...obj,
              [k]: v,
            }),
            {}
          );

        // creating scoreboard table
        let scoreboard_table = "<table class='table table-striped'>";
        scoreboard_table += ` 
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope='col'> Name </th>
                          <th scope='col'> Score </th>
                        </tr>
                      </thead>`;
        // here we dont use forEach, so we need to create index manually
        let index = 1;
        for (const [key, value] of Object.entries(sorted)) {
          scoreboard_table += `<tbody><tr><th scope='row'> ${index++} </th>`;
          scoreboard_table += "<td>" + key + "</td>";
          scoreboard_table += "<td>" + value + "</td></tr>";
        }
        scoreboard_table += "</tbody></table>";
        scoreboard_element.innerHTML = scoreboard_table;

        // now we add to counter value to counter, if value equals progress.length - 1, interval stops.
        counter++;
        if (counter == progress.length - 1) {
          clearInterval(interval);
        }
      }, 5000);
    });
}

// GAME LOGIC
// rock paper scissors function which outputs the winner
function winner(playerA, playerA_hand, playerB, playerB_hand) {
  const r = "ROCK";
  const p = "PAPER";
  const s = "SCISSORS";

  // sending information into html code
  playerA_name.innerHTML = playerA;
  playerB_name.innerHTML = playerB;
  playerA_hand_img.innerHTML = hand(playerA_hand);
  playerB_hand_img.innerHTML = hand(playerB_hand);

  if (playerA_hand == playerB_hand) {
    return "Tie!";
  }

  if (playerA_hand == r) {
    if (playerB_hand == s) {
      return playerA;
    } else {
      return playerB;
    }
  }

  if (playerA_hand == p) {
    if (playerB_hand == r) {
      return playerA;
    } else {
      return playerB;
    }
  }

  if (playerA_hand == s) {
    if (playerB_hand == p) {
      return playerA;
    } else {
      return playerB;
    }
  }
}

// sending img by user hand
function hand(played) {
  if (played == "ROCK") {
    return "<img src='/img/rock.PNG' alt='rock'>";
  }
  if (played == "PAPER") {
    return "<img src='/img/paper.PNG' alt='paper'>";
  }
  if (played == "SCISSORS") {
    return "<img src='/img/scissors.PNG' alt='scissors'>";
  }
}

// pushing data into table
function objectArray(playerA, playerB, playerA_hand, playerB_hand, result) {
  history.push({
    playerA: playerA,
    playerB: playerB,
    playerA_played: playerA_hand,
    playerB_played: playerB_hand,
    result: result,
  });
}

// if scoreboard have winners name already, it will add new value to score
// else it creates object with key and value
function scoreboardObj(name) {
  if (Object.keys(scoreboard).includes(name)) {
    scoreboard[name] += 1;
  } else {
    scoreboard[name] = 1;
  }
}

function countdown() {
  let time_left = 1;

  let timer = setInterval(() => {
    if (time_left == 5) {
      clearInterval(timer);
    }

    t.innerHTML = `<h1 style="text-align:center" id="timer">Next session starts in ${
      5 - time_left
    }</h1>`;

    time_left += 1;
  }, 1000);
}
