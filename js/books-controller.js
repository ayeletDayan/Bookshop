'use strict';

function init() {
    createBooks()
    renderBooks()
}

function renderBooks() {
    var start = `<table class="tableAdmin"border="1"> <tbody> <tr> <td>Title</td> <td>price</td> <td>Read</td> <td>Update</td> <td>Delete</td></tr>`
    var strHtmls = gBooks.map((book) => {
        return `<tr> <td class="cell"> ${book.title}</td> <td class="cell">${book.price}</td><td class="cell"> <button onclick="onBookDetails('${book.id}')">Read</button></td><td class="cell"> <button onclick="onUpdateBook('${book.id}')">Update</button></td><td class="cell"> <button onclick="onRemoveBook('${book.id}')">Delete</button></td></tr>`
    })
    var end = `</tbody></table>`
    document.querySelector('.table').innerHTML = (start + strHtmls.join('') + end)
}

function onSetSorted(sortBy) {
    setSort(sortBy);
    renderBooks()
}

function onUpdateBook(bookId) { //update price
    updateBook(bookId)
    renderBooks()
}

function onBookDetails(bookId) { //read
    bookDetails(bookId) 
}

function onRemoveBook(bookId) { //delete
    removeBook(bookId);
    renderBooks();
}

function onAddBook() {
    const elTitle = document.querySelector('input.new-book');
    const newTitle = elTitle.value
    if (!(newTitle)) return
    const elPrice = document.querySelector('input.new-price')
    const newPrice = elPrice.value
    addBook(newTitle, newPrice)
    renderBooks();
    elTitle.value = '';
    elPrice.value = '';
}

function onCloseModal() {
    document.querySelector('.read-details').hidden = true
}