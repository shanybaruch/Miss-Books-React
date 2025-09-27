const { useState, useEffect } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    const { title, maxPrice } = filterByToEdit
    // const isValid = title && maxPrice

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    },[filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(filterBy => ({ ...filterBy, [field]: value }))
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
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} id="title" type="text" name="title" />

                <label htmlFor="maxPrice">Max Price</label>
                <input onChange={handleChange} value={maxPrice || ''} id="maxPrice" type="number" name="maxPrice" />
              
                {/* <label htmlFor="onSale">On Sale?</label>
                <input onChange={handleChange} value={maxPrice} id="onSale" type="checkbox" name="onSale" /> */}

                <button>Save</button>
            </form>

        </section>
    )
}