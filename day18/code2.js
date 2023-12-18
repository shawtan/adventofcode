const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
// const input = fs.readFileSync('example2.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');


const parseHex = (hex) => {
    hex = hex.substring(1, hex.length - 1);
    const distanceHex = hex.substring(1, 1 + 5);
    const dir = hex.substring(6, 7);
    // console.log(distanceHex, dir);

    return [parseInt(distanceHex, 16), parseInt(dir, 10)];
}

const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .split('\n')
    .map(x => x.split(' '))
    .map(y => ([y[0], parseInt(y[1]), y[2]]))
    .map(y => parseHex(y[2]));
// console.log(input);
// console.log(data);
// console.log(data.length, data[0].length);
// console.log(data[0]);
// return;


const RIGHT = 0;
const LEFT = 2;
const UP = 3;
const DOWN = 1;
const MOVEMENT = [
    [0, 1, RIGHT],
    [1, 0, DOWN],
    [0, -1, LEFT],
    [-1, 0, UP],
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
        // const [_d, _n, hex] = row;
        const [n, d] = row;
        // console.log('n,d', n, d);
        const [dy, dx] = MOVEMENT[d];
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
// return;

const navigate = () => {
    console.log('navigate');
    let currentx = START_X;
    let currenty = START_Y;
    let walls = [];
    let hwalls = [];
    // [x,y] start, height
    let lastDir = UP;

    let sum = 0;

    for (let row of data) {
        const [steps, dir] = row;
        const [dy, dx] = MOVEMENT[dir];

        if (dy != 0) {
            if (dy === 1) {
                walls.push([currentx, currenty, currenty + steps, dir]);
            } else if (dy === -1) {
                walls.push([currentx, currenty - steps, currenty, dir]);
            }
        } else {
            if (dx === 1) {
                hwalls.push([currenty, currentx, currentx + steps, dir]);
            } else if (dx === -1) {
                hwalls.push([currenty, currentx - steps, currentx, dir]);
            }
        }

        currentx += dx * steps;
        currenty += dy * steps;
    }

    console.log('sum', sum);

    // printGrid();
    // writeGrid();
    // walls.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : a[1] - b[1]));
    walls.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
    hwalls.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

    const ybreakpoints = [...(new Set(hwalls.map(wall => wall[0])))];
    // console.log('hwalls', hwalls);
    console.log('walls', walls);
    console.log('ybreakpoints', ybreakpoints);


    let lastVal = 0;
    for (let i = 0; i < ybreakpoints.length; i++) {
        // Find v walls that are here.
        const breakpoint = ybreakpoints[i]

        let last = -1;
        let outside = true;
        let area = 0;
        let nextArea = 0;
        lastDir = -1;
        let before = area;
        let nextOutside = true;
        let nextbefore = nextArea;
        let nextlast = -1;

        for (let j = 0; j < walls.length; j++) {
            const wall = walls[j];
            const [x, y, endy, d] = wall;
            if (y <= breakpoint && breakpoint <= endy) {
                let h = hwalls.find(hwall => hwall[0] === breakpoint && hwall[1] === last && hwall[2] === x);
                if (h != null) {
                    area += (x - last);
                    if (lastDir !== d) {
                        outside = !outside;
                    }
                } else {
                    if (!outside) {
                        area += x - last;
                    } else {
                        area++;
                    }
                    outside = !outside;
                }
                // console.log('Line', breakpoint, 'wall', wall, 'area', area - before, '. line:', h != null);

                last = x;
                lastDir = d;
                before = area;
            }
            if (i < ybreakpoints.length - 1 && y <= breakpoint + 1 && breakpoint + 1 <= endy) {
                if (!nextOutside) {
                    nextArea += x - nextlast + 1;
                }
                nextOutside = !nextOutside;
                // console.log('Line', breakpoint + 1, 'wall', wall, 'area', nextArea - nextbefore, outside);
                nextlast = x;
                nextbefore = nextArea;
            }
        }
        console.log('BREAKPOINT', breakpoint, 'has area', area, ". Next area", nextArea, '*', (ybreakpoints[i + 1] - ybreakpoints[i]));
        sum += area;
        if (i < ybreakpoints.length - 1) {
            sum += nextArea * (ybreakpoints[i + 1] - ybreakpoints[i] - 1);
        }
    }

    return sum;
}

// # ####### #
// ### ##  ###

const parttwo = () => {
    const walls = navigate();
    return walls;
}

// console.log(partone());
console.log(parttwo());