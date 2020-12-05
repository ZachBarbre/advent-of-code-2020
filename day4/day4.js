const fs = require('fs');
const { isValidFieldPresentOnly, isValidField } = require("./isValid");
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const rawPassportsArray = data.split('\r\n');

const parsePassports = (rawPassportsArray, extractCallback) => {
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
                passportArray.concat(extractCallback(raw))
            ];
    }, [extractCallback(rawPassportsArray[0])])
    return parsedPassports
}

const numberOfValidPassports = (parsedPassports, isValidCallback) => {
    return parsedPassports.reduce((acc, passport) => {
        if (isValidCallback(passport)) {
            return acc + 1
        }
        return acc
    }, 0);
}

const countValidPassportsFieldsOnly = (rawPassportsArray) => {
    const extractKeys = (str) => {
        const keyValueStrings = str.split(' ');
        const keys = keyValueStrings.map(keyValue => {
           return keyValue.substring(0, keyValue.indexOf(':'));
        });
        return keys;
    }

    const parsedPassports = parsePassports(rawPassportsArray, extractKeys)
    
    const numValidPassports = numberOfValidPassports(parsedPassports, isValidFieldPresentOnly)
    return numValidPassports
}

console.log(countValidPassportsFieldsOnly(rawPassportsArray));

const countValidPassports = (rawPassportsArray) => {
    const extractKeyVaules = (str) => {
        const keyValueStrings = str.split(' ');
        const keys = keyValueStrings.map(keyValue => {
           return keyValue.split(':');
        });
        return keys;
    }
    
    const parsedPassports = parsePassports(rawPassportsArray, extractKeyVaules)
    const parsedPassportsToObjects = parsedPassports.map(passport => Object.fromEntries(passport))
    const numValidPassports = numberOfValidPassports(parsedPassportsToObjects, isValidField)
    return numValidPassports
}

console.log(countValidPassports(rawPassportsArray))