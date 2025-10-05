import { LongTxt } from "../cmps/LongTxt.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails({ bookId, onBack = () => { } }) {
    // console.log('Book id - details: ', bookId);

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        bookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
    }

    function getBookDateDiff() {
        let currentDate = new Date();
        let currentYear = currentDate.getFullYear();
        let currYearDiff = currentYear - book.publishedDate
        return currYearDiff
    }

    function onBack() {
        navigate('/book')
    }

    if (!book) return <h1>Loading Details...</h1>
    return (
        <section className="book-details">
            <section className="header">
                <h2 className="title">{book.title}</h2>
                <h3 className="subtitle bold">{book.subtitle}</h3>
                <span className="published-date">{getBookDateDiff() > 10 ? 'Vintage Book' : getBookDateDiff() <= 1 ? 'New Book' : ''}</span>
            </section>

            <section className="basic-info">
                <p className="sub">Authors: <span>{book.authors}</span> </p>
                <p className="sub">Categories: <span>{book.categories}</span> </p>
                <p className="sub">Language: <span>{book.language}</span> </p>
                <p className="sub">Currency: <span>{book.listPrice.currencyCode}</span> </p>

                <section className="pages">
                    {book.pageCount > 500 ? (
                        <h4 className="level">Serious Reading</h4>
                    ) : book.pageCount > 200 ? (
                        <h4 className="level">Descent Reading</h4>
                    ) : book.pageCount < 100 ? (
                        <h4 className="level">Light Reading</h4>
                    ) : null}

                    <p className="pages-count">{book.pageCount} pages</p>

                    {/* <pre>{JSON.stringify(book, null, 2)}</pre>      */}
                </section>
            </section>


            <section>
                <p className="title-description">Description:</p>
                {book.description && <LongTxt txt={book.description} />}
            </section>

            <section className="book-price">
                {book.listPrice.isOnSale && <h4 className='sale'>Sale</h4>}
                <img src={book.thumbnail} alt="Book Image" />

                <p className={`price
                    ${book.listPrice.amount > 200 ? 'high' : 'low'}`}>{book.listPrice.amount}
                    €</p>
            </section>

            <button className="btn-back" onClick={onBack}>Back</button>

            <section>
                <button><Link className="btn-prev" to={`/book/${book.prevBookId}`}>Prev</Link></button>
                <button><Link className="btn-next" to={`/book/${book.nextBookId}`}>Next</Link></button>
            </section>

        </section>
    )
}