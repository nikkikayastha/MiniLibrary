import { Link } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { loginUser } from '../api/auth';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        const payload = {
            email,
            password
        };
        console.log('Logging in with', payload);
        // Call your login API here
        loginUser(payload)
            .then((response) => {
                alert("Login successful!");
                // Handle successful login (e.g., redirect, store token, etc.)
            })
            .catch((err) => {
                alert("Login failed. Please check your credentials.");
            });
    };

    return(
        <div className='main_container'>
            <div className='left_container'>
                <img alt="LogIn" src={require('../assets/signin_img.png')}></img>
                <p style={{color: 'white', fontSize:'20px'}}>Digital door to your library</p>
            </div>
            <div className='login'>
                <h1>Welcome back!</h1>
                <h4>Login to your account.</h4>
                <input 
                type='email' 
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
                />
                <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
                <button style={{color:'white'}} onClick={handleSubmit}>Sign In</button>

                <p>Don't have an account? <Link to={'/signup'} style={{color:'blue'}}>Sign Up</Link></p>
            </div>
        </div>
    )
}