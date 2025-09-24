
export function BookPreview({ book }) {

    const { title, price } = book

    return (
        <article className="book-preview">
            <h3>Title: {title}</h3>
            <h4>Price: {price}</h4>
            <img src={'../assets/img/1.jpg'} alt="Book Image" />
        </article>
    )
}