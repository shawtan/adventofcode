const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

let data = input.split('\n').map(x => x.split('').filter(y => y != '\r' && y != ' '));
data = data.slice(0, data.length - 1);

// console.log(data);
const findS = () => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "S") {
                // console.log('S at ', i, j);
                return [i, j];
            }
        }
    }
}
const S = findS();
const MAX = 20000;

const dp = [];
for (let i in data) {
    dp[i] = [];
    for (let j in data[i]) {
        dp[i][j] = MAX;
    }
}


// north east south west
const NORTH = 0;
const EAST = 1;
const SOUTH = 2;
const WEST = 3;
const SYMBOLS = {
    "|": [true, false, true, false],
    "-": [false, true, false, true],
    "L": [true, true, false, false],
    "J": [true, false, false, true],
    "7": [false, false, true, true],
    "F": [false, true, true, false],
    ".": [false, false, false, false],
    "S": [true, true, true, true],
};

let max = 0;

const checkAdjacent = (i, j) => {
    if (i < 0 || i >= data.length) {
        return [MAX, []];
    }
    if (j < 0 || j >= data[0].length) {
        return [MAX, []];
    }
    let val = dp[i][j];
    let coord = [i, j];
    if (val < MAX) {
        return [val, []];
    } else {
        return [val, [coord]];
    }
}

const isSquareValid = (i, j, direction) => {
    if (i < 0 || i >= data.length) {
        return false;
    }
    if (j < 0 || j >= data[0].length) {
        return false;
    }
    const char = data[i][j];
    // console.log('isSquareValid', char, SYMBOLS[char]);
    return SYMBOLS[char][direction];
}
const parseSymbol = (i, j) => {
    if (i < 0 || i >= data.length) {
        return [];
    }
    if (j < 0 || j >= data[0].length) {
        return [];
    }
    if (dp[i][j] < MAX) {
        // console.log('skip', i, j);
        return [];
    }
    const char = data[i][j];
    const charDirections = SYMBOLS[char];
    let val = MAX;
    const check = []

    if (char === "S") {
        dp[i][j] = 0;
        let offsets = [
            [-1, 0, SOUTH],
            [0, -1, EAST],
            [0, 1, WEST],
            [1, 0, NORTH]
        ];
        for (let [x, y, d] of offsets) {
            if (isSquareValid(i + x, j + y, d)) {
                check.push([i + x, j + y]);
            }
        }
        return check;
    }

    // console.log(i, j, char, 'has directions', charDirections);

    // north
    if (charDirections[NORTH]) {
        if (isSquareValid(i - 1, j, SOUTH)) {
            let squareVal = dp[i - 1][j];
            if (squareVal < MAX) {
                val = Math.min(val, dp[i - 1][j]);
            } else {
                check.push([i - 1, j]);
            }
        }
    }

    if (charDirections[EAST]) {
        // console.log('east square');
        let x = i;
        let y = j + 1;
        if (isSquareValid(x, y, WEST)) {
            let squareVal = dp[x][y];
            // console.log(x, y, 'is valid', squareVal);
            if (squareVal < MAX) {
                val = Math.min(val, dp[x][y]);
            } else {
                check.push([x, y]);
            }
        }
    }

    if (charDirections[SOUTH]) {
        let x = i + 1;
        let y = j;
        if (isSquareValid(x, y, NORTH)) {
            let squareVal = dp[x][y];
            if (squareVal < MAX) {
                val = Math.min(val, dp[x][y]);
            } else {
                check.push([x, y]);
            }
        }
    }

    if (charDirections[WEST]) {
        // console.log('west square');
        let x = i;
        let y = j - 1;
        if (isSquareValid(x, y, EAST)) {
            let squareVal = dp[x][y];
            // console.log(x, y, 'is valid', squareVal);
            if (squareVal < MAX) {
                val = Math.min(val, dp[x][y]);
            } else {
                check.push([x, y]);
            }
        }
    }

    // console.log('final val for', i, j, 'is', val);
    if (val < MAX) {
        dp[i][j] = val + 1;
        max = Math.max(max, dp[i][j]);
    }
    return check;
}

const WALL = '#';
const OUTSIDE = "O";
const EMPTY = 'I';
const wallmap = [];

const createWallmap = () => {
    for (let i = 0; i < data.length; i++) {
        wallmap[i * 3] = [];
        wallmap[i * 3 + 1] = [];
        wallmap[i * 3 + 2] = [];
        for (let j = 0; j < data[0].length; j++) {
            for (x = i * 3; x < i * 3 + 3; x++) {
                for (y = j * 3; y < j * 3 + 3; y++) {
                    wallmap[x][y] = EMPTY;
                }
            }

            if (dp[i][j] !== MAX) {
                const char = data[i][j];
                const charDirections = SYMBOLS[char];
                wallmap[i * 3 + 1][j * 3 + 1] = WALL;
                if (charDirections[NORTH]) {
                    wallmap[i * 3][j * 3 + 1] = WALL;
                }
                if (charDirections[EAST]) {
                    wallmap[i * 3 + 1][j * 3 + 2] = WALL;
                }
                if (charDirections[SOUTH]) {
                    wallmap[i * 3 + 2][j * 3 + 1] = WALL;
                }
                if (charDirections[WEST]) {
                    wallmap[i * 3 + 1][j * 3] = WALL;
                }
            }
        }
    }
}

const parseHoles = (i, j) => {

    if (i < 0 || i >= wallmap.length) {
        return [];
    }
    if (j < 0 || j >= wallmap[0].length) {
        return [];
    }
    if (wallmap[i][j] !== EMPTY) {
        return [];
    }

    wallmap[i][j] = OUTSIDE;
    let offsets = [
        [-1, 0, SOUTH],
        [0, -1, EAST],
        [0, 1, WEST],
        [1, 0, NORTH]
    ];
    let check = [];
    for (let [x, y, d] of offsets) {
        check.push([i + x, j + y]);
    }
    return check;
}

const printGrid = () => {
    console.log("Grid:", wallmap.length, wallmap[0].length);
    for (let i = 0; i < wallmap.length; i++) {
        console.log(wallmap[i].join(''));
    }
    console.log("END Grid:");
}

const partone = () => {
    let queue = [S];
    while (queue.length > 0) {
        let [i, j] = queue[0];
        queue = queue.slice(1);
        const newChecks = parseSymbol(i, j);
        queue = queue.concat(newChecks);
    }
    // console.log(dp);
    // printGrid();

    console.log('max', max);
    return max;
}


const parttwo = () => {
    partone(); // calc dp
    createWallmap();
    // printGrid();

    let queue = [];

    for (let i = 0; i < wallmap.length; i++) {
        queue.push([i, 0]);
        queue.push([i, wallmap[0].length - 1]);
    }
    for (let i = 0; i < wallmap[0].length; i++) {
        queue.push([0, i]);
        queue.push([wallmap.length - 1, i]);
    }

    while (queue.length > 0) {
        let [i, j] = queue[0];

        // if (i == data.length - 1) {
        //     console.log('Parsing', i, j, data[i][j]);
        // }
        queue = queue.slice(1);
        const newChecks = parseHoles(i, j);
        queue = queue.concat(newChecks);
    }
    printGrid();
    // console.log(dp);
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            let isEmpty = true;
            for (x = i * 3; x < i * 3 + 3; x++) {
                for (y = j * 3; y < j * 3 + 3; y++) {
                    if (wallmap[x][y] !== EMPTY) {
                        isEmpty = false;
                    }
                }
            }
            if (isEmpty) {
                sum++;
            }
        }
    }
    return sum;

}

// console.log(partone());
console.log(parttwo());