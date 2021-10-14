var gBooks = [];
var gRate = 0;
var gSortBy;

function createBooks() {
    gBooks = [
        _createBook("Harry Potter and the Sorcerer's Stone", '30', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5903/9780590353427.jpg'),
        _createBook("Winnie-the-Pooh", '50', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/5254/9780525444435.jpg'),
        _createBook("The Cat in the Hat", '40', 'https://d1w7fb2mkkr3kw.cloudfront.net/assets/images/book/lrg/9780/0071/9780007158447.jpg')
    ]
    saveToStorage('Books', gBooks)
    renderBooks()
    console.log(gBooks)
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

function renderBooks() {
    getSortForDisplay()
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

function onUpdateBook(bookId) { //update price //todo saveToStorage
    var book = getBookById(bookId);
    book.price = prompt('Insert new price');
    renderBooks()
    saveToStorage('Books', gBooks)
}

function onBookDetails(bookId) { //read   
    var book = getBookById(bookId);
    var strHtmls = `<button style="display: flex; align-items: flex-end;" onclick="onCloseModal()">x</button>
    <h5>${book.title}</h5>
    <div><img src="${book.img}" alt=""> </div><br>
    <h7>Id: ${book.id}, Price: ${book.price}</h7><br><br>
    <button onclick="add()">+</button> <span class="rate">Rate</span> <button onclick="reduce()">-</button>`
    document.querySelector('.read-details').innerHTML = strHtmls
    var elBook = document.querySelector('.read-details')
    elBook.hidden = false;
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return bookId === book.id
    })    
}

function onRemoveBook(bookId) { //delete //todo saveToStorage
    var book = getBookById(bookId);
    gBooks.forEach(function findBook(book,idx){
        if (bookId===book.id) gBooks.splice(idx,1);
    });
    renderBooks();
    saveToStorage('Books', gBooks)
}

function onAddBook() {
    const elTitle = document.querySelector('input.new-book');
    const NewTitle = elTitle.value
    if (!(NewTitle)) return
    const elPrice = document.querySelector('input.new-price')
    const NewPrice = elPrice.value
    gBooks.push(_createBook(NewTitle, NewPrice, ''))
    // console.log(NewTitle,NewPrice)
    renderBooks();
    elTitle.value = '';
    elPrice.value = '';
}

function add() { //todo saveToStorage
    gRate++;
    var strHTML = '' + gRate;
    var elRate = document.querySelector(".rate");
    elRate.innerHTML = strHTML;
//update book rate
    saveToStorage('Books', gBooks)        
}

function reduce() { //todo saveToStorage
    if (!gRate) return
    gRate--;
    var strHTML = '' + gRate;
    var elRate = document.querySelector(".rate");
    elRate.innerHTML = strHTML;
    //update book rate
    saveToStorage('Books', gBooks)        
}