// Завдання 1: Знайти суму перших 50 натуральних чисел
function sumFirst50() {
    let sum = 0;
    let i = 1;
    while (i <= 50) {
        sum += i;
        i++;
    }
    console.log("Завдання 1:", sum);
}

// Завдання 2: Обчислити факторіал числа
function factorial() {
    let n = parseInt(prompt("Введіть число для обчислення факторіалу:"));
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    console.log("Завдання 2: Факторіал числа", n, "є:", result);
}

// Завдання 3: Визначити місяць за числом
function getMonth() {
    let num = parseInt(prompt("Введіть число місяця (від 1 до 12):"));
    let month;
    switch (num) {
        case 1: month = "Січень"; break;
        case 2: month = "Лютий"; break;
        case 3: month = "Березень"; break;
        case 4: month = "Квітень"; break;
        case 5: month = "Травень"; break;
        case 6: month = "Червень"; break;
        case 7: month = "Липень"; break;
        case 8: month = "Серпень"; break;
        case 9: month = "Вересень"; break;
        case 10: month = "Жовтень"; break;
        case 11: month = "Листопад"; break;
        case 12: month = "Грудень"; break;
        default: month = "Некоректне число"; break;
    }
    console.log("Завдання 3:", month);
}

// Завдання 4: Знайти суму парних чисел у масиві
function sumEvenNumbers(arr) {
    let sum = arr.filter(num => num % 2 === 0).reduce((acc, num) => acc + num, 0);
    console.log("Завдання 4:", sum);
}

// Завдання 5: Підрахувати голосні у рядку
const countVowels = (str) => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯ";
    let count = [...str].filter(char => vowels.includes(char)).length;
    console.log("Завдання 5:", count);
};

// Завдання 6: Піднесення числа до степеня
function power(base, exponent) {
    console.log("Завдання 6:", Math.pow(base, exponent));
}

// Виклик функцій для тесту
sumFirst50();
factorial();
getMonth();
sumEvenNumbers([1, 2, 3, 4, 5, 6]);
countVowels("Привіт, як справи?");
power(2, 3);