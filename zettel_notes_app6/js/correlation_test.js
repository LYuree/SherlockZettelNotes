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

    console.log(rankedArray1);
    console.log(rankedArray2);
    
    const matchesCount = rankedArray1.length;

    // document.write("<table>");
    // document.write(`<tr>
    //                 <th>Слово</th>
    //                 <th>Ранг в a1</th>
    //                 <th>Ранг в a3</th>
    //                 </tr>`);

    // for (let i = 0; i < matchesCount; i++){
    //     document.write("<tr>");
    //     document.write(`<td>${rankedArray1[i]['keyword']}</td>`);
    //     document.write(`<td>${rankedArray1[i]['rank']}</td>`);
    //     document.write(`<td>${rankedArray2[i]['rank']}</td>`);
    //     document.write("</tr>");
    // }

    // document.write("</table>");
    
    // document.write("hello");

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

                        // document.write("<table>");
                        // document.write(`<tr>
                        //                 <th>Слово</th>
                        //                 <th>Ранг в a1</th>
                        //                 <th>Ранг в a3</th>
                        //                 </tr>`);
                    
                        // // for (let i = 0; i < matchesCount; i++){
                        // //     document.write("<tr>");
                        // //     document.write(`<td>${rankedArray1[i]['keyword']}</td>`);
                        // //     document.write(`<td>${rankedArray1[i]['rank']}</td>`);
                        // //     document.write(`<td>${rankedArray2[i]['rank']}</td>`);
                        // //     document.write("</tr>");
                        // // }

                        // for (let word of rankedArray1){
                        //     const keyword = word['keyword'];
                        //     // console.log()
                        //     const neededWord = element => element['keyword'] == keyword;
                        //     const index1 = rankedArray1.findIndex(neededWord);
                        //     const index2 = rankedArray2.findIndex(neededWord);
                        //     // console.log(index1);
                        //     document.write("<tr>");
                        //     document.write(`<td>${keyword}</td>`);
                        //     document.write(`<td>${rankedArray1[index1]['rank']}</td>`);
                        //     document.write(`<td>${rankedArray2[index2]['rank']}</td>`);
                        //     document.write("</tr>"); 
                        // }
                    
                        // document.write("</table>");

    //                     // console.log("user's keywords: ", rankedArray2);
    //                     // console.log("client's keywords: ", rankedArray1);

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


const keywordSet1 = new Set(`compatibility, systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, systems, criteria, corresponding algorithms, constructing, minimal supporting set, solving, systems, systems`
    .split(', '));
const keywordSet2 = new Set(`blood vessels, heart, heart diseases, diseases, diseases, circulatory system, lymphatic system`.split(', '));
const keywordSet3 = new Set(`systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, criteria, corresponding algorithms, constructing, minimal supporting set, solving, blood vessels, heart, heart diseases, diseases, diseases, circulatory system, lymphatic system`.split(', '));
const keywordSet4 = new Set(`systems, systems, blood vessels, heart, heart diseases, diseases, diseases, circulatory system, lymphatic system`.split(', '));
// systems, linear constraints, set, natural numbers, Criteria, compatibility, system, linear Diophantine equations, strict inequations, nonstrict inequations, Upper bounds, components, minimal set, solutions, algorithms, minimal generating sets, solutions, systems, criteria, corresponding algorithms, constructing, minimal supporting set, solving,

let rankedArray1 = setArrify(keywordSet1);
let rankedArray2 = setArrify(keywordSet2);
let rankedArray3 = setArrify(keywordSet3);
let rankedArray4 = setArrify(keywordSet4);
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