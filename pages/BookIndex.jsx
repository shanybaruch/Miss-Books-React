import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedBookId, setselectedBookId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        // console.log('Removing - ', bookId)
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectCarId(bookId) {
        setselectedBookId(bookId)
    }

    // console.log('render')
    if (!books) return <h1>Loading..</h1>
    return (
        <section className="book-index">
            <h2>Books</h2>
            {selectedBookId
                ? <BookDetails
                    bookId={selectedBookId}
                    onBack={() => setselectedBookId(null)}
                />
                : <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onSelectCarId={onSelectCarId}
                />
            }
        </section>
    )
}
