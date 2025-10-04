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
                    id: book.id || '',
                    title: book.title || '',
                    subtitle: book.subtitle || '',
                    listPrice: {
                        amount: amount,
                        currencyCode: (book.listPrice && book.listPrice.currencyCode) ? book.listPrice.currencyCode : 'EUR',
                        isOnSale: (book.listPrice && typeof book.listPrice.isOnSale !== 'undefined') ? book.listPrice.isOnSale : false
                    },
                    publishedDate: book.publishedDate || ''
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
                setBookToEdit(prev => ({
                    ...prev,
                    listPrice: { ...prev.listPrice, amount: value }
                }))
                return
            case 'range':
                value = +value
                break

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

    const { title } = bookToEdit
    let listPrice = bookToEdit.listPrice || { amount: '' }
    console.log('book to edit: ', bookToEdit);
    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form className={loadingClass} onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input value={title} type="text" onChange={handleChange} name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input value={listPrice.amount === 0 ? 0 : (listPrice.amount || '')}
                    type="number" onChange={handleChange} name="price" id="price" />

                <button>Save</button>
            </form>
        </section>
    )
}