const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');


const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .split('\n')
    .map(x => x.split(''));
// console.log(input);
// console.log(data);
// console.log(data.length);
// return;

const RIGHT = 0;
const LEFT = 1;
const UP = 2;
const DOWN = 3;
const movement = [
    [
        [0, 1, RIGHT]
    ],
    [
        [0, -1, LEFT]
    ],
    [
        [-1, 0, UP]
    ],
    [
        [1, 0, DOWN]
    ]
];
const TRANSFORM = {
    ".": movement,
    "/": [movement[UP], movement[DOWN], movement[RIGHT], movement[LEFT]],
    "\\": [movement[DOWN], movement[UP], movement[LEFT], movement[RIGHT]],
    "|": [
        movement[DOWN].concat(movement[UP]),
        movement[DOWN].concat(movement[UP]), movement[UP], movement[DOWN]
    ],
    "-": [movement[RIGHT], movement[LEFT],
        movement[RIGHT].concat(movement[LEFT]),
        movement[RIGHT].concat(movement[LEFT])
    ],
}
// console.log('TRANSFORM', TRANSFORM);

const light = [];

for (let i = 0; i < data.length; i++) {
    light[i] = [];
    for (let j = 0; j < data[0].length; j++) {
        light[i][j] = [];
    }
}

const clearLight = () => {
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            light[i][j] = [];
        }
    }
}

const navigate = (i, j, direction) => {
    if (i < 0 || i >= data.length || j < 0 || j >= data[0].length) {
        return [];
    }

    // console.log('navigate', i, j, direction, typeof i);
    if (light[i][j][direction]) {
        return [];
    }

    light[i][j][direction] = true;

    const char = data[i][j];

    const t = TRANSFORM[char][direction];
    // console.log(' t ', t);
    return t.map(([di, dj, d]) => [i + di, j + dj, d]);
}

const partone = (start) => {
    let sum = 0;
    let queue = [
        start
    ];

    while (queue.length > 0) {
        const [i, j, d] = queue[0];
        // console.log('queue[0]', queue[0], i, j, d);
        queue = queue.slice(1);
        const next = navigate(i, j, d);
        // console.log('next', next);
        queue = queue.concat(next);
    }

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            // if (data[i][j] === ".") {
            if (light[i][j].filter(Boolean).length > 0) {
                // console.log(i, j, 'is energized');
                sum += 1;
            }
            // }
        }
    }
    clearLight();
    // console.log(JSON.stringify(light));
    return sum;
}
const parttwo = () => {
    let max = 7543;
    for (let i = 0; i < data.length; i++) {
        max = Math.max(max, partone([i, 0, RIGHT]));
        max = Math.max(max, partone([i, data[0].length - 1, LEFT]));
        console.log('i', i, max);
    }
    for (let j = 0; j < data.length[0]; j++) {
        max = Math.max(max, partone([0, j, DOWN]));
        max = Math.max(max, partone([data.length - 1, j, UP]));
        console.log('j', j, max);
    }
    return max;
}
// console.log(partone([0,0,RIGHT]));
console.log(parttwo());