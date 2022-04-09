// test code for next implementation
// creating an Score Object
let data = {
  "Pekka Pekkanen": 10,
  "Outi Outinen": 15,
  "Jarmo Jarmonen": 17,
  "Antti Anttinen": 3,
  "Pekka Pekkanen": 12,
};

// Adding new parameter to the Object
let nimi = "Kimmo Kimmonen";
data[nimi] = 22;

// Sorting Objects by highest score
let sorted = Object.entries(data)
  .sort(([, v1], [, v2]) => v2 - v1)
  .reduce(
    (obj, [k, v]) => ({
      ...obj,
      [k]: v,
    }),
    {}
  );

// check if it works
console.log(sorted);

// looping through new sorted object
for (const key in sorted) {
  console.log(`${key}: ${sorted[key]}`);
}

// Game History Object
// quick check
let result = "Pekka Pekkanen";

// Object Created
let history = [
  {
    playerA: "Pekka Pekkanen",
    playerB: "Outi Outinen",
    playerA_played: "scissors",
    playerB_played: "paper",
    result: result,
  },
  {
    playerA: "Jarmo Jarmonen",
    playerB: "Antti Anttinen",
    playerA_hand: "paper",
    playerB_hand: "rock",
    result: "Jarmo Jarmonen",
  },
];

// log the object
console.log(history);

// pushing new data into the object
history.push({
  playerA: "Vilma Vilmanen",
  playerB: "Alla Allonen",
  playerA_played: "scissors",
  playerB_played: "rock",
  result: "Alla Allonen",
});

// looping through the object, finding all the data needed
history.forEach((res) => {
  console.log(res.playerA, res.playerB, res.result);
});
