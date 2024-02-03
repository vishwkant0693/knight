import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
    let location = useLocation();

    useEffect(() => {
    }, [location]);

    const navigate = useNavigate();

    const handlelogOut = () => {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Knight</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {
                        !localStorage.getItem('token')?
                    <div className="d-flex">
                        <Link to="/signup" className='btn btn-outline-info'>Sign Up</Link>
                        <Link to="/login" className='btn btn-outline-success mx-2'>Log In</Link>
                    </div>
                    :
                    <div className="d-flex">
                        <button onClick={handlelogOut} className='btn btn-outline-info'>Log Out</button>
                    </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar