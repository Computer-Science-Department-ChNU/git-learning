console.log("Task 6")
let books= []

libraryManagement()
function libraryManagement() {
     books = [
        { title: "1984", author: "Джордж Орвелл", genre: "Антиутопія", pages: 328, isAvailable: true },
        { title: "Майстер і Маргарита", author: "Михайло Булгаков", genre: "Роман", pages: 448, isAvailable: false },
        { title: "Гаррі Поттер і філософський камінь", author: "Джоан Роулінг", genre: "Фентезі", pages: 336, isAvailable: true },
        { title: "Великий Гетсбі", author: "Френсіс Скотт Фіцджеральд", genre: "Роман", pages: 200, isAvailable: true },
        { title: "Улісс", author: "Джеймс Джойс", genre: "Модернізм", pages: 732, isAvailable: false }
    ];

    addBook("Гараж Монтаж", "Макс Кідрук", "Роман", 432)
    removeBook("1984")
    console.log(books)
    console.log(findBooksByAuthor("Джеймс Джойс"))
    toggleBookAvailability("Улісс")
    console.log(books[3])
    console.log(sortBooksByPages())
    console.log(getBooksStatistics().join(","))
}

function addBook(title, author, genre, pages) {
    books.push({ title, author, genre, pages, isAvailable: true })
}

function removeBook(title) {
    books = books.filter(book => book.title !== title)
}

function findBooksByAuthor(author) {
    return books.filter(book => book.author === author)
}

function toggleBookAvailability(title) {
    let book = books.find(a => a.title === title)
    if (book) {
        book.isAvailable = !book.isAvailable
    }
}

function sortBooksByPages() {
    return books.sort((a, b) => b.pages - a.pages)
}

function getBooksStatistics() {
    let amount = books.length
    let amountBorrowed = 0
    let amountAvailable = 0
    books.forEach(book => { book.isAvailable ? amountAvailable++ : amountBorrowed++ })
    let averagePages = books.reduce((sum, book) => sum + book.pages, 0) / books.length
    return [amount, amountAvailable, amountBorrowed, Math.floor(averagePages)]
}