import { bookService } from "../services/book.service.js"
import { SearchBooksList } from "./SearchBooksList.jsx"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { utilService } from "../services/util.service.js"


const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function AddBook() {

    const [booksList, setBooksList] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleSearchDebounce = useRef(utilService.debounce(handleSearch, 2000))

    function handleSearch(target) {
        bookService.getGoogleBooks(target.value)
            .then(books => {
                setBooksList(books)
            })
            .finally(() => setIsLoading(false))

    }

    function onSave(book) {
        bookService.addGoogleBook(book)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))
    }

    function onSearch({ target }) {

        if (!target.value) return
        setIsLoading(true)
        handleSearchDebounce.current(target)
    }

    return (
        <section className="add-book">
                <p className=''>Google Search: </p>
                <input
                    onChange={onSearch}
                    type="text" name='title'
                    placeholder='Book name' />
                <button>Reset</button>
            {isLoading && <div>Loading....</div>}
            {booksList && booksList.length && <SearchBooksList booksList={booksList} onSave={onSave} />}
        </section>
    )
}