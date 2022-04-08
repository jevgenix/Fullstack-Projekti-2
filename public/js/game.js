// setting api-url
const API_URL = "https://bad-api-assignment.reaktor.com/rps/history";

// needed variables to output game session
let session_result = document.getElementById("result");
let playerA_name = document.getElementById("playerA_name");
let playerB_name = document.getElementById("playerB_name");
let playerA_hand_img = document.getElementById("playerA_hand");
let playerB_hand_img = document.getElementById("playerB_hand");

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

getSession(API_URL);

function getSession(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const progress = data.data;
      console.log(progress.length - 1);

      // counter for our interval
      let counter = 0;
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

        counter++;

        if (counter == progress.length - 1) {
          clearInterval(i);
        }
      }, 5000);
    });
}
