// this file is a test file to implement game logic

// setting api-url
// this API is not working properly due to CORS-error
const API_URL = "https://bad-api-assignment.reaktor.com/rps/history";

let game = document.getElementById("game-results");

// images to add!
const rock_img = document.createElement("img");
rock_img.src = "../img/rock.PNG";

const paper_img = document.createElement("img");
paper_img.src = "../img/paper.PNG";

const scissors_img = document.createElement("img");
scissors_img.src = "../img/scissors.PNG";

// rock paper scissors function which outputs the winner
function winner(playerA, playerA_hand, playerB, playerB_hand) {
  const r = "ROCK";
  const p = "PAPER";
  const s = "SCISSORS";

  if (playerA_hand == playerB_hand) {
    return "Tasapeli!";
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
      //let counter = 0;
      //const i = setInterval(() => {
      //  let result = winner(
      //    progress[counter].playerA.name,
      //    progress[counter].playerA.played,
      //    progress[counter].playerB.name,
      //    progress[counter].playerB.played
      //  );
      //  counter++;
      //  console.log(result);
      //  if (counter == progress.length - 1) {
      //    clearInterval(i);
      //  }
      //}, 1000);
    });
}
