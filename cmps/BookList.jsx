export function BookList({books}) {
    return (
        <ul className="book-list container">
            {JSON.stringify(books, null, 4)}

        </ul>
    )
}