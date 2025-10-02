const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onRemoveBook }) {

    return (
        <section>
            <button className='btn-add-book'>Add Book</button>

            <ul className="book-list container">
                {books.map(book =>
                    <li key={book.id}>
                        {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>}
                        <BookPreview book={book} />
                        <button className="fa-regular fa-trash-can btn-remove" onClick={ev => onRemoveBook(book.id, ev)}></button>
                        <button><Link to={`/book/${book.id}`}>details</Link></button>
                    </li>
                )}
            </ul>
        </section>
    )
}