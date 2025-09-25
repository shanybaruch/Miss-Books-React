import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"
import { BookDetails } from "./BookDetails.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)
    const [selectedCarId, setselectedCarId] = useState(null)

    useEffect(() => {
        loadBooks()
    }, [])

    function loadBooks() {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }

    function onRemoveBook(bookId) {
        console.log('Removing - ', bookId)
        bookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectCarId(bookId) {
        setselectedCarId(bookId)
    }

    // console.log('render')
    if (!books) return <h1>Loading..</h1>
    return (
        <section className="book-index">
            <h2>Books</h2>
            {selectedCarId
                ? <BookDetails
                    bookId={selectedCarId} />
                : <BookList
                    books={books}
                    onRemoveBook={onRemoveBook}
                    onSelectCarId={onSelectCarId}
                />
            }
        </section>
    )
}
