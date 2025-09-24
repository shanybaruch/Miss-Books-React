import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { txt: '', minPrice: 0, onSale: false }
_createbooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptybook,
    getNextbookId,
    getFilterBy,
    setFilterBy
}

function query(gFilterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (gFilterBy.txt) {
                const regex = new RegExp(gFilterBy.txt, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (gFilterBy.minPrice) {
                books = books.filter(book => book.listPrice.amount >= gFilterBy.minPrice)
            }
            if (gFilterBy.onSale) {
                books = books.filter(book => book.listPrice.isOnSale === gFilterBy.onSale)
            }
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptybook(title = '', price = 100) {
    return { id: '', title, price }
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    return gFilterBy
}

function getNextbookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextbookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextbookIdx === books.length) nextbookIdx = 0
            return books[nextbookIdx].id
        })
}

function _createbooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createbook('Gwent', 300))
        books.push(_createbook('Between here and gone', 120))
        books.push(_createbook('Magic lantern', 100))
        books.push(_createbook('Its just a dog', 150))
        utilService.saveToStorage(BOOK_KEY, books)
    }
}

function _createbook(title, price = 250) {
    const book = getEmptybook(title, price)
    book.id = utilService.makeId()
    return book
}