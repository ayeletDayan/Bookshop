'use strict';

var gBooks = [];
var gSortBy;

function bookDetails(bookId) {
    var book = getBookById(bookId);
    var strHtmls = `<button style="display: flex; align-items: flex-end;" onclick="onCloseModal()">x</button>
    <h5>${book.title}</h5>
    <div><img src="${book.img}" alt=""> </div><br>
    <h7>Id: ${book.id}, Price: ${book.price}</h7><br><br>
    Rate:<br>
    <button onclick="add('${book.id}')">+</button> <span class="rate">${book.rate}</span> <button onclick="reduce('${book.id}')">-</button>`
    document.querySelector('.read-details').innerHTML = strHtmls
    var elBook = document.querySelector('.read-details')
    elBook.hidden = false;
}

function updateBook(bookId) {
    var book = getBookById(bookId);
    book.price = prompt('Insert new price');
    saveToStorage('Books', gBooks)
}

function removeBook(bookId) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(idx, 1)
    saveToStorage('Books', gBooks)
}

function createBooks() {
    var books = loadFromStorage('Books')
    if (books && books.length) {
        gBooks = books
    } else {
        gBooks = _createBooks()
        saveToStorage('Books', gBooks)
    }
    console.log(gBooks);
}

function _createBooks() {
    return [
        _createBook("Harry Potter and the Sorcerer's Stone", '30', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5903/9780590353427.jpg'),
        _createBook("Winnie-the-Pooh", '50', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5254/9780525444435.jpg'),
        _createBook("The Cat in the Hat", '40', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0071/9780007158447.jpg')
    ]
}

function _createBook(title, price, img) {
    var book = {
        id: makeId(),
        title,
        price,
        img,
        rate: 0
    }
    return book
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })
}

function add(bookId) {
    var book = getBookById(bookId);
    book.rate++
    updatRate(bookId, book.rate)
}

function reduce(bookId) {
    var book = getBookById(bookId);
    if (!book.rate) return
    book.rate--
    updatRate(bookId, book.rate)
}

function updatRate(bookId, newRate) {
    var idx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks[idx].rate = newRate
    saveToStorage('Books', gBooks)
    var strHTML = '' + newRate;
    var elRate = document.querySelector(".rate");
    elRate.innerHTML = strHTML;
}

function setSort(sortBy) {
    if (sortBy === 'TITLE')
        gBooks.sort((book1, book2) => (book1.title > book2.title ? 1 : -1));

    if (sortBy === 'PRICE')
        gBooks.sort((book1, book2) => book1.price - book2.price);
}

function addBook(newTitle, newPrice) {
    gBooks.push(_createBook(newTitle, newPrice, ''))
    saveToStorage('Books', gBooks)
}