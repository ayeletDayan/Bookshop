'use strict';

function makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

function getSortForDisplay() {
    const books = gBooks.filter(function (book) {
        return (book.title && gSortBy === 'title') ||
            (book.price && gSortBy === 'price')
    })
    return books;
}

function setSort(sortBy) {
    if (sortBy === 'TITLE')
        gBooks.sort((book1, book2) => (book1.title > book2.title ? 1 : -1));

    if (sortBy === 'PRICE')
    gBooks.sort((book1, book2) => book1.price - book2.price);
}

function onCloseModal() {
    document.querySelector('.read-details').hidden = true
}