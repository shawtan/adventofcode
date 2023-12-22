const fs = require('node:fs');

// const input = fs.readFileSync('example.txt', 'utf8');
const input = fs.readFileSync('input.txt', 'utf8');

const data = input.slice(0, input.length - 1)
    .split('\n\n');

const parseInput = () => {
    const [rulesIn, partsIn] = data;
    const rules = rulesIn.split('\n');
    const rulesDict = {};
    for (let rule of rules) {
        let [name, rule2] = rule.slice(0, rule.length - 1).split('{');
        rulesDict[name] = rule2.split(',').map(onerule => {
            if (onerule.includes(":")) {
                let [front, back] = onerule.split(":");
                if (front.includes("<")) {
                    let [a, b] = front.split("<");
                    return ["<", a, parseInt(b), back];
                } else {
                    let [a, b] = front.split(">");
                    return [">", a, parseInt(b), back];
                }
            } else {
                return [onerule];
            }
        });
    }
    return rulesDict;
}

const rules = parseInput();

console.log(rules);

const goto = (name, part) => {
    if (name === "A") {
        let sum = 1;
        sum *= part['x'][1] - part['x'][0] + 1;
        sum *= part['m'][1] - part['m'][0] + 1;
        sum *= part['a'][1] - part['a'][0] + 1;
        sum *= part['s'][1] - part['s'][0] + 1;
        // console.log('sum', part, sum);
        return sum;
    } else if (name === "R") {
        return 0;
    } else {
        return followRule(name, part)
    }
}

const passRule = (condition, part) => {
    let [op, name, val] = condition;
    let [min, max] = part[name];
    let acc = null;
    let rej = null;

    // x < n
    if (op === "<") {
        if (max < val) {
            rej = part;
        } else if (min > val) {
            acc = part;
        }

        let accMax = val - 1;
        let rejMin = val;
        acc = {
            ...part,
            [name]: [min, accMax],
        };
        rej = {
            ...part,
            [name]: [rejMin, max],
        };
    } else {
        // x > n
        if (min > val) {
            rej = part;
        } else if (max < val) {
            acc = part;
        }

        let accMin = val + 1;
        let rejMax = val;
        acc = {
            ...part,
            [name]: [accMin, max],
        };
        rej = {
            ...part,
            [name]: [min, rejMax],
        };
    }

    return [acc, rej];
}
const followRule = (workflow, part) => {
    const rule = rules[workflow];
    let total = 0;
    for (let step of rule) {
        if (step.length === 1) {
            total += goto(step[0], part);
        } else {
            const [accept, reject] = passRule(step, part);
            // console.log()

            if (accept != null) {
                total += goto(step[3], accept);
            }
            if (reject == null) {
                break;
            }
            part = reject;
        }
    }
    return total;
}

const parttwo = () => {
    const part = {
        x: [1, 4000],
        m: [1, 4000],
        a: [1, 4000],
        s: [1, 4000],
    };

    return followRule("in", part);
}

// console.log(partone());
console.log(parttwo());