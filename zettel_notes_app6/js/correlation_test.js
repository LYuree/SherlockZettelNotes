const getSpearmanRho = (rankedArr1, rankedArr2) => {
    // console.log(rankedArr1);
    // console.log(rankedArr2);
    // let rankedArray1 = [...rankedArr1];
    // let rankedArray2 = [...rankedArr2];
    let rankedArray1 = rankedArr1;
    let rankedArray2 = rankedArr2;
    rankedArray2 = rankedArray2.filter(function(usersItem){
        for (let clientsItem of rankedArray1)
            if(usersItem.keyword === clientsItem.keyword) return true;
        return false;
    });
    // console.log(rankedArray2);
    rankedArray1 = rankedArray1.filter(function(clientsItem){
        for (let usersItem of rankedArray2)
            if(usersItem.keyword === clientsItem.keyword) return true;
        return false;
    });
    // console.log(rankedArray1);

    // console.log(rankedArray1);
    // console.log(rankedArray2);
    
    const matchesCount = rankedArray1.length;

    let SpearmanCorrelation = 0;
                if(matchesCount > 0){
                    if(matchesCount == 1) SpearmanCorrelation = 1;
                    else
                    {
                        let newRank = matchesCount;

                        for (let word of rankedArray1){
                            word.rank = newRank;
                            newRank--;
                        }

                        newRank = matchesCount;
                        for (let word of rankedArray2){
                            word.rank = newRank;
                            newRank--;
                        }


    //                     // RECALCULATING THE RANKS FOR BOTH ARRAYS
    //                     // ======================================================
    //                     // since two users may have a big difference in the total
    //                     // number of the keywords they possess,
    //                     // when we find the intersection of their keyword arrays,
    //                     // we'll have to recalculate the ranks of those keywords,
    //                     // so that their keyword ranking systems are comparable.
    //                     // ======================================================

                        let sumSqrDif = 0;

    //                     // HOW WE CALCULATE THE SQUARE DIFFERENCES FOR THE SPEARMAN'S RHO
    //                     // we have to take THE SAME keyword and look at the difference between
    //                     // two ranks
    //                     // so we'll have to find corresponding 
    //                     // objects by property at each iteration
                        
                        for (let clientsWord of rankedArray1){
                            // console.log(rankedArray2,rankedArray1);
                            const usersWord = rankedArray2.find(item => item.keyword == clientsWord.keyword);
                            // console.log(clientsWord, usersWord);
                            const sqrDif = (clientsWord.rank - usersWord.rank)**2;
                            sumSqrDif += sqrDif;
                        }
                        // console.log(sumSqrDif);
                        SpearmanCorrelation = 1 - 6*sumSqrDif/(matchesCount*(matchesCount**2 - 1));
                    }
                }
        return SpearmanCorrelation;
    };




const setArrify = set => {
    let array = Array.from(set);
    array = array.sort((item1, item2) => {
        return item1['occurrences'] - item2['occurrences']
    });
    array = array.map(element => {return element.toLowerCase()});
    array = array.map(element => {return {"keyword":element, "rank":0}});
    return array;
};

const assignRanks = array => {
    const length = array.length;
    console.log(length);
    for(let i = length - 1; i >= 0; i--){
        // console.log(i + 1);
        // console.log(array[length - 1 - i]);
        array[length - 1 - i]['rank'] = i + 1;
        // console.log(array[length - 1 - i]);
    }
};


const keywordSet1 = new Set(`compatibility, systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, systems, corresponding algorithms, constructing, minimal supporting set, solving, systems, systems`
    .split(', '));
const keywordSet2 = new Set(`blood vessels, heart, heart diseases, diseases, circulatory system, lymphatic system`.split(', '));
const keywordSet3 = new Set(`systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, criteria, corresponding algorithms, constructing, minimal supporting set, solving, blood vessels, heart, heart diseases, diseases, diseases, circulatory system, lymphatic system`.split(', '));
const keywordSet4 = new Set(`systems, blood vessels, heart, heart diseases, diseases, circulatory system, lymphatic system`.split(', '));
// systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, systems, criteria, corresponding algorithms, constructing, minimal supporting set, solving,

const keywordSets = new Array();
keywordSets.push(keywordSet1, keywordSet2, keywordSet3, keywordSet4);



let rankedArray1 = setArrify(keywordSet1);
let rankedArray2 = setArrify(keywordSet2);
let rankedArray3 = setArrify(keywordSet3);
let rankedArray4 = setArrify(keywordSet4);

const rankedArrays = new Array();
rankedArrays.push(rankedArray1, rankedArray2, rankedArray3, rankedArray4);

for (const array of rankedArrays){
    for (const item of array){
        item['occurrences'] = getRandomInt(10)*10;
    }
    array.sort((item1, item2) => {
        return item2['occurrences'] - item1['occurrences']
    });
}


// console.log(rankedArray2);

// let rankedArray1 = Array.from(keywordSet1);
// rankedArray1 = rankedArray1.map(element => {return element.toLowerCase()});
// rankedArray1 = rankedArray1.map(element => {return {"keyword":element, "rank":0}});

// const rankedArray1 = (Array.from(keywordSet1).forEach(toLowerCase)).map(element => {return {"keyword":element, "rank":0}});
assignRanks(rankedArray1);
assignRanks(rankedArray2);
assignRanks(rankedArray3);
assignRanks(rankedArray4);

// console.log(rankedArray1);
// console.log(rankedArray2);
// console.log(rankedArray3);
// console.log(rankedArray4);

const spearmanRho1 = getSpearmanRho(rankedArray1, rankedArray2);
const spearmanRho2 = getSpearmanRho(rankedArray1, rankedArray3);
const spearmanRho3 = getSpearmanRho(rankedArray1, rankedArray4);

// const spearmanRho4 = getSpearmanRho(rankedArray2, rankedArray3);
// const spearmanRho5 = getSpearmanRho(rankedArray3, rankedArray4);
// const spearmanRho6 = getSpearmanRho(rankedArray2, rankedArray4);

console.log(spearmanRho1);
console.log(spearmanRho2);
console.log(spearmanRho3);
// console.log(spearmanRho4);
// console.log(spearmanRho5);
// console.log(spearmanRho6);


// const rankedArray1 = [
//     {},
//     {},
// ];
// const rankedArray2 = [
    
// ];
// const rankedArray3 = [

// ];


function getJaccard(clientsKeywords, usersKeywords){
    // console.log(clientsKeywords, usersKeywords);
    // debugger;
    let intersection = 0;
    const usersKeywordsTransformed = occurrencesToPercent(usersKeywords),
        clientsKeywordsTransformed = occurrencesToPercent(clientsKeywords),
        occurrencesUnionArray = new Array();
    let concatArray = usersKeywordsTransformed.concat(clientsKeywordsTransformed);
    // the difference between the concat and the union arrays
    // is that concat array is just a straight concatenation of two arrays that
    // contains duplicates, whereas the union array will only contain the
    // 'version' of each word with the highest occurrences value

    // also, could probably just store the occurrences in the union array,
    // cause we'll only need that array to calculate the sum of its keywords' occurrences
    for (let firstItemIndex in concatArray){
        let firstItem = concatArray[firstItemIndex];
        // when searching for the counterpart of the first item,
        // you have to search in an array \ first item (set difference)
        const concatArraySliced = concatArray.slice(+firstItemIndex + 1);
        let secondItemIndex = concatArraySliced.findIndex(item => item['keyword'] == firstItem['keyword']),
            secondItem = concatArraySliced[secondItemIndex];
        if (secondItem){
            console.log("first item, second item:");
            console.log(firstItem, secondItem);
            intersection += Math.min(+firstItem['occurrences'], +secondItem['occurrences']);
            if(firstItem['occurrences'] > secondItem['occurrences']) occurrencesUnionArray.push(firstItem['occurrences']);
        }
        else occurrencesUnionArray.push(firstItem['occurrences']);
        // an item is pushed into the union array if it's unique
        // OR it has a counterpart with lower occurrences value
    }

    function occurrencesToPercent (keywordsArray){
        // a structured clone of an array is created
        // to prevent the initial array from undergoing changes;
        // structuredClone function shows better performance
        // than the JSON way, but the former might require polyfill
        // (which it, probably, shouldn't, cause it seems to be now supported
        // by all browsers)
        // const resultArray = JSON.parse(JSON.stringify(keywordsArray));
        const resultArray = structuredClone(keywordsArray);
        // const resultArray = Array.from(keywordsArray);
        // console.log(resultArray);
        let sumOfOccurrences = 0;
        for (let item of resultArray){
            // console.log(item);
            sumOfOccurrences += item['occurrences'];
        }
        for (let item of resultArray){
            item['occurrences'] /= sumOfOccurrences;
        }
        // console.log(resultArray);
        return resultArray;
    }

    // console.log(occurrencesUnionArray);
    const union = occurrencesUnionArray.reduce((accumulator, currentValue) => accumulator + currentValue);

    // console.log(`intersection = ${intersection}, union = ${union}`);
    if(union == 0) return 0;
    // debugger;
    return intersection/union;
}

const keywordsArray1 = Array.from(keywordSet1);
const keywordsArray2 = Array.from(keywordSet2);
const keywordsArray3 = Array.from(keywordSet3);
const keywordsArray4 = Array.from(keywordSet4);


// const keywords = new Array();
// keywords.push(keywordsArray1, keywordsArray2, keywordsArray3, keywordsArray4);
// const rankedArrays = new Array();
// rankedArrays.push(rankedArray1, rankedArray2, rankedArray3, rankedArray4);
// console.log("Keywords arrays: ", rankedArrays);


function getRandomInt(max) {
    const rand = Math.floor(Math.random() * max);
    if(rand == 0) return 10;
    else return rand;
  }

// for (const array of rankedArrays){
//     for (const item of array){
//         item['occurrences'] = getRandomInt(10)*10;
//     }
// }


// for (const array of keywords){
//     for (const item of array){
//         item['occurrences'] = getRandomInt(10)*10;
//     }
// }

// const anotherRankedArray1 = setArrify(keywordSets[0]);
// const anotherRankedArray2 = setArrify(keywordSets[1]);
// const anotherRankedArray3 = setArrify(keywordSets[2]);
// const anotherRankedArray4 = setArrify(keywordSets[3]);

// const moreRankedArrays = new Array();
// moreRankedArrays.push(anotherRankedArray1, anotherRankedArray1, anotherRankedArray1, anotherRankedArray4);

function makeArray(d1, d2) {
    const arr = [];
    for(let i = 0; i < d2; i++) {
        arr.push(new Array(d1));
    }
    return arr;
}

const JaccardValues = new makeArray(4, 4);

for (let i = 0; i < rankedArrays.length; i++){
    for (let j = i + 1; j < rankedArrays.length; j++){
        const Jaccard = getJaccard(rankedArrays[i], rankedArrays[j]);
        console.log(`\nJaccard value for arrays ${i+1} - ${j+1}: ${Jaccard}\n`);
        JaccardValues[i][j] = Jaccard;
        JaccardValues[j][i] = Jaccard;
    }
    JaccardValues[i][i] = 1;
}

// const JacTable = document.querySelector('.jac_table');
// const keywTable = document.querySelector('.keywords_table');

function printRow(cellTag, parentalTable, numberOfCells, rowClass, cellValues){
    // const newTable = document.createElement("table");
    const newRow = document.createElement("tr");
    for(let i = 0; i < numberOfCells; i++){
        const dataCell = document.createElement(`${cellTag}`);
        dataCell.classList += rowClass;
        dataCell.innerHTML = cellValues[i];
        // const noTagValue = (typeof cellValues[i] == 'string') ? this._stripHTMLTags(cellValues[i]) : cellValues[i];
        // dataCell.setAttribute('title', noTagValue);
        newRow.appendChild(dataCell);
    }
    parentalTable.appendChild(newRow);
}

// let meanJac = 0;
// const denom = JaccardValues.length*JaccardValues[0].length;
// for (let i = 0; i < JaccardValues.length; i++){
//     for (let j = 0; j < JaccardValues[0].length; j++){
//         meanJac += JaccardValues[i][j]/denom;
//     }
// }
// console.log(`\nMean Jac: ${meanJac}\n`);

const jacTable = document.createElement("table");
jacTable.classList.add("jac_table");
printRow("th", jacTable, 5, "test_row", ["arr. number", '1', '2', '3', '4']);
for (let i = 0; i < rankedArrays.length; i++){
    // debugger;
    // let fontWeight = null;
    // if()
    printRow("td", jacTable, JaccardValues[i].length+1, "test_row", [`<b>${i+1}</b>`, ...JaccardValues[i]]);
}
document.body.appendChild(jacTable);
document.write("<br>");



for (const array of rankedArrays){
    const keywTable = document.createElement("table");
    keywTable.classList.add("keywords_table");
    let i = 1;
    printRow("th", keywTable, 4, "test_row", ["", 'keyword', 'occurrences', 'rank']);
    for (const item of array){
        // debugger;
        printRow("td", keywTable, 4, "test_row", [i, item['keyword'], item['occurrences'], item['rank']]);
        i++;
    }
    document.body.appendChild(keywTable);
    document.write("<br>");
    // document.write(BR);
}

