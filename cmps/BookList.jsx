import { BookPreview } from './BookPreview.jsx';

export function BookList({books}) {
    return (
        <ul className="book-list container">
            {books.map(book => 
                <BookPreview book={book} />
            )}

        </ul>
    )
}