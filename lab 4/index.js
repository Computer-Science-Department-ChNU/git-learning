// Завдання 1
console.log("1 Task:");
function processFruitsArray() {
    let fruits = ["яблуко", "банан", "апельсин", "виноград", "манго"];

    // Видаляємо останній елемент
    fruits.pop();
    console.log("1. Оновлений масив після видалення останнього елемента:", fruits);

    // Додаємо "ананас" на початок
    fruits.unshift("ананас");
    console.log("2. Масив після додавання 'ананас' на початок:", fruits);

    // Сортуємо у зворотньому алфавітному порядку
    fruits.sort().reverse();
    console.log("3. Масив у зворотньому алфавітному порядку:", fruits);

    // Знаходимо індекс "яблуко"
    let appleIndex = fruits.indexOf("яблуко");
    console.log("4. Індекс елемента 'яблуко':", appleIndex);
}

// Викликаємо функцію
processFruitsArray();

// Завдання 2
console.log("2 Task:");
function processColorsArray() {
    let colors = ["червоний", "синій", "зелений", "жовтий", "темно-синій", "блакитний"];

    // Знаходимо найдовший та найкоротший елементи
    let longest = colors.reduce((a, b) => a.length >= b.length ? a : b);
    let shortest = colors.reduce((a, b) => a.length <= b.length ? a : b);
    console.log("1. Найдовший колір:", longest);
    console.log("2. Найкоротший колір:", shortest);

    // Видаляємо всі рядки, крім тих, що містять "синій"
    colors = colors.filter(color => color.includes("синій"));
    console.log("3. Масив після фільтрації:", colors);

    // Об'єднуємо елементи у рядок через кому
    let joinedColors = colors.join(", ");
    console.log("4. Об'єднаний рядок кольорів:", joinedColors);
}

// Викликаємо функцію
processColorsArray();

// Завдання 3
console.log("3 Task:");
function processEmployeesArray() {
    let employees = [
        { імя: "Іван", вік: 25, посада: "розробник" },
        { імя: "Марія", вік: 30, посада: "дизайнер" },
        { імя: "Петро", вік: 35, посада: "тестувальник" },
        { імя: "Ольга", вік: 28, посада: "розробник" }
    ];

    // Сортуємо за іменами
    employees.sort((a, b) => a.імя.localeCompare(b.імя));
    console.log("1. Відсортований масив працівників:", employees);

    // Знаходимо всіх розробників
    let developers = employees.filter(emp => emp.посада === "розробник");
    console.log("2. Працівники з посадою 'розробник':", developers);

    // Видаляємо працівника за віком (наприклад, старших за 30)
    employees = employees.filter(emp => emp.вік <= 30);
    console.log("3. Масив після видалення працівників старше 30 років:", employees);

    // Додаємо нового працівника
    employees.push({ імя: "Андрій", вік: 26, посада: "аналітик" });
        console.log("4. Оновлений масив працівників:", employees);
    }

// Викликаємо функцію
processEmployeesArray();

// Завдання 4
console.log("4 Task:");
function processStudentsArray() {
    let students = [
        { імя: "Олексій", вік: 22, курс: 3 },
        { імя: "Наталя", вік: 20, курс: 2 },
        { імя: "Максим", вік: 24, курс: 4 },
        { імя: "Андрій", вік: 19, курс: 1 }
    ];

    // Видаляємо студента з ім’ям "Олексій"
    students = students.filter(student => student.імя !== "Олексій");
    console.log("1. Масив після видалення студента 'Олексій':", students);

    // Додаємо нового студента
    students.push({ імя: "Ольга", вік: 21, курс: 3 });
        console.log("2. Оновлений масив студентів:", students);

        // Сортуємо студентів за віком від найстаршого до наймолодшого
        students.sort((a, b) => b.вік - a.вік);
        console.log("3. Відсортований масив студентів за віком:", students);

        // Знаходимо студента, який навчається на 3-му курсі
        let thirdYearStudent = students.find(student => student.курс === 3);
        console.log("4. Студент 3-го курсу:", thirdYearStudent);
    }

// Викликаємо функцію
processStudentsArray();

// Завдання 5
console.log("5 Task:");
function processNumbersArray() {
    let numbers = [2, 5, 8, 10, 15];

    // Підносимо кожне число до квадрату
    let squaredNumbers = numbers.map(num => num ** 2);
    console.log("1. Масив чисел у квадраті:", squaredNumbers);

    // Отримуємо лише парні числа
    let evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log("2. Парні числа у масиві:", evenNumbers);

    // Знаходимо суму всіх елементів
    let sum = numbers.reduce((acc, num) => acc + num, 0);
    console.log("3. Сума всіх чисел:", sum);

    // Додаємо новий масив з 5 чисел
    let additionalNumbers = [20, 25, 30, 35, 40];
    numbers = numbers.concat(additionalNumbers);
    console.log("4. Оновлений масив після додавання нових чисел:", numbers);

    // Видаляємо перші 3 елементи
    numbers.splice(0, 3);
    console.log("5. Масив після видалення перших 3 елементів:", numbers);
}

// Викликаємо функцію
processNumbersArray();

// Завдання 6
console.log("6 Task:");
function libraryManagement() {
    let books = [
        { title: "1984", author: "George Orwell", genre: "Dystopian", pages: 328, isAvailable: true },
        { title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", pages: 281, isAvailable: true },
        { title: "Moby-Dick", author: "Herman Melville", genre: "Adventure", pages: 635, isAvailable: false }
    ];

    // Початковий масив книг
    console.log("1. Початкові книги:", books);

    // Додавання нової книги
    books.push({ title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", pages: 180, isAvailable: true });
    console.log("2. Оновлений список книг після додавання 'The Great Gatsby':", books);

    // Видалення книги за назвою
    books = books.filter(book => book.title !== "Moby-Dick");
    console.log("3. Оновлений список книг після видалення 'Moby-Dick':", books);

    // Пошук книг за автором
    let booksByAuthor = books.filter(book => book.author === "George Orwell");
    console.log("4. Книги автора 'George Orwell':", booksByAuthor);

    // Тогл доступності книги
    const bookToToggle = books.find(book => book.title === "1984");
    if (bookToToggle) {
        bookToToggle.isAvailable = !bookToToggle.isAvailable; // Зміна статусу доступності
        console.log("5. Оновлений статус доступності книги '1984':", bookToToggle);
    }

    // Сортування книг за кількістю сторінок
    books.sort((a, b) => a.pages - b.pages);
    console.log("6. Відсортовані книги за кількістю сторінок:", books);

    // Статистика бібліотеки
    const totalBooks = books.length;
    const availableBooks = books.filter(book => book.isAvailable).length;
    const borrowedBooks = totalBooks - availableBooks;
    const averagePages = totalBooks ? books.reduce((sum, book) => sum + book.pages, 0) / totalBooks : 0;

    console.log("7. Статистика бібліотеки:");
    console.log(`Загальна кількість книг: ${totalBooks}`);
    console.log(`Кількість доступних книг: ${availableBooks}`);
    console.log(`Кількість взятих книг: ${borrowedBooks}`);
    console.log(`Середня кількість сторінок: ${averagePages}`);

    // Отримання всіх книг
    console.log("8. Список усіх книг в бібліотеці:", books);
}

// Викликаємо функцію
libraryManagement();

// Завдання 7
console.log("7 Task:");
function updateStudent() {
    // Створюємо об'єкт зі студентом
    let student = {
        name: "Іван",
        age: 20,
        course: 3
    };
    console.log(student);
    // Додаємо нову властивість зі списком предметів
    student.subjects = ["Математика", "Інформатика", "Фізика"];

    // Видаляємо властивість "вік"
    delete student.age;

    // Виводимо оновлений об'єкт у консоль
    console.log(student);
}

// Викликаємо функцію
updateStudent();
