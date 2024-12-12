const numbers = [1, 2, 3, 4, 5];
const total = numbers.reduce((acc, num) => acc + num, 0);
console.log(total);

const fruits = ["apple", "orange", "apple", "banana"];

const tally = fruits.reduce((acc, fruit) => {
  if (acc[fruit]) {
    acc[fruit] = acc[fruit] + 1;
  } else {
    acc[fruit] = 1;
  }
  return acc;
}, {});

console.log(tally);

const array = [
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10],
];

const flattened = array.reduce((acc, item) => [...acc, ...item], []);

console.log("array", flattened);
