const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onRemoveBook }) {

    return (
        <section>
            <ul className="book-list container">
                {books.map(book =>
                    <li key={book.id}>
                        {/* {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>} */}
                        <BookPreview book={book} />
                        <section className='btns flex'>
                            <button className="" onClick={ev => onRemoveBook(book.id, ev)}>Remove</button>
                            <button className=''><Link to={`/book/${book.id}`}>Details</Link></button>
                            <button className=''><Link to={`/book/edit/${book.id}`}>Edit</Link></button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}