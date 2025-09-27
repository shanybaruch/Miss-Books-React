
export function BookPreview({ book }) {

    const { title, price } = book   
    // console.log(book);
    
    return (
        <article className="book-preview">
            <h3 className="bold">{title}</h3>
            <section className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vero molestias...</section>
            {/* <section>{price}₪</section> */}
            <img src={`../assets/img/${title}.jpg`} alt="Book Image" />
        </article>
    )
}