import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { utilService } from "../services/util.service.js"

const { useState, useEffect, Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId, { target }) {
        const elLi = target.closest('li')
        bookService.remove(bookId)
            .then(() => utilService.animateCSS(elLi, 'fadeOut'))
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }


    if (!books) return <h1>Loading..</h1>
    return (
        <section className="book-index">
            <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}
