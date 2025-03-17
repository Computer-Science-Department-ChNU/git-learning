const checkSum = (a, b) => (a + b === 10 || Math.abs(a - b) === 10);

console.log(checkSum(6, 2));
console.log(checkSum(20, 10));