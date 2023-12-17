const fs = require('node:fs');
const {
    PriorityQueue,
} = require('@datastructures-js/priority-queue');

// const input = fs.readFileSync('example.txt', 'utf8');
// const input = fs.readFileSync('example2.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');


const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .split('\n')
    .map(x => x.split('').map(y => parseInt(y)));
// console.log(input);
// console.log(data);
console.log(data.length, data[0].length);
// console.log(data[0]);
// return;


const MAX = 9999;
const MOVES = 10;
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

const isInverse = (a, b) => {
    return a != b && ((a <= 1 && b <= 1) || (a >= 2 && b >= 2));
}

const grid = [];

for (let i = 0; i < data.length; i++) {
    grid[i] = [];
    for (let j = 0; j < data[0].length; j++) {
        grid[i][j] = [];
        for (let d = 0; d < 4; d++) {
            grid[i][j][d] = MAX;
        }
    }
}

const accessGrid = (i, j, d, n) => {
    return grid[i][j][d];
}

const assign = (i, j, d, v) => {
    grid[i][j][d] = v;
    return;
}

const isInBounds = (i, j) => {
    return !(i < 0 || i >= data.length || j < 0 || j >= data[0].length);
}

// do a simple bfs...
const navigate = (i, j, val, d) => {
    // console.log('navigate', i, j, val, d, n, typeof n);
    if (!isInBounds(i, j)) {
        console.log('out of bounds', i, j);
        return [];
    }

    if (accessGrid(i, j, d) <= val) {
        // console.log('accessGrid(i, j, d) < val', i, j, accessGrid(i, j, d), val, d);
        return [];
    }

    assign(i, j, d, val);
    // console.log('first assign', val, grid[i][j], );
    // grid[i][j] = val;

    let next = [];
    for (let newD = 0; newD < 4; newD++) {
        // don't go backwards
        if (d === newD || isInverse(d, newD)) {
            continue;
        }

        const [di, dj] = MOVEMENT[newD];
        let newVal = val;
        for (let steps = 1; steps <= MOVES; steps++) {
            const newi = i + di * steps;
            const newj = j + dj * steps;
            if (!isInBounds(newi, newj)) {
                break;
            }
            newVal += data[newi][newj];
            if (steps >= 4) { // pt2
                next.push([newi, newj, newVal, newD]);
            }
        }

    }

    // console.log('next', "(", i, j, ")", "val:", val, "d", d, next);

    return next;
}

const printGrid = (direction) => {
    // return;
    console.log('grid');
    for (let i = 0; i < data.length; i++) {
        let row = ""
        for (let j = 0; j < data[0].length; j++) {
            let min = 999;
            if (direction != null) {
                min = grid[i][j][direction];
            } else {
                for (let d = 0; d < 4; d++) {
                    if (typeof grid[i][j][d] === 'number') {
                        min = Math.min(min, grid[i][j][d]);
                    }
                }
            }
            // min = grid[i][j];
            if (min < 10) {
                row += "0";
            }
            if (min < 100) {
                row += "0";
            }
            row += min + " ";
        }
        console.log(row);
    }
    console.log('\n');
}

const partone = (start) => {
    let sum = 0;
    // let queue = start;
    const queue = PriorityQueue.fromArray(start, (a, b) => a[2] - b[2]);

    let n = 0;
    while (!queue.isEmpty()) {
        n++;
        const [i, j, val, d] = queue.dequeue();
        if (i === data.length - 1 && j === data[0].length - 1) {
            printGrid();
            console.log('step', n, i, j);
            return val;
        }


        const next = navigate(i, j, val, d);
        // console.log('next', next);
        next.forEach((step) => queue.enqueue(step));
        // if (n === 100) {
        //     printGrid();
        //     return;
        // }
        if (n % 10000 === 0) {
            // if (n % 2 === 0) {
            console.log('step', n, i, j, queue.size());
            // printGrid();
        }
    }

}
const parttwo = () => {}

console.log(partone([
    [0, 0, 0, UP],
    [0, 0, 0, LEFT],
]));
// console.log(parttwo());