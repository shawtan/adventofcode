const fs = require('node:fs');

const data = fs.readFileSync('input.txt', 'utf8').split('\n');


let sum = 0;

const parttwo = (input) => {
    let low = 999;
    let lowVal = 0;
    let high = 999;
    let highVal;
    const words = [
        ['one', 1],
        ['two', 2],
        ['three', 3],
        ['four', 4],
        ['five', 5],
        ['six', 6],
        ['seven', 7],
        ['eight', 8],
        ['nine', 9],
        ['1', 1],
        ['2', 2],
        ['3', 3],
        ['4', 4],
        ['5', 5],
        ['6', 6],
        ['7', 7],
        ['8', 8],
        ['9', 9],
    ];

    const reversed = input.split('').reverse().join('');


    for ([word, val] of words) {
        let currentLow = input.indexOf(word);
        if (currentLow != -1 && currentLow < low) {
            low = currentLow;
            lowVal = val;
            // console.log('set low to ', val);
        }
        let currentHigh = reversed.indexOf(word.split('').reverse().join(''));
        if (currentHigh != -1 && currentHigh < high) {
            high = currentHigh;
            highVal = val;
            // console.log('set high to ', val);
        }
        // console.log(input, word, currentLow, currentHigh);
    }

    // console.log(input, 'low:', lowVal, ' high: ', highVal);
    sum += lowVal * 10 + highVal;
}

const partone = (input) => {
    const nums = input.split('').filter(x => x >= '0' && x <= '9');
    const num = nums[0] + nums[nums.length - 1];
    console.log(input, nums, num);
    sum += parseInt(num);
}

// parttwo(data[0]);
data.forEach(parttwo);

console.log('Sum: ', sum);