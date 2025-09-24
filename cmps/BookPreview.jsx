
export function BookPreview({ book, idx }) {

    const { title, price } = book    

    return (
        <article className="book-preview">
            <h3>{title}</h3>
            <h4>Price: {price}</h4>
            <img src={`../assets/img/${idx + 1}.jpg`} alt="Book Image" />
        </article>
    )
}