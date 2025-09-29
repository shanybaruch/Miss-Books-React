import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack = () => {} }) {
    // console.log('Book id - details: ', bookId);

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    } ,[])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('err:', err))
    }

    if (!book) return <h1>Loading Details...</h1>
    return (
        <section className="book-details">
            <h2 className="title">{book.title}</h2>
            <h3 className="subtitle bold">{book.subtitle}</h3>
            <p className="description">{book.description}</p>
            <img src={book.thumbnail} alt="Book Image" />
            <p className="price">{book.listPrice.amount}₪</p>
            <button onClick={onBack}>Back</button>

        </section>
    )
}