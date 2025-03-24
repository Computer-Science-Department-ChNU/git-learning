console.log("Task 3")
let employees = [
    { name: "Іван", age: 30, position: "Розробник" },
    { name: "Марія", age: 25, position: "Дизайнер" },
    { name: "Петро", age: 40, position: "Менеджер" },
    { name: "Оксана", age: 35, position: "Тестувальник" },
    { name: "Андрій", age: 28, position: "Маркетолог" }
];

console.log(employees.sort((a, b) => a.name.localeCompare(b.name)))

console.log(employees.filter(a => a.position === "Розробник"))

console.log(employees.filter(a => a.age < 30))

employees.push({ name: "Олег", age: 22, position: "Розробник"})
console.log(employees);
