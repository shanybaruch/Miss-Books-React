export function RateBySelect(wayRating) {
    console.log(wayRating.cmpType);

    return (
        <section className="rate-by-select">
            <select name="rating" id="rating">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            {/* <h1>select</h1> */}
        </section>
    )
}