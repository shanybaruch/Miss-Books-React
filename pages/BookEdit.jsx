import { bookService } from "../services/book.service.js";
const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { bookId } = useParams()

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        setIsLoading(true)
        bookService.get(bookId)
            .then(book => {
                if (!book) {
                    navigate('/book')
                    return
                }
                const formBook = {
                    id: book.id,
                    title: (book && typeof book.title !== 'undefined') ? book.title : '',
                    price: (book && book.listPrice && typeof book.listPrice.amount !== 'undefined')
                        ? book.listPrice.amount
                        : (book && book.price && typeof book.price !== 'undefined')
                            ? book.price
                            : ''
                }
                setBookToEdit(formBook)
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/book')
            })
            .finally(() => setIsLoading(false))
    }


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
        setBookToEdit(prevCar => ({ ...prevCar, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit)
            .then(() => {
                navigate('/book')
                showSuccessMsg('Book added!')
            })
            .catch(err => {
                console.log('err: ', err)
                showErrorMsg('Cannot save book...')
            })
    }

    const { title, price } = bookToEdit
    console.log('book to edit: ', bookToEdit);
    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form className={loadingClass} onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} type="text" onChange={handleChange} name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input value={price} type="number" onChange={handleChange} name="price" id="price" />

                <button>Save</button>
            </form>
        </section>
    )
}