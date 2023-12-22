const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.slice(0, input.length - 1)
    .split('\n');
// console.log('data', data);
// return;

const parseInput = () => {
    const modules = {};
    const conjunctions = {};
    for (let row of data) {
        let [name, downstream] = row.split(" -> ");
        let type;
        if (name === "broadcaster") {
            type = name;
        } else {
            type = name[0];
            name = name.substring(1);
            if (type === "&") {
                conjunctions[name] = [];
            }
        }

        modules[name] = [type, downstream.split(", ")];
    }

    for (let m in modules) {
        const downstream = modules[m][1];
        for (let n of downstream) {
            if (conjunctions[n]) {
                conjunctions[n].push(m);
            }
            if (!(n in modules)) {
                modules[n] = ['broadcaster', []];
            }
        }
    }

    return [modules, conjunctions]
}

const [modules, conjunctions] = parseInput();
const states = {};

console.log(modules, conjunctions);
// return;
const sendPulse = (m, pulse) => {
    const [type, receivers] = modules[m];

    if (type === "broadcaster") {
        states[m] = pulse;
    } else if (type === "%") {
        if (pulse) {
            return [];
        }
        states[m] = !states[m];
    } else {
        // "&"
        // console.log("&", m, conjunctions);
        let state = !conjunctions[m].every(n => !!states[n]);
        states[m] = state;
    }
    return receivers.map(r => [r, states[m]]);
}

const pushButton = () => {
    let queue = [
        ['broadcaster', false]
    ];
    let low = 0;
    let high = 0;
    while (queue.length > 0) {
        let [m, pulse] = queue[0];
        if (pulse) {
            high++;
        } else {
            low++;
        }
        queue = queue.slice(1);
        const next = sendPulse(m, pulse);
        queue = queue.concat(next);
    }
    return [low, high]
}

const partone = (N) => {
    let low = 0;
    let high = 0;

    for (let i = 0; i < N; i++) {
        let [l, h] = pushButton();
        // console.log('i', i, l, h, states);
        low += l;
        high += h;
    }

    return low * high;
}


console.log(partone(1000));