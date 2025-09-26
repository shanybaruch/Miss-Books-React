import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
var gFilterBy = { title: '', minPrice: Infinity, }
// onSale: false ,pageCount: Infinity,

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
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
                books = books.filter(book => book.price <= gFilterBy.minPrice)
            }
            if (gFilterBy.onSale) {
                books = books.filter(book => book.onSale === gFilterBy.onSale)
            }
            // console.log('books:',books);
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

function getEmptyBook(title, price) {
    return { id: '', title, price, }
    // onSale: false ,pageCount: Infinity,
}

function getFilterBy() {
    return { ...gFilterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.txt !== undefined) gFilterBy.txt = filterBy.txt
    if (filterBy.minPrice !== undefined) gFilterBy.minPrice = filterBy.minPrice
    return gFilterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextbookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextbookIdx === books.length) nextbookIdx = 0
            return books[nextbookIdx].id
        })
}

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = []
        books.push(_createBook('Gwent', 300))
        books.push(_createBook('Between here and gone', 120))
        books.push(_createBook('Magic lantern', 100))
        books.push(_createBook('Its just a dog', 150))
        books.push(_createBook('Unbored', 250))
        books.push(_createBook('Book title', 200))
        books.push(_createBook('The sith empire', 200))
        books.push(_createBook('The ode less travelled', 100))
        books.push(_createBook('Samantha james', 220))
        books.push(_createBook('The rise of the russian empire', 150))
        utilService.saveToStorage(BOOK_KEY, books)        
    }
}

function _createBook(title, price = 250) {
    // console.log('title: ',title, '| price: ', price);
    
    const book = getEmptyBook(title, price)
    book.id = utilService.makeId()    
    return book
}