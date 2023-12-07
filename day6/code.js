const fs = require('node:fs');

// const data = fs.readFileSync('example.txt', 'utf8').split('\n');
// const data = fs.readFileSync('input.txt', 'utf8').split('\n');
// console.log(data);
let pairs = [
    [7, 9],
    [15, 40],
    [30, 200]
];
pairs = [
    [54, 302],
    [94, 1476],
    [65, 1029],
    [92, 1404]
];

pairs = [
    [71530, 940200]
];
pairs = [
    [54946592, 302147610291404]
];

let sum = 1;

const quadratic = (T, D) => {
    const hi = Math.ceil((T + (T * T - 4 * D) ** 0.5) / 2 - 1);
    const lo = Math.floor((T - (T * T - 4 * D) ** 0.5) / 2 + 1);

    console.log(T, D, lo, hi, hi - lo + 1, Math.ceil((T * T - 4 * D) ** 0.5));
    return hi - lo + 1;
}

const partone = () => {
    for ([T, D] of pairs) {
        const sol = quadratic(T, D);
        // console.log(T, D, sol);
        sum *= sol;
    }
    return sum;
}


const parttwo = (input, index) => {

}


console.log(partone());

// console.log('Sum: ', sum);