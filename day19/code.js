const fs = require('node:fs');

const input = fs.readFileSync('example.txt', 'utf8');
// const input = fs.readFileSync('input.txt', 'utf8');

const data = input.slice(0, input.length - 1)
    .split('\n\n');

const parseInput = () => {
    const [rulesIn, partsIn] = data;
    const rules = rulesIn.split('\n');
    let parts = partsIn.split('\n')
        .map(x => x.slice(1, x.length - 1))
        .map(x => x.split(',').map(y => y.split('=')));
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
    parts = parts.map(part => {
        const obj = {};
        for (rating of part) {
            let [name, val] = rating;
            obj[name] = parseInt(val);
        }
        return obj;
    })

    return [rulesDict, parts];
}

const [rules, parts] = parseInput();

console.log(rules, parts);

const goto = (name, part) => {
    if (name === "A") {
        return true;
    } else if (name === "R") {
        return false;
    } else {
        return followRule(name, part)
    }
}

const passRule = (condition, part) => {
    let [op, name, val] = condition;
    if (op === "<") {
        return part[name] < val;
    } else {
        return part[name] > val;
    }
}
const followRule = (workflow, part) => {
    const rule = rules[workflow];
    for (let step of rule) {
        if (step.length === 1) {
            return goto(step[0], part);
        } else {
            if (passRule(step, part)) {
                return goto(step[3], part);
            }
        }
    }
    console.log("End of followrule", part, workflow);
}

const partone = () => {
    let sum = 0;

    for (let i = 0; i < parts.length; i++) {
        let part = parts[i];
        if (followRule("in", part)) {
            console.log("part", i, "passes");
            sum += part['x'];
            sum += part['m'];
            sum += part['a'];
            sum += part['s'];
        }
    }

    return sum;
}


console.log(partone());