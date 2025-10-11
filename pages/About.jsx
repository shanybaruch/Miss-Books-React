const { Link, Outlet } = ReactRouterDOM

export function About() {
    return (
        <section className="about">
            <p className="title montserrat-class">About Us</p>
            <p className="montserrat-class">
                Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Dolores provident iusto, inventore voluptatibus
                sunt, minima explicabo minus tenetur voluptas sint
                magnam, distinctio quod natus? Autem alias commodi
                quaerat quas neque.
            </p>
            <nav>
                <Link to='/about/Team'><i className="team fa-solid fa-people-group"></i> Team</Link>
                <Link to='/about/Goal'><i className="goal fa-brands fa-golang"></i>Goal</Link>
            </nav>
            <Outlet />
        </section>
    )
}