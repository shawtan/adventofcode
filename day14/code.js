const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');


const data = input.slice(0, input.length - 1)
    .replaceAll('\r', '')
    .split('\n')
    .map(x => x.split(''));
//.map(y => y.split('')));

// console.log(data);

const N = data.length;
const printGrid = (msg = '') => {
    console.log(msg);
    data.forEach(x => console.log(x.join('')));
    console.log('\n');
}


// const rotatePlatform = ()
const partone = () => {
    let sum = 0;

    for (let i = 0; i < data[0].length; i++) {
        console.log('column', i);
        let beam = 0;
        let count = 0;
        let prev = sum;
        for (let row = 0; row < data.length; row++) {
            const char = data[row][i];

            if (char === "O") {
                count++;
            } else if (char === "#") {
                // console.log('# at', row, 'rocks', count);
                for (let n = beam; n < beam + count; n++) {
                    sum += data.length - n;
                }
                beam = row + 1;
                count = 0;
            }
        }
        // console.log('# at', beam, 'rocks', count);
        for (let n = beam; n < beam + count; n++) {
            sum += data.length - n;
        }
        console.log('column', i, 'has', sum - prev);
    }

    return sum;
}

const rotateNorth = () => {
    for (let i = 0; i < data[0].length; i++) {
        let beam = 0;
        for (let row = 0; row < data.length; row++) {
            const char = data[row][i];

            if (char === "O") {
                data[beam][i] = data[row][i];
                if (row != beam) {
                    data[row][i] = '.';
                }
                beam++;
            } else if (char === "#") {
                beam = row + 1;
            }
        }
    }
}

const rotateWest = () => {
    for (let x = 0; x < data[0].length; x++) {
        let beam = 0;
        for (let y = 0; y < data.length; y++) {
            const char = data[x][y];

            if (char === "O") {
                data[x][beam] = data[x][y];
                if (y != beam) {
                    data[x][y] = '.';
                }
                beam++;
            } else if (char === "#") {
                beam = y + 1;
            }
        }
    }
}
const rotateSouth = () => {
    for (let x = 0; x < data[0].length; x++) {
        let beam = N - 1;
        for (let y = N - 1; y >= 0; y--) {
            // console.log(x, y);
            const char = data[y][x];

            if (char === "O") {
                data[beam][x] = data[y][x];
                if (y != beam) {
                    data[y][x] = '.';
                }
                beam--;
            } else if (char === "#") {
                beam = y - 1;
            }
        }
    }
}
const rotateEast = () => {
    for (let x = 0; x < data[0].length; x++) {
        let beam = N - 1;
        for (let y = beam; y >= 0; y--) {
            const char = data[x][y];

            if (char === "O") {
                data[x][beam] = data[x][y];
                if (y != beam) {
                    data[x][y] = '.';
                }
                beam--;
            } else if (char === "#") {
                beam = y - 1;
            }
        }
    }
}

const calcWeight = () => {
    let sum = 0;
    for (let i = 0; i < data[0].length; i++) {
        for (let row = 0; row < data.length; row++) {
            const char = data[row][i];

            if (char === "O") {
                sum += data.length - row;
            }
        }
    }

    return sum;
}

const compare = (grid) => {
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] !== data[i][j]) {
                return false;
            }


        }
    }
    return true;
}

const encode = () => {
    return data.map(x => x.join("")).join("");
}

const seen = {};

const parttwo = () => {
    console.log(data.length, data[0].length);
    let seenCount = 0;

    for (let i = 0; i < 1000000000; i++) {
        // const copy = data.map((arr) => arr.slice());

        rotateNorth();
        rotateWest();
        rotateSouth();
        rotateEast();

        const code = encode();
        if (!seen[code]) {
            seen[code] = i;
        } else {
            console.log('code', i, 'seen at', seen[code], calcWeight());
            seenCount++;
        }

        if (seenCount >= 10) {
            return;
        }

        if (i % 10000000 === 0) {
            console.log('i', i);
            console.log('weight', calcWeight());
        }
    }

    return calcWeight();
}

/**
 * = (1000000000 - 2 - 1) % (9-2) + 2
 * = (1000000000 - 95 - 1) % (106-95) + 95
 *
 */


// console.log(partone());
console.log(parttwo());