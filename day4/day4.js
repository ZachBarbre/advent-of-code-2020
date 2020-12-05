const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const rawPassportsArray = data.split('\r\n');

const extractkeys = (str) => {
    const keyValueStrings = str.split(' ');
    const keys = keyValueStrings.map(keyValue => {
       return keyValue.substring(0, keyValue.indexOf(':'));
    });
    return keys;
}

const parsedPassports = rawPassportsArray.reduce((acc, raw, index) => {
    if (index === 0) {
        return acc;
    }
    if (!raw) {
        return [...acc, []];
    }
    const passportArray = acc.pop();
    return [
            ...acc, 
            passportArray.concat(extractkeys(raw))
        ];
}, [extractkeys(rawPassportsArray[0])]);

const isValid = (passport) => {
    const requiedFields = ['hcl', 'iyr', 'eyr', 'ecl', 'pid', 'byr', 'hgt'];
    for (const field of requiedFields) {
        if (!passport.includes(field)) {
            return false
        }
    }
    return true
}

const numValidPassports = parsedPassports.reduce((acc, passport) =>{
    if (isValid(passport)) {
        return acc + 1
    }
    return acc
}, 0);

console.log(numValidPassports)