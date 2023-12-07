const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.split('\n').map(x => x.split(' '));

let sum = 0;

const dp = {};
const TYPES = {
    "FIVE": 10,
    "FOUR": 9,
    "HOUSE": 8,
    "THREE": 7,
    "TWO_PAIR": 6,
    "PAIR": 5,
    "HIGH": 4,
};

const getHandValue = (hand) => {
    if (dp[hand]) {
        return dp[hand];
    }
    const mapping = {};

    for (card of hand) {
        if (mapping[card]) {
            mapping[card]++;
        } else {
            mapping[card] = 1;
        }
    }

    const values = Object.values(mapping);


    let type;
    if (values.includes(5)) {
        type = TYPES.FIVE;
    } else if (values.includes(4)) {
        type = TYPES.FOUR;
    } else if (values.includes(3)) {
        type = values.includes(2) ? TYPES.HOUSE : TYPES.THREE;
    } else if (values.includes(2)) {
        type = values.filter(x => x == 2).length == 2 ? TYPES.TWO_PAIR : TYPES.PAIR;
    } else {
        return TYPES.HIGH;
    }

    dp[hand] = type;

    return dp[hand];
}

const getHandValue2 = (hand) => {
    if (dp[hand]) {
        return dp[hand];
    }
    const mapping = {};

    for (card of hand) {
        if (mapping[card]) {
            mapping[card]++;
        } else {
            mapping[card] = 1;
        }
    }

    let entries = Object.entries(mapping);
    entries.sort((a, b) => b[1] - a[1]);
    // console.log("hand: " + hand, mapping, entries);
    const numJs = mapping["J"];
    if (numJs > 0) {
        if (entries[0][0] != "J") {
            mapping[entries[0][0]] += numJs;
            mapping["J"] = 0;
        } else {
            if (entries.length > 1) {
                mapping[entries[1][0]] += numJs;
                mapping["J"] = 0;
            }
        }
    }
    // console.log('numJs', mapping);
    const values = Object.values(mapping);


    let type;
    if (values.includes(5)) {
        type = TYPES.FIVE;
    } else if (values.includes(4)) {
        type = TYPES.FOUR;
    } else if (values.includes(3)) {
        type = values.includes(2) ? TYPES.HOUSE : TYPES.THREE;
    } else if (values.includes(2)) {
        type = values.filter(x => x == 2).length == 2 ? TYPES.TWO_PAIR : TYPES.PAIR;
    } else {
        type = TYPES.HIGH;
    }


    console.log(hand + " is type " + type);
    dp[hand] = type;

    return dp[hand];
}


const getCardValue = (card) => {
    const values = {
        "A": 14,
        "K": 13,
        "Q": 12,
        // "J": 11, // pt 1
        "J": 1, // pt 2
        "T": 10,
        "9": 9,
        "8": 8,
        "7": 7,
        "6": 6,
        "5": 5,
        "4": 4,
        "3": 3,
        "2": 2,
    }
    return values[card];
}

const compairHands = (a, b) => {
    aVal = getHandValue2(a[0]);
    bVal = getHandValue2(b[0]);

    if (aVal === bVal) {
        for (let i = 0; i < 5; i++) {
            const diff = getCardValue(a[0][i]) - getCardValue(b[0][i]);
            if (diff != 0) {
                return diff;
            }
        }
        return 0;
    }
    return aVal - bVal;
}

const partone = () => {
    data.sort(compairHands)
    let rank = 1;
    console.log(dp);
    console.log(data);
    for ([_hand, bid] of data) {
        sum += rank * bid;
        rank++;
    }

    return sum;
}


const parttwo = () => {}


console.log(partone());
// console.log(parttwo());

// console.log('Sum: ', sum);