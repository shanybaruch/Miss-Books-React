import { BookPreview } from './BookPreview.jsx';

export function BookList({ books, onRemoveBook, onSelectBookId }) {

    // const onSale = isOnSale(book)

    // function isOnSale(book) {
    //     return (book.listPrice.isOnSale) ? 'Sale' : ''
    // }

    return (
        <ul className="book-list container">
            {books.map(book =>
                <li key={book.id}>
                    {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>}
                    <BookPreview book={book} />
                    <section>
                        <button onClick={ev => onRemoveBook(book.id, ev)}>Remove</button>
                        <button onClick={() => onSelectBookId(book.id)}>Details</button>
                    </section>
                </li>
            )}
        </ul>
    )
}