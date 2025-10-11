export function SearchBooksList({ booksList, onSave }) {
    return (
        <ul className='search-books-list grid'>
            {booksList.map(book =>
                <li key={book.id}>
                    <button className="btn-add-book" onClick={() => onSave(book)}>+</button>
                    <span>{book.title}</span>
                </li>)}
        </ul>
    )
}