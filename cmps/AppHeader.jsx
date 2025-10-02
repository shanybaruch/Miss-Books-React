const { Link, NavLink, Navigate } = ReactRouterDOM

export function AppHeader() {
    return (
        <header className="app-header grid">

            <section className='nav-title'>
                <h1 className='title'>Miss Books</h1>
            </section>

            <section className='nav-menu grid'>
                <NavLink to="/"> Home</NavLink>
                <NavLink to="/about"> About Us</NavLink>
                <NavLink to="/book"> Books</NavLink>
            </section>

        </header>
    )
}