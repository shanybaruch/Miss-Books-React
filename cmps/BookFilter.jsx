const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)

    const { title, maxPrice } = filterByToEdit


    function handleTxtChange(ev) {
        const value = ev.target.value
        setFilterByToEdit(filterBy => ({ ...filterBy, title: value }))
    }

    function handleMaxPriceChange(ev) {
   const value = +ev.target.value
        setFilterByToEdit(filterBy => ({ ...filterBy, maxPrice: value }))
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        console.log('filter:', filterByToEdit);
        onSetFilterBy(filterByToEdit)  
    }

    return (
        <section className="book-filter">
            <h2>Filter Books</h2>

            <form onSubmit={onSaveFilter}>
                <label htmlFor="txt">Title</label>
                <input onChange={handleTxtChange} value={title} id="txt" type="text" />

                <label htmlFor="maxPrice">Max Price</label>
                <input onChange={handleMaxPriceChange} value={maxPrice} id="maxPrice" type="number" />

                <button>Save</button>
            </form>

        </section>
    )
}