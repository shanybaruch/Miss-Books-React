import { Home } from './cmps/Home.jsx'

export function App() {
    return (
        <section className="app grid">
            <header className="app-header grid">
                <h1 className='title'>My App</h1>
                <section className='nav-menu grid'>
                    <li> <h1>Home</h1> </li>
                    <li> <h1>About Us</h1> </li>
                    <li> <h1>Books</h1> </li>
                </section>
            </header>
            <main class="main-layout">
                <Home />
            </main>
        </section>
    )
}