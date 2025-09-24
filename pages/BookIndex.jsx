import { bookService } from "../services/book.service.js"
import { BookList } from "../cmps/BookList.jsx"

const { useState, useEffect } = React

export function BookIndex() {

    const [books, setBooks] = useState(null)

    useEffect(() => {
        bookService.query()
            .then(setBooks)
            .catch(err => console.log('err:', err))
    }, [])



    
    if (!books) return <div>Loading..</div>
    return (
        <section>
            <h2>Books</h2>
            <BookList books={books} />
        </section>
    )
}
