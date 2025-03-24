console.log("Task 5")
let numbers = [1, 2, 3, 4, 5, 6, 7, 8];

console.log(numbers.map(a => a * a))

console.log(numbers.filter(a => a % 2 === 0))

console.log(numbers.reduce((a, b) => a + b, 0))

let newNumbers = [1, 2, 6, 7, 8]
console.log([...numbers, ...newNumbers])

console.log(numbers.splice(3, numbers.length))