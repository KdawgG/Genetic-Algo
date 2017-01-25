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
		arr[i] = String.fromCharCode(Math.floor(Math.random()*128))
	}
	return arr.join("")
}


let target = "Hello, world!"
let source = generateRandomString(target.length)
let curScore = score(source ,target)
i = 0
let m = mutate(source)

while (true){
	i+=1
	m = mutate(source)
	score_m = score(m, target)
	if (score_m < curScore){
		curScore = score_m;
		source = m
		console.log(i, score_m, m)
	}
	if (score == 0){
		break
	}
}