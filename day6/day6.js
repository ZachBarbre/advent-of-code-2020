const fs = require('fs');
const { get } = require('https');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const rawCustomsArray = data.split('\r\n');

// const rawCustomsArray = [
//     'ac',
//     'bc',
//     'ce',
//     'ec',
//     'dc',
// ]

const parseCustoms = (rawCustomsArray) => {
    const parsedCustoms = rawCustomsArray.reduce((acc, raw, index) => {
        if (index === 0) {
            return acc;
        }
        if (!raw) {
            return [...acc, []];
        }
        let customArray = acc.pop();
        raw.split('').forEach(element => {
           if (!customArray.includes(element)) {
               customArray = [...customArray, element]
           }
        });
        return [
                ...acc, 
                customArray
            ];
    }, [rawCustomsArray[0].split('')])
    return parsedCustoms
}

const countAllAnswers = (rawCustomsArray) => {
    const parsedCustoms = parseCustoms(rawCustomsArray)
    return parsedCustoms.reduce((acc, custom) => {
        return acc + custom.length
    }, 0)
}

const groupCustoms = (rawCustomsArray) => {
    const groupedCustoms = rawCustomsArray.reduce((acc, raw, index) => {
        if (!raw) {
            return [...acc, {numberInGroup: 0, answers:[]}]
        }
        let customObj = acc.pop();
        customObj.numberInGroup = customObj.numberInGroup + 1
        customObj.answers =  customObj.answers.concat(raw.split(''))
        return [
                ...acc, 
                customObj
            ];
    }, [{numberInGroup: 0, answers: []}])
    return groupedCustoms
}

function noMulitpes(arr) {
    return new Set(arr).size === arr.length
}

function countMultiples(cutomsObj) {
    const { numberInGroup, answers } = cutomsObj
    const uniqueValueSet = new Set(answers);
    let numOfMultiples = 0

    const countOccurances = (value, arr) => {
        return arr.reduce((acc, element) => {
        if (value === element) {
            return acc + 1
        }
        return acc
        }, 0)
    }

    uniqueValueSet.forEach(value => {
        const numOfOccurances = countOccurances(value, answers)
        if(numOfOccurances === numberInGroup) {
            numOfMultiples += 1
        }
    })
    return numOfMultiples
}

const countSingleAnswers = (rawCustomsArray) => {
    const groupedCustoms = groupCustoms(rawCustomsArray)
    return groupedCustoms.reduce((acc, custom) => {
        if (custom.numberInGroup === 1) {
            return acc + custom.answers.length
        }
        if (noMulitpes(custom.answers)) {
            return acc
        }
        return acc + countMultiples(custom)
    }, 0)
}

console.log(countSingleAnswers(rawCustomsArray))
