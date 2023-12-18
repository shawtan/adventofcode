const fs = require('node:fs');

const input = fs.readFileSync('example.txt', 'utf8');
// const input = fs.readFileSync('example2.txt', 'utf8');
// const input = fs.readFileSync('input.txt', 'utf8');

const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .split('\n')
    .map(x => x.split(' '))
    .map(y => ([y[0], parseInt(y[1]), y[2]]));
// console.log(input);
// console.log(data);
// console.log(data.length, data[0].length);
// console.log(data[0]);
// return;


const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;
const MOVEMENT = [
    [0, 1, RIGHT],
    [0, -1, LEFT],
    [-1, 0, UP],
    [1, 0, DOWN]
];
const SYMBOLS = [
    ">", "<", "^", "v"
];

const isInverse = (a, b) => {
    return a != b && ((a <= 1 && b <= 1) || (a >= 2 && b >= 2));
}

const parseDirections = (d) => {
    switch (d) {
        case "R":
            return RIGHT;
        case "L":
            return LEFT;
        case "U":
            return UP;
        case "D":
            return DOWN;
    }
}

const determineBounds = () => {
    let left, right, top, bottom;
    left = right = top = bottom = 0;
    let currentx, currenty;
    currentx = currenty = 0;

    for (let row of data) {
        const [d, n] = row;
        const [dy, dx] = MOVEMENT[parseDirections(d)];
        currentx += dx * n;
        currenty += dy * n;
        left = Math.min(left, currentx);
        right = Math.max(right, currentx);
        top = Math.min(top, currenty);
        bottom = Math.max(bottom, currenty);
    }

    console.log(left, right, top, bottom);
    console.log(currentx, currenty);
    return [right - left + 1, bottom - top + 1, currentx - left, currenty - top];
}

const [WIDTH, HEIGHT, START_X, START_Y] = determineBounds();
console.log(WIDTH, HEIGHT, START_X, START_Y);

const grid = [];

for (let i = 0; i < HEIGHT; i++) {
    grid[i] = [];
    for (let j = 0; j < WIDTH; j++) {
        grid[i][j] = ".";
    }
}

const printGrid = () => {
    console.log('grid');
    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(''));
    }
    console.log('\n');
}

const writeGrid = () => {
    fs.writeFileSync('output.txt', grid.map(x => x.join('')).join('\n'));
}

// printGrid();

const navigate = (i, j, val, d) => {
    let currentx = START_X;
    let currenty = START_Y;
    let sum = 0;

    for (let row of data) {
        const [d, n] = row;
        const dir = parseDirections(d);
        const [dy, dx] = MOVEMENT[dir];
        if (dir === UP || dir === DOWN) {
            grid[currenty][currentx] = SYMBOLS[dir];
        }

        for (let steps = 1; steps <= n; steps++) {
            currenty += dy;
            currentx += dx;
            grid[currenty][currentx] = SYMBOLS[dir];
            sum++;
        }
    }

    printGrid();
    writeGrid();
    return sum;
}

// # ####### #
// ### ##  ###
const countMiddle = () => {
    let count = 0;
    let before = count;
    for (let i = 1; i < HEIGHT - 1; i++) {
        let outside = true;
        let lastwall = '';
        for (let j = 0; j < WIDTH; j++) {
            if (grid[i][j] === SYMBOLS[UP] || grid[i][j] === SYMBOLS[DOWN]) {
                if (lastwall === grid[i][j]) {
                    // skip
                } else {
                    outside = !outside;
                }
                lastwall = grid[i][j];
            } else if (grid[i][j] === ".") {
                if (!outside) {
                    // 
                    count++;
                    grid[i][j] = '@';
                }
            }
        }
        console.log('row', i, 'has', count - before);
        before = count;
    }
    console.log('middle', count);
    printGrid();
    writeGrid();
    return count;
}

const partone = () => {
    let sum = navigate();
    sum += countMiddle();
    return sum;

}
const parttwo = () => {}

console.log(partone());
// console.log(parttwo());