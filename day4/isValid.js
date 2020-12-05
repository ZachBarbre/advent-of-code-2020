const isValidFieldPresentOnly = (passport) => {
    const requiedFields = ['hcl', 'iyr', 'eyr', 'ecl', 'pid', 'byr', 'hgt'];
    for (const field of requiedFields) {
        if (!passport.includes(field)) {
            return false;
        }
    }
    return true;
};

const validateField = {
    byrValid(byr) {
        if (byr.length !== 4) {
            return false;
        }
        const byrNum = parseInt(byr);
        if (byrNum < 1920 || byrNum > 2002) {
            return false;
        }
        return true;
    },
    iyrValid(iyr) {
        if (iyr.length !== 4) {
            return false;
        }
        const byrNum = parseInt(iyr);
        if (byrNum < 2010 || byrNum > 2020) {
            return false;
        }
        return true;
    },
    eyrValid(eyr) {
        if (eyr.length !== 4) {
            return false;
        }
        const byrNum = parseInt(eyr);
        if (byrNum < 2020 || byrNum > 2030) {
            return false;
        }
        return true;
    },
    hgtValid(hgt) {
        if (hgt[hgt.length - 1] !== 'm' && hgt[hgt.length - 1] !== 'n') {
            return false;
        }
        if (hgt[hgt.length - 1] === 'm') {
            const hgtCm = parseInt(hgt.substring(0, hgt.indexOf('c')));
            if (hgtCm < 150 || hgtCm > 193) {
                return false;
            }
        }
        if (hgt[hgt.length - 1] === 'n') {
            const hgtCm = parseInt(hgt.substring(0, hgt.indexOf('i')));
            if (hgtCm < 59 || hgtCm > 76) {
                return false;
            }
        }
        return true;
    },
    hclValid(hcl) {
        if (hcl[0] !== '#' || hcl.length !== 7) {
            return false;
        }
        const hclChar = hcl.substring(1);
        const re = new RegExp('[^a-f0-9]');
        return !re.test(hclChar);
    },
    eclValid(ecl) {
        const validEcls = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
        return validEcls.includes(ecl);
    },
    pidValid(pid) {
        if (pid.length !== 9) {
            return false;
        }
        const re = new RegExp(['[^0-9]']);
        return !re.test(pid);
    }
}

const isValidField = (passportObj) => {
    const passportKeys = Object.keys(passportObj).filter(key => key !== 'cid')
    if (passportKeys.length !== 7) {
        return false
    }
    for (const key of passportKeys) {
        if(!validateField[`${key}Valid`](passportObj[key])) {
            return false
        }
    }
    return true;
}

exports.isValidFieldPresentOnly = isValidFieldPresentOnly;
exports.isValidField = isValidField;
