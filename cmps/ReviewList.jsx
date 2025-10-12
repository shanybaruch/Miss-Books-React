import { ReviewPreview } from "../cmps/ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {    

    return (
        <div className="review-list">
            <h3 className="title">Reviews:</h3>
            {!reviews.length && <p>No reviews yet</p>}
            {
                reviews.map(review =>
                    <ReviewPreview
                        key={review.id}
                        review={review}
                        onRemoveReview={onRemoveReview}
                    />
                )
            }
        </div>
    )
}