const fs = require('node:fs');

// const data = fs.readFileSync('example.txt', 'utf8').split('\n');
const data = fs.readFileSync('input.txt', 'utf8').split('\n');

let sum = 0;
const validateDraw = draw => {
    let [val, color] = draw.split(' ');
    val = parseInt(val);
    // console.log('draw', val, color);
    switch (color) {
        case 'blue':
            return val <= 14;
        case 'green':
            return val <= 13;
        case 'red':
            return val <= 12;
        default:
            return false;
    }
}
const processDraw = (draw) => {
    draw = draw.split(', ');
    // console.log('hand', draw);
    return draw.every(validateDraw);
}

const partone = (input, index) => {
    let draws = input.substring(input.indexOf(':') + 2).split('; ');
    // console.log(index, draws);

    if (draws.every(processDraw)) {
        console.log(index + 1, ' is valid', draws);
        sum += index + 1;
    }

}

const convertDraw2 = draw => {
    let [val, color] = draw.split(' ');
    val = parseInt(val);
    // console.log('draw', val, color);
    switch (color) {
        case 'blue':
            return [0, 0, val];
        case 'green':
            return [0, val, 0];
        case 'red':
            return []
        default:
            return false;
    }
}

const processDraw2 = (hand) => {
    hand = hand.split(', ');
    let r = 0;
    let g = 0;
    let b = 0;

    for (draw of hand) {
        let [val, color] = draw.split(' ');
        val = parseInt(val);
        // console.log('draw', val, color);
        // console.log('color val', color, val);
        switch (color) {
            case 'blue':
                b += val;
                break;
            case 'green':
                g += val;
                break;
            case 'red':
                r += val;
                break;
        }

    }

    // console.log(' processDraw2 hand', hand, r, g, b);
    return [r, g, b];

}

const parttwo = (input, index) => {
    let draws = input.substring(input.indexOf(':') + 2).split('; ');
    let min = [0, 0, 0];

    for (hand of draws) {
        const [r, g, b] = processDraw2(hand);
        // console.log('hand', hand, r, g, b);
        min[0] = Math.max(min[0], r);
        min[1] = Math.max(min[1], g);
        min[2] = Math.max(min[2], b);
    }

    const power = min[0] * min[1] * min[2];
    console.log('game', index + 1, min, power);

    sum += power;

}

data.forEach(parttwo);


console.log('Sum: ', sum);