import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [creds, setCreds] = useState({ name: "", email: "", password: "", cpassword: "" });
    let navigate = useNavigate();

    const onChange = (e) => {
        setCreds({...creds, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {name, email, password} = creds;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            navigate("/");
            props.showAlert("Account Created Successfully !!","Success : ")
        }
        else {
            props.showAlert("Invalid Creds","Error : ")
        }
    }


    return (
        <>
            <div className="container w-50" style={{height:"69vh"}}>
            <h2 className='my-3' style={{textAlign:'center'}}>SIGN UP</h2>
            <hr />
            <form className='my-4' action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="name" className="form-control" id="name" name='name' value={creds.name} onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={onChange}  />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" id="password" className="form-control" name='password' value={creds.password} onChange={onChange} required minLength={6} aria-describedby="passwordHelpBlock" />
                    <div id="passwordHelpBlock" className="form-text">
                        Your password must be 6-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                    </div>
                </div>
                <button className='btn btn-outline-secondary w-100'>Sign Up</button>
            </form>
            </div>
        </>
    )
}

export default Signup