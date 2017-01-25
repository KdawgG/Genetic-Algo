let score = function(source, target){
	let value = 0;
	for (let i = 0; i < source.length; i++){
		value += Math.pow(source.charCodeAt(i) - target.charCodeAt(i), 2)
	}
	return value
}

let mutate = function(source){
	let arr = source.split("")
	let index = Math.floor(Math.random() * source.length)
	arr[index] = String.fromCharCode(Math.floor(Math.random() * 128))
	return arr.join("")
}

let generateRandomString = function (size){
	let arr = []
	for (let i = 0; i < size; i++){
		arr[i] = String.fromCharCode(Math.floor(Math.random() * 128))
	}
	return arr.join("")
}

let haveChild = function(parent1, parent2){
	let childgene = ""
	for (let i = 0; i < parent1.gene.length; i++){
		if(Math.random() < .5) childgene += parent1.gene[i]
		else childgene+=parent2.gene[i]
	}
	let mutatedChildgene= mutate(childgene)
	let mutedchildscore = score(mutatedChildgene, target)
	return ({gene: mutatedChildgene, score: mutedchildscore})

	// let childScore = score(childgene, target)
	// return ({gene: childgene, score: childScore})
}


let target = "Hello, world!"
let numInGenePool = 20
let population = []
for (let i = 0; i < numInGenePool; i++){
	let gene = generateRandomString(target.length)
	let gScore = score(gene, target)
	population.push({gene: gene, score: gScore})
}

population.sort(function(a,b) {return a.score - b.score})
let curBestScore = population[0].score

let i = 0
console.log(i, population[0].gene, population[0].score)
while(population[0].score > 0){
	i+=1
	let potentials = []
	for(let i = 0; i < population.length; i++){
		for (let j = i+1; j < population.length; j++){
			potentials.push(haveChild(population[i], population[j]))
		}
	}
	population = population.concat(potentials)
	population.sort(function(a,b) {return a.score - b.score})
	population = population.splice(0,numInGenePool)
	if (population[0].score < curBestScore){
		curBestScore = population[0].score
		console.log(i, population[0].gene, population[0].score)
	}

}