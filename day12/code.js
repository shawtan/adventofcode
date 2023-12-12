const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

let data = input.split('\n').map(x => x.split(' ')).map(y => ([y[0].split(''), y[1].split(',').map(x => parseInt(x))]));
// data = data.slice(0, data.length - 1);
console.log(data.length);


let dp = []; //dp[index][goallength][goalval] = numways
const calcLine = (line, goal, index, inProgress) => {
    // console.log('calcLine', line, goal, index, dp);
    let goal_0 = goal.length > 0 ? goal[0] : 0;
    if (dp[index][goal.length][goal_0] !== undefined) {
        return dp[index][goal.length][goal_0];
    }

    // console.log('calcLine', line.join(''), goal, index);
    if (index >= line.length) {
        if (goal.length === 0 || goal.length === 1 && goal[0] == 0) {
            // console.log(line.join(''), 'is valid');
            return 1;
        }
        return 0;
    }

    let sol = 0;
    const char = line[index];
    if (char === ".") {
        if (goal.length > 0 && goal[0] == 0) {
            if (inProgress) {
                sol = 0;
            } else {
                // goal = goal.slice(1);
                sol = calcLine(line, goal.slice(1), index + 1, false);
            }
        } else {
            sol = calcLine(line, goal, index + 1, false);
        }
    } else if (char === "#") {
        if (goal.length > 0) {
            if (goal[0] === 0) {
                sol = 0;
            } else {
                let n = goal[0];
                let str = line.slice(index, index + n);

                if (str.length === n && str.filter(s => s === '.').length === 0) {
                    //can do it
                    // for (let i = index; i < index + n; i++) {
                    //     line[i] = '#';
                    // }
                    sol = calcLine(line, [0, ...goal.slice(1)], index + n);
                    // for (let i = index; i < index + n; i++) {
                    //     line[i] = '?';
                    // }
                } else {

                    sol = 0;
                }
            }
        } else {
            sol = 0;
        }
    } else { // '?'
        if (goal.length > 0) {
            if (goal[0] === 0) {
                // has to be '.'
                // line[index] = '.';
                let sum = calcLine(line, goal.slice(1), index + 1, false);
                // line[index] = '?';
                sol = sum;
            } else {
                // could be '.' or '#'
                // try '#'
                let sum = 0;
                let n = goal[0];
                let str = line.slice(index, index + n);
                if (str.length === n && str.filter(s => s === '.').length === 0) {
                    //can do it
                    // for (let i = index; i < index + n; i++) {
                    //     line[i] = '#';
                    // }
                    sum += calcLine(line, [0, ...goal.slice(1)], index + n);
                    // for (let i = index; i < index + n; i++) {
                    //     line[i] = '?';
                    // }
                }

                // try '.'
                // line[index] = '.';
                if (!inProgress) {
                    sum += calcLine(line, goal, index + 1);
                }
                // line[index] = '?';
                sol = sum;
            }
        } else {
            sol = calcLine(line, goal, index + 1);
        }
    }
    dp[index][goal.length][goal_0] = sol;
    return sol;

}

const partone = () => {
    let sum = 0;

    // n = 0;
    for (let i = 0; i < data.length; i++) {
        let [line, goal] = data[i];
        let arrange = calcLine(line, goal, 0);
        console.log(line.join(''), goal, ' has ', arrange);
        sum += arrange;
        // break;
    }
    // console.log('checked', n, 'pairs');
    return sum;
}


const parttwo = () => {
    let sum = 0;

    // n = 0;
    for (let i = 0; i < data.length; i++) {
        let [line, goal] = data[i];
        let longline = line;
        let longgoal = goal;
        for (let i = 0; i < 4; i++) {
            longline = longline.concat(['?'], line);
            longgoal = longgoal.concat(goal);
        }
        for (let i = 0; i < longline.length + 1; i++) {
            dp[i] = [];
            for (let j = 0; j < longgoal.length + 1; j++) {
                dp[i][j] = [];
            }
        }
        let arrange = calcLine(longline, longgoal, 0);
        console.log(longline.join(''), longgoal, ' has ', arrange);
        sum += arrange;
        // break;
    }
    // console.log('checked', n, 'pairs');
    return sum;
}

// console.log(partone());
console.log(parttwo());