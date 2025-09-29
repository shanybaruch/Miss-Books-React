
export function BookPreview({ book }) {
    console.log(book)

    
    return (
        <article className="book-preview">
            <h3 className="bold">{book.title}</h3>
            {/* <section className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vero molestias...</section> */}
            {/* <section>{price}₪</section> */}
            <img src={book.thumbnail} alt="Book Image" />
        </article>
    )
}