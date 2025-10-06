const { useState, useRef, useEffect } = React

export function AddReview({ saveReview, toggleReview }) {

    const inputRef = useRef()
    const [review, setReview] = useState({
        fullName: '',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    })
    const [cmpType, setCmpType] = useState('select')
    const { fullName, date, txt, rating } = review

    useEffect(() => {
        inputRef.current.focus()
    }, [])

    function onAddReview(ev) {
        ev.preventDefault()
        saveReview(review)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: prop } = target
        setReview((prevReview) => ({ ...prevReview, [prop]: value }))
    }

    function onChangeCmpType(selecterType) {
        setCmpType(selecterType)
    }


    return (
        <section className="add-review">
            <form onSubmit={onAddReview} className="review-form">
                <div className="review-modal">
                    <h1 className="title">Add review</h1>

                    <button className="btn-toggle-modal" onClick={toggleReview}>
                        x
                    </button>

                    <section className="flex">
                        <label htmlFor="fullname" className="bold">Full name:</label>
                        <input
                            type="text"
                            ref={inputRef}
                            autoFocus
                            placeholder="Enter full name"
                            name="fullname"
                            id="fullname"
                            value={fullName}
                            onChange={handleChange}
                        />
                    </section>

                    <section className="flex">
                        <label htmlFor="date" className="bold">Date:</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={date}
                            onChange={handleChange}
                        />
                    </section>

                    <button>Save</button>

                </div>
            </form>


        </section>
    )
}