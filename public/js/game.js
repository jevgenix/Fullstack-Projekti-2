// setting api-url
const API_URL = "https://bad-api-assignment.reaktor.com/rps/history";

// needed variables to output game session
const session_result = document.getElementById("result");
const playerA_name = document.getElementById("playerA_name");
const playerB_name = document.getElementById("playerB_name");
const playerA_hand_img = document.getElementById("playerA_hand");
const playerB_hand_img = document.getElementById("playerB_hand");

// list element, where to parse html list code
const data_list = document.querySelector(".data-list");

// table element, where to parse html table code
const table_element = document.getElementById("table");

// creating Object for an array of objects
let history = [];

getSession(API_URL);
function getSession(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const progress = data.data;

      // console.log(data);
      // console.log(progress.length - 1);

      // HTML list element
      const data_li_element = document.createElement("li");

      // data implementation
      data_li_element.innerText = "Testi";
      data_li_element.classList.add("data-list-item");
      data_list.appendChild(data_li_element);

      // counter for our interval
      let counter = 0;
      // setInterval is like a forloop, but with time out
      const i = setInterval(() => {
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
          progress[counter].playerA.played,
          progress[counter].playerB.name,
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

        counter++;

        if (counter == progress.length - 1) {
          clearInterval(i);
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

function hand(played) {
  if (played == "ROCK") {
    return "<img src='/img/rock.png' alt='rock'>";
  }
  if (played == "PAPER") {
    return "<img src='/img/paper.png' alt='paper'>";
  }
  if (played == "SCISSORS") {
    return "<img src='/img/scissors.png' alt='scissors'>";
  }
}

function objectArray(playerA, playerB, playerA_hand, playerB_hand, result) {
  history.push({
    playerA: playerA,
    playerB: playerB,
    playerA_played: playerA_hand,
    playerB_played: playerB_hand,
    result: result,
  });
}

// function sortedObject() {
//
// }
