const fs = require('fs');
const { get } = require('https');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const rawInstructions = data.split('\r\n')


// const rawInstructions = [
//     'nop +0',
//     'acc +1',
//     'jmp +4',
//     'acc +3',
//     'jmp -3',
//     'acc -99',
//     'acc +1',
//     'jmp -4',
//     'acc +6',
// ]

let runIndecies = []
let currentIndex = 0
let acc = 0;
let currentInstruction

while (!runIndecies.includes(currentIndex)) {
    currentInstruction = rawInstructions[currentIndex].split(' ');
    if (currentInstruction[0] === 'jmp') {
        runIndecies.push(currentIndex)
        currentIndex += parseInt(currentInstruction[1]);
    } else {
        if (currentInstruction[0] === 'acc') {
            acc += parseInt(currentInstruction[1]);
        }
        runIndecies.push(currentIndex)
        currentIndex += 1;
    }
}

console.log(acc)