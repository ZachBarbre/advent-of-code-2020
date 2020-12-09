const fs = require('fs');
const { get } = require('https');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

// const xmasData = data.split('\r\n')

const xmasData = [
    '35',
    '20',
    '15',
    '25',
    '47',
    '40',
    '62',
    '55',
    '65',
    '95',
    '102',
    '117',
    '150',
    '182',
    '127',
    '219',
    '299',
    '277',
    '309',
    '576',
]

const xmasDataAsInt = xmasData.map(datum => parseInt(datum));

const numOfPrevNums = 5;

function checkPreviousNumber(check, prevNumsArray) {
    for (const testNum of prevNumsArray) {
        const addsToCheck = prevNumsArray
            .filter(num => num + testNum === check);
        if (addsToCheck.length > 0) {
            return true
        }
    }
    return false
}

function findInvaidNumber(xmasDataArray) {
    for (let i = numOfPrevNums; i < xmasDataArray.length; i += 1) {
        if (!checkPreviousNumber(xmasDataArray[i], xmasDataArray.slice(i - numOfPrevNums, i))) {
            return xmasDataArray[i]
        }
    }
}

console.log(findInvaidNumber(xmasDataAsInt));

function isSumInArray(target, array) {
    
}

function findMinMaxSumOfInvalidNumber(xmasDataArray) {
    const invalidNum = findInvaidNumber(xmasDataArray)
    return invalidNum
}

console.log((findMinMaxSumOfInvalidNumber(xmasDataAsInt)))