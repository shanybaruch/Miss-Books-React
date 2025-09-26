
export function BookPreview({ book }) {

    const { title, price } = book   
    
    return (
        <article className="book-preview">
            <h3 className="bold">{title}</h3>
            <section>{price}₪</section>
            <img src={`../assets/img/${title}.jpg`} alt="Book Image" />
        </article>
    )
}