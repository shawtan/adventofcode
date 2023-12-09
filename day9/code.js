const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.split('\n').map(x => x.split(' ').map(y => parseInt(y)));

let sum = 0;

const analyzeLine = (line) => {
    let isAllZero = line.filter(x => x !== 0).length == 0;
    if (isAllZero) {
        return 0;
    }

    let nextDelta = [];

    for (let i = 0; i < line.length - 1; i++) {
        nextDelta[i] = line[i + 1] - line[i];
    }

    let delta = analyzeLine(nextDelta);
    // return line[line.length - 1] + delta; // pt 1
    return line[0] - delta; // pt 2

}

const partone = () => {
    sum = 0;
    for (line of data) {
        sum += analyzeLine(line);
    }

    return sum;
}



const parttwo = () => {}

console.log(partone());