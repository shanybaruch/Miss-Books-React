import { utilService } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({...defaultFilter})
    const initialFilterBy = useRef({ ...defaultFilter })    
    const onSetFilterDebounce = useRef(utilService.debounce(onSetFilterBy, 300))

    useEffect(() => {
        onSetFilterDebounce.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

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

    function onClearFilter() {        
        setFilterByToEdit(initialFilterBy.current)
    }

    return (
        <section className="book-filter">
            <h2>Filter</h2>
            <form>
                {/* <label htmlFor="title">Title</label> */}
                <input onChange={handleChange} value={filterByToEdit.title} id="title" type="text" name="title" placeholder="Book name" />

                {/* <label htmlFor="maxPrice">Max Price</label> */}
                <input onChange={handleChange} value={filterByToEdit.maxPrice || ''} id="maxPrice" type="number" name="maxPrice" placeholder="Max price" min={50} max={300} step={50} />

                {/* <label htmlFor="onSale">On Sale?</label>
                <input onChange={handleChange} value={maxPrice} id="onSale" type="checkbox" name="onSale" /> */}

                <button type="button" onClick={onClearFilter}>Clear</button>
            </form>
        </section>
    )
}