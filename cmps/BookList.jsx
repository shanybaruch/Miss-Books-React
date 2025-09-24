import { BookPreview } from './BookPreview.jsx';

export function BookList({books}) {
    return (
        <ul className="book-list container">
            {books.map((book, idx) => 
                <BookPreview book={book} idx={idx} />
            )}

        </ul>
    )
}