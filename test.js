// test code for next implementation

// creating an Object
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

// Sorting Objects by value
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
