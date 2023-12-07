const fs = require('node:fs');

const data = fs.readFileSync('example.txt', 'utf8').split('\n\n');
// const data = fs.readFileSync('input.txt', 'utf8').split('\n\n');
// console.log(data);

// parse data
const parseMap = (map) => {
    return map.split("\n").slice(1).map(x => x.split(" ").map(y => parseInt(y))).sort((x, y) => x[0] - y[0]);
}

// const seeds = data[0].substring("seeds: ".length).split(" ").map(x => parseInt(x)); // p1
let seeds = data[0].substring("seeds: ".length).split(" ").map(x => parseInt(x)); // p2
let left = seeds.filter((s, i) => i % 2 === 0);
let right = seeds.filter((s, i) => i % 2 !== 0);
seeds = left.map((x, i) => [x, right[i]]);

// 7 maps
const M = 7;
const maps = data.slice(1).map(parseMap);

console.log('seeds', seeds);
console.log('maps', maps);

const locationOfSeed = (seed) => {
    let n = seed;
    for (let i = 0; i < M; i++) {
        for (row of maps[i]) {
            const [dest, source, range] = row;
            if (source <= n && n < source + range) {
                const newval = n - source + dest;
                // console.log(`MAP ${i}: n ${n} is in range ${source} - ${source+range}, so it maps to ${newval}`);
                n = newval;
                break;
            }
        }
    }
    // console.log(`seed ${seed} is in location ${n}`);
    return n;
}

const partone = () => {
    return Math.min(...seeds.map(locationOfSeed));
}

const seedToLocation = [];

const solveLocationToSeedRanges = (locationS, locationR, currentS, m) => {
    if (locationR <= 0) {
        return;
    }
    // console.log('solveLocationToSeedRanges', locationS, locationR, currentS, m);
    if (m == M) {
        seedToLocation.push([locationS, currentS, locationR]);
        return;
    }
    for (row of maps[m]) {
        const [rowS, source, rowR] = row;
        const currentE = currentS + locationR;
        const rowE = rowS + rowR;

        // console.log("comparing [", currentS, currentE, '] (', rowS, rowE, ')');

        // const newS = currentS - rowS + source;

        // cases [current] (row)
        // [](), [(]), [()], ([]), ([)], ()[]
        let start = currentS;
        let end = currentE;

        if (currentE <= rowS) {
            // console.log('currentE <= rowS continue');
            continue;
        } else if (rowE <= currentS) {
            continue;

        }

        // ( ] 
        if (currentS < rowS) {
            // console.log('currentS < rowS');
            solveLocationToSeedRanges(locationS, rowS - currentS, currentS, m + 1);
            start = rowS;
        }

        if (currentE > rowE) {
            // console.log('currentE > rowE');
            solveLocationToSeedRanges(locationS + (rowE - currentS), locationR - rowR - currentS, source + rowR, m);
            end = rowE;
        }

        // console.log('solve');

        return solveLocationToSeedRanges(locationS + (start - currentS), end - start, source + start - rowS, m + 1);


        // if (currentE <= rowS) { // []()
        //     continue;
        // } else if (rowE <= currentS) { // ()[]
        //     continue;
        // } else if (rowS <= currentS && currentE <= rowE) { // ([])
        //     return solveLocationToSeedRanges(locationS, locationR, source + currentS - rowS, m - 1);
        // } else if (currentS <= rowS && rowE <= currentE) { // [()]
        //     solveLocationToSeedRanges(locationS, rowS - currentS, currentS, m - 1);
        //     solveLocationToSeedRanges(locationS + (rowS - currentS), rowR, source, m - 1);
        //     return solveLocationToSeedRanges(locationS + (rowE - currentS), locationR - rowR - currentS, source + rowR, m);
        // } else if (currentS <= rowS && currentE <= rowE) { // [(])
        //     solveLocationToSeedRanges(locationS, rowS - currentS, currentS, m - 1);
        //     return solveLocationToSeedRanges(locationS + (rowS - currentS), currentE - rowS, source, m - 1);
        // } else if (rowS <= currentS && rowE <= currentE) { // ([)]
        //     solveLocationToSeedRanges(locationS, rowE - currentS, source + currentS - rowS, m - 1);
        //     return solveLocationToSeedRanges(locationS + (rowE - currentS), locationR - rowR - currentS, source + rowR, m);
        // } else {
        //     console.log("Invalid case", currentS, currentE, rowS, rowE);
        // }
    }

    solveLocationToSeedRanges(locationS, locationR, currentS, m - 1);

}

const locationOfSeedRange = (start, range, seed, seedRange, m) => {
    for (row of maps[m]) {
        const [dest, source, rowRange] = row;
        if (source <= start && start < source + rowRange) {
            const newval = n - source + dest;
            if (start + range <= source + rowRange) {
                locationOfSeedRange(seed, seedRange);
            }
            // console.log(`MAP ${i}: n ${n} is in range ${source} - ${source+range}, so it maps to ${newval}`);
            n = newval;
            break;
        }
    }
    // console.log(`seed ${seed} is in location ${n}`);
    return n;
}


const parttwo = () => {
    let map = M - 1;
    for (seed of seeds) {
        console.log('seed', seed);
        // const [dest, source, range] = row;
        solveLocationToSeedRanges(seed[0], seed[1], seed[0], 0);
        console.log('seedToLocation', seedToLocation);
    }
    console.log(seedToLocation);

    /**** BRUTE FORCE 2520479 ****/
    // let min = 4000000000;

    // for ([start, range] of seeds) {
    //     console.log('checking ', start, range);
    //     for (i = 0; i < range; i++) {
    //         let n = start + i;
    //         let location = locationOfSeed(n);
    //         min = Math.min(min, location);
    //     }
    // }
    // return min;
}


// console.log(locationOfSeed(seeds[0]));
// console.log(locationOfSeed(seeds[1]));
// console.log(partone());
console.log(parttwo());
// partone();
// data.forEach(parttwo);