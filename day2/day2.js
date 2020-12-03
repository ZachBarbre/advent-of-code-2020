const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const passwordArray = data.split('\r\n');

const passwordNumberofValidOne = (passwordArray) => {
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

    return numberValid;
}

console.log(passwordNumberofValidOne(passwordArray));

const passwordNumberValidTwo = (passwordArray) => {
    const passwordObjectArray = passwordArray.map(passwordString => {
        const passwordStrArr = passwordString.split(' ')
        const passwordObj = {
            index1: parseInt(passwordStrArr[0].substring(0, passwordStrArr[0].indexOf('-'))) - 1,
            index2: parseInt(passwordStrArr[0].substring(passwordStrArr[0].indexOf('-') + 1)) - 1,
            letter: passwordStrArr[1].substring(0, passwordStrArr[1].indexOf(':')),
            password: passwordStrArr[2],
        }
        return passwordObj
    })

    const numberValid = passwordObjectArray.reduce((acc, passObj) => {
        if (passObj.password[passObj.index1] === passObj.letter && 
            passObj.password[passObj.index2] === passObj.letter) {
            return acc;
        }

        if (passObj.password[passObj.index1] === passObj.letter || 
            passObj.password[passObj.index2] === passObj.letter) {
            return acc + 1;
        }

        return acc;
    }, 0);

    return numberValid;
}

console.log(passwordNumberValidTwo(passwordArray));