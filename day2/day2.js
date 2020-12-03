const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const passwordArray = data.split('\r\n');
console.log(passwordArray.length)
// const passwordArray = [
//     '1-3 a: abcde',
//     '1-3 b: cdefg',
//     '2-9 c: ccccccccc',
// ]

const passwordObjectArray = passwordArray.map(passwordString => {
    const passwordStrArr = passwordString.split(' ')
    const passwordObj = {
        min: parseInt(passwordStrArr[0].substring(0, passwordStrArr[0].indexOf('-'))),
        max: parseInt(passwordStrArr[0].substring(passwordStrArr[0].indexOf('-') + 1)),
        letter: passwordStrArr[1].substring(0, passwordStrArr[1].indexOf(':')),
        password: passwordStrArr[2],
    }
    return passwordObj
})

const numberValid = passwordObjectArray.reduce((acc, passObj) => {
    const regex = new RegExp(passObj.letter, 'g');
    const arrOfLetterInPass = passObj.password.match(regex);

    if (!arrOfLetterInPass) return acc;

    if (passObj.min <= arrOfLetterInPass.length && arrOfLetterInPass.length <= passObj.max) {
        return acc + 1;
    }

    return acc
}, 0)

console.log(numberValid)