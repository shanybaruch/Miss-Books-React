import { StarRating } from "./dynamic-inputs/StarRating.jsx"


export function ReviewPreview({ review, onRemoveReview }) {
    // console.log({ review });
    
    return (
        <section className='review-preview'>
            <section className="grid">
                <h4 className="name">{review.fullName}</h4>
                <h5 className="date">{review.date}</h5>
            </section>

            <section>
                <p className="txt">{review.txt}</p>
            </section>

            <section className="rate">
                <p className="rating">{`${review.rating} / 5`}</p>
                {/* {review.rating !== 0 && <h4><StarRating rating={review.rating} /></h4>} */}
                {/* {review.selected !== 0 && <p>Book rate: {review.selected}/5</p>} */}
            </section>

            <button className="btn-remove" onClick={() => onRemoveReview(review.id)}>x</button>
        </section >
    )
}