// //Пошук максимального та мінімального елемента в масиві
// function findMinMax(arr) {
//     if (arr.length === 0) return null; // Перевірка на порожній масив
//     return {
//         min: Math.min(...arr),
//         max: Math.max(...arr)
//     };
// }
//
// // Приклад
// const numbers = [3, 7, 2, 9, 5, 1];
// console.log(findMinMax(numbers)); // { min: 1, max: 9 }

// //Порівняння двох об'єктів за властивостями
// function areObjectsEqual(obj1, obj2) {
//     const keys1 = Object.keys(obj1);
//     const keys2 = Object.keys(obj2);
//
//     if (keys1.length !== keys2.length) return false; // Якщо різна кількість ключів
//
//     return keys1.every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
// }
//
// // Приклад
// const objA = { name: "Alice", age: 25 };
// const objB = { name: "Alice", age: 25 };
// const objC = { name: "Bob", age: 30 };
//
// console.log(areObjectsEqual(objA, objB)); // true
// console.log(areObjectsEqual(objA, objC)); // false

// //Перевірка, чи число знаходиться в певному діапазоні
// function isInRange(num, min, max) {
//     return num >= min && num <= max;
// }
//
// // Приклад
// console.log(isInRange(5, 1, 10)); // true
// console.log(isInRange(15, 1, 10)); // false

// //Використання логічного оператора not для зміни стану змінної
// function toggleBoolean(value) {
//     return !value;
// }
//
// // Приклад
// let isActive = true;
// isActive = toggleBoolean(isActive);
// console.log(isActive); // false
//
// isActive = toggleBoolean(isActive);
// console.log(isActive); // true

// //Функція для перетворення числової оцінки у словесний формат
//
// function getGradeDescription(grade) {
//     if (grade >= 90) {
//         return "Відмінно";
//     } else if (grade >= 75) {
//         return "Добре";
//     } else if (grade >= 60) {
//         return "Задовільно";
//     } else {
//         return "Незадовільно";
//     }
// }
//
// // Приклад
// console.log(getGradeDescription(95)); // "Відмінно"
// console.log(getGradeDescription(80)); // "Добре"
// console.log(getGradeDescription(65)); // "Задовільно"
// console.log(getGradeDescription(50)); // "Незадовільно"

// //
//
// function getGradeDescriptionTernary(grade) {
//     return grade >= 90 ? "Відмінно" :
//         grade >= 75 ? "Добре" :
//             grade >= 60 ? "Задовільно" :
//                 "Незадовільно";
// }
//
// console.log(getGradeDescriptionTernary(95)); // "Відмінно"
// console.log(getGradeDescriptionTernary(80)); // "Добре"
// console.log(getGradeDescriptionTernary(65)); // "Задовільно"
// console.log(getGradeDescriptionTernary(50)); // "Незадовільно"

// //Визначення сезону за номером місяця
//
// function getSeason(month) {
//     if (month >= 3 && month <= 5) {
//         return "Весна";
//     } else if (month >= 6 && month <= 8) {
//         return "Літо";
//     } else if (month >= 9 && month <= 11) {
//         return "Осінь";
//     } else if (month === 12 || month === 1 || month === 2) {
//         return "Зима";
//     } else {
//         return "Невірний номер місяця";
//     }
// }
//
// // Приклад
// console.log(getSeason(3));  // "Весна"
// console.log(getSeason(7));  // "Літо"
// console.log(getSeason(10)); // "Осінь"
// console.log(getSeason(1));  // "Зима"
// console.log(getSeason(13)); // "Невірний номер місяця"

//

function getSeasonTernary(month) {
    return (month >= 3 && month <= 5) ? "Весна" :
        (month >= 6 && month <= 8) ? "Літо" :
            (month >= 9 && month <= 11) ? "Осінь" :
                (month === 12 || month === 1 || month === 2) ? "Зима" :
                    "Невірний номер місяця";
}

console.log(getSeasonTernary(3));  // "Весна"
console.log(getSeasonTernary(7));  // "Літо"
console.log(getSeasonTernary(10)); // "Осінь"
console.log(getSeasonTernary(1));  // "Зима"
console.log(getSeasonTernary(13)); // "Невірний номер місяця"
