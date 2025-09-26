const { useState, useEffect } = React

export function BookFilter({ defaultFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    const { title, minPrice } = filterByToEdit


    function handleTxtChange(ev) {
        const value = ev.target.value
        setFilterByToEdit(filterBy => ({ ...filterBy, title: value }))
    }

    function handleMinPriceChange(ev) {
   const value = +ev.target.value
        setFilterByToEdit(filterBy => ({ ...filterBy, minPrice: value }))
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        console.log('filter:', filterByToEdit);  
    }

    return (
        <section className="book-filter">
            <h2>Filter Books</h2>

            <form onSubmit={onSaveFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleTxtChange} value={title} id="txt" type="text" />

                <label htmlFor="minPrice">Min Price</label>
                <input onChange={handleMinPriceChange} value={minPrice} id="minPrice" type="number" />

                <button>Save</button>
            </form>

        </section>
    )
}