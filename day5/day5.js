const fs = require('fs');
const { get } = require('https');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const boardingPassArray = data.split('\r\n');

// const boardingPassArray = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

const getBordingPassInfo = (boardingPassStr) => {
    const instructionsArr = boardingPassStr.split('');

    const rowInstructionsArr = instructionsArr.slice(0,7)
    const seatInstructionsArr = instructionsArr.slice(7)
    const parseInstructions = (arr, rowOrSeat) => {
        const lower = rowOrSeat === 'row' ? 'F' : 'L';
        const locationStart = rowOrSeat === 'row' ? [0, 127] : [0, 7];
        
        const location = arr.reduce((acc, instruction) => {
            const midpoint = (acc[0] + acc[1]) / 2;
            if (instruction === lower) {
                return [acc[0], Math.floor(midpoint)]
            } 
            return [Math.ceil(midpoint), acc[1]]
        }, locationStart)
        
        return location[0];
    }
    const row = parseInstructions(rowInstructionsArr, 'row');
    const seat = parseInstructions(seatInstructionsArr, 'seat');
    return { 
        row, 
        seat,
        id: row * 8 + seat
    }
}

const getBoardingPassIds = (boardingPassArray) => {
    return boardingPassArray.map(boardingPass => {
        const boardingpassInfo = getBordingPassInfo(boardingPass);
        return boardingpassInfo.id;
    });
}

const maxId = (boardingPassArray) => {
    const ids = getBoardingPassIds(boardingPassArray)
    return Math.max(...ids) 
}

const getMySeat = (boardingPassArray) => {
    const usedBoardingPassesIds = getBoardingPassIds(boardingPassArray).sort((a, b) => a - b)
    const mySeatId = usedBoardingPassesIds.filter((id, index, arr) => arr[index + 1] - id === 2)
    return mySeatId[0] + 1
}

console.log(getMySeat(boardingPassArray))
