import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
let gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}

_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getNextBookId,
    getFilterBy,
    setFilterBy,
    getDefaultFilter,
    _setNextPrevBookId,
    saveReview,
    removeReview,
    getGoogleBooks,
    addGoogleBook,
    getEmptyReview,
    getFilterFromParams,

}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.title) {
                const regex = new RegExp(filterBy.title, 'i')
                books = books.filter(book => regex.test(book.title))
            }
            if (filterBy.maxPrice) {
                books = books.filter(book => book.listPrice.amount >= filterBy.maxPrice)
            }
            // if (filterBy.onSale) {
            //     books = books.filter(book => book.onSale === filterBy.onSale)
            // }
            // console.log('books:',books);
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook(title = '', amount = '', description = '', pageCount = '', language = 'en', authors = '') {
    return {
        title,
        authors,
        description,
        pageCount,
        thumbnail: `http://coding-academy.org/books-photos/15.jpg`,
        language,
        categories: ['None'],
        listPrice: {
            amount,
            currencyCode: "EUR",
            isOnSale: Math.random() > 0.7
        },
        reviews: []
    }
}

function getDefaultFilter() {
    return { title: '', maxPrice: '', }
}

function getFilterBy() {
    return { ...filterBy }
}

function setFilterBy(filterBy = {}) {
    if (filterBy.title !== undefined) filterBy.title = filterBy.title
    if (filterBy.maxPrice !== undefined) filterBy.maxPrice = filterBy.maxPrice
    return filterBy
}

function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            let nextbookIdx = books.findIndex(book => book.id === bookId) + 1
            if (nextbookIdx === books.length) nextbookIdx = 0
            return books[nextbookIdx].id
        })
}

function _setNextPrevBookId(book) {
    return query()
        .then((books) => {
            const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
            const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
            const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
            book.nextBookId = nextBook.id
            book.prevBookId = prevBook.id
            return book
        })
}

// function _createBooks() {
// let books = utilService.loadFromStorage(BOOK_KEY)
// if (!books || !books.length) {
//         books = []
//         books.push(_createBook('Gwent', 300))
//         books.push(_createBook('Between here and gone', 120))
//         books.push(_createBook('Magic lantern', 100))
//         books.push(_createBook('Its just a dog', 150))
//         books.push(_createBook('Unbored', 250))
//         books.push(_createBook('Book title', 200))
//         books.push(_createBook('The sith empire', 200))
//         books.push(_createBook('The ode less travelled', 100))
//         books.push(_createBook('Samantha james', 220))
//         books.push(_createBook('The rise of the russian empire', 150))
//         utilService.saveToStorage(BOOK_KEY, books)
//     }
// }

function _createBooks() {
    let books = utilService.loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {

        const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
        books = []

        for (let i = 0; i < 20; i++) {
            const book = {
                id: utilService.makeId(),
                title: utilService.makeLorem(2),
                subtitle: utilService.makeLorem(4),
                authors: [
                    utilService.makeLorem(1)
                ],
                publishedDate: utilService.getRandomIntInclusive(1950, 2024),
                description: utilService.makeLorem(20),
                pageCount: utilService.getRandomIntInclusive(20, 600),
                categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
                thumbnail: `http://coding-academy.org/books-photos/${i + 1}.jpg`,
                language: "en",
                listPrice: {
                    amount: utilService.getRandomIntInclusive(80, 500),
                    currencyCode: "EUR",
                    isOnSale: Math.random() > 0.7
                },
                reviews: []
            }
            books.push(book)
        }
    }
    console.log('books', books)
    utilService.saveToStorage(BOOK_KEY, books)
}

// function _createBook(title, price = 250) {
//     const book = getEmptyBook(title, price)
//     book.id = utilService.makeId()
//     return book
// }

function _createReview(reviewToSave) {
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}

function saveReview(bookId, reviewToSave) {
    return get(bookId).then(book => {
        if (!book) return Promise.reject(new Error('Book not found'))
        const review = _createReview(reviewToSave)
        book.reviews = book.reviews || []
        book.reviews.unshift(review)
        return save(book).then(() => review)
    })
}

function removeReview(bookId, reviewId) {
    return get(bookId).then(book => {
        const newReviews = book.reviews.filter((review) => review.id !== reviewId)
        book.reviews = newReviews
        return save(book)
    })
}

function getGoogleBooks(bookName) {
    if (bookName === '') return Promise.resolve()
    const googleBooks = gCache[bookName]
    if (googleBooks) {
        console.log('data from storage...', googleBooks)
        return Promise.resolve(googleBooks)
    }

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`

    return fetch(url)
        .then(res => res.json())
        .then(data => {
            // console.log('data from network...', data.items)
            const books = _formatGoogleBooks(data.items)
            gCache[bookName] = books
            utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
            return books
        })
}

function _formatGoogleBooks(googleBooks) {
    // console.log(googleBooks);

    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook

        let bookPublishedYear = '0000'

        if (volumeInfo.publishedDate && typeof volumeInfo.publishedDate === 'string') {
            bookPublishedYear = volumeInfo.publishedDate.slice(0, 4)
        }
        const book = {
            id: googleBook.id,
            title: volumeInfo.title || 'No Title',
            description: volumeInfo.description || 'No Description',
            pageCount: volumeInfo.pageCount || 0,
            authors: volumeInfo.authors || ['Unknown Author'],
            categories: volumeInfo.categories || ['Uncategorized'],
            publishedDate: +bookPublishedYear,
            language: volumeInfo.language || 'en',
            listPrice: {
                amount: utilService.getRandomIntInclusive(80, 500),
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: []
        }

        if (volumeInfo.imageLinks) book.thumbnail = volumeInfo.imageLinks.thumbnail
        return book
    })
}

function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}

function getEmptyReview() {
    return {
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

function getFilterFromParams(searchParams = {}) {
    const defaultFilter = getDefaultFilter()
    return {
        title: searchParams.get('title') || defaultFilter.title,
        minPrice: searchParams.get('maxPrice') || defaultFilter.minPrice,

    }
}