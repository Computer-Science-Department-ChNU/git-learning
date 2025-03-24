let student = {
    name: "Амфілохій",
    age: 20,
    course: 3
};

student.subjects = ["Математика", "Фізика", "Програмування"];

delete student.age;

console.log(student);