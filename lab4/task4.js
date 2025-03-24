console.log("Task 4")
let students = [
    { name: "Антон", age: 19, year: 2 },
    { name: "Марія", age: 18, year: 1 },
    { name: "Олексій", age: 20, year: 3 },
    { name: "Ірина", age: 21, year: 4 },
    { name: "Дмитро", age: 22, year: 5 }
];

console.log(students.filter(student => student.name !== "Олексій"))

students.push({ name: "Соня", age: 18, year: 1 })

console.log(students.sort((a, b) => b.age - a.age))

console.log(students.find(a => a.year === 3))