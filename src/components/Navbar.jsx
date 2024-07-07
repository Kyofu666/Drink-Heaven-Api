import { NavLink } from "react-router-dom"

const Navbar = () => {
    return (
        <nav>
            <div className="nav-center">
                <span className="logo">Drink Heaven</span>
                <div className="nav-links">
                    <NavLink to='/' className='nav-link'>
                        Home
                    </NavLink>
                    <NavLink to='/about' className='nav-link'>
                        about
                    </NavLink>
                    <NavLink to='/newsletter' className='nav-link'>
                        Newsletter
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
