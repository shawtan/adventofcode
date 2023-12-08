const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.split('\n');

const instructions = data[0]; // l = 271

const mapping = {};
const starts = [];
const parseLine = (line) => {
    const origin = line.slice(0, 3);
    const left = line.slice(7, 10);
    const right = line.slice(12, 15);
    mapping[origin] = [left, right];
    if (origin[2] === "A") {
        starts.push(origin);
    }
}
data.slice(2).forEach(parseLine);

let sum = 0;

// const travel = (current, index) => {
//     if (index >= instructions.length) {
//         if (current === "ZZZ") {
//             return sum;
//         } else {
//             return travel(current, 0);
//         }
//     }
//     const direction = instructions[index];
//     if (direction === "L") {
//         return travel(mapping[current][0], index + 1);
//     }
//     return travel(mapping[current][1], index + 1);
// }

// console.log(instructions);
// console.log(mapping);
const partone = (start) => {
    sum = 0;
    let current = start;
    let index = 0;
    while (current[2] !== "Z") {
        const direction = instructions[index];
        if (direction === "L") {
            current = mapping[current][0];
        } else {
            current = mapping[current][1];

        }
        index++;
        sum++;
        if (index >= instructions.length) {
            index = 0;
        }
    }

    return sum;
}



const parttwo = () => {
    let current = starts;
    let index = 0;
    while (current.filter(x => x[2] !== "Z").length > 0) {
        const direction = instructions[index];
        for (let i in current) {
            if (direction === "L") {
                current[i] = mapping[current[i]][0];
            } else {
                current[i] = mapping[current[i]][1];

            }
        }
        index++;
        sum++;
        if (index >= instructions.length) {
            index = 0;
        }
    }

    return sum;
}

console.log('starts', starts);

// console.log(partone("AAA"));
// return;
// console.log(parttwo());
// let start = "AAA";
// console.log(start, partone(start));

// AAA: 16531
//  'MLA', 'BQA', 'MJA', 'AAA', 'TGA', 'BJA'

for (start of starts) {
    console.log("calcing", start);
    console.log(start, partone(start));
}
return;
const loops = [19241, 18157, 19783, 16531, 21409, 14363];

// console.log('Sum: ', sum);