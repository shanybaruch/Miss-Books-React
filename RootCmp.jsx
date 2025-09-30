const { useState } = React
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { BookIndex } from './pages/BookIndex.jsx'

export function App() {

    const [page, setPage] = useState('book')

    return (
        <section className="app grid">
            <header className="app-header grid">
                <section className='nav-title'>
                    <h1 className='title'>Miss Books</h1>
                </section>
                <section className='nav-menu grid'>
                    <a onClick={() => setPage('home')}>Home</a>
                    <a onClick={() => setPage('about')}>About Us</a>
                    <a onClick={() => setPage('book')}>Books</a>
                </section>
            </header>

            <main className="main-layout">
                {page === 'home' && <Home />}
                {page === 'about' && <About />}
                {page === 'book' && <BookIndex />}
            </main>
        </section>
    )
}