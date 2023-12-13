const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.slice(0, input.length - 1)
    .split('\n\n')
    .map(x => x.split('\n').map(y => y.split('')));

// console.log(data);
const isRowMirror = (grid, row) => {
    let above = row;
    let below = row + 1;

    while (above >= 0 && below < grid.length) {
        for (let i = 0; i < grid[0].length; i++) {
            // console.log('i', i, above, grid[above]);
            if (grid[above][i] != grid[below][i]) {
                return false;
            }
        }
        above--;
        below++;
    }
    console.log('Row', row, 'isRowMirror');
    return true;
}
const isColumnMirror = (grid, column) => {
    let before = column;
    let after = column + 1;

    while (before >= 0 && after < grid[0].length) {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][before] !== grid[i][after]) {
                return false;
            }
        }
        before--;
        after++;
    }
    console.log('Column', column, 'isMirror');
    return true;
}

const isRowMirror2 = (grid, row) => {
    let above = row;
    let below = row + 1;
    let numMistakes = 0;
    let fix = [];

    while (above >= 0 && below < grid.length) {
        for (let i = 0; i < grid[0].length; i++) {
            // console.log('i', i, above, grid[above]);
            if (grid[above][i] != grid[below][i]) {
                numMistakes++;
                fix = [above, i];
                if (numMistakes > 1) {
                    return [];
                }
            }
        }
        above--;
        below++;
    }

    if (numMistakes === 1) {
        return fix;
    }
    console.log('Row', row, 'isRowMirror');
    return true;
}
const isColumnMirror2 = (grid, column) => {
    let before = column;
    let after = column + 1;
    let numMistakes = 0;
    let fix = [];

    while (before >= 0 && after < grid[0].length) {
        for (let i = 0; i < grid.length; i++) {
            if (grid[i][before] !== grid[i][after]) {
                numMistakes++;
                fix = [i, before];
                if (numMistakes > 1) {
                    return [];
                }
            }
        }
        before--;
        after++;
    }
    if (numMistakes === 1) {
        return fix;
    }
    console.log('Column', column, 'isMirror');
    return true;
}

const printGrid = (grid, msg = '') => {
    console.log(msg, grid.map(x => x.join('')));
}


const partone = () => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        const grid = data[i];
        for (let i = 0; i < grid.length - 1; i++) {
            if (isRowMirror(grid, i)) {
                sum += 100 * (i + 1);
            }
        }
        for (let i = 0; i < grid[0].length - 1; i++) {
            if (isColumnMirror(grid, i)) {
                sum += (i + 1);
            }
        }
        console.log('grid', i, 'has', sum);
        // return sum;
    }

    return sum;
}


const parttwo = () => {
    let sum = 0;

    for (let i = 0; i < data.length; i++) {
        let grid = data[i];
        // printGrid(grid, 'GRID' + i, );
        // grid = findFix(grid);
        // printGrid(grid, 'findFix');


        for (let i = 0; i < grid.length - 1; i++) {
            if (isRowMirror2(grid, i).length > 0) {
                sum += 100 * (i + 1);
            }
        }
        for (let i = 0; i < grid[0].length - 1; i++) {
            if (isColumnMirror2(grid, i).length > 0) {
                sum += (i + 1);
            }
        }
        console.log('grid', i, 'has', sum);
        // return sum;
    }

    return sum;
}

// console.log(partone());
console.log(parttwo());