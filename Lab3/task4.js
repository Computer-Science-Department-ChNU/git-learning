
function getEvenNumbers(array1) {
  let evenNumbers = [];
  let uu = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  console.log(array1.lenght);    

  for (let i = 0; i < uu.lenght; i++) {
    if (uu[i] % 2 === 0){
      evenNumbers.push(uu[i]);
      
    }
    console.log(uu[i]);    
  }
  return evenNumbers;
}

console.log(getEvenNumbers([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));