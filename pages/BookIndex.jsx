import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"
import { BookFilter } from "../cmps/BookFilter.jsx"

const { useState, useEffect,Fragment } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setselectedBookId] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterBy())

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectBookId(bookId) {
        setselectedBookId(bookId)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    // console.log('render')
    if (!books) return <h1>Loading..</h1>
    return (
        <section className="book-index">
            {/* <h2>Books</h2> */}
            {selectedBookId
                ? <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setselectedBookId(null)}
                />
                : <Fragment>
                    <BookFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
                    <BookList
                        books={books}
                        onRemoveBook={onRemoveBook}
                        onSelectBookId={onSelectBookId}
                    />
                </Fragment>
            }
        </section>
    )
}
