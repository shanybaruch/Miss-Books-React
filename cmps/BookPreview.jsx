
export function BookPreview({ book }) {
    
    // const onSale = isOnSale(book)

    // function isOnSale(book) {
    //     return (book.listPrice.isOnSale) ? 'Sale' : ''
    // }
    
    return (
        <article className="book-preview">
            <h3 className="bold">{book.title}</h3>
            {/* <h1>{onSale}</h1> */}
            {/* <section className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vero molestias...</section> */}
            {/* <section>{price}₪</section> */}
            <img src={book.thumbnail} alt="Book Image" />
        </article>
    )
}