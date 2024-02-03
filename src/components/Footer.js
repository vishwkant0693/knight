import React from 'react'

const Footer = () => {
    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark text-white d-flex justify-content-between mt-2'>
            <div className=" d-flex px-4 py-2 border-right-2px-white">
                <img src="favicon.ico" alt="" />
                <div className='d-flex align-items-center mx-2 fs-4'>Knight</div>
            </div>
            <div>
                <h6 className=''>Copyright © 2024 KnightSecuredNotebook.com</h6>
            </div>
            <div className="socials px-4">
                <p>Designed by: Vishwkant</p>
            </div>
        </nav>
    )
}

export default Footer