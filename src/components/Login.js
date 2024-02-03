import React,{useState} from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [creds, setCreds] = useState({email:"", password:""})
    let history = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email:creds.email, password:creds.password})
        });
        const json = await response.json();
        console.log(json);

        if(json.success) {
            localStorage.setItem('token', json.authtoken)
            history("/")
            props.showAlert("Logged in Successfully !!","Success : ")
        }
        else {
            props.showAlert("Invalid Details","Error : ")
        }

    }


    const onChange =(e)=>{
        setCreds({...creds,[e.target.name]:e.target.value});
    }

    return (
        <>
            <div className="container w-50" style={{height:"69vh"}}>
                <h2 className='my-3' align={'center'}>LOG IN</h2>
                <hr />
                <form className='my-4'action="" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={creds.email} onChange={onChange}  />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" id="password" className="form-control" name='password' value={creds.password} onChange={onChange}aria-describedby="passwordHelpBlock" />
                        <div id="passwordHelpBlock" className="form-text">
                            Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>
                    <button className='btn btn-outline-secondary w-100'>Log In</button>
                </form>
            </div>
        </>
    )
}

export default Login