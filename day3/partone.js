const fs = require('node:fs');

// const data = fs.readFileSync('example.txt', 'utf8').split('\n').map(x => x.split(''));
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(x => x.split(''));
// console.log(data);

// 525119

const h = data.length;
const w = data[0].length;
let grid = [];
for (let i = 0; i < h; i++) {
    grid[i] = [];
}

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let char = data[i][j];
        if (char === '.') {
            continue;
        } else if (char >= '0' && char <= '9') {
            // console.log(char + ' is a num');
        } else {
            console.log(char + ' is a symbol');
            for (let ioffset = -1; ioffset <= 1; ioffset++) {
                for (let joffset = -1; joffset <= 1; joffset++) {
                    grid[i + ioffset][j + joffset] = true;
                }
            }
        }
    }
}

let sum = 0;


for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let char = data[i][j];
        if (char === '.') {
            continue;
        } else if (char >= '0' && char <= '9') {
            console.log(char + ' is a num');
            let isPart = false;
            let num = "";
            for (let k = j; k < w; k++) {
                if (data[i][k] >= '0' && data[i][k] <= '9') {
                    num += data[i][k];
                } else {
                    break;
                }
                if (grid[i][k]) {
                    isPart = true;
                }
            }

            if (isPart) {
                console.log(num + " is a part");
                sum += parseInt(num);
            }
            j += num.length;
        } else {
            console.log(char + ' is a symbol');
            for (let ioffset = -1; ioffset <= 1; ioffset++) {
                for (let joffset = -1; joffset <= 1; joffset++) {
                    grid[i + ioffset][j + joffset] = true;
                }
            }
        }
    }
}


console.log('Sum: ', sum);