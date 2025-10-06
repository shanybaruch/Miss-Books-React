import { ReviewPreview } from "../cmps/ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
    // console.log('!reviews.length:', reviews.length)
    // console.log(!reviews);
    

    return (
        <div className="review-list">
            <h3>User reviews:</h3>
            {/* {!reviews.length && <p>No reviews yet</p>} */}
            {/* {
                reviews.map(review =>
                    <ReviewPreview
                        key={review.id}
                        review={review}
                        onRemoveReview={onRemoveReview}
                    />
                )
            } */}
        </div>
    )
}