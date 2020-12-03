const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const dataArray = data.split('\n');

const productOfTwoAddTo2020 = (dataArray) => { 
    for (const initialNum of dataArray) {
        for (const testNum of dataArray) {
            if (parseInt(initialNum) + parseInt(testNum) === 2020) {
                return initialNum * testNum
            }
        }
    }
}

console.log(productOfTwoAddTo2020(dataArray));

const productOfThreeAddTo2020 = (dataArray) => {
    for (const initialNum of dataArray) {
        for (const secondNum of dataArray) {
            for (const thirdNum of dataArray) {
                if (parseInt(initialNum) + parseInt(secondNum) + parseInt(thirdNum) === 2020) {
                    return initialNum * secondNum * thirdNum;
                }
            }
        }
    }
}

console.log(productOfThreeAddTo2020(dataArray));