const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

let dataArray = data.split('\n');
let answer = '';

for (const initialNum of dataArray) {
    for (const testNum of dataArray) {
        if (parseInt(initialNum) + parseInt(testNum) === 2020) {
            answer = initialNum * testNum
            break;
        }
    }
    if (answer) break;
}

console.log(answer)