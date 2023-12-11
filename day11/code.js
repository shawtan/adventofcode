const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

let data = input.split('\n').map(x => x.split(''));
data = data.slice(0, data.length - 1);
console.log(data);

const emptyRow = [];
const emptyColumn = []

const findEmpties = () => {
    for (let i = 0; i < data.length; i++) {
        let isEmpty = true;
        for (let j of data[i]) {
            if (j === "#") {
                isEmpty = false;
                break;
            }
        }
        emptyRow[i] = isEmpty;
    }
    for (let i = 0; i < data[0].length; i++) {
        let isEmpty = true;
        for (let j = 0; j < data.length; j++) {
            if (data[j][i] === "#") {
                isEmpty = false;
                break;
            }
        }
        emptyColumn[i] = isEmpty;
    }
}

const distance = (a, b) => {
    let h = 0;
    let start, end;
    if (a[0] < b[0]) {
        start = a[0];
        end = b[0];
    } else {
        start = b[0];
        end = a[0];
    }

    for (let i = start; i < end; i++) {
        if (emptyRow[i]) {
            h += 1000000;
        } else {
            h += 1;
        }
    }

    if (a[1] < b[1]) {
        start = a[1];
        end = b[1];
    } else {
        start = b[1];
        end = a[1];
    }
    for (let i = start; i < end; i++) {
        if (emptyColumn[i]) {
            h += 1000000;
        } else {
            h += 1;
        }
    }

    // console.log(h, 'between', a[2], b[2], a, b);
    return h;
}

const partone = () => {
    findEmpties();
    console.log(emptyRow);
    console.log(emptyColumn);
    const galaxies = [];
    let n = 1;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data.length; j++) {
            if (data[i][j] === '#') {
                galaxies.push([i, j, n]);
                n++;
            }
        }
    }

    console.log(galaxies.length, "# galaxies");
    let sum = 0;

    // n = 0;
    for (let i = 0; i < galaxies.length; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            sum += distance(galaxies[i], galaxies[j]);
            n++;
        }
    }
    // console.log('checked', n, 'pairs');
    return sum;
}


const parttwo = () => {}

console.log(partone());
// console.log(parttwo());