const fs = require('node:fs');

const input = fs.readFileSync('example.txt', 'utf16le');
// const input = fs.readFileSync('input.txt', 'utf16le');

const data = input.split('\n').map(x => x.split('').filter(y => y != '\r' && y != ' '));

const findS = () => {
    for (let i in data) {
        for (let j in data[i]) {
            if (data[i][j] === "S") {
                console.log('S at ', i, j);
                return [i, j];
            }
        }
    }
}
const S = findS();

const dp = [];
for (let i in data) {
    dp[i] = [];
}

const MAX = 20000;

let max = 0;

const checkAdjacent = (i, j) => {
    if (i < 0 || i >= data.length) {
        return [];
    }
    if (j < 0 || j >= data[0].length) {
        return [];
    }
    let val = dp[i][j];
    let coord = [i, j];
    if (val < MAX) {
        return [val, []];
    } else {
        return [val, coord];
    }
}
const parseSymbol = (i, j) => {
    if (i < 0 || i >= data.length) {
        return [];
    }
    if (j < 0 || j >= data[0].length) {
        return [];
    }
    if (dp[i][j] !== undefined) {
        return [];
    }
    const char = data[i][j];
    const check = [];
    let a, b, coord, val;
    switch (char) {
        case "S":
            dp[i][j] = 0;
            let offsets = [
                [-1, 0],
                [0, -1],
                [0, 1],
                [1, 0]
            ];
            for (let [x, y] of offsets) {
                check.push([i + x, j + y]);
            }
            return check;
        case ".":
            return [];
        case "|":
            [a, coord] = checkAdjacent(i - 1, j);
            check = check.concat(coord);
            [b, coord] = checkAdjacent(i + 1, j);
            check = check.concat(coord);
            val = Math.min(a, b) + 1;
            break;
        case "-":
            [a, coord] = checkAdjacent(i, j - 1);
            check = check.concat(coord);
            [b, coord] = checkAdjacent(i, j + 1);
            check = check.concat(coord);
            val = Math.min(a, b) + 1;
            break;
        case "L":
            [a, coord] = checkAdjacent(i - 1, j);
            check = check.concat(coord);
            [b, coord] = checkAdjacent(i, j + 1);
            check = check.concat(coord);
            val = Math.min(a, b) + 1;
            break;

        case "7":
            [a, coord] = checkAdjacent(i, j - 1);
            check = check.concat(coord);
            [b, coord] = checkAdjacent(i + 1, j);
            check = check.concat(coord);
            val = Math.min(a, b) + 1;
            break;

        case "F":
            [a, coord] = checkAdjacent(i, j + 1);
            check = check.concat(coord);
            [b, coord] = checkAdjacent(i + 1, j);
            check = check.concat(coord);
            val = Math.min(a, b) + 1;
            break;
    }

    max = Math.max(val, max);
    dp[i][j] = val;
    return check;
}

console.log('data', data);
const partone = () => {
    let queue = [S];

    while (queue.length > 0) {
        let [i, j] = queue[0];
        queue = queue.slice(1);
        const newChecks = parseSymbol(i, j);
        console.log(`Checked ${i},${j} = ${data[i][j]} and will need to check ${newChecks}`);
        queue = queue.concat(newChecks);
    }

    console.log(dp);
    return max;
}



const parttwo = () => {}

console.log(partone());