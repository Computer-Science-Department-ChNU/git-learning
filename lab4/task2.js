console.log("Task 2")
let colors = ['green', 'red', 'orange', 'blue','yellow', 'green', 'blue']

console.log(colors.reduce((longest,current)=>
    current.length > longest.length ? current : longest, ""))

console.log(colors.filter(color => color === "blue").join(","))

console.log(colors.join(","))