
let generateCities = function(num) {
	let arrayOfCities = []
	for (let i = 0; i < num; i++){
		let xcoord = Math.floor(Math.random() * 100)
		let ycoord = Math.floor(Math.random() * 100)
		arrayOfCities.push({num: i, xcoord:xcoord, ycoord:ycoord})
	}
	return arrayOfCities
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

let removeDups = function(arr) {
	let temp = []
	let temp2 = []
	arr.forEach(e=>{if (temp.indexOf(e.score) == -1) temp2.push(e);temp.push(e.score)})
	return temp2
}

let generateRandomPath = function (num){
	let temp = []
	for (let i = 0; i < num; i++){
		temp.push(i)
	}
	return shuffleArray(temp)
}

let distance = function(city1, city2){
	return Math.pow(Math.pow(city1.xcoord - city2.xcoord,2)+Math.pow(city1.ycoord - city2.ycoord,2), .5)
}

let score = function(path, cities) {
	let totalDistance = 0;
	for(let i = 0; i < path.length-1; i++){
		totalDistance+= distance(cities[path[i]], cities[path[i+1]])
	}
	return totalDistance
}

// let mutate = function(path){
// 	let index1 = Math.floor(Math.random() * path.length)
// 	let index2 = Math.floor(Math.random() * path.length)
// 	let temp = path[index1];
// 	path[index1] = path[index2]
// 	path[index2] = temp;
// 	return path;
// }

let mutate = function(path){
	let lowScore = score(path, cities)
	let lowPath = path
	for(let i = 0; i < path.length; i++){
		for(let j = i+1; i < path.length; i++){
			let potentialpath = [...path]
				let temp = potentialpath[i];
				potentialpath[i] = potentialpath[j]
				potentialpath[j] = temp;
			if (score(potentialpath, cities) < lowScore){
				lowScore = score(potentialpath, cities)
				lowPath = potentialpath
			}
		}
	}

	return lowPath;
}

let have2children = function(path1, path2){
  let length1 = Math.floor(Math.random() * path1.gene.length)
  let length2 = Math.floor(Math.random() * path2.gene.length)
  let childpath1 = path1.gene.slice(0,length1)
  let childpath2 = path2.gene.slice(0,length2)
  path2.gene.forEach(e=>{if(childpath1.indexOf(e) == -1) childpath1.push(e)})
  path1.gene.forEach(e=>{if(childpath2.indexOf(e) == -1) childpath2.push(e)})
  // console.log(childpath1)
  let mutated1 = mutate(childpath1)
  let mutated2 = mutate(childpath2)
  // console.log(mutated1)

  let child1score = score(mutated1, cities)
  let child2score = score(mutated2, cities)
  let childwscore1 = {gene: mutated1, score:child1score}
  let childwscore2 = {gene: mutated2, score:child2score}
  return [childwscore1, childwscore2, mutate(path1), mutate(path2)]
}

let numCities = 20
// let cities = generateCities(numCities);

let cities = [ { num: 0, xcoord: 54, ycoord: 23 },
  { num: 1, xcoord: 97, ycoord: 37 },
  { num: 2, xcoord: 68, ycoord: 28 },
  { num: 3, xcoord: 4, ycoord: 38 },
  { num: 4, xcoord: 11, ycoord: 47 },
  { num: 5, xcoord: 33, ycoord: 1 },
  { num: 6, xcoord: 2, ycoord: 79 },
  { num: 7, xcoord: 8, ycoord: 49 },
  { num: 8, xcoord: 58, ycoord: 58 },
  { num: 9, xcoord: 29, ycoord: 36 },
  { num: 10, xcoord: 84, ycoord: 80 },
  { num: 11, xcoord: 38, ycoord: 57 },
  { num: 12, xcoord: 34, ycoord: 98 },
  { num: 13, xcoord: 94, ycoord: 23 },
  { num: 14, xcoord: 60, ycoord: 43 },
  { num: 15, xcoord: 68, ycoord: 31 },
  { num: 16, xcoord: 64, ycoord: 76 },
  { num: 17, xcoord: 2, ycoord: 56 },
  { num: 18, xcoord: 9, ycoord: 55 },
  { num: 19, xcoord: 77, ycoord: 6 }]

let numPaths = 100
let population = []
for (let i = 0; i < numPaths; i++){
	let path = generateRandomPath(cities.length);
	let pScore = score(path, cities)
	population.push({gene: path, score: pScore})
}

population.sort(function(a,b){return a.score - b.score})
let curBestScore = population[0].score

let curBestIteration = 0;
let curIteration = 0;

console.log(curIteration, population[0].gene, population[0].score)
while(curIteration - curBestIteration < 100){
	curIteration+=1
	let potentials = []
	for (let i = 0; i < population.length; i++){
		for (let j = i+1; j < population.length; j++){
			potentials = potentials.concat(have2children(population[i], population[j]))
		}
	}
	population = population.concat(potentials)
	population.sort(function(a, b) {return a.score - b.score})
	// console.log(population)
	population = removeDups(population)
	population = population.splice(0, numPaths)
	 // console.log("try again",population)
	if(population[0].score < curBestScore){
		curBestScore = population[0].score
		curBestIteration = curIteration
		console.log(curIteration, population[0].gene, population[0].score)
	}	
}