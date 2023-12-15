const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');


const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .replaceAll('\n', '')
    .split(',');
// console.log(data.length);
// return;

const hash = (str) => {
    let val = 0;
    for (let i = 0; i < str.length; i++) {
        const charCode = str.charCodeAt(i);
        val += charCode;
        val *= 17;
        val = val % 256;
        // console.log('val', charCode, val);
    }
    return val;
}

const boxes = [];
const execute = (cmd) => {
    if (cmd.includes("=")) {
        const [label, val] = cmd.split("=");
        const hashed = hash(label);
        if (boxes[hashed]) {
            const index = boxes[hashed].findIndex(lens => lens[0] === label);
            if (index < 0) {
                boxes[hashed].push([label, val]);
            } else {
                boxes[hashed][index][1] = val;
            }
        } else {
            boxes[hashed] = [
                [label, val]
            ];
        }
    } else {
        // -
        const [label] = cmd.split("-");
        const hashed = hash(label);
        if (boxes[hashed]) {
            const index = boxes[hashed].findIndex(lens => lens[0] === label);
            if (index >= 0) {
                boxes[hashed].splice(index, 1);
            }
        }
    }
}

// const rotatePlatform = ()
const partone = () => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        sum += hash(data[i]);
    }

    return sum;
}
const parttwo = () => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        execute(data[i]);
        if (i % 1000 === 0) {
            console.log('i', i);
        }
    }

    console.log(boxes);
    for (let i = 0; i < boxes.length; i++) {
        const box = boxes[i];
        if (box == null || box.length == 0) {
            continue;
        }
        for (let j = 0; j < box.length; j++) {
            const lens = box[j];
            const [label, val] = lens;
            let power = (1 + i) * (j + 1) * parseInt(val);
            // console.log(i + 1, j + 1, val, power);
            sum += power;
        }
    }

    return sum;
}

// console.log(hash('HASH'));
// console.log(hash('rn'));
// console.log(hash('qp'));
// console.log(partone());
console.log(parttwo());