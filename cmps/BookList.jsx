import { BookPreview } from './BookPreview.jsx';

export function BookList({ books }) {
    return (
        <ul className="book-list container">
            {books.map((book, idx) =>
                <li key={book.id}>
                    <BookPreview book={book} idx={idx} />
                    <section>
                        <button>Remove</button>
                        <button>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}