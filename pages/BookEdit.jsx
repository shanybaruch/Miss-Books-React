import { AddBook } from "../cmps/AddBook.jsx";
import { bookService } from "../services/book.service.js";
import { RateBySelect } from "../cmps/RateBySelect.jsx";
import { RateByTextbox } from "../cmps/RateByTextbox.jsx";
import { RateByStars } from "../cmps/RateByStars.jsx";

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const [isLoading, setIsLoading] = useState(false)
    const [cmpType, setCmpType] = useState('select')

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
                        amount: (book.listPrice && typeof book.listPrice.amount !== 'undefined')
                            ? book.listPrice.amount
                            : '',
                        currencyCode: (book.listPrice && book.listPrice.currencyCode) ? book.listPrice.currencyCode : 'EUR',
                        isOnSale: (book.listPrice && typeof book.listPrice.isOnSale !== 'undefined') ? book.listPrice.isOnSale : false
                    },
                    publishedDate: book.publishedDate || '',
                    reviews: book.reviews || []
                }
                setBookToEdit({ ...book, ...formBook })
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
                if (field === 'price') {
                    value = value === '' ? '' : +value
                    setBookToEdit(prev => ({
                        ...prev,
                        listPrice: { ...prev.listPrice, amount: value }
                    }))
                    return
                }
                if (field === 'pageCount') {
                    value = value === '' ? '' : +value
                    setBookToEdit(prev => ({ ...prev, pageCount: value }))
                    return
                }
                break

            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setBookToEdit(prevBook => ({ ...prevBook, [field]: value }))
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

    const {
        title,
        authors,
        description,
        pageCount,
        rating,
    } = bookToEdit

    function handleRatingClick(value) {
        console.log(`${value} Click`);
    }

    let listPrice = bookToEdit.listPrice || { amount: '' }
    console.log('book to edit: ', bookToEdit);
    const loadingClass = isLoading ? 'loading' : ''

    return (
        <section className="book-edit">
            <h1 className="title">{bookId ? 'Edit' : 'Add'} Book</h1>
            {!bookId && <AddBook />}
            <form className={loadingClass} onSubmit={onSaveBook}>
                <label htmlFor="title">Title:</label>
                <input value={title} type="text" onChange={handleChange} name="title" id="title" />

                <label className='' htmlFor="authors">Authors: </label>
                <input onChange={handleChange} value={authors}
                    id='authors' type="text" name='authors' />

                <label htmlFor="price">Price:</label>
                <input value={listPrice.amount === 0 ? 0 : (listPrice.amount || '')}
                    type="number" onChange={handleChange} name="price" id="price" />

                <label className='' htmlFor="description">Description: </label>
                <input onChange={handleChange} value={description}
                    id='description' type="text" name='description' />

                <label className='' htmlFor="pages">Number of pages: </label>
                <input onChange={handleChange}
                    value={bookToEdit.pageCount === 0 ? 0 : (bookToEdit.pageCount || '')}
                    id='pages' type="number" name='pageCount' />

                <label htmlFor="rating">Rating:</label>
                <select className="select-rating" value={cmpType} onChange={ev => setCmpType(ev.target.value)} name="rating" id="rating">
                    <option name="rating-way" value="select">select</option>
                    <option name="rating-way" value="textbox">textbox</option>
                    <option name="rating-way" value="stars">stars</option>
                </select>
                <section className="dynamic-cmps">
                    <DynamicCmp cmpType={cmpType} handleClick={handleRatingClick} />
                </section>

                <button className="btn-save">Save</button>
            </form>
        </section>
    )
}

function DynamicCmp(props) {
    const dynamicCmpMap = {
        select: <RateBySelect />,
        textbox: <RateByTextbox />,
        stars: <RateByStars />,
    }

    return dynamicCmpMap[props.cmpType]
}