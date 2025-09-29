
export function BookPreview({ book }) {
    
    return (
        <article className="book-preview">
            <h3 className="title bold">{book.title}</h3>
            <img src={book.thumbnail} alt="Book Image" />
            <section className="price">{book.listPrice.amount} €</section>
        </article>
    )
}