import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack = () => { } }) {
    // console.log('Book id - details: ', bookId);

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('err:', err))
    }

    if (!book) return <h1>Loading Details...</h1>
    return (
        <section className="book-details">
            <section className="header">
                <h2 className="title">{book.title}</h2>
                <h3 className="subtitle bold">{book.subtitle}</h3>
            </section>

            <section className="basic-info">
                <p>Authors: {book.authors}</p>
                <p>Published in {book.publishedDate}</p>
                <p>Categories: {book.categories}</p>
                <p>Language: {book.language}</p>
                <p>Currency: {book.listPrice.currencyCode}</p>

                <section className="pages">
                    {book.pageCount > 500 ? (
                        <h4 className="level">Serious Reading</h4>
                    ) : book.pageCount > 200 ? (
                        <h4 className="level">Descent Reading</h4>
                    ) : book.pageCount < 100 ? (
                        <h4 className="level">Light Reading</h4>
                    ) : null}

                    <p className="pages-count">{book.pageCount} pages</p>
                </section>
            </section>



            <p className="description">Description: {book.description}</p>

            <section className="book-price">
                {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>}
                <img src={book.thumbnail} alt="Book Image" />
                <p className="price">{book.listPrice.amount} €</p>
            </section>

            <button className="btn-back" onClick={onBack}>Back</button>

        </section>
    )
}