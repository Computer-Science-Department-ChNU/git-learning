let i = 0, sum = 0;
let array = [3, 2, 1, 4, 5, 1, 3, 6, 9 ,5, 7, 9, 1, 2, 4];
while(i < array.length) {
    if (i > 1) {
        array[i] = array[i - 1] + array[i - 2];
        if (i < 10)
        sum += array[i];
    }
    i++;
}
console.log(array.join(" "));
console.log(sum);