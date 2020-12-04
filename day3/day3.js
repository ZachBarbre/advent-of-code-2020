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

const numberOfTreesHit = (forestArray, slopeObj) => {
    const { right, down } = slopeObj
    const treesHitObj = forestArray.reduce((acc, treeLine, index) => {
        if (index % down !== 0) {
            return acc
        }
        if (acc.treelineIndex >= treeLine.length) {
            acc = {...acc, treelineIndex: acc.treelineIndex - treeLine.length}
        }
        if (treeLine[acc.treelineIndex] === '#') {
            return { treelineIndex: acc.treelineIndex + right, hits: acc.hits + 1 }
        }
        return { ...acc, treelineIndex: acc.treelineIndex + right }
    }, {treelineIndex: 0, hits: 0});

    return treesHitObj.hits
}

const slopeArr = [
    {right: 1, down: 1},
    {right: 3, down: 1},
    {right: 5, down: 1},
    {right: 7, down: 1},
    {right: 1, down: 2}
]

const productOfTreesHit = (forestArray, slopeArr) => {
    const productTreeHit = slopeArr.reduce((acc, slope) => {
        const treesHit = numberOfTreesHit(forestArray, slope);
        if (treesHit === 0 ) {
            return acc;
        }
        return acc * treesHit;
    }, 1);
    return productTreeHit;
} 

console.log(productOfTreesHit(forestArray, slopeArr));