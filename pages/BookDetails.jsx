import { AddReview } from "../cmps/AddReview.jsx";
import { LongTxt } from "../cmps/LongTxt.jsx";
import { ReviewList } from "../cmps/ReviewList.jsx";
import { bookService } from "../services/book.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookDetails({ bookId, onBack = () => { } }) {
    // console.log('Book id - details: ', bookId);

    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const [isShowReviewModal, setIsShowReviewModal] = useState(false)
    const [isLoadingReview, setIsLoadingReview] = useState(false)

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

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true)
        bookService.removeReview(book.id, reviewId)
            .then(() => {
                const filteredReviews = book.reviews.filter(review => review.id !== reviewId)
                setBook({ ...book, reviews: filteredReviews })
            })
            .finally(() => setIsLoadingReview(false))
    }

    function onToggleReviewModal() {
        setIsShowReviewModal(prevIsReviewModal => !prevIsReviewModal)
    }

    function onSaveReview(reviewToAdd) {
        setIsLoadingReview(true)
        bookService.saveReview(book.id, reviewToAdd)
            .then((review => {
                const reviews = [review, ...book.reviews]
                setBook({ ...book, reviews })
            }))
            .catch(() => showErrorMsg(`Review to ${book.title} Failed!`))
            .finally(() => setIsLoadingReview(false))
    }

    if (!book) return <h1>Loading Details...</h1>
    return (
        <section className="book-details">
            <section className="page">
                <section className="details">
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
                </section>

                <section className="page-bottom">
                    <section>
                        <button className="btn-back" onClick={onBack}>Back</button>
                    </section>

                    <section className="page-nav-btns flex">
                        <button><Link className="btn-prev fa-solid fa-arrow-left" to={`/book/${book.prevBookId}`}></Link></button>
                        <button><Link className="btn-next fa-solid fa-arrow-right" to={`/book/${book.nextBookId}`}></Link></button>
                    </section>

                    <section className="flex">
                        <button className="btn-add-review" onClick={onToggleReviewModal}>Add Review</button>
                        {isShowReviewModal && (
                            <AddReview
                                toggleReview={onToggleReviewModal}
                                saveReview={onSaveReview}
                            />
                        )}
                    </section>

                    <section>
                        {!isLoadingReview
                            ? <ReviewList reviews={book.reviews} onRemoveReview={onRemoveReview} />
                            : <div className="loader"></div>
                        }
                    </section>
                </section>
            </section>
        </section>
    )
}