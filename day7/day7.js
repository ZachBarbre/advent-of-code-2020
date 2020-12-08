const fs = require('fs');
const { get } = require('https');
let data = '';
const path = process.argv[2]

try {
    data = fs.readFileSync(path, 'utf-8');
} catch (error) {
    console.error(error)
}

// const rawBagsArray = data.split('\r\n')

rawBagsArray = [
    'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
    'bright white bags contain 1 shiny gold bag.',
    'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
    'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
    'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
    'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
    'faded blue bags contain no other bags.',
    'dotted black bags contain no other bags.',
]


function buildBagObj(bagStr) {
    const bagArray = (bagStr.split(' '))
    const rawChildArray = bagArray.slice(4)
    const buildChildArray = (rawChildArray) => {
        const newArrayLen = rawChildArray.length / 4
        const childArray = []
        for (let index = 0; index < newArrayLen; index += 1) {
            childArray.push({
                [`${rawChildArray[index * 4 + 1]}-${rawChildArray[index * 4 + 2]}`]: parseInt(rawChildArray[index * 4]),
            })
        }
        return childArray
    }
    const bagObj = { [`${bagArray[0]}-${bagArray[1]}`]: buildChildArray(rawChildArray) }
    return bagObj
}

function buildBagObjSimple(bagStr) {
    const bagArray = (bagStr.split(' '))
    const rawChildArray = bagArray.slice(4)
    const buildChildArray = (rawChildArray) => {
        const newArrayLen = rawChildArray.length / 4
        const childArray = []
        for (let index = 0; index < newArrayLen; index += 1) {
            childArray.push(
                `${rawChildArray[index * 4 + 1]}-${rawChildArray[index * 4 + 2]}`,
            )
        }
        return childArray
    }
    const bagObj = { name : `${bagArray[0]}-${bagArray[1]}`, chlidren: buildChildArray(rawChildArray) }
    return bagObj
}
// probably should have used a map...
const simpleBagsArray = rawBagsArray.map(bag => buildBagObjSimple(bag))
const bagsArray = rawBagsArray.map(bag => buildBagObj(bag))
const flatBagsTree = bagsArray.reduce((acc, bag) => {
    const bagkey = Object.keys(bag)[0]
    return {...acc, [bagkey]: bag[bagkey]}
})

function bagSearchNumCanContain(targetBag, flatBagsTree, bagsArray) {
    let searchArray = [targetBag];
    let searchTarget = targetBag
    let containsBag = [];
    let containSearch = []

    const searchBagArray = (target, bagsArray) => {
        const bagsThatContainSearch = bagsArray.reduce((acc, bag) => {
            if (bag.chlidren.includes(target) && acc.length === 0) {
                return [bag.name]
            }
            if (bag.chlidren.includes(target)) {
                return [...acc, bag.name]
            }
            return acc
        }, [])
        return bagsThatContainSearch
    }
    while (searchArray.length > 0) {
        containSearch = searchBagArray(searchTarget, bagsArray)
        containSearch.forEach(bag => {
            if (!containsBag.includes(bag)) {
                containsBag = containsBag.concat(bag)
            }
        })
        searchTarget = searchArray.pop()
        searchArray = searchArray.concat(containSearch)
    }

    return containsBag.length
}

 console.log(bagSearchNumCanContain('shiny-gold', flatBagsTree, simpleBagsArray))

 function numberOfBagsInside(targetBag, flatBagsTree, bagsArray) {
    console.log(flatBagsTree),
    console.log(bagsArray)
    const firstChildArray = flatBagsTree[targetBag]

    const countBagsInside = (childArray) => {
        if (childArray[0].hasOwnProperty('other-bags.')) {
            return 0
        }
        const countainsCount = childArray.reduce((acc, bag) => {
            return acc + bag[Object.keys(bag)[0]]
        }, 0)
        return countainsCount
    }

    const countTotalBags = (target) => {
        console.log(target)
        let count
        if (target === 'other-bags.') {
            return 0
        }
        const newTargets = flatBagsTree[target].map(bag => Object.keys(bag)[0])
        const targetBagCount = countBagsInside(flatBagsTree[target])
        for (const newTarget of newTargets) {
            count = countBagsInside(flatBagsTree[target]) + countTotalBags(newTarget, flatBagsTree[newTarget])
            console.log(count)
        }
        return count
    }
    console.log(countTotalBags(targetBag))
 }

 (numberOfBagsInside('shiny-gold', flatBagsTree, simpleBagsArray))