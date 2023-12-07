const fs = require('node:fs');

// const data = fs.readFileSync('example.txt', 'utf8').split('\n').map(x => x.split(''));
const data = fs.readFileSync('input.txt', 'utf8').split('\n').map(x => x.split(''));
// console.log(data);

const h = data.length;
const w = data[0].length;
let grid = [];
let totals = [];
let counts = [];
let sum = 0;
for (let i = 0; i < h; i++) {
    grid[i] = [];
    totals[i] = [];
    counts[i] = [];
}

const getType = (char) => {
    if (char === '.') {
        return ".";
    } else if (char >= '0' && char <= '9') {
        return "NUMBER";
    } else {
        return "SYMBOL";
    }

}



for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let char = data[i][j];
        if (char === '.') {
            continue;
        } else if (char >= '0' && char <= '9') {
            console.log(char + ' is a num');
            let num = "";
            for (let k = j; k < w; k++) {
                if (data[i][k] >= '0' && data[i][k] <= '9') {
                    num += data[i][k];
                } else {
                    break;
                }
            }
            let l = num.length;
            num = parseInt(num);
            for (let k = j; k < j + l; k++) {
                totals[i][k] = num;
            }

            j += l;
        }
    }
}

const countRow = (top) => {
    let left;
    let right;
    // let top = [row[0], row[j], row[j + 1]];
    let count = top.filter(Boolean).length;
    if (count == 0) {
        numUp = 0;
    } else if (count == 1 || count == 3) {
        numUp = 1;
        left = top.filter(Boolean)[0];
    } else { // 2
        if (top[1]) {
            numUp = 1;
            left = top[1];
        } else {
            numUp = 2;
            left = top[0];
            right = top[2];
        }
    }
    return [left, right];
}

for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
        let char = data[i][j];
        if (char === '.') {
            continue;
        } else if (char >= '0' && char <= '9') {
            continue;
        } else {
            console.log(char + ' is a symbol');
            let nums = []
            let top = []
            let left, right;
            if (i - 1 >= 0) {
                top = [totals[i - 1][j - 1], totals[i - 1][j], totals[i - 1][j + 1]];
                [left, right] = countRow(top);
                console.log('row ', i - 1, left, right);
                if (left) {
                    nums.push(left);
                }
                if (right) {
                    nums.push(right);
                }
            }
            top = [totals[i][j - 1], totals[i][j], totals[i][j + 1]];
            [left, right] = countRow(top);
            console.log('row ', i, left, right);
            if (left) {
                nums.push(left);
            }
            if (right) {
                nums.push(right);
            }
            if (i + 1 < h) {
                top = [totals[i + 1][j - 1], totals[i + 1][j], totals[i + 1][j + 1]];
                [left, right] = countRow(top);
                console.log('row ', i + 1, left, right);
                if (left) {
                    nums.push(left);
                }
                if (right) {
                    nums.push(right);
                }
            }
            if (nums.length === 2) {
                console.log('2 adjacent numbers', nums);
                sum += nums[0] * nums[1];
            }
        }
    }
}


console.log('Sum: ', sum);