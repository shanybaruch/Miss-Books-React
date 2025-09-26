import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React

export function BookDetails({ bookId, onBack = () => {} }) {
    // console.log('Book id - details: ', bookId);

    const [book, setBook] = useState(null)

    useEffect(() => {
        loadBook()
    }
        , [])

    function loadBook() {
        bookService.get(bookId)
            .then(setBook)
            .catch(err => console.log('err:', err))
    }

    if (!book) return <h1>Loading Details...</h1>

    const { title, price } = book

    return (
        <section className="book-details">
            <h2>{title}</h2>
            <p className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eaque porro, delectus suscipit illum qui laboriosam voluptates
                unde, nobis omnis dolore, reiciendis quos. Asperiores modi
                placeat quod assumenda ipsa suscipit nobis.
            </p>
            <img src={`../assets/img/${title}.jpg`} alt="Book Image" />
            <p className="price">{price}₪</p>
            <button onClick={onBack}>Back</button>

        </section>
    )
}