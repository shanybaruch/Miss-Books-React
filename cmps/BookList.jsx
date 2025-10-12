const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onRemoveBook }) {

    return (
        <section>
            <ul className="book-list container">
                {books.map(book =>
                    <li key={book.id}>
                        {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>}
                        <BookPreview book={book} />
                        <section className='btns'>
                            <a className="btn btn-remove" onClick={ev => onRemoveBook(book.id, ev)}>Remove</a>
                            <Link className='btn btn-details' to={`/book/${book.id}`}>Details</Link>
                            <Link className='btn btn-edit' to={`/book/edit/${book.id}`}>Edit</Link>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}