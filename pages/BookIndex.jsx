import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"
import { utilService } from "../services/util.service.js"
import { cleanObject } from "../services/util.service.js"

const { useState, useEffect, Fragment } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()    
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromParams(searchParams))

    useEffect(() => {
        console.log('filterby: ', filterBy);
        setSearchParams(cleanObject(filterBy))
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
                showSuccessMsg('Book removed successfully')
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot remove book - ',{bookId})
            })
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }


    if (!books) return <p>Loading..</p>
    return (
        <section className="book-index">
            <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
            <section>
                <button className="edit-link">
                    <Link to="/book/edit">Add book</Link>
                </button>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}
