const fs = require('node:fs');

// const data = fs.readFileSync('example.txt', 'utf8').split('\n');
const data = fs.readFileSync('input.txt', 'utf8').split('\n');
// console.log(data);
let sum = 0;

const partone = (input, index) => {
    let [winning, draws] = input.substring(input.indexOf(':') + 2).split(' | ');
    winning = winning.split(" ").filter(x => x != "");
    draws = draws.split(" ").filter(x => x != "");
    let numWins = winning.filter(n => draws.includes(n)).length;
    if (numWins > 0) {
        sum += 2 ** (numWins - 1);
    }
    console.log(`draw ${index+1} has ${numWins} wins (${2 ** (numWins - 1)} points)`, winning.filter(n => draws.includes(n)));
}

let wins = [];
let counts = [];

const parttwo = (input, index) => {
    if (!counts[index]) {
        counts[index] = 1;
    } else {
        counts[index]++;
    }
    let [winning, draws] = input.substring(input.indexOf(':') + 2).split(' | ');
    winning = winning.split(" ").filter(x => x != "");
    draws = draws.split(" ").filter(x => x != "");
    let numWins = winning.filter(n => draws.includes(n)).length;
    wins[index] = numWins;
    sum += counts[index];
    console.log(`we  have ${counts[index]} copies of card ${index+1}. This card wins ${numWins} copies of following cards`);
    if (numWins > 0) {
        for (let i = index + 1; i < data.length && i <= index + numWins; i++) {
            if (!counts[i]) {
                counts[i] = counts[index];
            } else {
                counts[i] += counts[index];
            }
        }
        console.log('counts', counts);
    }

}


data.forEach(parttwo);

console.log('Sum: ', sum);