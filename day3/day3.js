const fs = require('fs');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

const forestArray = data.split('\r\n');
// console.log(forestArray)
// const forestArray = [
//     '..##.......',
//     '#...#...#..',
//     '.#....#..#.',
//     '..#.#...#.#',
//     '.#...##..#.',
//     '..#.##.....',
//     '.#.#.#....#',
//     '.#........#',
//     '#.##...#...',
//     '#...##....#',
//     '.#..#...#.#',
// ];

const numberOfTreesHit = (forestArray) => {
    const treesHitObj = forestArray.reduce((acc, treeLine) => {
        if (acc.index >= treeLine.length) {
            acc = {...acc, index: acc.index - treeLine.length}
        }
        if (treeLine[acc.index] === '#') {
            return { index: acc.index + 3, hits: acc.hits + 1 }
        }
        return { ...acc, index: acc.index + 3 }
    }, {index: 0, hits: 0});

    return treesHitObj.hits
}


console.log(numberOfTreesHit(forestArray))